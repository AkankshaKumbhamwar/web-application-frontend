import { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// // Define AuthContext Type
// interface AuthContextType {
//     user: any;
//     loading: boolean;
//     logout: () => void;
// }

// Provide a default value (empty object with dummy function)
export const AuthContext: any = createContext(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:1000/dashboard", { withCredentials: true })
            .then((res) => {
                console.log(res?.data, "-----ss---------");
                if (res.data?.user != null) setUser(res.data?.user);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    const logout = async () => {
        try {
            await axios.get("http://localhost:1000/logout", { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
