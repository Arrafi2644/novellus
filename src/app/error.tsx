"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-[#002047] via-gray-800 to-[#002047] text-white px-6">
      <h2 className="text-[6rem] md:text-[7rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-400 to-pink-500 animate-pulse">
        Error
      </h2>

      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-center">
        Something went wrong
      </h2>

      <p className="text-gray-400 text-center max-w-md mb-8">
        An unexpected error occurred while loading this page.  
        Please try again or come back later.
      </p>

      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl bg-linear-to-r from-red-400 to-pink-500 text-white font-medium hover:from-pink-500 hover:to-red-400 transition-all shadow-lg hover:shadow-pink-500"
      >
        Try Again
      </button>

      <div className="mt-16 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </section>
  );
}
