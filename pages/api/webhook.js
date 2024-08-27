import { mongooseConnect } from '@/lib/mongoose'; // Asegúrate de tener la función mongooseConnect para conectar a MongoDB
import Order from '@/models/Order'; // Asegúrate de que Order es tu modelo de Mongoose
import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const p_cust_id_cliente = process.env.NEXT_PUBLIC_PRIVATE_CUST_ID_CLIENT; // Reemplaza con tu valor de ePayco
    const p_key = process.env.NEXT_PUBLIC_P_KEY; // Reemplaza con tu valor de ePayco

    // Extrae los parámetros del cuerpo de la solicitud
    const { ref_payco, transaction_id, amount, currency_code, signature, id_invoice, x_response } = req.body;

    // Conectar a la base de datos
    try {
        await mongooseConnect();

        // Calcula la firma esperada
        const computedSignature = crypto.createHash('sha256').update(`${p_cust_id_cliente}^${p_key}^${ref_payco}^${transaction_id}^${amount}^${currency_code}`).digest('hex');

        // Busca la orden en la base de datos usando ref_payco
        const order = await Order.findOne({ ref_payco });

        // Verifica que la orden exista y el monto coincida
        if (order && amount == order.line_items.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0)) {
            // Verifica la firma
            if (signature === computedSignature) {
                // Verifica el código de respuesta
                switch (parseInt(x_response, 10)) {
                    case 1:
                        // Transacción aceptada
                        if (!order.paid) { // Solo actualiza si no está ya marcado como pagado
                            order.paid = true; // Marca la orden como pagada
                            await order.save();
                        }
                        res.status(200).json({ success: true, message: 'Pago confirmado y orden actualizada.' });
                        break;
                    case 2:
                        // Transacción rechazada
                        res.status(400).json({ error: 'Transacción rechazada.' });
                        break;
                    case 3:
                        // Transacción pendiente
                        res.status(200).json({ success: true, message: 'Transacción pendiente.' });
                        break;
                    case 4:
                        // Transacción fallida
                        res.status(400).json({ error: 'Transacción fallida.' });
                        break;
                    default:
                        res.status(400).json({ error: 'Código de respuesta desconocido.' });
                }
            } else {
                res.status(400).json({ error: 'Firma no válida.' });
            }
        } else {
            res.status(400).json({ error: 'Número de orden o monto no coinciden.' });
        }
    } catch (error) {
        console.error('Error confirmando el pago:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
