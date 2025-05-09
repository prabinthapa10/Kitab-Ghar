import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault(); // prevent navigation
    setIsOpen(!isOpen);
  };

  return (
    <div
      class="bg-white shadow px-6 py-4 flex items-center justify-between"
      onClick={toggleDropdown}
    >
      {/*  Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Kitab Ghar Logo" class="w-8 h-8" />
        <Link to="/">
          <span class="text-xl font-bold border border-purple-500 px-2 rounded">
            Kitab Ghar
          </span>
        </Link>
      </div>
      <ul class="hidden md:flex space-x-6 text-sm font-medium text-black">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/book">
          <li>Book</li>
        </Link>
        <li>About</li>
        <li>Contact</li>
      </ul>

      {/* right icons */}
      <div className="flex items-center space-x-4 text-xl">
        <div className="relative inline-block text-left">
          <a href="/login" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className="cursor-pointer text-xl" />
          </a>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
              <Link
                to="/user"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
        <a href="/Book">
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
