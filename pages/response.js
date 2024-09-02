import { useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styled from "styled-components";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentWrapper = styled.div`
    flex: 1;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.3fr;
    }
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

export default function Response() {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <PageWrapper>
            <Header />
            <ContentWrapper>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h2>Gracias por su compra</h2>
                            <p>No lo olvide! Envie su comprobante de pago a nuestro WhatsApp +57 123 456 789, medio por el cual se le notificara el estado de su pedido</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    )
}
