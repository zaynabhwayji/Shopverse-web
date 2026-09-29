const API = process.env.NEXT_PUBLIC_API_URL; // http://localhost:3000

export async function getProducts(query = "") {
    const res = await fetch(`${API}/products${query}`);
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
}

export async function getProduct(id) {
    const res = await fetch(`${API}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return res.json();
}

export async function createOrder(body) {
    const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return res.json();
}

export async function getOrders() {
    const res = await fetch(`${API}/orders`);
    if (!res.ok) throw new Error("Failed to load orders");
    return res.json();
}   


// ==================== CATEGORIES ====================

export async function getCategories() {
    const res = await fetch(`${API}/categories`);

    if (!res.ok) {
        throw new Error("Failed to load categories");
    }

    return res.json();
}

export async function getCategory(id) {
    const res = await fetch(`${API}/categories/${id}`);

    if (!res.ok) {
        throw new Error("Category not found");
    }

    return res.json();
}

export async function createCategory(body) {
    const res = await fetch(`${API}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Failed to create category");
    }

    return res.json();
}

export async function updateCategory(id, body) {
    const res = await fetch(`${API}/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Failed to update category");
    }

    return res.json();
}

export async function deleteCategory(id) {
    const res = await fetch(`${API}/categories/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete category");
    }

    return res.json();
}

export async function getCategoryProducts(id) {
    const res = await fetch(`${API}/categories/${id}/products`);

    if (!res.ok) {
        throw new Error("Failed to load category products");
    }

    return res.json();
}