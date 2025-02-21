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

  // Asegurar que siempre devuelva un array, incluso vacío
  router.get('/', async (req, res) => {
    try {
      const { category } = req.query;
      const query = category ? { category } : {};
      
      const products = await Product.find(query).lean() || [];
      res.json(products);
      
    } catch (error) {
      res.status(500).json([]); // Devuelve array vacío en errores
    }
  });
}
