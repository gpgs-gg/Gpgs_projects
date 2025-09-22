import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="text-center max-w-md">
        {/* Optional: Replace with an SVG or image */}
        <div className="text-8xl font-extrabold text-green-900">404</div>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">Page Not Found</h1>

        <p className="mt-2 text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
