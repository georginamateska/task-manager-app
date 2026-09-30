import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    async function login(email, password){
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await response.json();//receives the token

        if (!response.ok){
            throw new Error(data.message || "Login failed");
        }
    //saves {user, token} from BND to React state and to localStorage
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
    }

    async function logout(){
        await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
