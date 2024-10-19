import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  margin-top: 20px;
  background: linear-gradient(135deg, #4a4a4a, #2c2c2c);
  color: #fff;
  padding: 50px 0;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  z-index: 1; /* Establecer z-index para asegurarse de que los círculos queden debajo */
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: floating 8s ease-in-out infinite;
  z-index: 0; /* Asegura que los círculos queden detrás del contenido */
`;

const Circle1 = styled(FloatingShape)`
  width: 200px;
  height: 200px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
`;

const Circle2 = styled(FloatingShape)`
  width: 250px;
  height: 250px;
  bottom: 10%;
  right: 15%;
  animation-delay: 3s;
`;

const Circle3 = styled(FloatingShape)`
  width: 150px;
  height: 150px;
  top: 50%;
  left: 60%;
  animation-delay: 1.5s;
`;

const Circle4 = styled(FloatingShape)`
  width: 120px;
  height: 120px;
  bottom: 30%;
  right: 5%;
  animation-delay: 2.5s;
`;

const Circle5 = styled(FloatingShape)`
  width: 180px;
  height: 180px;
  top: 40%;
  left: -10%;
  animation-delay: 4s;
`;

const Circle6 = styled(FloatingShape)`
  width: 200px;
  height: 200px;
  top: 10%;
  right: 40%;
  animation-delay: 5s;
`;

const Rect1 = styled(FloatingShape)`
  width: 180px;
  height: 80px;
  top: 60%;
  left: 20%;
  border-radius: 20px;
  animation-delay: 4s;
`;

const Rect2 = styled(FloatingShape)`
  width: 150px;
  height: 60px;
  bottom: 15%;
  right: 40%;
  border-radius: 15px;
  animation-delay: 2s;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-family: "Indie Flower", cursive;
  font-size: 1.7rem;
  z-index: 1; /* Asegurarse de que el texto esté por encima de los círculos */

  @media screen and (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Desc = styled.p`
  color: #f0f0f0;
  font-family: "Caveat", cursive;
  font-size: 1.1rem;
  z-index: 1; /* Asegurarse de que la descripción esté por encima */
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  img {
    max-width: 100%;
    max-height: 250px;
    display: block;
    margin: 0 auto;
    object-fit: cover;
    z-index: 1; /* Asegurarse de que la imagen esté por encima de los círculos */
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  z-index: 1; /* Asegurarse de que las columnas estén por encima */
`;

const ButtonsWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 10px;
  z-index: 1; /* Asegurarse de que los botones estén por encima */
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      {/* Círculos y rectángulos decorativos */}
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Circle4 />
      <Circle5 />
      <Circle6 />
      <Rect1 />
      <Rect2 />

      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={`/product/${product._id}`} outline={1} $gray={1} $size="l">
                  Ver más
                </ButtonLink>
                <Button $primary={1} $size="l" onClick={addFeaturedToCart}>
                  <CartIcon />
                  Añadir al carrito
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt={`Imagen de ${product.title}`} />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
