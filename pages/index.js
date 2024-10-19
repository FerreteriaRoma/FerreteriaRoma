import { useState } from "react";
import Featured from "@/components/Featured";
import Header from "@/components/HeaderI";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";
import NewNews from "@/components/NewNews";
import { News } from "@/models/News";
import YoutubeChanel from "@/components/Youtube";

export default function HomePage({ featuredProduct, newProducts, newNews }) {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const handleMobileNavToggle = () => {
    setMobileNavActive((prev) => !prev);
  };

  return (
    <div>
      {/* Header recibe el estado de mobileNavActive y la función para alternarlo */}
      <Header
        mobileNavActive={mobileNavActive}
        onMobileNavToggle={handleMobileNavToggle}
      />
      
      {/* Solo mostrar contenido cuando mobileNavActive no esté activo */}
      {!mobileNavActive && (
        <>
          {/* Noticias recientes */}
          <NewNews news={newNews} />
          
          {/* Canal de Youtube */}
          <YoutubeChanel />

          {/* Producto destacado */}
          {featuredProduct ? (
            <Featured product={featuredProduct} />
          ) : (
            <p>Producto no encontrado</p>
          )}

          {/* Productos más recientes */}
          <NewProducts products={newProducts} />

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

// Función para obtener datos del servidor antes de renderizar la página
export async function getServerSideProps() {
  await mongooseConnect();

  try {
    // Obtener todos los productos y noticias
    const allProducts = await Product.find({});
    const allNews = await News.find();
    
    // Seleccionar un producto al azar
    const randomIndex = Math.floor(Math.random() * allProducts.length);
    const featuredProduct = allProducts[randomIndex];

    // Obtener los productos más recientes
    const newProducts = await Product.find({}, null, {
      sort: { "_id": -1 },
      limit: 20,
    });
    const newNews = await News.find({}, null, { sort: { "_id": -1 }, limit: 6 });

    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
        newNews: JSON.parse(JSON.stringify(newNews)),
      },
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return {
      props: {
        featuredProduct: null,
        newProducts: [],
        newNews: [],
      },
    };
  }
}
