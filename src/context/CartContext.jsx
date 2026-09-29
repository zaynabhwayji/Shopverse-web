"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Load cart from localStorage when the component runs in the browser
    useEffect(() => {
        const saved = localStorage.getItem("cart");

        if (saved) {
            setCart(JSON.parse(saved));
        }

        setLoaded(true);
    }, []);

    // Save cart only after the saved cart has been loaded
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, loaded]);

    // Add product to cart
    function addToCart(product) {
        const existing = cart.find(
            (item) => item._id === product._id
        );

        if (existing) {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    ...product,
                    qty: 1,
                },
            ]);
        }
    }

    // Remove product from cart
    function removeFromCart(productId) {
        setCart(
            cart.filter((item) => item._id !== productId)
        );
    }

    // Clear cart
    function clearCart() {
        setCart([]);
    }

    // Increase quantity
    function increaseQty(productId) {
        setCart(cart.map((item) =>
                item._id === productId
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        );
    }

    // Decrease quantity
    function decreaseQty(productId) {
        setCart(cart.map((item) =>
            item._id === productId
                ? { ...item, qty: item.qty - 1 }
                : item
                )
                .filter((item) => item.qty > 0)
        );
    }

    // Total number of items
    const totalItems = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    // Total price
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQty,
                decreaseQty,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

