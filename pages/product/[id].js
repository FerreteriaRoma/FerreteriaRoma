import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CartIcon from "@/components/icons/Cart";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Función para formatear el precio en pesos colombianos
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(amount);
};

// Contenedor principal que asegura que el footer esté en el fondo
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f9f9f9; // Fondo gris claro para dar contraste
`;

const Content = styled.main`
    flex: 1;
    padding: 20px; // Espacio alrededor del contenido
    background: #fff; // Fondo blanco para el contenido
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra sutil para resaltar el contenido
    border-radius: 8px; // Bordes redondeados
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 0.8fr 1.2fr;
    }
    gap: 40px;
    margin: 40px 0;
`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const Price = styled.span`
    font-size: 1.4rem;
    font-weight: bold; // Hacer el precio más destacado
    color: #333; // Color oscuro para mejor contraste
`;

// Variantes para animaciones
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 }
};

export default function ProductPage({ product }) {
    const { addProduct } = useContext(CartContext);

    return (
        <MainContainer>
            <Header />
            <Content>
                <Center>
                    <ColWrapper>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <WhiteBox>
                                <ProductImages images={product.images} />
                            </WhiteBox>
                        </motion.div>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Title>{product.title}</Title>
                            <p>{product.description}</p>
                            <PriceRow>
                                <div>
                                    <Price>
                                        {formatCurrency(product.price)}
                                    </Price>
                                </div>
                                <div>
                                    <motion.div
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Button $primary onClick={() => addProduct(product._id)}>
                                            <CartIcon /> Añadir al carrito
                                        </Button>
                                    </motion.div>
                                </div>
                            </PriceRow>
                        </motion.div>
                    </ColWrapper>
                </Center>
            </Content>
            <Footer />
        </MainContainer>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    
    const { id } = context.query;
    const product = await Product.findById(id);

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    };
}
