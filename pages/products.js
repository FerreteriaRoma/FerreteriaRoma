import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/HeaderI";
import Footer from "@/components/Footer";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

// Estilos para el contenedor de la página
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

// Contenido principal que será ocultado cuando el mobileNavActive esté activo
const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px; /* Reduce el padding en pantallas más pequeñas */
  }
`;

const TitleStyled = styled(Title)`
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  font-size: 2rem;
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

export default function ProductsPage({ products }) {
  const [mobileNavActive, setMobileNavActive] = useState(false); 

  const handleMobileNavToggle = () => {
    setMobileNavActive((prev) => !prev);
  };

  return (
    <PageWrapper>
      <Header
        mobileNavActive={mobileNavActive}
        onMobileNavToggle={handleMobileNavToggle}
      />
      
      {/* Solo mostrar contenido cuando mobileNavActive no esté activo */}
      {!mobileNavActive && (
        <>
          <ContentWrapper>
            <TitleStyled>Todos los productos</TitleStyled>
            <ProductsGrid products={products} mobileNavActive={mobileNavActive} />
          </ContentWrapper>
          <Footer />
        </>
      )}
    </PageWrapper>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find().sort({ "_id": -1 });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
