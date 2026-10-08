"use client";

import { useEffect, useState, useRef } from "react";
import {
    getUsers,
    createUser,
    getUserOrders,
} from "../../../lib/api";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const ordersRef = useRef(null);

    const { user } = useAuth();
    const router = useRouter();

    const [categories, setCategories] = useState([]);

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

    // Fetch all users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getUsers();

            setUsers(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Create a new user
    const handleCreateUser = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            return;
        }

        try {
            setError("");

            await createUser({
                name: name.trim(),
                email: email.trim(),
            });

            setName("");
            setEmail("");

            fetchUsers();
        } catch (error) {
            setError(error.message);
        }
    };

    // Show orders for selected user
    const handleViewOrders = async (user) => {
        try {
            setError("");

            const result = await getUserOrders(user._id);

            setSelectedUser(user);
            setUserOrders(result);

            // Scroll down to the orders section
            setTimeout(() => {
                ordersRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="mx-auto max-w-5xl">

                {/* Page title */}
                <h1 className="mb-6 text-3xl font-bold text-white">
                    Users
                </h1>

                {/* Error */}
                {error && (
                    <p className="mb-4 text-red-400">
                        {error}
                    </p>
                )}

                {/* Create User */}
                <div className="mb-6 rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        Create User
                    </h2>

                    <form
                        onSubmit={handleCreateUser}
                        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                        />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                        />

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-400 px-5 py-2.5 font-medium text-black transition hover:bg-blue-500"
                        >
                            Add User
                        </button>
                    </form>
                </div>

                {/* Users List */}
                <div className="rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        All Users
                    </h2>

                    {loading ? (
                        <p className="text-gray-400">
                            Loading users...
                        </p>
                    ) : users.length === 0 ? (
                        <p className="text-gray-400">
                            No users found.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center justify-between rounded-xl border border-slate-600 bg-slate-900 p-4"
                                >
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            {user.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleViewOrders(user)
                                        }
                                        className="rounded-lg border border-blue-400 px-3 py-2 text-sm text-blue-400 transition hover:bg-blue-400 hover:text-black"
                                    >
                                        Orders
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* User Orders */}
                {selectedUser && (
                    <div
                        ref={ordersRef}
                        className="mt-6 rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg"
                    >
                        <h2 className="mb-4 text-lg font-semibold text-white">
                            Orders for {selectedUser.name}
                        </h2>

                        {userOrders.length === 0 ? (
                            <p className="text-gray-400">
                                This user has no orders.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {userOrders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="rounded-xl border border-slate-600 bg-slate-900 p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-white">
                                                Order #{order._id}
                                            </p>

                                            <span className="rounded-full border border-blue-400 px-3 py-1 text-sm text-blue-400">
                                                {order.status}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-gray-400">
                                            Total: ${order.total}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Items: {order.items?.length || 0}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </main>
    );
}