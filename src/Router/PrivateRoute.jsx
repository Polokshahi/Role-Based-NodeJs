import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) return <span>Loading...</span>;
    if (!user?.email) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};

export const AdminRoute = ({ children }) => {
    const { user, role, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) return <span>Loading...</span>;
    if (!user?.email || role !== "admin") return <Navigate to="/unauthorized" replace />;
    return children;
};

export default PrivateRoute;
