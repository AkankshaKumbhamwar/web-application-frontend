import { useContext } from "react";
import LetterEditor from "../component/textEditor";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const auth: any = useContext(AuthContext);

    if (auth.loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome, {auth.user?.name}!</h1>
            {/* <p>Email: {auth.user?.email}</p>
            <button onClick={auth.logout} style={{ padding: "10px", background: "red", color: "white" }}>
                Logout
            </button> */}
            <LetterEditor />
        </div>
    );
};

export default Dashboard;
