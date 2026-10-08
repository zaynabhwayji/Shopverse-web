"use client";

import { useEffect, useState } from "react";
import {
    getOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder,
} from "../../../lib/api";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function OrdersPage() {
    
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (user.role !== "admin") {
            router.push("/products");
        }
    }, [user, router]);

    if (!user || user.role !== "admin") {
        return null;
    }

    // Fetch all orders
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

    // Show one fully populated order
    const handleViewOrder = async (id) => {
        try {
            setError("");

            const result = await getOrder(id);

            setSelectedOrder(result);
        } catch (error) {
            setError(error.message);
        }
    };

    // Update order status
    const handleStatusChange = async (id, status) => {
        try {
            setError("");

            await updateOrderStatus(id, status);

            await fetchOrders();

            if (selectedOrder?._id === id) {
                const updatedOrder = await getOrder(id);
                setSelectedOrder(updatedOrder);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete order
    const handleDeleteOrder = async (id) => {
        try {
            setError("");

            await deleteOrder(id);

            if (selectedOrder?._id === id) {
                setSelectedOrder(null);
            }

            await fetchOrders();
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="mx-auto max-w-6xl">

                {/* Page title */}
                <h1 className="mb-6 text-3xl font-bold text-white">
                    Orders
                </h1>

                {/* Error */}
                {error && (
                    <p className="mb-4 text-red-400">
                        {error}
                    </p>
                )}

                {/* Orders List */}
                <div className="rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        All Orders
                    </h2>

                    {loading ? (
                        <p className="text-gray-400">
                            Loading orders...
                        </p>
                    ) : orders.length === 0 ? (
                        <p className="text-gray-400">
                            No orders found.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="rounded-xl border border-slate-600 bg-slate-900 p-4"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        {/* Order info */}
                                        <div>
                                            <p className="font-semibold text-white">
                                                Order #{order._id}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-400">
                                                User:{" "}
                                                {order.user?.name ||
                                                    "Unknown user"}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-400">
                                                Total: ${order.total}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-2">

                                            <button
                                                onClick={() =>
                                                    handleViewOrder(order._id)
                                                }
                                                className="rounded-lg border border-blue-400 px-3 py-2 text-sm text-blue-400 transition hover:bg-blue-400 hover:text-black"
                                            >
                                                View
                                            </button>

                                            {order.status === "pending" && (
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            order._id,
                                                            "paid"
                                                        )
                                                    }
                                                    className="rounded-lg border border-green-400 px-3 py-2 text-sm text-green-400 transition hover:bg-green-400 hover:text-black"
                                                >
                                                    Mark Paid
                                                </button>
                                            )}

                                            {order.status === "paid" && (
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            order._id,
                                                            "shipped"
                                                        )
                                                    }
                                                    className="rounded-lg border border-yellow-400 px-3 py-2 text-sm text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                                                >
                                                    Mark Shipped
                                                </button>
                                            )}

                                            <button
                                                onClick={() =>
                                                    handleDeleteOrder(
                                                        order._id
                                                    )
                                                }
                                                className="rounded-lg border border-red-400 px-3 py-2 text-sm text-red-400 transition hover:bg-red-400 hover:text-black"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="mt-3">
                                        <span className="rounded-full border border-slate-500 px-3 py-1 text-sm text-gray-300">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selected Order */}
                {selectedOrder && (
                    <div className="mt-6 rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">

                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">
                                Order Details
                            </h2>

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                Close
                            </button>
                        </div>

                        {/* User */}
                        <div className="mt-5">
                            <p className="text-sm text-gray-400">
                                Customer
                            </p>

                            <p className="mt-1 font-medium text-white">
                                {selectedOrder.user?.name}
                            </p>

                            <p className="text-sm text-gray-400">
                                {selectedOrder.user?.email}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="mt-5">
                            <p className="text-sm text-gray-400">
                                Status
                            </p>

                            <span className="mt-2 inline-block rounded-full border border-blue-400 px-3 py-1 text-sm text-blue-400">
                                {selectedOrder.status}
                            </span>
                        </div>

                        {/* Items */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-white">
                                Items
                            </h3>

                            <div className="mt-3 space-y-3">
                                {selectedOrder.items?.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between rounded-xl border border-slate-600 bg-slate-900 p-4"
                                    >
                                        <div>
                                            <p className="font-medium text-white">
                                                {item.product?.name}
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                Quantity: {item.qty}
                                            </p>
                                        </div>

                                        <p className="text-blue-400">
                                            $
                                            {item.product?.price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="mt-6 flex justify-between border-t border-slate-700 pt-4">
                            <span className="font-semibold text-white">
                                Total
                            </span>

                            <span className="text-xl font-bold text-blue-400">
                                ${selectedOrder.total}
                            </span>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}