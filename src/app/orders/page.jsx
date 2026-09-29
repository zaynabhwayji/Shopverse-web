"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders } from "../../lib/api";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getOrders();

            setOrders(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-900 p-4 sm:p-6">
                <div className="mx-auto max-w-5xl">
                    <p className="text-gray-300">
                        Loading orders...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-900 p-4 sm:p-6">
                <div className="mx-auto max-w-5xl">
                    <p className="text-red-400">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-900 p-4 sm:p-6">

            <div className="mx-auto w-full max-w-5xl">

                {/* Page Title */}
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Your Orders
                </h1>

                {/* Empty Orders */}
                {orders.length === 0 && (
                    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6">
                        <p className="text-gray-400">
                            You have no orders yet.
                        </p>
                    </div>
                )}

                {/* Orders */}
                <div className="mt-6 space-y-4">

                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-5"
                        >

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                {/* Order Info */}
                                <div>

                                    <p className="text-sm text-gray-400">
                                        Order ID
                                    </p>

                                    <p className="mt-1 break-all font-medium text-white">
                                        {order._id}
                                    </p>

                                    <p className="mt-3 text-sm text-gray-400">
                                        Items: {order.items?.length || 0}
                                    </p>

                                </div>

                                {/* Status + Total */}
                                <div className="sm:text-right">

                                    <span
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                            order.status === "pending"
                                                ? "bg-yellow-400/10 text-yellow-400"
                                                : order.status === "paid"
                                                ? "bg-blue-400/10 text-blue-400"
                                                : "bg-green-400/10 text-green-400"
                                        }`}
                                    >
                                        {order.status}
                                    </span>

                                    <p className="mt-2 text-xl font-bold text-blue-400">
                                        ${order.total}
                                    </p>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </main>
    );
}
