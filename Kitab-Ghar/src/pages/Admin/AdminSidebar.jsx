import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  MessageSquare,
  Gift,
  User,
  Menu,
  Megaphone,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setCurrentPath(window.location.pathname);

    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      active: currentPath === "/admin",
    },
    {
      label: "Books Details",
      icon: Package,
      path: "/admin/bookDetails",
      active: currentPath === "/admin/bookDetails",
    },
    {
      label: "Add Books",
      icon: PlusCircle,
      path: "/admin/addBook",
      active: currentPath === "/admin/addBook",
    },
    {
      label: "Reviews",
      icon: MessageSquare,
      path: "/admin/reviews",
      active: currentPath === "/admin/reviews",
    },
    {
      label: "Orders",
      icon: Gift,
      path: "/admin/orders",
      active: currentPath === "/admin/orders",
    },
    {
      label: "Announcements",
      icon: Megaphone,
      path: "/admin/announcements",
      active: currentPath === "/admin/announcements",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileMenu}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          fixed md:static
          z-40
          flex h-screen w-64 flex-col border-r bg-gray-50
        `}
      >
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <button
            onClick={() => navigate("/admin/")}
            className="flex items-center gap-2 font-semibold"
          >
            <Package className="h-6 w-6" />
            <span>Admin Panel</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <nav className="grid gap-1 p-2">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => {
                  navigate(route.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 w-full text-left rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  route.active
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-2 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
