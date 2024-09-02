import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";



export default function ProductsPage({ products }) {
    return (
        <>
            <Header />
            <Center>
                <Title>Todos los productos</Title>
                <ProductsGrid products={products}/>
            </Center>
            <Footer />
        </>
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
