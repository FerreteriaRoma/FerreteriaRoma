// /pages/api/categories.js
import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
    await mongooseConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo las categorías' });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
