import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

// Definición del esquema para los elementos de la línea
const LineItemSchema = new Schema({
    quantity: { type: Number, required: true },
    price_data: {
        currency: { type: String, required: true },
        product_data: {
            name: { type: String, required: true }
        },
        unit_amount: { type: Number, required: true }
    }
});

// Definición del esquema para la orden
const OrderSchema = new Schema({
    line_items: [LineItemSchema],
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    StreetAddress: { type: String, required: true },
    paid: { type: Boolean, default: false },
    ref_payco: { type: String, required: true, unique: true },
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

// Crea o usa el modelo de la orden
const Order = models.Order || model('Order', OrderSchema);

export default Order;
