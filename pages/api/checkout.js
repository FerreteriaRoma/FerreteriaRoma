import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order'; // Asegúrate de usar la exportación por defecto
import { Product } from '@/models/Product';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, phone, city, streetAddress, products } = req.body;

    if (!name || !email || !city || !streetAddress || !products) {
        return res.status(400).json({ error: 'Por favor por completo el formulario' });
    }

    try {
        await mongooseConnect();

        const productsIds = products.split(',');
        const uniqueIds = [...new Set(productsIds)];
        const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

        let line_items = [];
        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId);
            const quantity = productsIds.filter(id => id === productId).length || 0;
            if (quantity > 0 && productInfo) {
                line_items.push({
                    quantity,
                    price_data: {
                        currency: 'COP',
                        product_data: { name: productInfo.name },
                        unit_amount: quantity * productInfo.price,
                    },
                });
            }
        }

        const generatedRefPayco = uuidv4();

        const order = await Order.create({
            line_items,
            name,
            email,
            phone,
            city,
            StreetAddress: streetAddress,
            paid: false,
            ref_payco: generatedRefPayco,
        });

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error processing the checkout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
