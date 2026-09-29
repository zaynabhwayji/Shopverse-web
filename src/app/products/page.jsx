"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../../lib/api";
import FilterBar from "../../components/FilterBar";
import ProductGrid from "../../components/ProductGrid";

function ProductsPage() {
    // Products 
    const [products, setProducts] = useState([]);

    // Categories and tags 
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    // Filters 
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState("");
    const [inStock, setInStock] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");

    // Loading and error 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Fetch categories 
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories`);

            if (!res.ok) {
                throw new Error("Failed to fetch categories");
            }

            const result = await res.json();
            setCategories(result);
        } catch (error) {
            setError(error.message);
        }
    };

    // Fetch tags 
    const fetchTags = async () => {
        try {
            const res = await fetch(`${API_URL}/tags`);

            if (!res.ok) {
                throw new Error("Failed to fetch tags");
            }

            const result = await res.json();
            setTags(result);
        } catch (error) {
            setError(error.message);
        }
    };

    // Fetch products with filters 
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            if (inStock) {
                params.set("inStock", "true");
            }

            if (category) {
                params.set("category", category);
            }

            if (tag) {
                params.set("tag", tag);
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

            const query = params.toString()
                ? `?${params.toString()}`
                : "";

            console.log(query);

            const result = await getProducts(query);

            setProducts(result);
        } catch (error) {
            setError(error.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories and tags when page loads 
    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, []);

    // Fetch products whenever a filter changes 
    useEffect(() => {
        fetchProducts();
    }, [category, tag, inStock, minPrice, maxPrice, sort]);

    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <h1 className="mx-6 mb-6 mt-4 text-2xl font-bold text-gray-300">
                Products
            </h1>

            {error && (
                <p className="mb-4 text-red-500">
                    {error}
                </p>
            )}

            <div className="mx-6 mt-4 grid grid-cols-1 gap-6 md:grid-cols-4">

                {/* Filters */}
                <aside>
                    <FilterBar
                        categories={categories}
                        tags={tags}
                        category={category}
                        setCategory={setCategory}
                        tag={tag}
                        setTag={setTag}
                        inStock={inStock}
                        setInStock={setInStock}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        sort={sort}
                        setSort={setSort}
                    />
                </aside>

                {/* Products */}
                <section className="md:col-span-3">
                    <ProductGrid products={products} />
                </section>

            </div>
        </main>
    );
}
export default ProductsPage;