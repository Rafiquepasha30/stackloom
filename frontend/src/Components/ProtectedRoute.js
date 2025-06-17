import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Check if token exists
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Check if role matches allowedRoles
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/admin" />;
    }

    return children;
};

export default ProtectedRoute;
