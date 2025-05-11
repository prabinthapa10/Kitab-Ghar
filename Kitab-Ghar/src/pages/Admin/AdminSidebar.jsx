import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  MessageSquare,
  Gift,
  User,
  Menu,
} from "lucide-react";

const AdminSidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      href: "/admin",
      active: currentPath === "/admin",
    },
    {
      label: "Books Details",
      icon: Package,
      href: "/admin/bookDetails",
      active: currentPath === "/admin/bookDetails",
    },
    {
      label: "Add Books",
      icon: PlusCircle,
      href: "/admin/addBook",
      active: currentPath === "/admin/addBook",
    },
    {
      label: "Reviews",
      icon: MessageSquare,
      href: "/admin/reviews",
      active: currentPath === "/admin/reviews",
    },
    {
      label: "Orders",
      icon: Gift,
      href: "/admin/orders",
      active: currentPath === "/admin/orders",
    },
    {
      label: "Profile",
      icon: User,
      href: "/admin/profile",
      active: currentPath === "/admin/profile",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <a
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Package className="h-6 w-6" />
            <span>Admin Panel</span>
          </a>
        </div>
        <div className="flex-1">
          <nav className="grid gap-1 p-2">
            {routes.map((route) => (
              <a
                key={route.href}
                href={route.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  route.active
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </a>
            ))}
          </nav>
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
