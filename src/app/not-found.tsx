"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-[#1a0f0f] via-[#2a0f0f] to-black text-white px-6">
      
      {/* 404 Number */}
      <h2 className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 via-pink-500 to-orange-400 animate-pulse">
        404
      </h2>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-pink-400">
        Oops! Page not found
      </h2>

      {/* Description */}
      <p className="text-gray-300 text-center max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back to delicious pizzas!
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-linear-to-r from-red-500 to-pink-500 text-white font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-lg hover:shadow-pink-500/40"
      >
        Go Home
      </Link>

      {/* Arrow */}
      <div className="mt-16 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-pink-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}