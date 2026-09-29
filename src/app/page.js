"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductGrid from "../components/ProductGrid";

function HomePage() {
  // State to store products
  const [products, setProducts] = useState([]);

  // State to handle loading
  const [loading, setLoading] = useState(false);

  // State to store error messages
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getProducts("?limit=6");

      setProducts(result);
    } catch (error) {
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <h1 className="mb-6 mx-6 mt-4 text-2xl font-bold text-gray-300">
        Featured Products
      </h1>

      {loading && <p>Loading...</p>}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <ProductGrid products={products}/>
    </main>
  );
}

export default HomePage;