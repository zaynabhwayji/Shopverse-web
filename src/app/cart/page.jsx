"use client";

import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { createOrder } from "../../lib/api";

export default function CartPage() {
    const { cart, totalPrice, clearCart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [order, setOrder] = useState(null);

   const userId = process.env.NEXT_PUBLIC_USER_ID;

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            setError("");

            // Only send product ID and quantity
            const items = cart.map((item) => ({
                product: item._id,
                qty: item.qty,
            }));

            // Do NOT send total
            const result = await createOrder({
                user: userId,
                items,
            });

            // Server calculates the real total
            setOrder(result);

            // Clear cart after successful order
            clearCart();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !order) {
        return (
            <main className="min-h-screen bg-slate-900 p-6">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold text-white">
                        Your cart
                    </h1>

                    <p className="mt-6 text-gray-400">
                        Your cart is empty.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-900 p-6">

            <div className="mx-auto max-w-4xl">

                <h1 className="text-3xl font-bold text-white">
                    Your cart
                </h1>

                {/* Cart */}
                {cart.length > 0 && (
                    <div className="mt-6 space-y-4">

                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-4"
                            >
                                <div>
                                    <h2 className="font-semibold text-white">
                                        {item.name}
                                    </h2>

                                    <div className="mt-2 flex items-center gap-3">

                                        <button
                                            onClick={() => decreaseQty(item._id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-lg text-white hover:bg-slate-600"
                                        >
                                            -
                                        </button>

                                        <span className="text-sm font-medium text-gray-300">
                                            {item.qty}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item._id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-lg text-white hover:bg-slate-600"
                                        >
                                            +
                                        </button>

                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="mt-2 text-sm text-red-400 hover:text-red-300"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <p className="font-semibold text-blue-400">
                                    ${item.price * item.qty}
                                </p>
                            </div>
                        ))}

                    </div>
                )}

                {/* Preview Total */}
                {cart.length > 0 && (
                    <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-5">

                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">
                                Total (preview)
                            </span>

                            <span className="text-2xl font-bold text-blue-400">
                                ${totalPrice}
                            </span>
                        </div>
                        <button
                            onClick={clearCart}
                            className="mt-4 w-full rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 font-medium text-red-400 transition hover:bg-red-500/20"
                        >
                            Clear Cart
                        </button>

                        {error && (
                            <p className="mt-4 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="mt-5 w-full rounded-xl bg-blue-400 px-5 py-3 font-medium text-black transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Placing order..."
                                : "Place order"}
                        </button>

                    </div>
                )}

                {/* Server-confirmed Order */}
                {order && (
                    <div className="mt-6 rounded-xl border border-green-500/40 bg-slate-800 p-5">

                        <h2 className="text-xl font-bold text-white">
                            Order placed successfully
                        </h2>

                        <p className="mt-3 text-gray-300">
                            Total (server-checked)
                        </p>

                        <p className="mt-1 text-2xl font-bold text-green-400">
                            ${order.total}
                        </p>

                    </div>
                )}

            </div>

        </main>
    );
}
