import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { ref_payco, x_cod_response } = req.body; // Recibe la referencia y el estado del pago de ePayco

    if (!ref_payco) {
        return res.status(400).json({ error: 'Referencia de pago no proporcionada' });
    }

    try {
        await mongooseConnect();

        const order = await Order.findOne({ ref_payco });

        if (order) {
            // Verifica si el pago fue exitoso (x_cod_response === "1" indica éxito en ePayco)
            if (x_cod_response === "1") {
                if (!order.paid) { // Solo actualiza si no está ya marcado como pagado
                    order.paid = true; // Actualiza el estado de pago a true
                    await order.save();
                }
                res.status(200).json({ success: true, message: 'Pago confirmado y orden actualizada.' });
            } else {
                res.status(400).json({ error: 'El pago no fue exitoso.' });
            }
        } else {
            res.status(404).json({ error: 'Orden no encontrada.' });
        }
    } catch (error) {
        console.error('Error confirmando el pago:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
