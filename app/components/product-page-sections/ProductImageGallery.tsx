/** @format */

'use client';
import { useState } from 'react';

export default function ProductImageGallery({ assets }: any) {
  const [selectedImage, setSelectedImage] = useState(
    assets?.[0]?.preview || '',
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no assets, return null or empty div
  if (!assets || assets.length === 0) {
    return <div className="space-y-4 md:col-span-3">No images available</div>;
  }

  const thumbnailsToShow = 4;
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < assets.length - thumbnailsToShow;

  const handleScrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleScrollRight = () => {
    setCurrentIndex(
      Math.min(assets.length - thumbnailsToShow, currentIndex + 1),
    );
  };

  return (
    <div className="space-y-4 md:col-span-3">
      {/* Main Image */}
      <div className="relative bg-[#efefef] rounded overflow-hidden aspect-square w-full mb-3 border group">
        <img
          src={selectedImage || assets[0].preview}
          alt="Main View"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top w-full h-full"
        />
      </div>

      {/* Thumbnail Grid/Carousel */}
      {assets.length > 1 && (
        <div className="relative">
          {/* Left Arrow */}
          {assets.length > thumbnailsToShow && canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous images"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          {/* Thumbnail Grid with Scroll Animation */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / thumbnailsToShow)
                }%)`,
              }}
            >
              {assets.map((image: any, index: number) => (
                <div
                  key={image.id || index}
                  className="flex-shrink-0 px-1 sm:px-2"
                  style={{ width: `${100 / thumbnailsToShow}%` }}
                >
                  <div
                    className="relative aspect-square overflow-hidden rounded-sm bg-gray-100 border cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => setSelectedImage(image.preview)}
                  >
                    <img
                      src={image.preview}
                      alt={`Product view ${index + 1}`}
                      sizes="(max-width: 768px) 25vw, 12vw"
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {assets.length > thumbnailsToShow && canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next images"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
