import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = ({ restricted = false, children }) => {
  const { role } = useAuth();

  // For restricted routes (like home page)
  if (restricted && role) {
    // Redirect admins/experts away
    if (role === "Admin") return <Navigate to="/admin" replace />;
    // For members, render the children directly
    return children || <Outlet />;
  }

  // For non-restricted public routes
  return children || <Outlet />;
};

export default PublicRoute;