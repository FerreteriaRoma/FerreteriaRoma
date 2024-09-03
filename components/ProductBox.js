import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 220px;
  margin: auto;
  height: 100%;

  @media screen and (max-width: 510px) {
    max-width: 150px; 
    
  }
`;

const WhiteBox = styled(motion.div)`
  background-color: #fff;
  padding: 15px;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  img {
    max-width: 100%;
    max-height: 120px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Title = styled.a`
  font-weight: normal;
  font-size: 0.9rem;
  color: #333;
  text-decoration: none;
  margin: 0;
  margin-top: 10px;
  display: block; /* Asegura que el título se comporta como un bloque */
  overflow: hidden; /* Oculta el texto que se desborda */
  text-overflow: ellipsis; /* Muestra "..." si el texto se desborda */
  white-space: nowrap; /* Impide que el texto se rompa en varias líneas */
`;

const ProductInfoBox = styled.div`
  margin-top: 20px;
  flex: 1;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 786px) {
    display: block;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px; /* Agrega espacio debajo del botón */
  gap: 10px;
`;

const Price = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  text-align: right;
  @media screen and (min-width: 786px) {
    font-size: 1rem;
    font-weight: 500;
    text-align: right;
  }
`;

export default function ProductBox({ _id, title, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);

  return (
    <ProductWrapper>
      <Link href={url} passHref>
        <WhiteBox
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <img src={images[0]} alt={title} />
          </div>
        </WhiteBox>
      </Link>
      <ProductInfoBox>
        <Title href={url}>
          {title}
        </Title>
        <PriceRow>
          <Price>
            {formattedPrice}
          </Price>
          <Button block onClick={() => addProduct(_id)} $primary $outline>
            Añadir al carrito
          </Button>
        </PriceRow>     
      </ProductInfoBox>
    </ProductWrapper>
  );
}
