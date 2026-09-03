import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 py-16 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left">

            <span className="inline-block bg-blue-600/10 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              NEW ARRIVALS
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Discover the{" "}
              <span className="text-blue-500">
                Best Sports
              </span>{" "}
              Products for You
            </h1>

            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore our wide range of high-quality sports products at
              affordable prices. Shop now and enjoy the best deals!
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              {/* Shop Now */}
              <button
                onClick={() => navigate("/product")}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-300 px-7 py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/20"
              >
                Shop Now →
              </button>

              {/* Explore Deals */}
              <button
                onClick={() => navigate("/products?deal=true")}
                className="border border-gray-700 hover:border-blue-500 hover:text-blue-400 active:scale-95 transition-all duration-300 px-7 py-3 rounded-lg font-semibold"
              >
                Explore Deals
              </button>

            </div>

            {/* Stats */}
            <div className="mt-10 flex justify-center lg:justify-start gap-8">

              <div>
                <h3 className="text-2xl font-bold text-blue-500">
                  500+
                </h3>
                <p className="text-gray-500 text-sm">
                  Products
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-blue-500">
                  10K+
                </h3>
                <p className="text-gray-500 text-sm">
                  Customers
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-blue-500">
                  4.9★
                </h3>
                <p className="text-gray-500 text-sm">
                  Rating
                </p>
              </div>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">

            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/20 blur-3xl rounded-full"></div>

            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80"
              alt="Sports equipment"
              className="relative w-full max-w-lg h-[350px] sm:h-[450px] object-cover rounded-3xl border border-blue-500/20 shadow-2xl shadow-blue-900/30"
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;