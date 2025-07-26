/** @format */

import React from 'react';

export default function StarRating({ stars, rating }: any) {
  return (
    <div className="flex gap-2 items-center">
      {/* Filled star */}
      <svg
        className="w-6 h-6 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>

      {/* Rating number */}
      <span className="font-semibold text-xl">{stars}</span>

      {/* Progress bar */}
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${rating}` }}
        />
      </div>
    </div>
  );
}
