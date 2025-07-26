import React from 'react';
import { Button } from '../Button';
import { ShoppingBag } from 'lucide-react';

export default function ProductInfo({ product }: any) {
  return (
    <div className="flex flex-col md:col-span-3 md:gap-6">
      <div className="flex md:flex-col w-full gap-2 items-center md:items-start justify-between">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
          name
        </h1>

        <div className="hidden sm:flex gap-4">
          <div className="flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <svg
                  key={rating}
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-6.557 3.453 1.25-7.29L.196 7.318l7.306-1.063L10 0l2.498 6.255 7.306 1.063-4.497 4.43 1.25 7.29z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              (4.5 stars • 56 reviews)
            </p>
          </div>
        </div>
        <div className="flex md:hidden gap-2 items-center">
          <p className="text-gray-500">4.5</p>
          <svg
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.585l-6.557 3.453 1.25-7.29L.196 7.318l7.306-1.063L10 0l2.498 6.255 7.306 1.063-4.497 4.43 1.25 7.29z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="py-2 md:py-4">
        <p className="text-2xl md:text-3xl font-medium text-gray-500">0000</p>
      </div>

      {/* Add to Cart Button */}
      <Button
        //  variant="addToCart"
        className="py-8 text-base mt-6"
      >
        Add to Cart <ShoppingBag />
      </Button>
    </div>
  );
}
