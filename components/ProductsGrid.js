import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyleProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr ; /* 3 columnas en pantallas medianas y grandes */
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* 4 columnas en pantallas medianas y grandes */
  }
`;

export default function ProductsGrid({ products, mobileNavActive }) {
  return (
    <StyleProductGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} mobileNavActive={mobileNavActive} />
        ))}
    </StyleProductGrid>
  );
}

