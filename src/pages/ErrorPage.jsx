import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200 text-base-content">
      <div className="text-center p-6 bg-base-100 border border-base-300 rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-lg mb-4">Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded transition-colors inline-block"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
