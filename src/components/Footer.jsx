import React from 'react'
function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
  <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    

    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
      
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-white">
          <span className="text-green-500">DREX</span>
        </h2>

        <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
          Your one-stop destination for cricket, football, badminton,
          gym equipment, sportswear, and all your favorite sports gear.
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-500 hover:text-white"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-500 hover:text-white"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>

          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-500 hover:text-white"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>

          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-500 hover:text-white"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
          Shop
        </h3>

        <ul className="space-y-3 text-sm">
          <li>
            <a href="#" className="transition hover:text-green-500">
              Cricket
            </a>
          </li>

          <li>
            <a href="#" className="transition hover:text-green-500">
              Football
            </a>
          </li>

          <li>
            <a href="#" className="transition hover:text-green-500">
              Badminton
            </a>
          </li>

          <li>
            <a href="#" className="transition hover:text-green-500">
              Gym Equipment
            </a>
          </li>

          <li>
            <a href="#" className="transition hover:text-green-500">
              Sports Wear
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
          Customer Service
        </h3>

        <ul className="space-y-3 text-sm">
          <li>
            <a href="/contact" className="transition hover:text-green-500">
              Contact Us
            </a>
          </li>

          <li>
            <a href="/trackOrder" className="transition hover:text-green-500">
              Track Order
            </a>
          </li>

          <li>
            <a href="/returnRefunds" className="transition hover:text-green-500">
              Returns & Refunds
            </a>
          </li>

          <li>
            <a href="/shippingPolicy" className="transition hover:text-green-500">
              Shipping Policy
            </a>
          </li>

          <li>
            <a href="/FAQ" className="transition hover:text-green-500">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
          Newsletter
        </h3>

        <p className="mb-4 text-sm text-gray-400">
          Subscribe to get updates on new products and exclusive offers.
        </p>

        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500"
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
    <div
      className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm md:flex-row md:items-center md:justify-between"
    >
      <p className="text-gray-500">
        © 2026 SportShop. All rights reserved.
      </p>

      <div className="flex flex-wrap gap-5">
        <a href="/privacy-policy" className="text-gray-500 transition hover:text-green-500">
          Privacy Policy
        </a>

        <a href="/terms-conditions" className="text-gray-500 transition hover:text-green-500">
          Terms & Conditions
        </a>

        <a href="/site-map" className="text-gray-500 transition hover:text-green-500">
          Sitemap
        </a>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer