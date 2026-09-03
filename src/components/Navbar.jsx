import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white px-6 py-4 shadow-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-blue-600"
          >
            Drex
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">

            <Link
              to="/"
              className="font-medium text-gray-600 transition duration-200 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/product"
              className="font-medium text-gray-600 transition duration-200 hover:text-blue-600"
            >
              Product
            </Link>

            <Link
              to="/contact"
              className="font-medium text-gray-600 transition duration-200 hover:text-blue-600"
            >
              Contact
            </Link>

            <Link
              to="/about"
              className="font-medium text-gray-600 transition duration-200 hover:text-blue-600"
            >
              About
            </Link>

          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>

        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`
          fixed
          inset-0
          z-[60]
          bg-black/50
          backdrop-blur-sm
          transition-opacity
          duration-300
          md:hidden
          ${
            isMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Side Menu */}
      <aside
        className={`
          fixed
          right-0
          top-0
          z-[70]
          h-full
          w-[280px]
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          md:hidden
          ${
            isMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* Side Menu Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-blue-600"
          >
            Drex
          </Link>

          <button
            onClick={closeMenu}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>

        </div>

        {/* Side Menu Links */}
        <div className="flex flex-col px-6 py-6">

          <Link
            to="/"
            onClick={closeMenu}
            className="border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:pl-2 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/product"
            onClick={closeMenu}
            className="border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:pl-2 hover:text-blue-600"
          >
            Product
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className="border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:pl-2 hover:text-blue-600"
          >
            Contact
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
            className="border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:pl-2 hover:text-blue-600"
          >
            About
          </Link>

        </div>

      </aside>
    </>
  );
}

export default Navbar;