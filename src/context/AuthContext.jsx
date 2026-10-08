"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    useEffect(() => {
        async function restoreSession() {
            const saved = localStorage.getItem("token");

            if (!saved) {
                return;
            }

            setToken(saved);

            try {
                const data = await getMe(saved);

                setUser(data.user);
            } catch {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            }
        }

        restoreSession();
    }, []);

    function login(token, user) {
        // Remember token across reloads
        localStorage.setItem("token", token);

        setToken(token);
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);