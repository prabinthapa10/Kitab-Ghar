import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  faUser,
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      setIsOpen(!isOpen);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setIsOpen(false);
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Kitab Ghar Logo" className="w-8 h-8" />
        <ul>
          <li>  
            <Link to="/">
              <span className="text-xl font-bold border border-purple-500 px-2 rounded">
                Kitab Ghar
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Middle: Navigation */}
      <ul className="hidden md:flex space-x-6 text-sm font-medium text-black">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/book">
          <li>Book</li>
        </Link>
        <li>About</li>
        <li>Contact</li>
      </ul>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4 text-xl">
        <div className="relative inline-block text-left">
          <span onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className="cursor-pointer text-xl" />
          </span>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
              <Link
                to="/user"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <span
                onClick={(e) => handleLogout(e)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </span>
            </div>
          )}
        </div>

        <a href="/book">
          <FontAwesomeIcon icon={faSearch} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faHeart} />
        </a>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
