import Featured from "@/components/Featured";
import Header from "../components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      {featuredProduct ? (
        <Featured product={featuredProduct} />
      ) : (
        <p>Producto no encontrado</p>
      )}
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductID = "66aac6f3303d954c3c6b9e09";
  await mongooseConnect();

  try {
    const featuredProduct = await Product.findById(featuredProductID);
    const newProducts = await Product.find({}, null, { sort: { "_id": -1 }, limit: 10 });

    if (!featuredProduct) {
      // Manejo de caso en que no se encuentra el producto
      return {
        props: {
          featuredProduct: null,
          newProducts: JSON.parse(JSON.stringify(newProducts)),
        },
      };
    }

    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      },
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return {
      props: {
        featuredProduct: null,
        newProducts: [],
      },
    };
  }
}
