import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import { Product } from '@/models/Product';
import { v4 as uuidv4 } from 'uuid';
// reseteo y ya
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, phone, city, streetAddress, products } = req.body;

    if (!name || !email || !city || !streetAddress || !products) {
        return res.status(400).json({ error: 'Por favor complete el formulario' });
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
                const item = {
                    quantity,
                    price_data: {
                        currency: 'COP',
                        unit_amount: productInfo.price,
                        product_data: {
                            name: productInfo.title,
                        }
                    },
                };
                line_items.push(item);
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
