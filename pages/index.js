import { useState } from "react";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";

export default function HomePage({ featuredProduct, newProducts }) {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const handleMobileNavToggle = () => {
    setMobileNavActive(prev => !prev);
  };

  return (
    <div>
      <Header
        mobileNavActive={mobileNavActive}
        onMobileNavToggle={handleMobileNavToggle}
      />
      {featuredProduct ? (
        <Featured product={featuredProduct} />
      ) : (
        <p>Producto no encontrado</p>
      )}
      <NewProducts products={newProducts} mobileNavActive={mobileNavActive} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  try {
    // Obtener todos los productos
    const allProducts = await Product.find({});
    
    // Seleccionar un producto al azar
    const randomIndex = Math.floor(Math.random() * allProducts.length);
    const featuredProduct = allProducts[randomIndex];

    // Obtener los productos más recientes
    const newProducts = await Product.find({}, null, { sort: { "_id": -1 }, limit: 10 });

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
