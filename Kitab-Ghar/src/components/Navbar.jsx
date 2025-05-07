import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div class="bg-white shadow px-6 py-4 flex items-center justify-between">
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
        <a href="/login">
          <FontAwesomeIcon icon={faUser} />
        </a>
        <a href="/Book">
          <FontAwesomeIcon icon={faSearch} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faHeart} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faShoppingCart} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
