"use client";

import { useEffect, useState } from "react";
import {
    getTags,
    createTag,
    getTagProducts,
    deleteTag,
} from "../../../lib/api";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function TagsPage() {

    const [tags, setTags] = useState([]);
    const [name, setName] = useState("");

    const [selectedTag, setSelectedTag] = useState(null);
    const [tagProducts, setTagProducts] = useState([]);

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

    // Fetch all tags
    const fetchTags = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getTags();

            setTags(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Create a new tag
    const handleCreateTag = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        try {
            setError("");

            await createTag({
                name: name.trim(),
            });

            setName("");

            fetchTags();
        } catch (error) {
            setError(error.message);
        }
    };

    // Show products carrying this tag
    const handleViewProducts = async (tag) => {
        try {
            setError("");

            const result = await getTagProducts(tag._id);

            setSelectedTag(tag);
            setTagProducts(result);
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete tag
    const handleDeleteTag = async (id) => {
        try {
            setError("");

            await deleteTag(id);

            if (selectedTag?._id === id) {
                setSelectedTag(null);
                setTagProducts([]);
            }

            fetchTags();
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="mx-auto max-w-5xl">

                {/* Page title */}
                <h1 className="mb-6 text-3xl font-bold text-white">
                    Tags
                </h1>

                {/* Error */}
                {error && (
                    <p className="mb-4 text-red-400">
                        {error}
                    </p>
                )}

                {/* Create Tag */}
                <div className="mb-6 rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        Create Tag
                    </h2>

                    <form
                        onSubmit={handleCreateTag}
                        className="flex flex-col gap-3 sm:flex-row"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tag name"
                            className="flex-1 rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                        />

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-400 px-5 py-2.5 font-medium text-black transition hover:bg-blue-500"
                        >
                            Add Tag
                        </button>
                    </form>
                </div>

                {/* Tags list */}
                <div className="rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        All Tags
                    </h2>

                    {loading ? (
                        <p className="text-gray-400">
                            Loading tags...
                        </p>
                    ) : tags.length === 0 ? (
                        <p className="text-gray-400">
                            No tags found.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {tags.map((tag) => (
                                <div
                                    key={tag._id}
                                    className="flex items-center justify-between rounded-xl border border-slate-600 bg-slate-900 p-4"
                                >
                                    <span className="font-medium text-white">
                                        {tag.name}
                                    </span>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleViewProducts(tag)
                                            }
                                            className="rounded-lg border border-blue-400 px-3 py-2 text-sm text-blue-400 transition hover:bg-blue-400 hover:text-black"
                                        >
                                            Products
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteTag(tag._id)
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
                </div>

                {/* Products for selected tag */}
                {selectedTag && (
                    <div className="mt-6 rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-white">
                            Products with "{selectedTag.name}"
                        </h2>

                        {tagProducts.length === 0 ? (
                            <p className="text-gray-400">
                                No products have this tag.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {tagProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="rounded-xl border border-slate-600 bg-slate-900 p-4"
                                    >
                                        <h3 className="font-semibold text-white">
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