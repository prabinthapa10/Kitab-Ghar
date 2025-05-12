import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = ({ restricted = false, children }) => {
  const { role } = useAuth();

  // For restricted routes (like home page)
  if (restricted && role) {
    // Redirect admins/experts away
    if (role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    // For customers, render the children directly
    return children || <Outlet />;
  }

  // For non-restricted public routes
  return children || <Outlet />;
};

export default PublicRoute;