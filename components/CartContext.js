import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);

    // Guardar en localStorage cuando cartProducts cambie
    useEffect(() => {
        if (cartProducts.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts, ls]);

    // Leer desde localStorage al montar el componente
    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, [ls]);

    const addProduct = (productId) => {
        setCartProducts((prev) => [...prev, productId]);
    };

    const removeProduct = (productId) => {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((_, index) => index !== pos);
            }
            return prev;
        });
    };

    const clearCart = () => {
        setCartProducts([]);
        if (ls) {
            ls.removeItem('cart'); // Limpiar localStorage
        }
    };

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
