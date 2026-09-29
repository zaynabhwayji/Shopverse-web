"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
   
    if (products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-6 mt-4">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                />
            ))}
        </div>
    );
}