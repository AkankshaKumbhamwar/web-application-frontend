import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const auth: any = useContext(AuthContext);
  return auth.user ? children : <Navigate to="/" />;
};

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Signup/> */}
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
