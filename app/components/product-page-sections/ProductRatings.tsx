/** @format */

import React from 'react';
import StarRating from './StarRating';

export default function ProductRatings() {
  const ratings = [
    { stars: 5, ratings: '70%' },
    { stars: 4, ratings: '30%' },
    { stars: 3, ratings: '15%' },
    { stars: 2, ratings: '10%' },
    { stars: 1, ratings: '5%' },
  ];
  return (
    <div className="flex col-span-3 flex-col gap-12 w-full">
      {/* title */}
      <h2 className="text-xl font-semibold">Rating & Reviews</h2>
      {/* ratings */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* ratings in number */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-3">
            <p className="text-8xl md:text-9xl font-medium">4,5</p>
            <p className="text-3xl text-gray-300">/ 5</p>
          </div>
          <p className="text-gray-300">(56 reviews)</p>
        </div>
        {/* rating in percentage range */}
        <div className="flex flex-grow flex-col gap-3">
          {ratings.map((rating, index) => (
            <StarRating
              key={index}
              stars={ratings[index].stars}
              rating={ratings[index].ratings}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
