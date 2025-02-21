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

const Emptystate = styled.p`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
  border: 2px dashed #eee;
  margin: 2rem;
  border-radius: 8px;
`;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (category = '') => {
    setLoading(true);
    try {
      const url = category ? `/api/products?category=${category}` : '/api/products';
      const response = await axios.get(url);
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (categoryId) => {
    fetchProducts(categoryId);
  };

  return (
    <PageContainer>
      <Header />
      <Content>
        <TitleStyled>Todos los productos</TitleStyled>
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <>
            {products.length > 0 ? (
              <ProductsGrid products={products} />
            ) : (
              <Emptystate>
                No se encontraron productos en esta categoría
              </Emptystate>
            )}
          </>
        )}
      </Content>
      <Footer />
    </PageContainer>
  );
}
