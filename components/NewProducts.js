import styled from "styled-components";
import Center from "./Center";
import ProductsGridAnimated from "./ProductsGridAnimated";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 400;
`;

export default function NewProducts({ products, mobileNavActive }) {
  return (
    <Center>
      <Title>Recién llegados</Title>
      <ProductsGridAnimated products={products} mobileNavActive={mobileNavActive} />
    </Center>
  );
}
