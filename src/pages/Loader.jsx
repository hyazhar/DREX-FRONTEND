import React from "react";
function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white">

      <div className="flex flex-col items-center">

        {/* Animated Loader */}
        <div className="relative flex h-24 w-24 items-center justify-center">

          {/* Outer Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-100 border-t-blue-600 border-r-blue-400"></div>

          {/* Inner Glow */}
          <div className="absolute h-16 w-16 animate-pulse rounded-full bg-blue-50"></div>

          {/* DREX Logo */}
          <span className="relative text-xl font-extrabold tracking-wider text-blue-600">
            DREX
          </span>
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold tracking-wide text-gray-800">
            DREX
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Wait Baby Wait
            <span className="inline-flex w-5">
              <span className="animate-pulse">...</span>
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Loader;
