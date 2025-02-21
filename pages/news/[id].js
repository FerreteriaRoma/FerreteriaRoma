import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/HeaderI";
import { mongooseConnect } from "@/lib/mongoose";
import { News } from "@/models/News";
import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";
import ImageCarousel from "@/components/NewsImages";

const Title = styled.a`
  font-weight: 700;
  font-size: 2em;
  font-family: "Space Grotesk", sans-serif;
  color: #222;
  text-decoration: none;
  margin: 30px 0 20px;
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

  @media screen and (max-width: 768px) {
    font-size: 1.5rem; // Ajustar tamaño en móviles
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9f9f9; 
`;

const Content = styled.main`
  flex: 1;
  padding: 20px; 
  background: #fff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px; 

  @media screen and (max-width: 768px) {
    padding: 10px; // Menos espacio en móviles
  }
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Columna única por defecto
  gap: 20px; // Espaciado más pequeño en móviles
  margin: 20px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr; // Dos columnas en pantallas más grandes
    gap: 40px;
    margin: 40px 0;
  }
`;

function formatText(text) {
  // Convierte **texto** a <strong>
  const withBold = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Sanitización básica (remover scripts y tags no permitidos)
  const sanitized = withBold
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/<\/?(?!strong)[^>]+>/g, '');
  
  return sanitized;
}

const NewsDescription = styled.div`
  font-family: "Indie Flower", cursive;
  font-size: 1.2rem;
  white-space: pre-line;
  line-height: 1.5;
  margin: 1rem 0;

  strong {
    font-weight: bold;
    color: #333;
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function NewPage({ news }) {
  const [mobileNavActive, setMobileNavActive] = useState(false); 
  
  return (
    <MainContainer>
      <Header mobileNavActive={mobileNavActive} onMobileNavToggle={() => setMobileNavActive(!mobileNavActive)} />
      {!mobileNavActive && (
        <Content>
          <Center>
            <ColWrapper>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <ImageCarousel images={news.images} />
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Title>{news.title}</Title>
                <NewsDescription 
                  dangerouslySetInnerHTML={{ __html: formatText(news.description) }} 
                />
              </motion.div>
            </ColWrapper>
          </Center>
        </Content>
      )}
      <Footer />
    </MainContainer>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const { id } = context.query;
  const product = await News.findById(id);

  return {
    props: {
      news: JSON.parse(JSON.stringify(product)),
    }
  };
}
