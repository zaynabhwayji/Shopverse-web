const API = process.env.NEXT_PUBLIC_API_URL; // http://localhost:3000

function authHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}


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
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(body),
    });
    return res.json();
}

export async function getMyOrders() {
    const res = await fetch(`${API}/orders/my-orders`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to load orders");
    return res.json();
}

export async function getOrders() {
    const res = await fetch(`${API}/orders`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to load orders");
    return res.json();
}


// ==================== CATEGORIES ====================

export async function getCategories() {
    const res = await fetch(`${API}/categories`, {
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Failed to load categories");
    }

    return res.json();
}

export async function getCategory(id) {
    const res = await fetch(`${API}/categories/${id}`, {
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Category not found");
    }

    return res.json();
}

export async function createCategory(body) {
    const res = await fetch(`${API}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", ...authHeaders()
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
            ...authHeaders()
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
        headers: {
            ...authHeaders(),
        },
    });

    if (!res.ok) {
        throw new Error("Failed to delete category");
    }

    return res.json();
}

export async function getCategoryProducts(id) {
    const res = await fetch(`${API}/categories/${id}/products`, {
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Failed to load category products");
    }

    return res.json();
}

export async function getTags() {
    const res = await fetch(`${API}/tags`);

    if (!res.ok) {
        throw new Error("Failed to load tags");
    }

    return res.json();
}

export async function createTag(body) {
    const res = await fetch(`${API}/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", ...authHeaders()
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Failed to create tag");
    }

    return res.json();
}

export async function getTagProducts(id) {
    const res = await fetch(`${API}/tags/${id}/products`, {
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Failed to load tag products");
    }

    return res.json();
}

export async function deleteTag(id) {
    const res = await fetch(`${API}/tags/${id}`, {
        method: "DELETE",
        headers: {
            ...authHeaders(),
        },
    });

    if (!res.ok) {
        throw new Error("Failed to delete tag");
    }

    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API}/users`, {
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Failed to load users");
    }

    return res.json();
}

export async function createUser(body) {
    const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", ...authHeaders()
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Failed to create user");
    }

    return res.json();
}

export async function getUserOrders(id) {
    const res = await fetch(`${API}/users/${id}/orders`, {
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Failed to load user orders");
    }

    return res.json();
}

export async function getOrder(id) {
    const res = await fetch(`${API}/orders/${id}`, {
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Order not found");
    }

    return res.json();
}


export async function updateOrderStatus(id, status) {
    const res = await fetch(`${API}/orders/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", ...authHeaders()
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) {
        throw new Error("Failed to update order");
    }

    return res.json();
}

export async function deleteOrder(id) {
    const res = await fetch(`${API}/orders/${id}`, {
        method: "DELETE",
        headers: {
            ...authHeaders(),
        },
    });

    if (!res.ok) {
        throw new Error("Failed to delete order");
    }

    return res.json();
}

export async function createProduct(body) {
    const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", ...authHeaders()
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Failed to create product");
    }

    return res.json();
}

export async function updateProduct(id, body) {
    const res = await fetch(`${API}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", ...authHeaders()
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Failed to update product");
    }

    return res.json();
}

export async function deleteProduct(id) {
    const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: {
            ...authHeaders(),
        },
    });

    if (!res.ok) {
        throw new Error("Failed to delete product");
    }

    if (res.status === 204) {
        return;
    }

    return res.json();
}

export async function loginUser(email, password) {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", ...authHeaders()
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error("Invalid email or password");
    }

    return res.json();
}

export async function registerUser(name, email, password) {
    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error("Registration failed");
    }

    return res.json();
}

export async function getMe() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/auth/me`, {
        ...authHeaders()
    }
    );

    if (!res.ok) {
        throw new Error("Invalid token");
    }

    return res.json();
}