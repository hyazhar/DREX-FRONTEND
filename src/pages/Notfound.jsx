import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      
      <h1 className="text-8xl font-bold text-blue-600 md:text-9xl">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Sorry, the page you are looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:shadow-lg"
      >
        Back to Home
      </Link>

    </div>
  );
}

export default Notfound;