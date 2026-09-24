import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e) {
    e.preventDefault();

    if (!email.trim()) return;

    console.log("Newsletter subscription:", email);

    // Later connect this to your backend API
    setEmail("");
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold text-white">
                <span className="text-green-500">DREX</span>
              </h2>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
              Your one-stop destination for cricket, football, badminton,
              gym equipment, sportswear, and all your favorite sports gear.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">

              <a
                href="https://www.linkedin.com/azzharr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-500 hover:text-white"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>

              <a
                href="https://www.instagram.com/hyazzharr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-500 hover:text-white"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="https://www.youtube.com/@hyazzharr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-500 hover:text-white"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/products?category=Cricket"
                  className="transition hover:text-green-500"
                >
                  Cricket
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Football"
                  className="transition hover:text-green-500"
                >
                  Football
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Badminton"
                  className="transition hover:text-green-500"
                >
                  Badminton
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Gym"
                  className="transition hover:text-green-500"
                >
                  Gym Equipment
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Sports%20Wear"
                  className="transition hover:text-green-500"
                >
                  Sports Wear
                </Link>
              </li>

            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Customer Service
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/contact"
                  className="transition hover:text-green-500"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="transition hover:text-green-500"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/track-order"
                  className="transition hover:text-green-500"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  to="/returns-refunds"
                  className="transition hover:text-green-500"
                >
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping-policy"
                  className="transition hover:text-green-500"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="transition hover:text-green-500"
                >
                  FAQ
                </Link>
              </li>

            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>

            <p className="mb-4 text-sm text-gray-400">
              Subscribe to get updates on new products and exclusive offers.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-green-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm md:flex-row md:items-center md:justify-between">

          <p className="text-gray-500">
            © {new Date().getFullYear()} DREX. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">

            <Link
              to="/privacy-policy"
              className="text-gray-500 transition hover:text-green-500"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-conditions"
              className="text-gray-500 transition hover:text-green-500"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/site-map"
              className="text-gray-500 transition hover:text-green-500"
            >
              Sitemap
            </Link>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
