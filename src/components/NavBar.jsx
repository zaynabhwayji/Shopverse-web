"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function NavBar() {
    const { totalItems } = useContext(CartContext);

    return (

        <div className="bg-slate-900 p-1.5 sm:p-3 md:p-4">
            <nav className="flex items-center justify-between rounded-2xl border-2 border-slate-700 bg-slate-800 px-2.5 py-2.5 sm:mx-2 sm:mt-3 sm:px-4 sm:py-4 md:mx-4 md:mt-4 md:px-6 md:py-5 lg:mx-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0 text-base font-bold text-blue-400 sm:text-xl md:text-2xl"
                >
                    Shopverse
                </Link>

                {/* Links */}
                <div className="flex items-center gap-2 text-xs sm:gap-4 sm:text-base md:gap-6 lg:gap-8">

                    <Link
                        href="/"
                        className="whitespace-nowrap text-gray-300 hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        className="whitespace-nowrap text-gray-300 hover:text-white"
                    >
                        Products
                    </Link>

                    <Link
                        href="/orders"
                        className="whitespace-nowrap text-gray-300 hover:text-white"
                    >
                        Orders
                    </Link>

                    <Link
                        href="/cart"
                        className="whitespace-nowrap text-gray-300 hover:text-white"
                    >
                        Cart ({totalItems})
                    </Link>

                </div>
            </nav>
        </div>
    )
};