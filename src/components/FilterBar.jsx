"use client";

export default function FilterBar({ categories, tags, category, setCategory, tag, setTag, inStock, setInStock, minPrice, setMinPrice, maxPrice, setMaxPrice, sort, setSort, }) {

    return (
        <div className="space-y-3 rounded-2xl border-2 border-slate-700 bg-slate-800 p-3 shadow-lg">

            <h2 className="text-lg font-semibold text-white">
                Filters
            </h2>

            {/* Category */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Category
                </label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-gray-300 outline-none transition focus:border-blue-400"
                >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tag */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Tag
                </label>

                <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-gray-300 outline-none transition focus:border-blue-400"
                >
                    <option value="">All Tags</option>

                    {tags.map((tag) => (
                        <option key={tag._id} value={tag._id}>
                            {tag.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* In Stock */}
            <label className="flex cursor-pointer items-center gap-3 text-gray-300">
                <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="h-4 w-4 accent-blue-500"
                />

                <span className="text-sm font-medium">
                    In Stock
                </span>
            </label>

            {/* Minimum Price */}     
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Min Price
                </label>

                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-gray-300 outline-none placeholder:text-gray-500 focus:border-blue-400"
                />
            </div>

            {/* Maximum Price */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Max Price
                </label>

                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="1000"
                    className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-gray-300 outline-none placeholder:text-gray-500 focus:border-blue-400"
                />
            </div>

            {/* Sort */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Sort
                </label>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-gray-300 outline-none transition focus:border-blue-400"
                >
                    <option value="">Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                    <option value="-name">Name: Z-A</option>
                </select>
            </div>

        </div>
    );
}
