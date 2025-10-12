/** @format */

'use client';
import { useState } from 'react';

// Helper function to optimize Vendure images
function getOptimizedImageUrl(url: string, width: number): string {
  if (!url) return '';

  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    // Don't set height - let it scale proportionally
    return urlObj.toString();
  } catch {
    return url;
  }
}

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

  // Calculate the actual height/width needed for each thumbnail
  const thumbnailHeight = 600 / thumbnailsToShow; // 150px per thumbnail on desktop
  const thumbnailWidth = 400 / thumbnailsToShow; // 100px per thumbnail on mobile

  return (
    <div className="md:col-span-3">
      {/* Desktop Layout - Side by Side */}
      <div className="hidden md:flex md:space-x-4 md:items-center">
        {/* Main Image */}
        <div className="relative bg-[#efefef] rounded overflow-hidden w-full border group">
          <img
            src={getOptimizedImageUrl(selectedImage || assets[0].preview, 800)}
            srcSet={`
              ${getOptimizedImageUrl(
                selectedImage || assets[0].preview,
                800,
              )} 1x,
              ${getOptimizedImageUrl(
                selectedImage || assets[0].preview,
                1600,
              )} 2x
            `}
            alt="Main View"
            sizes="(max-width: 768px) 100vw, (max-width: 600px) 50vw, 800px"
            className="object-contain object-center w-full h-full"
            loading="eager"
          />
        </div>

        {/* Vertical Thumbnail Carousel - Desktop */}
        {assets.length > 1 && (
          <div className="relative h-[600px]">
            {/* Up Arrow */}
            {assets.length > thumbnailsToShow && currentIndex > 0 && (
              <button
                onClick={handleScrollLeft}
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
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
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </button>
            )}

            {/* Thumbnail Grid with Scroll Animation */}
            <div className="overflow-hidden h-full">
              <div
                className="flex flex-col transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(-${currentIndex * thumbnailHeight}px)`,
                }}
              >
                {assets.map((image: any, index: number) => (
                  <div
                    key={image.id || index}
                    className="flex-shrink-0 py-1 sm:py-2"
                    style={{ height: `${thumbnailHeight}px` }}
                  >
                    <div
                      className="relative aspect-square overflow-hidden rounded-sm bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity border h-full"
                      onClick={() => setSelectedImage(image.preview)}
                    >
                      <img
                        src={getOptimizedImageUrl(image.preview, 200)}
                        srcSet={`
                          ${getOptimizedImageUrl(image.preview, 200)} 1x,
                          ${getOptimizedImageUrl(image.preview, 400)} 2x
                        `}
                        alt={`Product view ${index + 1}`}
                        sizes="(max-width: 768px) 25vw, 12vw"
                        className="object-cover object-top w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Down Arrow */}
            {assets.length > thumbnailsToShow &&
              currentIndex < assets.length - thumbnailsToShow && (
                <button
                  onClick={handleScrollRight}
                  className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              )}
          </div>
        )}
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="md:hidden space-y-4">
        {/* Main Image */}
        <div className="relative bg-[#efefef] rounded overflow-hidden w-full border group">
          <img
            src={getOptimizedImageUrl(selectedImage || assets[0].preview, 800)}
            srcSet={`
              ${getOptimizedImageUrl(
                selectedImage || assets[0].preview,
                800,
              )} 1x,
              ${getOptimizedImageUrl(
                selectedImage || assets[0].preview,
                1600,
              )} 2x
            `}
            alt="Main View"
            sizes="100vw"
            className="object-contain object-center w-full h-full"
            loading="eager"
          />
        </div>

        {/* Horizontal Thumbnail Carousel - Mobile */}
        {assets.length > 1 && (
          <div className="relative w-full">
            {/* Left Arrow */}
            {assets.length > thumbnailsToShow && currentIndex > 0 && (
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
            <div className="overflow-hidden w-full">
              <div
                className="flex flex-row transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * thumbnailWidth}px)`,
                }}
              >
                {assets.map((image: any, index: number) => (
                  <div
                    key={image.id || index}
                    className="flex-shrink-0 px-1"
                    style={{ width: `${thumbnailWidth}px` }}
                  >
                    <div
                      className="relative aspect-square overflow-hidden rounded-sm bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity border w-full"
                      onClick={() => setSelectedImage(image.preview)}
                    >
                      <img
                        src={getOptimizedImageUrl(image.preview, 200)}
                        srcSet={`
                          ${getOptimizedImageUrl(image.preview, 200)} 1x,
                          ${getOptimizedImageUrl(image.preview, 400)} 2x
                        `}
                        alt={`Product view ${index + 1}`}
                        sizes="25vw"
                        className="object-cover object-top w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {assets.length > thumbnailsToShow &&
              currentIndex < assets.length - thumbnailsToShow && (
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
    </div>
  );
}
