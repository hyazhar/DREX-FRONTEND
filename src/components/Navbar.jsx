import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Menu, X, Search, TrendingUp, ShoppingBag } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const navigate = useNavigate();

  // Keep the input synchronized with the URL
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Search products and navigate to the products page
  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();

    const newParams = new URLSearchParams();

    if (query) {
      newParams.set("search", query);
    }

    const queryString = newParams.toString();

    navigate(`/products${queryString ? `?${queryString}` : ""}`);

    // Close the mobile menu after searching
    setIsMenuOpen(false);
  }

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white px-6 py-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-bold tracking-wide text-blue-600"
          >
            Drex
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden max-w-md flex-1 md:flex"
          >
            <div className="flex w-full items-center overflow-hidden rounded-full border border-gray-300 bg-gray-50 transition focus-within:border-blue-500 focus-within:bg-white">
              <Search size={20} className="ml-4 shrink-0 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
              />

              <button
                type="submit"
                className="mr-1 shrink-0 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>

          {/* Desktop Menu + Authentication */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Trending */}
            <Link
              to="/trending"
              className="flex items-center gap-1.5 font-medium text-gray-600 transition duration-200 hover:text-blue-600"
            >
              <TrendingUp size={18} />
              Trending
            </Link>

            {/* New Collections */}
            <Link
              to="/collections"
              className="flex items-center gap-1.5 font-medium text-gray-600 transition duration-200 hover:text-blue-600"
            >
              <TrendingUp size={18} />
              New Collections
            </Link>

            {/* Shopping Bag */}
            <Link
              to="/bag"
              className="flex items-center gap-1.5 font-medium text-gray-600 transition duration-200 hover:text-blue-600"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={21} />
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
            >
              Login
            </Link>

            {/* Signup */}
            <Link
              to="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Signup
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`
          fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm
          transition-opacity duration-300 md:hidden
          ${
            isMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Mobile Side Menu */}
      <aside
        id="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        className={`
          fixed right-0 top-0 z-[70] h-full w-[280px]
          overflow-y-auto bg-white shadow-2xl
          transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Side Menu Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <Link
            to="/"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="text-2xl font-bold text-blue-600"
          >
            Drex
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="px-6 py-5">
          <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 focus-within:border-blue-500">
            <Search size={19} className="ml-3 shrink-0 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              tabIndex={isMenuOpen ? 0 : -1}
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col px-6">
          {/* Trending */}
          <Link
            to="/trending"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="flex items-center gap-3 border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:pl-2 hover:text-blue-600"
          >
            <TrendingUp size={20} />
            Trending
          </Link>

          {/* New Collections */}
          <Link
            to="/collections"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="flex items-center gap-3 border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:pl-2 hover:text-blue-600"
          >
            <TrendingUp size={20} />
            New Collections
          </Link>

          {/* Shopping Bag */}
          <Link
            to="/bag"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="flex items-center gap-3 border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:pl-2 hover:text-blue-600"
          >
            <ShoppingBag size={20} />
            Bag
          </Link>
        </div>

        {/* Mobile Authentication */}
        <div className="flex flex-col gap-3 px-6 py-6">
          <Link
            to="/login"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="w-full rounded-lg border border-blue-600 py-2.5 text-center font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-center font-medium text-white transition hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
