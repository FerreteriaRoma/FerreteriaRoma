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
    background-color: #f7f7f7;
`;

const ContentWrapper = styled.div`
    flex: 1;
    padding: 20px;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin: 40px auto;
    max-width: 800px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Box = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Heading = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333;
`;

const Paragraph = styled.p`
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 20px;
`;

const InvoiceImage = styled.img`
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default function Response() {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <PageWrapper>
            <Header />
            <ContentWrapper>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <Heading>Gracias por su compra</Heading>
                            <Paragraph>
                                No lo olvide! Envíe su comprobante de pago enviado al correo electrónico registrado 
                                a nuestro WhatsApp +57 123 456 789. Medio por el cual se le notificará el estado 
                                de su pedido.
                            </Paragraph>
                            <Heading>Deberá verse de la siguiente manera</Heading>
                            <InvoiceImage src="/img/EjFactura.png" alt="Ejemplo de Factura" />
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
}
