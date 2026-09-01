import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <Link to="/"className="text-2xl font-bold tracking-wide text-blue-600">
        Drex
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/"className="font-medium text-gray-600 transition duration-200 hover:text-blue-600">
          Home
        </Link>
        <Link to="/product"className="font-medium text-gray-600 transition duration-200 hover:text-blue-600">
          Product
        </Link>
        <Link to="/contact" className="font-medium text-gray-600 transition duration-200 hover:text-blue-600">
          Contact
        </Link>
        <Link to="/about" className="font-medium text-gray-600 transition duration-200 hover:text-blue-600">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;