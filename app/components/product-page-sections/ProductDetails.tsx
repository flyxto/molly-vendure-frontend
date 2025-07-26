/** @format */

import React from 'react';

export default function ProductDetails() {
  const productDetails = [
    {
      label: 'Color',
      description: 'Vibrant Orange, Hand-Dyed For A Unique Finish',
    },
    {
      label: 'Material',
      description: 'Soft, Breathable Fabric For All-Day Comfort',
    },
    {
      label: 'Design',
      description: 'Flattering Silhouette With A Modern Touch',
    },
    {
      label: 'Fit',
      description: 'Available In Multiple Sizes For A Perfect Fit',
    },
    {
      label: 'Occasion',
      description: 'Ideal For Casual Outings, Parties, Or Special Events',
    },
    {
      label: 'Care',
      description:
        'Machine Wash Cold, Gentle Cycle, Or Hand Wash For Longevity',
    },
  ];

  return (
    <div className="col-span-3 md:col-span-2 w-full flex-col flex gap-12">
      <h2 className="text-xl font-semibold">Product Details</h2>
      <div className="flex flex-col gap-2">
        {productDetails.map((detail, index) => (
          <div key={index} className="grid grid-cols-10 text-sm md:text-base">
            <p className="col-span-2 font-semibold ">{detail.label}</p>
            <p className="col-span-1  text-left ">:</p>
            <p className="col-span-7 flex text-gray-400 ">
              {detail.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
