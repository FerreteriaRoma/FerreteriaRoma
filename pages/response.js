import { useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styled, { keyframes } from "styled-components";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f7f7f7;
    position: relative;
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

/* Animación ajustada para que las imágenes suban y se mantengan visibles */
const floatUp = keyframes`
  0% {
    transform: translateY(100%); /* Empieza desde abajo */
    opacity: 0;
  }
  20% {
    opacity: 1; /* Aparece más lentamente */
  }
  100% {
    transform: translateY(-2000%); /* Aumentar la distancia de desplazamiento */
    opacity: 0; /* Desaparece al final */
  }
`;

const AnimatedImage = styled.img`
    position: fixed;
    bottom: -10px; /* Asegúrate de que comience un poco más abajo */
    left: ${(props) => props.left || "50%"};
    width: 100px;
    height: 60px;
    opacity: 0;
    animation: ${floatUp} 8s ease-in-out; /* Se puede ajustar la duración total aquí */
    animation-delay: ${(props) => props.delay || "0s"};
    animation-iteration-count: 1; /* Solo se ejecuta una vez */
`;

export default function Response() {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
    }, []);

    // Generar múltiples imágenes con posiciones aleatorias y tiempos de delay
    const images = Array.from({ length: 10 }).map((_, index) => {
        const randomLeft = Math.floor(Math.random() * 100); // Posición aleatoria entre 0 y 100%
        const randomDelay = Math.random() * 4; // Delay aleatorio entre 0 y 4 segundos

        return {
            src: "/img/LogoSinFondo.png",
            alt: `Icono ${index + 1}`,
            left: `${randomLeft}%`,
            delay: `${randomDelay}s`,
        };
    });

    return (
        <PageWrapper>
            <Header />
            <ContentWrapper>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <Heading>Gracias por su compra</Heading>
                            <Paragraph>
                                Envíe a nuestro WhatsApp +57 123 456 789 el comprobante de pago que fue 
                                enviado al correo electrónico registrado
                                en el formulario, por ese medio se le notificará el estado de su compra.
                            </Paragraph>
                            <Heading>Deberá verse de la siguiente manera</Heading>
                            <InvoiceImage src="/img/EjFactura.png" alt="Ejemplo de Factura" />
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </ContentWrapper>
            <Footer />
            
            {/* Generar las imágenes dinámicamente */}
            {images.map((img, index) => (
                <AnimatedImage 
                    key={index} 
                    src={img.src} 
                    alt={img.alt} 
                    left={img.left} 
                    delay={img.delay} 
                />
            ))}
        </PageWrapper>
    );
}
