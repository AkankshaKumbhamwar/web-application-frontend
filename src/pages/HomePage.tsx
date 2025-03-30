import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const auth: any = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            navigate("/dashboard");
        }
    }, [auth.user, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login with Google</h1>
            <a href="http://localhost:1000/auth/google">
                <button style={{ padding: "10px", background: "blue", color: "white" }}>
                    Sign in with Google
                </button>
            </a>
        </div>
    );
};

export default HomePage;
