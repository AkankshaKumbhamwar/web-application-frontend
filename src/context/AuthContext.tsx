import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../utils/env_config";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // ✅ Logout function
    const logout = async () => {
        try {
            await axios.get(`${VITE_BACKEND_URL}/logout`, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        axios
            .get(`${VITE_BACKEND_URL}/dashboard`, { withCredentials: true })
            .then((res) => {
                console.log("Fetched User Data:", res.data);
                if (res.data?.user) {
                    setUser(res.data.user);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
                setUser(null);
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
