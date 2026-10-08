"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      // Call backend: POST /auth/login
      const { token, user } = await loginUser(email, password);

      // Save token + user in AuthContext and localStorage
      login(token, user);

      // Login successful → go to products
      router.push("/products");
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-700 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Log in
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2 font-medium"
          >
            Log in
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-5 text-center">
          No account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}