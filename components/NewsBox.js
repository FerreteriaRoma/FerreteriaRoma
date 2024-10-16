import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { motion } from "framer-motion";

const WhiteBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 20px;
  width: 200px;
  height: 200px;
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

  @media screen and (max-width: 897px) {
    height: 180px;
    max-width: 200px;
  }

  @media screen and (max-width: 768px) {
    height: 180px;
    max-width: 200px;
  }

  @media screen and (max-width: 510px) {
    height: 150px;
    max-width: 130px;
  }

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
    max-height: 150px;
    border-radius: 12px;
    transition: transform 0.3s ease;

    @media screen and (max-width: 768px) {
      max-height: 120px; // Ajustar para pantallas más pequeñas
    }

    @media screen and (max-width: 510px) {
      max-height: 100px;
    }
  }

  &:hover img {
    transform: scale(1.1) rotate(3deg);
  }
`;

const ProductWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 260px;
  margin: auto;
  height: 100%;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s forwards ease-in-out 0.1s;

  @media screen and (max-width: 510px) {
    max-width: 150px;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.a`
  font-weight: 600;
  font-family: "Caveat", cursive;
  font-size: 1.8rem;
  color: #222;
  text-decoration: none;
  margin: 0;
  margin-top: 30px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease, transform 0.3s ease;

  @media screen and (max-width: 510px) {
    margin-top: 5px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 15px;
  flex: 1;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
  gap: 10px;
`;

const Entrance = styled.a`
  font-size: 0.9rem;
  font-family: "Indie Flower", cursive;
  font-weight: 400;
  color: #444;
  text-decoration: none;
`;

export default function NewsBox({ _id, title, entrance, images }) {
  const url = '/news/' + _id;

  return (
    <ProductWrapper
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={url} passHref>
        <WhiteBox
          whileHover={{ scale: 1.05 }}
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
        <Entrance href={url}>
          {entrance}
        </Entrance>
        <PriceRow>
        <Button block $primary $outline onClick={() => window.location.href = url}>
            Ver más
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
