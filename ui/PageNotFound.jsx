import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <p className="mt-4 text-2xl text-gray-700">Oops! Page Not Found</p>
        <p className="mt-2 text-lg text-gray-500">
          The page you are looking for might have been moved or deleted.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="font-openSans px-3 py-1.5 rounded-sm bg-cyan-500 cursor-pointer text-gray-600 text-base font-medium tracking-wide mb-2"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
