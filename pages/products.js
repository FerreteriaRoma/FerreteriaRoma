import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
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
    display: ${({ mobileNavActive }) => (mobileNavActive ? "none" : "block")}; /* Oculta el contenido cuando mobileNav está activo */
`;

export default function ProductsPage({ products, mobileNavActive, onMobileNavToggle }) {
    return (
        <PageWrapper>
            <Header mobileNavActive={mobileNavActive} onMobileNavToggle={onMobileNavToggle} />
            <ContentWrapper mobileNavActive={mobileNavActive}>
                <Center>
                    <Title>Todos los productos</Title>
                    <ProductsGrid products={products} />
                </Center>
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();

    const products = await Product.find().sort({ '_id': -1 });

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}
