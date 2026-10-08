"use client";

import { useEffect, useState } from "react";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getTags,
} from "../../../lib/api";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    // Product form
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [inStock, setInStock] = useState(true);

    // Edit
    const [editingId, setEditingId] = useState(null);

    // Filters
    const [filterCategory, setFilterCategory] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const [filterInStock, setFilterInStock] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

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

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            if (filterCategory) {
                params.set("category", filterCategory);
            }

            if (filterTag) {
                params.set("tag", filterTag);
            }

            if (filterInStock) {
                params.set("inStock", "true");
            }

            if (minPrice) {
                params.set("minPrice", minPrice);
            }

            if (maxPrice) {
                params.set("maxPrice", maxPrice);
            }

            if (sort) {
                params.set("sort", sort);
            }

            params.set("page", page);
            params.set("limit", limit);

            const query = `?${params.toString()}`;

            const result = await getProducts(query);

            setProducts(result);
        } catch (error) {
            setError(error.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories and tags
    const fetchData = async () => {
        try {
            const categoriesResult = await getCategories();
            const tagsResult = await getTags();

            setCategories(categoriesResult);
            setTags(tagsResult);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [
        filterCategory,
        filterTag,
        filterInStock,
        minPrice,
        maxPrice,
        sort,
        page,
    ]);

    // Create / Update product
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !price || !category) {
            setError("Name, price and category are required.");
            return;
        }

        try {
            setError("");

            const body = {
                name: name.trim(),
                price: Number(price),
                category,
                tags: selectedTags,
                inStock,
            };

            if (editingId) {
                await updateProduct(editingId, body);
            } else {
                await createProduct(body);
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            setError(error.message);
        }
    };

    // Edit product
    const handleEdit = async (id) => {
        try {
            setError("");

            const product = await getProduct(id);

            setEditingId(product._id);
            setName(product.name);
            setPrice(product.price);

            setCategory(product.category);

            setSelectedTags(product.tags?.map((tag) => tag._id) || []);

            setInStock(product.inStock);
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        try {
            setError("");

            await deleteProduct(id);

            fetchProducts();
        } catch (error) {
            setError(error.message);
        }
    };

    // Reset product form
    const resetForm = () => {
        setEditingId(null);
        setName("");
        setPrice("");
        setCategory("");
        setSelectedTags([]);
        setInStock(true);
    };

    // Add tag to selected tags
    const handleTagChange = (e) => {
        const tagId = e.target.value;

        if (!tagId) {
            return;
        }

        if (!selectedTags.includes(tagId)) {
            setSelectedTags([
                ...selectedTags,
                tagId,
            ]);
        }
    };

    // Remove selected tag
    const removeTag = (tagId) => {
        setSelectedTags(
            selectedTags.filter(
                (id) => id !== tagId
            )
        );
    };

    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Page Title */}
                <h1 className="mb-6 text-3xl font-bold text-white">
                    Products
                </h1>

                {/* Error */}
                {error && (
                    <p className="mb-4 text-red-400">
                        {error}
                    </p>
                )}

                {/* Create / Edit Product */}
                <div className="mb-6 rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">

                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">
                            {editingId
                                ? "Edit Product"
                                : "Create Product"}
                        </h2>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >

                        {/* Name */}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Product name"
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                        />

                        {/* Price */}
                        <input
                            type="number"
                            min="0"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            placeholder="Price"
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                        />

                        {/* Category */}
                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-gray-300 outline-none focus:border-blue-400"
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {/* Tags */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Tags
                            </label>

                            <select
                                value=""
                                onChange={handleTagChange}
                                className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-gray-300 outline-none focus:border-blue-400"
                            >
                                <option value="">
                                    Select Tags
                                </option>

                                {tags.map((tag) => (
                                    <option
                                        key={tag._id}
                                        value={tag._id}
                                        disabled={selectedTags.includes(
                                            tag._id
                                        )}
                                    >
                                        {tag.name}
                                    </option>
                                ))}
                            </select>

                            {/* Selected Tags */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedTags.map((tagId) => {
                                    const tag = tags.find(
                                        (tag) =>
                                            tag._id === tagId
                                    );

                                    return (
                                        <span
                                            key={tagId}
                                            className="flex items-center gap-2 rounded-full border border-blue-400 px-3 py-1 text-sm text-blue-400"
                                        >
                                            {tag?.name}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTag(
                                                        tagId
                                                    )
                                                }
                                                className="text-blue-400 hover:text-white"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Stock */}
                        <label className="flex items-center gap-3 text-gray-300">
                            <input
                                type="checkbox"
                                checked={inStock}
                                onChange={(e) =>
                                    setInStock(
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 accent-blue-500"
                            />

                            <span>
                                In Stock
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="rounded-xl bg-blue-400 px-5 py-2.5 font-medium text-black transition hover:bg-blue-500"
                        >
                            {editingId
                                ? "Update Product"
                                : "Add Product"}
                        </button>
                    </form>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">

                    <h2 className="mb-4 text-lg font-semibold text-white">
                        Filters
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Category */}
                        <select
                            value={filterCategory}
                            onChange={(e) => {
                                setFilterCategory(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-gray-300 outline-none focus:border-blue-400"
                        >
                            <option value="">
                                All Categories
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {/* Tag */}
                        <select
                            value={filterTag}
                            onChange={(e) => {
                                setFilterTag(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-gray-300 outline-none focus:border-blue-400"
                        >
                            <option value="">
                                All Tags
                            </option>

                            {tags.map((tag) => (
                                <option
                                    key={tag._id}
                                    value={tag._id}
                                >
                                    {tag.name}
                                </option>
                            ))}
                        </select>

                        {/* In Stock */}
                        <label className="flex items-center gap-3 text-gray-300">
                            <input
                                type="checkbox"
                                checked={filterInStock}
                                onChange={(e) => {
                                    setFilterInStock(
                                        e.target.checked
                                    );
                                    setPage(1);
                                }}
                                className="h-4 w-4 accent-blue-500"
                            />

                            <span>
                                In Stock
                            </span>
                        </label>

                        {/* Min Price */}
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            placeholder="Min Price"
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                        />

                        {/* Max Price */}
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            placeholder="Max Price"
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                        />

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => {
                                setSort(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-gray-300 outline-none focus:border-blue-400"
                        >
                            <option value="">
                                Default
                            </option>

                            <option value="price">
                                Price: Low to High
                            </option>

                            <option value="-price">
                                Price: High to Low
                            </option>

                            <option value="name">
                                Name: A-Z
                            </option>

                            <option value="-name">
                                Name: Z-A
                            </option>
                        </select>
                    </div>
                </div>

                {/* Products List */}
                <div className="rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">

                    <h2 className="mb-4 text-lg font-semibold text-white">
                        All Products
                    </h2>

                    {loading ? (
                        <p className="text-gray-400">
                            Loading products...
                        </p>
                    ) : products.length === 0 ? (
                        <p className="text-gray-400">
                            No products found.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="flex flex-col gap-4 rounded-xl border border-slate-600 bg-slate-900 p-4 md:flex-row md:items-center md:justify-between"
                                >

                                    {/* Product Info */}
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            {product.name}
                                        </h3>

                                        <p className="mt-1 text-blue-400">
                                            ${product.price}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Category:{" "}
                                            {product.category?.name ||
                                                "No category"}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Tags:{" "}
                                            {product.tags
                                                ?.map(
                                                    (tag) =>
                                                        tag.name
                                                )
                                                .join(", ") ||
                                                "No tags"}
                                        </p>

                                        <p
                                            className={`mt-1 text-sm ${product.inStock
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                                }`}
                                        >
                                            {product.inStock
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2">

                                        <button
                                            onClick={() =>
                                                handleEdit(
                                                    product._id
                                                )
                                            }
                                            className="rounded-lg border border-yellow-400 px-3 py-2 text-sm text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    product._id
                                                )
                                            }
                                            className="rounded-lg border border-red-400 px-3 py-2 text-sm text-red-400 transition hover:bg-red-400 hover:text-black"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-center gap-4">

                        <button
                            disabled={page === 1}
                            onClick={() =>
                                setPage(
                                    (prev) => prev - 1
                                )
                            }
                            className="rounded-lg border border-slate-600 px-4 py-2 text-gray-300 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span className="text-gray-300">
                            Page {page}
                        </span>

                        <button
                            disabled={
                                products.length < limit
                            }
                            onClick={() =>
                                setPage(
                                    (prev) => prev + 1
                                )
                            }
                            className="rounded-lg border border-slate-600 px-4 py-2 text-gray-300 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>

                    </div>
                </div>
            </div>
        </main>
    );
}