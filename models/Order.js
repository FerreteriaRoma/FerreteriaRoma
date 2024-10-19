import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const OrderSchema = new Schema({
    line_items: [
        {
            quantity: Number,
            price_data: {
                currency: String,
                unit_amount: Number,
                product_data: {
                    name: String,
                },
            },
        },
    ],
    name: String,
    email: String,
    phone: String,
    city: String,
    StreetAddress: String,
    paid: Boolean,
    ref_payco: String,
    total_amount: Number, 
    order_number: String, 
}, {
    timestamps: true,
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
