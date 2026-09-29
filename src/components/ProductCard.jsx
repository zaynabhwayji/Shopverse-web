"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-800 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Product Image */}
            <div className="flex items-center justify-center">
                <div className="flex m-2 w-full h-[75px] sm:w-[42vw] lg:w-[28vw] xl:w-[30vw] items-center justify-center rounded-xl border border-slate-600 bg-slate-900 p-4">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <p className="text-gray-500">
                            No Image
                        </p>
                    )}
                </div>
            </div>

            <div className="p-2">

                {/* Product Name */}
                <Link href={`/products/${product._id}`}>
                    <h2 className="text-md font-semibold text-white transition duration-300 hover:text-blue-400">
                        {product.name}
                    </h2>
                </Link>

                {/* Price */}
                <p className="mt-2 text-xl font-semibold text-blue-400">
                    ${product.price}
                </p>

                {/* Add to Cart */}
                <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full rounded-xl bg-blue-400 px-2 py-2.5 font-medium text-black transition hover:bg-blue-500"
                >
                    Add to cart
                </button>

            </div>
        </div>
    );
}
