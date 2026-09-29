"use client";

import { useEffect, useState } from "react";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryProducts,
} from "../../../lib/api";


export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setError("");

            const result = await getCategories();

            setCategories(result);
        } catch (error) {
            setError(error.message);
        }
    };

    // Load categories when page opens
    useEffect(() => {
        fetchCategories();
    }, []);

    // Create or update category
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setMessage("");

            const body = {
                name,
                description,
            };

            if (editingId) {
                await updateCategory(editingId, body);
                setMessage("Category updated successfully");
            } else {
                await createCategory(body);
                setMessage("Category created successfully");
            }

            // Reset form
            setName("");
            setDescription("");
            setEditingId(null);

            // Reload categories
            fetchCategories();
        } catch (error) {
            setError(error.message);
        }
    };

    // Start editing
    const handleEdit = (category) => {
        setEditingId(category._id);
        setName(category.name);
        setDescription(category.description || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Delete category
    const handleDelete = async (id) => {
        try {
            setError("");
            setMessage("");

            await deleteCategory(id);

            setMessage("Category deleted successfully");

            fetchCategories();
        } catch (error) {
            setError(error.message);
        }
    };

    // View products inside category
    const handleViewProducts = async (category) => {
        try {
            setError("");

            const result = await getCategoryProducts(category._id);

            setSelectedCategory(category);
            setProducts(result);
        } catch (error) {
            setError(error.message);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setEditingId(null);
        setName("");
        setDescription("");
    };

    return (
        <main className="min-h-screen bg-[#0F172A] p-6 text-white">

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Categories
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Manage product categories
                    </p>
                </div>

                {/* Messages */}
                {error && (
                    <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-400">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-green-400">
                        {message}
                    </p>
                )}

                {/* Create / Update Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mb-8 rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg"
                >
                    <h2 className="mb-5 text-xl font-semibold">
                        {editingId
                            ? "Update Category"
                            : "Create Category"}
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Category name"
                                required
                                className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Description
                            </label>

                            <input
                                type="text"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Category description"
                                className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>

                    <div className="mt-5 flex gap-3">

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-500 px-5 py-2.5 font-medium text-white transition hover:bg-blue-600"
                        >
                            {editingId
                                ? "Update Category"
                                : "Create Category"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="rounded-xl border border-slate-600 px-5 py-2.5 text-gray-300 transition hover:bg-slate-700"
                            >
                                Cancel
                            </button>
                        )}

                    </div>
                </form>

                {/* Categories List */}
                <div className="rounded-2xl border border-slate-700 bg-[#1E293B] shadow-lg">

                    <div className="border-b border-slate-700 p-5">
                        <h2 className="text-xl font-semibold">
                            All Categories
                        </h2>
                    </div>

                    <div className="divide-y divide-slate-700">

                        {categories.length === 0 && (
                            <p className="p-6 text-gray-400">
                                No categories found.
                            </p>
                        )}

                        {categories.map((category) => (
                            <div
                                key={category._id}
                                className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
                            >

                                <div>
                                    <h3 className="font-semibold text-white">
                                        {category.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {category.description || "No description"}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">

                                    <button
                                        onClick={() =>
                                            handleViewProducts(category)
                                        }
                                        className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-gray-300 transition hover:border-blue-500 hover:text-blue-400"
                                    >
                                        View Products
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleEdit(category)
                                        }
                                        className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(category._id)
                                        }
                                        className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Products in selected category */}
                {selectedCategory && (
                    <div className="mt-8 rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg">

                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Products in {selectedCategory.name}
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    {products.length} product(s)
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setProducts([]);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                Close
                            </button>
                        </div>

                        {products.length === 0 ? (
                            <p className="text-gray-400">
                                No products in this category.
                            </p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="rounded-xl border border-slate-700 bg-[#0F172A] p-4"
                                    >
                                        <h3 className="font-semibold">
                                            {product.name}
                                        </h3>

                                        <p className="mt-2 text-blue-400">
                                            ${product.price}
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