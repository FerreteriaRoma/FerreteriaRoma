import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const p_cust_id_cliente = process.env.NEXT_PUBLIC_PRIVATE_CUST_ID_CLIENT; // Reemplaza con tu valor de ePayco
    const p_key = process.env.NEXT_PUBLIC_P_KEY; // Reemplaza con tu valor de ePayco

    const { ref_payco, transaction_id, amount, currency_code, signature, id_invoice, x_response, response_reason_text, approval_code } = req.body;

    const computedSignature = crypto.createHash('sha256').update(`${p_cust_id_cliente}^${p_key}^${ref_payco}^${transaction_id}^${amount}^${currency_code}`).digest('hex');

    // Verifica el número de orden y el valor
    const order = await Order.findOne({ ref_payco });
    if (order && amount === order.line_items.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0)) {
        if (signature === computedSignature) {
            switch (parseInt(x_response, 10)) {
                case 1:
                    // Transacción aceptada
                    order.paid = true; // Actualiza el estado de pago a true
                    await order.save();
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
        res.status(400).json({ error: 'Número de orden o valor pagado no coinciden.' });
    }
}
