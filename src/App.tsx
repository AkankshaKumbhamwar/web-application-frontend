import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { GoogleAuthProvider } from "./component/GoogleAuthContext";

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { auth }: any = useContext(AuthContext);
//   console.log({ auth: JSON.stringify(auth, null, 2) }, "---ProtectedRoute---auth--------");

//   return auth && auth.user ? children : <Navigate to="/" />;
// };

function App() {
  return (
    <>
      <AuthProvider>
        <GoogleAuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </GoogleAuthProvider>

      </AuthProvider>

    </>

  );
}

export default App;
