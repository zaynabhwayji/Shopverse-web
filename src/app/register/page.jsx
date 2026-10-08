"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../lib/api";

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function submit(e) {
        e.preventDefault();
        setError("");

        try {
            const { token, user } = await registerUser(
                name,
                email,
                password
            );

            // Save token and user in AuthContext
            login(token, user);

            // Go to products after successful registration
            router.push("/products");
        } catch (error) {
            setError(error.message || "Registration failed");
        }
    }

    return (
        <main className="min-h-screen bg-[#0F172A] px-4 py-10 text-white">
            <div className="mx-auto max-w-md">
                <div className="rounded-xl border border-slate-700 bg-[#1E293B] p-6">
                    <h1 className="mb-6 text-2xl font-bold">
                        Create Account
                    </h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 outline-none"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="text-blue-400 hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}