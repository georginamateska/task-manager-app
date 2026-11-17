import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkUser() {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Session expired");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        checkUser();
    }, [token]);

    async function login(email, password) {
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
    }

    async function logout() {
        try {
            await fetch(`${API_URL}/api/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                },
            });
        } finally {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
