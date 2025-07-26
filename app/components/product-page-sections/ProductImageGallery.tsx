/** @format */

'use client';
import { useState } from 'react';

export default function ProductImageGallery({ assets }: any) {
  const [selectedImage, setSelectedImage] = useState(
    assets?.[0]?.preview || '',
  );

  // If no assets, return null or empty div
  if (!assets || assets.length === 0) {
    return <div className="space-y-4 md:col-span-3">No images available</div>;
  }

  return (
    <div className="space-y-4 md:col-span-3">
      {/* Main Image */}
      <div className="relative bg-[#efefef] rounded overflow-hidden aspect-square w-full mb-3 border group">
        <img
          src={selectedImage || assets[0].preview}
          alt="Main View"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Thumbnail Grid */}
      {assets.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {assets.map((image: any, index: number) => (
            <div
              key={image.id || index}
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
          ))}
        </div>
      )}
    </div>
  );
}
