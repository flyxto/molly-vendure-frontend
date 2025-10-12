/** @format */
'use client';

import { ShoppingBasket } from 'lucide-react';
import { Link } from '@remix-run/react';
import { Button } from '../ui/button';
import { Price } from '../products/Price';

export default function ProductCarouselCard({ product }: any) {
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="w-full max-w-lg flex flex-col border-b border-b-black pb-2 mx-auto">
        {/* Product Image Container */}
        <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-3 border border-black group">
          {product.featuredAsset.preview ? (
            <img
              src={product.featuredAsset.preview}
              alt={product.name || 'Product image'}
              className="object-cover group-hover:scale-110 transition duration-300"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <Button
            variant="cart"
            className="mb-3 mr-3 p-2 absolute flex justify-center items-center bottom-0 right-0 rounded-full shadow-2xl bg-white h-14 w-14 border"
          >
            <ShoppingBasket className="m-0 p-0 h-8 w-8" />
          </Button>
        </div>

        {/* Product Details */}
        <h3 className="font-medium text-gray-800 mb-2  whitespace-nowrap truncate w-full">
          {product.name || 'Product Name'}
        </h3>

        {/* Price Information */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex gap-1 items-center">
            <Price
              priceWithTax={product.variants[0].priceWithTax}
              currencyCode={product.variants[0].currencyCode}
            />
            {/* {product.price && product.price !== 0 && (
              <p className="text-gray-400 line-through text-base">
                LKR {product.price}.00
              </p>
            )} */}
          </div>
          {/* <div className="w-px h-8 bg-black"></div> */}
          {/* Color Options */}
          {/* {product.colors && product.colors.length > 0 && (
            <div className="flex space-x-2">
              {product.colors.map((color: any, index: any) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </Link>
  );
}
