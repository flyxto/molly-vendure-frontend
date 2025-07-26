/** @format */

import { useLoaderData } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { CollectionCard } from '../collections/CollectionCard';
import { ProductCard } from '../products/ProductCard';

// Loader function to fetch collection data
export default function RelatedProducts({ randomRelatedProducts }: any) {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 flex flex-col gap-20">
      <div className="flex flex-col">
        {/* title */}
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-center gap-8 w-full">
            <hr className="hidden md:block flex-grow border-black" />
            <h1 className="whitespace-nowrap text-center text-3xl md:text-5xl">
              YOU MIGHT ALSO LIKE
            </h1>
            <hr className="hidden md:block flex-grow opacity-0" />
          </div>
        </div>
        {/* Description */}
        <div className="hidden md:flex items-center justify-center w-full mt-4 space-x-4">
          <hr className="w-[50%] opacity-0" />
          <p className="text-justify uppercase leading-tight text-sm max-w-md">
            Discover more collections from our curated selection of premium
            products that complement your style.
          </p>
          <hr className="flex-grow border-[#AF803C]" />
        </div>
      </div>

      {/* Random collection children */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {randomRelatedProducts.map((item: any) => (
          <ProductCard key={item.productId} {...item} />
        ))}
      </div>
    </div>
  );
}
