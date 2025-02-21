import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import CategoryFilter from "@/components/CategoryFilter";
import Header from "@/components/HeaderI";
import Footer from "@/components/Footer";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que ocupe al menos toda la altura de la ventana */
`;

const Content = styled.div`
  flex: 1; /* Permite que este contenedor ocupe el espacio restante */
  padding: 20px; /* Ajusta el padding como necesites */
`;

const TitleStyled = styled.a`
  text-align: center;
  font-family: "Caveat", cursive;
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
  text-decoration: none;
  margin: 30px 0 20px;
  margin-top: 15px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: linear-gradient(90deg, #ff005a, #0070f3, #ffba08);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;

  @keyframes gradientShift {
    0% {
      background-position: 0%;
    }
    50% {
      background-position: 100%;
    }
    100% {
      background-position: 0%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Ajusta el tamaño de la fuente en pantallas pequeñas */
  }
`;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(); // Llamar a la API de productos al cargar el componente
  }, []);

  const fetchProducts = async (category = '') => {
    setLoading(true);
    try {
      let url = "/api/products";
      if (category) {
        url += `?category=${category}`; // Filtra por categoría si se proporciona
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error); // Manejo de errores
    } finally {
      setLoading(false);
    }
  };

  // Función modificada para manejar el cambio de categoría
const handleCategoryChange = async (categoryId) => {
  try {
    const url = categoryId ? `/api/products?category=${categoryId}` : '/api/products';
    const response = await axios.get(url);
    
    // Validar si hay productos
    if (response.data.length === 0) {
      setProducts([]); // Establecer array vacío
      setSponsoredProducts([]); // Limpiar productos apadrinados si es necesario
      return;
    }

    // Si hay productos, procesar normalmente
    const sponsored = response.data.filter(product => product.sponsored);
    setProducts(response.data);
    setSponsoredProducts(sponsored);

  } catch (error) {
    console.error("Error cargando productos:", error);
    setProducts([]); // Asegurar estado limpio en caso de error
    setSponsoredProducts([]);
  }
};

  return (
    <PageContainer>
      <Header />
      <Content>
        <TitleStyled>Todos los productos</TitleStyled>
        <CategoryFilter 
          onCategoryChange={(categoryId, timestamp) => handleCategoryChange(categoryId)}
        />
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <ProductsGrid products={products} />
        )}
      </Content>
      <Footer />
    </PageContainer>
  );
}
