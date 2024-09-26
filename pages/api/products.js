// /pages/api/products.js
import { Product } from '@/models/Product'; // Importa tu modelo de Producto
import { mongooseConnect } from '@/lib/mongoose'; // Asegúrate de tener la conexión a la base de datos

export default async function handler(req, res) {
  // Conectar a la base de datos
  await mongooseConnect();

  // Obtener la categoría de la query si está presente
  const { category } = req.query;
  let query = {};

  // Si la categoría fue enviada, añadirla a la consulta
  if (category) {
    query.category = category;
  }

  try {
    // Buscar productos, filtrando por la categoría si fue enviada
    const products = await Product.find(query).populate('category'); // Usar 'populate' para obtener detalles de la categoría
    res.status(200).json(products); // Enviar productos como respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo los productos' });
  }
}
