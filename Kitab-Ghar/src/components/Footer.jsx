import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-8 px-[100px] border-t mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Kitab Ghar</h3>
            <address className="not-italic text-gray-600 text-sm">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </address>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-400 text-sm">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-800 hover:text-amber-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-800 hover:text-amber-600 transition-colors">Shop</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-800 hover:text-amber-600 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-800 hover:text-amber-600 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-400 text-sm">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/payment-options" className="text-gray-800 hover:text-amber-600 transition-colors">Payment Options</Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-800 hover:text-amber-600 transition-colors">Returns</Link>
              </li>
              <li>
                <Link href="/privacy-policies" className="text-gray-800 hover:text-amber-600 transition-colors">Privacy Policies</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-400 text-sm">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="border-b border-gray-300 py-1 px-2 focus:outline-none focus:border-amber-600 flex-grow"
              />
              <button className="ml-2 bg-transparent border-b border-gray-800 px-2 py-1 text-sm uppercase font-medium hover:border-amber-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Kitab Ghar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
