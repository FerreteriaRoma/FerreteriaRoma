import mongoose, { model, models } from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    images: { type: [String], required: true, validate: { validator: v => v.length > 0, message: 'Al menos una imagen es requerida' } },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' }
});

export const Product = models.Product || model('Product', ProductSchema);
