import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";

const ProductWrapper = styled(motion.div)`
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
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 20px;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;

  &:hover {
    background-color: #fafafa;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
    border: 2px solid rgba(255, 0, 150, 0.5);
  }

  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 0, 150, 0.2), rgba(0, 204, 255, 0.2));
    opacity: 0.3;
    transition: opacity 0.3s ease;
  }

  img {
    max-width: 100%;
    max-height: 130px;
    border-radius: 12px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1) rotate(3deg);
  }
`;


const Title = styled.a`
  font-weight: normal;
  font-family: "Indie Flower", cursive;
  font-size: 1.1rem;
  color: #333;
  text-decoration: none;
  margin: 0;
  margin-top: 30px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductInfoBox = styled.div`
  margin-top: 20px;
  flex: 1;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
  gap: 10px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-family: "Caveat", cursive;
  font-weight: 500;
  text-align: right;

  @media screen and (min-width: 786px) {
    font-size: 1.3rem;
    font-weight: 500;
    text-align: right;
  }
`;

export default function ProductBox({ _id, title, price, images, mobileNavActive }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);

  // Retornar null si mobileNavActive es true
  if (mobileNavActive) {
    return null;
  }

  return (
    <ProductWrapper
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
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
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{formattedPrice}</Price>
          <Button 
            block 
            onClick={() => addProduct(_id)} 
            $primary 
            $outline
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Añadir al carrito
          </Button>
        </PriceRow>     
      </ProductInfoBox>
    </ProductWrapper>
  );
}
