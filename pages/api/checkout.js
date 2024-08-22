import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(400).json({ error: 'Should be a POST request' });
    }

    const { name, email, city, streetAdress, products } = req.body;

    try {
        await mongooseConnect();

        // Asegúrate de que products sea un array
        const productIds = Array.isArray(products) ? products : products.split(',');
        const uniqueIds = [...new Set(productIds)];
        const productsInfos = await Product.find({ _id: uniqueIds });

        let line_items = [];
        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId);
            const quantity = productIds.filter(id => id === productId).length || 0;
            if (quantity > 0 && productInfo) {
                line_items.push({
                    quantity,
                    price_data: {
                        currency: 'COP',
                        product_data: { name: productInfo.title },
                        unit_amount: productInfo.price * 100, // Precio unitario en centavos
                    },
                });
            }
        }

        const orderDoc = Order.create({
            line_items, name, email, city, streetAdress, paid: false,
        });

        

    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
