import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const auth: any = useContext(AuthContext);
    console.log("Auth Data:", JSON.stringify(auth, null, 2));
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login with Google</h1>
            {auth.user ? (
                <a href="/dashboard">
                    <button style={{ padding: "10px", background: "green", color: "white" }}>
                        Go to Dashboard
                    </button>
                </a>
            ) : (
                <a href="http://localhost:1000/auth/google">
                    <button style={{ padding: "10px", background: "blue", color: "white" }}>
                        Sign in with Google
                    </button>
                </a>
            )}
        </div>
    );
};

export default HomePage;
