import Featured from "@/components/Featured";
import Header from "../components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default function HomePage({ product }) {
  return (
    <div>
      <Header />
      {product ? <Featured product={product} /> : <p>Producto no encontrado</p>}
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductID = '66aac6f3303d954c3c6b9e09';
  await mongooseConnect();
  
  try {
    const product = await Product.findById(featuredProductID);
    if (!product) {
      // Manejo de caso en que no se encuentra el producto
      return {
        props: { product: null },
      };
    }
    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return {
      props: { product: null },
    };
  }
}
