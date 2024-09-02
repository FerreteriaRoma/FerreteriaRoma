import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProductBox from "./ProductBox";

// Estilo del contenedor que permite el desplazamiento horizontal
const Container = styled.div`
  display: flex;
  overflow: hidden; /* Oculta los productos que se salen del contenedor */
  width: 100%; /* Asegúrate de que el contenedor ocupe todo el ancho disponible */
  position: relative; /* Necesario para la animación */
`;

const StyleProductGrid = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  white-space: nowrap; /* Evita que los productos se rompan en la línea */
`;

const animation = {
  initial: { x: '0%' },
  animate: { x: '-50%' }, // Ajusta para que el desplazamiento se vea continuo
  transition: {
    duration: 30, /* Ajusta la duración según la velocidad deseada */
    repeat: Infinity,
    ease: 'linear'
  }
};

export default function ProductsGridAnimated({ products }) {
  // Duplica los productos para un efecto continuo
  const duplicatedProducts = [...products, ...products];

  return (
    <Container>
      <StyleProductGrid
        initial={animation.initial}
        animate={animation.animate}
        transition={animation.transition}
      >
        {duplicatedProducts.length > 0 &&
          duplicatedProducts.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </StyleProductGrid>
    </Container>
  );
}
