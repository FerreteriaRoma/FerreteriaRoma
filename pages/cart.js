import React, { useContext, useEffect, useState } from 'react';
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import Footer from '@/components/Footer';

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
        grid-template-columns: 1.3fr .7fr;
    }
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 70px;
    height: 100px;
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    img {
        max-width: 60px;
        max-height: 60px;
    }

    @media screen and (min-width: 768px) {
        width: 100px;
        height: 100px;
        padding: 10px

        img {
            max-width: 80px;
            max-height: 80px;
        }
    }
`;

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: block;

    @media screen and (min-width: 768px) {
        display: inline-block;
        padding: 0 10px;
    }
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

// Función para formatear el precio en pesos colombianos COP
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(amount);
};

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [totalPay, setTotalPay] = useState("0");
    const [loading, setLoading] = useState(false); // Estado para manejar el cargando
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensaje de éxito
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensaje de error
    const [showPaymentButton, setShowPaymentButton] = useState(false); // Estado para mostrar el botón de pagos

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching cart products:', error);
                });
        }
    }, [cartProducts]);

    useEffect(() => {
        if (products.length > 0) {
            let total = 0;
            cartProducts.forEach(productId => {
                const product = products.find(p => p._id === productId);
                if (product) {
                    total += product.price;
                }
            });
            setTotalPay(total.toString());
        }
    }, [products, cartProducts]);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    city,
                    streetAddress,
                    products: cartProducts.join(','),
                })
            });
    
            const result = await response.json();
            console.log('Resultado de la respuesta:', result);
    
            if (response.ok) {
                const productDescriptions = products.map(product => {
                    const quantity = cartProducts.filter(id => id === product._id).length;
                    const totalPrice = quantity * product.price;
                    return `${product.title} x${quantity} - ${formatCurrency(totalPrice)}`;
                }).join(',');
                
    
                Swal.fire({
                    title: 'Orden generada con éxito, puede realizar el pago',
                    icon: 'info',
                    html: `<div id="epayco-button-container"></div>`,
                    confirmButtonColor: 'white',
                    confirmButtonText: '',
                    didOpen: () => {
                        const script = document.createElement('script');
                        script.src = process.env.NEXT_PUBLIC_EPAYCO_CHECHOUT_URL;
                        script.setAttribute('data-epayco-key', process.env.NEXT_PUBLIC_EPAYCO_KEY);
                        script.setAttribute('data-epayco-private-key', process.env.NEXT_PUBLIC_PRIVATE_KEY);
                        script.setAttribute('class', 'epayco-button');
                        script.setAttribute('data-epayco-outoclick', 'true');
                        script.setAttribute('data-epayco-amount', totalPay);
                        script.setAttribute('data-epayco-tax', '0.00');
                        script.setAttribute('data-epayco-tax-ico', '0.00');
                        script.setAttribute('tax_base', totalPay);
                        script.setAttribute('data-epayco-name', 'Ferreteria Roma');
                        script.setAttribute('data-epayco-description', productDescriptions);
                        script.setAttribute('data-epayco-currency', 'COP');
                        script.setAttribute('data-epayco-country', 'CO');
                        script.setAttribute('data-epayco-test', 'true');
                        script.setAttribute('data-epayco-external', 'false');
                        script.setAttribute('data-epayco-ref-payco', result.ref_payco);
                        script.setAttribute('data-epayco-response', 'http://localhost:3000/response');
                        script.setAttribute('data-epayco-confirmation', 'http://localhost:3000/api/confirmation');
                        script.setAttribute('data-epayco-methodconfirmation', 'post');
                        script.setAttribute('data-epayco-type-doc-billing', 'CC');
                        script.setAttribute('data-epayco-number-doc-billing', '123456789');
                        script.setAttribute('data-epayco-name-billing', name);
                        script.setAttribute('data-epayco-address-billing', streetAddress);
                        script.setAttribute('data-epayco-mobilephone-billing', phone);
                        script.setAttribute('data-epayco-email-billing', email);
    
                        document.getElementById('epayco-button-container').appendChild(script);
                    }
                });
    
            } else {
                Swal.fire({
                    title: 'Algo salió mal',
                    text: 'Intente nuevamente',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error enviando el formulario:', error);
            Swal.fire({
                title: 'Error enviando el formulario',
                text: 'Intente nuevamente',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
        setName('');
        setEmail('');
        setPhone('');
        setCity('');
        setStreetAddress('');
        setTotalPay("0");
        setProducts([]);
        clearCart();
    }

    return (
        <PageWrapper>
            <Header />
            <ContentWrapper>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h2>Carrito</h2>
                            {!cartProducts.length ? (
                                <div>Tu carrito está vacio</div>
                            ) : (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Productos</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product._id}>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt={product.title} />
                                                    </ProductImageBox>
                                                    {product.title}
                                                </ProductInfoCell>
                                                <td>
                                                    <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                    <QuantityLabel>{cartProducts.filter(id => id === product._id).length}</QuantityLabel>
                                                    <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                                </td>
                                                <td>{formatCurrency(product.price)}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td>Total:</td>
                                            <td>{formatCurrency(cartProducts.reduce((total, productId) => {
                                                const product = products.find(p => p._id === productId);
                                                return product ? total + product.price : total;
                                            }, 0))}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )}
                        </Box>
                        {!!cartProducts.length && (
                            <Box>
                                <h2>Información de la orden</h2>
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        type="text"
                                        placeholder="Nombre"
                                        value={name}
                                        name="name"
                                        onChange={ev => setName(ev.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        name="email"
                                        onChange={ev => setEmail(ev.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Teléfono"
                                        value={phone}
                                        name="phone"
                                        onChange={ev => setPhone(ev.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Ciudad"
                                        value={city}
                                        name="city"
                                        onChange={ev => setCity(ev.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Dirección"
                                        value={streetAddress}
                                        name="streetAddress"
                                        onChange={ev => setStreetAddress(ev.target.value)}
                                    />
                                    <Button type="submit" block={1} $primary>
                                        {loading ? "Cargando..." : "Continuar con el pago"}
                                    </Button>
                                </form>
                            </Box>
                        )}
                    </ColumnsWrapper>
                </Center>
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
}
