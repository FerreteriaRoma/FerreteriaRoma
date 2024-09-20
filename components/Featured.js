import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    margin-top: 20px;
    background: #333132;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;

    @media screen and (min-width: 768px) {
        font-size: 3rem;
    }
`;

const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
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
        object-fit: cover; /* Asegura que la imagen se ajuste adecuadamente */
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
`;

const ButtonsWrapper = styled.div`
    margin-top: 25px;
    display: flex;
    gap: 10px;
`;

export default function Featured({ product }) {
    const { addProduct } = useContext(CartContext);

    function addFeaturedToCart() {
        addProduct(product._id);
    }

    return (
        <Bg>
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
                        {/* Usa la URL de imagen del producto */}
                        <img src={product.images[0]} alt={`Imagen de ${product.title}`} />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}
