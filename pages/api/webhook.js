import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const p_cust_id_cliente = process.env.NEXT_PUBLIC_PRIVATE_CUST_ID_CLIENT;
    const p_key = process.env.NEXT_PUBLIC_P_KEY;

    const { ref_payco, transaction_id, amount, currency_code, signature, id_invoice, x_response } = req.body;

    try {
        await mongooseConnect();

        // Calcula la firma esperada
        const computedSignature = crypto.createHash('sha256')
            .update(`${p_cust_id_cliente}^${p_key}^${ref_payco}^${transaction_id}^${amount}^${currency_code}`)
            .digest('hex');

        // Busca la orden en la base de datos usando ref_payco 
        const order = await Order.findOne({ ref_payco });

        if (order) {
            // Calcula el monto total esperado de la orden
            const totalAmount = order.line_items.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0);

            // Verifica el monto y la firma
            if (amount == totalAmount) {
                if (signature === computedSignature) {
                    // Verifica el código de respuesta
                    switch (parseInt(x_response, 10)) {
                        case 1:
                            if (!order.paid) {
                                order.paid = true;
                                await order.save();
                            }
                            res.status(200).json({ success: true, message: 'Pago confirmado y orden actualizada.' });
                            break;
                        case 2:
                            res.status(400).json({ error: 'Transacción rechazada.' });
                            break;
                        case 3:
                            res.status(200).json({ success: true, message: 'Transacción pendiente.' });
                            break;
                        case 4:
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
        } else {
            res.status(404).json({ error: 'Orden no encontrada.' });
        }
    } catch (error) {
        console.error('Error confirmando el pago:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
