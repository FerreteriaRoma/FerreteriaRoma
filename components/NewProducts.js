import styled from "styled-components";
import Center from "./Center";
import ProductsGridAnimated from "./ProductsGridAnimated";

const Title = styled.h2`
  font-weight: 700;
  font-family: "Indie Flower", cursive;
  font-size: 2rem;
  color: #222;
  text-decoration: none;
  margin: 30px 0 20px;
  margin-top: 20px;
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
`;

export default function NewProducts({ products, mobileNavActive }) {
  return (
    <Center>
      <Title>Recién llegados</Title>
      <ProductsGridAnimated products={products} mobileNavActive={mobileNavActive} />
    </Center>
  );
}
