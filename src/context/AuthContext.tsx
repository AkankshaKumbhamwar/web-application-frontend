import { createContext, useEffect, useState } from "react";
import axios from "axios";
import LetterEditor from "../component/textEditor";
import Dashboard from "../pages/Dashboard";

export const AuthContext: any = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const logout = async () => {
        try {
            await axios.get("http://localhost:1000/logout", { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    useEffect(() => {
        axios.get("http://localhost:1000/dashboard", { withCredentials: true })
            .then((res) => {
                console.log(res?.data, "User Data"); // Debugging
                if (res.data?.user) setUser(res.data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
                setUser(null);
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
            {/* <Dashboard /> */}
        </AuthContext.Provider>
    );
};
