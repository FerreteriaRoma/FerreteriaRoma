import mongoose, { model, models } from 'mongoose';

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    images: { type: [String], required: true, validate: { validator: v => v.length > 0, message: 'Al menos una imagen es requerida' } },   
}, {
    timestamps: true,
});

export const News = models.News || model('News', NewsSchema);