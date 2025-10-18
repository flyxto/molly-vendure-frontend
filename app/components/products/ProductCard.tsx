// import { SearchQuery } from '~/generated/graphql';
// import { Link } from '@remix-run/react';
// import { Price } from './Price';

// export type ProductCardProps = SearchQuery['search']['items'][number];
// export function ProductCard({
//   productAsset,
//   productName,
//   slug,
//   priceWithTax,
//   currencyCode,
// }: ProductCardProps) {
//   return (
//     <Link className="flex flex-col" prefetch="intent" to={`/products/${slug}`}>
//       <img
//         className="rounded-xl flex-grow object-cover aspect-[7/8]"
//         alt=""
//         src={productAsset?.preview + '?w=300&h=400'}
//       />
//       <div className="h-2" />
//       <div className="text-sm text-gray-700">{productName}</div>
//       <div className="text-sm font-medium text-gray-900">
//         <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
//       </div>
//     </Link>
//   );
// }

/** @format */
'use client';
import React, { useState } from 'react';
import ProductThumbail from '../../../../../public/Images/perfumes/perfume_1.jpg';
import { ShoppingCart } from 'lucide-react';
import { SearchQuery } from '~/generated/graphql';
import { Link } from '@remix-run/react';
import { Price } from './Price';
import { Button } from '../ui/button';

export type ProductCardProps = SearchQuery['search']['items'][number] & {
  collectionSlug?: string;
};

export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
  collectionSlug,
}: ProductCardProps) {
  const product = {
    name: 'Midnight Vogue Dress',
    imageUrl: '/Images/home-page/new_arrivals-img_1.png', // Replace with your actual image path
    colors: ['#b336b5', '#b46eb5', '#e2a6e3'], // Red color variants - just for display
    currentPrice: 4990.0,
    originalPrice: 5990.0,
  };

  return (
    <Link className="flex flex-col" prefetch="intent" to={`/products/${slug}`}>
      <div className="w-full flex flex-col border-b border-b-black pb-2 group ">
        {/* Product Image Container */}
        <div
          className={`relative bg-white rounded overflow-hidden w-full h-auto ${
            collectionSlug === 'home-lifestyle'
              ? 'aspect-square'
              : 'aspect-[2/3]'
          } mb-1 border border-black group`}
        >
          <img
            src={productAsset?.preview + '?w=800'}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
          {/* <Button
    // variant="cart"
    className="absolute bottom-0 left-0 m-2 active:scale-95 border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center 
     md:rounded-md md:w-auto md:h-auto md:px-3 md:py-1.5 md:gap-2"
  >
    <p className="hidden md:block">Add to Cart</p>
    <ShoppingCart className="w-4 h-4" />
  </Button> */}
        </div>

        {/* Product Details */}
        <h3 className=" text-sm text-gray-500 mb-2 whitespace-nowrap truncate w-full">
          {productName}
        </h3>

        {/* Color Options - Static display only */}
        {/* <div className="flex space-x-1 md:space-x-2 mb-3">
          {product.colors.map((color) => (
            <div
              key={color}
              className="w-3 h-3 md:w-5 md:h-5 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div> */}

        {/* Price Information */}
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-lg">
            <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
          </span>
          {/* {cheapestPrice && (
            <span className="text-gray-400 line-through text-sm md:text-base">
              {cheapestPrice?.calculated_price_number || 0}
            </span>
          )} */}
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton({
  collectionSlug,
}: {
  collectionSlug?: string;
}) {
  return (
    <div className="flex flex-col pb-2">
      <div
        className={`relative bg-gray-400 rounded overflow-hidden w-full h-auto ${
          collectionSlug === 'home-lifestyle' ? 'aspect-square' : 'aspect-[2/3]'
        } mb-1 animate-pulse`}
      />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
      <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
    </div>
  );
}
