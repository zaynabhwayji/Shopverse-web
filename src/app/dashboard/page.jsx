"use client";

import Link from "next/link";

export default function AdminDashboard() {
    return (
        <main className="min-h-screen bg-[#0F172A] p-6 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Manage your Shopverse store
                    </p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    <Link
                        href="/dashboard/categories"
                        className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500"
                    >
                        <h2 className="text-xl font-semibold">
                            Categories
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Create, update and delete categories
                        </p>
                    </Link>

                    <Link
                        href="/dashboard/tags"
                        className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500"
                    >
                        <h2 className="text-xl font-semibold">
                            Tags
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Manage product tags
                        </p>
                    </Link>

                    <Link
                        href="/dashboard/users"
                        className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500"
                    >
                        <h2 className="text-xl font-semibold">
                            Users
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Create and manage users
                        </p>
                    </Link>

                    <Link
                        href="/dashboard/products"
                        className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500"
                    >
                        <h2 className="text-xl font-semibold">
                            Products
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Manage products and filters
                        </p>
                    </Link>

                    <Link
                        href="/dashboard/orders"
                        className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500"
                    >
                        <h2 className="text-xl font-semibold">
                            Orders
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Manage customer orders
                        </p>
                    </Link>

                </div>
            </div>
        </main>
    );
}