import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // ✅ Logout function
    const logout = async () => {
        try {
            await axios.get("http://localhost:1000/logout", { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:1000/dashboard", { withCredentials: true })
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
