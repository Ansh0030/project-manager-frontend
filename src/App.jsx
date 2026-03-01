import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import useAuth from "./hooks/useAuth";

function AppRoutes() {
    const { accessToken, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <Routes>
            {/* Root */}
            <Route
                path="/"
                element={
                    accessToken
                        ? <Navigate to="/dashboard" replace />
                        : <Navigate to="/login" replace />
                }
            />

            {/* Public Routes */}
            <Route
                path="/login"
                element={
                    accessToken
                        ? <Navigate to="/dashboard" replace />
                        : <Login />
                }
            />

            <Route
                path="/register"
                element={
                    accessToken
                        ? <Navigate to="/dashboard" replace />
                        : <Register />
                }
            />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/project/:id"
                element={
                    <ProtectedRoute>
                        <ProjectPage />
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}


function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;