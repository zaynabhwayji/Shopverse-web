"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "../../../lib/api";
import { CartContext } from "../../../context/CartContext";

export default function ProductDetailsPage() {
    const { id } = useParams();

    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Fetch product
    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getProduct(id);

            setProduct(result);
        } catch (error) {
            setError(error.message);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-900 p-6">
                <p className="text-gray-300">Loading...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-900 p-6">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-slate-900 p-6">
                <p className="text-gray-300">
                    Product not found.
                </p>
            </main>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (

        <main className="min-h-screen bg-slate-900 p-6 ">

            <div className="mx-auto w-full max-w-6xl ">

                {/* Product Details Card */}
                <div className="grid grid-cols-1 gap-4 rounded-2xl border-2 border-slate-700 bg-slate-800 p-3 shadow-lg sm:gap-5 sm:p-4 md:grid-cols-2 md:gap-6 md:p-5 lg:gap-8 lg:p-6">

                    {/* Product Image */}
                    <div className="flex w-full items-center justify-center">

                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-[220px] w-full rounded-xl border border-slate-600 object-cover sm:h-[280px] md:h-[340px] lg:h-[400px] xl:h-[420px]"
                            />
                        ) : (
                            <div className="flex h-[220px] w-full items-center justify-center rounded-xl border border-slate-600 bg-slate-900 text-gray-500 sm:h-[280px] md:h-[340px] lg:h-[400px] xl:h-[420px]">
                                No Image
                            </div>
                        )}

                    </div>

                    {/* Product Information */}
                    <div className="flex min-w-0 flex-col justify-center">

                        {/* Product Name */}
                        <h1 className="break-words text-xl font-bold text-white sm:text-2xl md:text-2xl lg:text-3xl">
                            {product.name}
                        </h1>

                        {/* Category + Tags */}
                        <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">

                            {/* Category */}
                            {product.category && (
                                <span className="rounded-full border border-blue-400 px-2.5 py-1 text-xs text-blue-400 sm:px-3 sm:py-1.5 sm:text-sm">
                                    {product.category.name}
                                </span>
                            )}

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <>
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag._id}
                                            className="rounded-full border border-purple-400 px-2.5 py-1 text-xs text-purple-400 sm:px-3 sm:py-1.5 sm:text-sm"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </>
                            )}

                        </div>

                        {/* Price */}
                        <p className="mt-4 text-2xl font-bold text-blue-400 sm:mt-5 sm:text-2xl md:mt-6 md:text-3xl">
                            ${product.price}
                        </p>

                        {/* Stock */}
                        <p
                            className={`mt-2 text-xs font-medium sm:mt-3 sm:text-sm ${product.inStock
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                        >
                            {product.inStock
                                ? "In Stock"
                                : "Out of Stock"}
                        </p>

                        {/* Quantity */}
                        <div className="mt-4 flex items-center gap-2 sm:mt-5 sm:gap-3 md:mt-6">

                            <label className="text-xs font-medium text-gray-300 sm:text-sm">
                                Qty
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            Number(e.target.value)
                                        )
                                    )
                                }
                                className="w-16 rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-center text-sm text-white outline-none focus:border-blue-400 sm:w-20 sm:px-3 sm:py-2"
                            />

                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="mt-4 w-full rounded-xl bg-blue-400 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-5 sm:px-5 sm:py-3 sm:text-base md:mt-6"
                        >
                            Add to cart
                        </button>

                    </div>
                </div>

            </div>
        </main>
    );
}