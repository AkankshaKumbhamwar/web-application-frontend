import { Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useContext(AuthContext);

    console.log("ProtectedRoute Auth Data:", { user, loading });

    if (loading) return <p>Loading...</p>; // ✅ Show loading until auth is loaded
    if (!user) return <Navigate to="/" />; // ✅ Redirect if user is not authenticated

    return children; // ✅ Render dashboard if user is authenticated
};

export default ProtectedRoute;
