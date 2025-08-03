'use client';

import { useState, useEffect } from 'react';

interface ImageShufflesProps {
  side: string;
}

export default function ImageShuffles({ side }: ImageShufflesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const leftImages = [
    {
      src: '/images/signin/signin-img-1.webp',
      alt: 'Mountain landscape at sunset',
    },
    {
      src: '/images/signin/signin-img-2.webp',
      alt: 'Ocean waves on beach',
    },
    {
      src: '/images/signin/signin-img-3.webp',
      alt: 'Forest with tall trees',
    },
  ];

  const rightImages = [
    {
      src: '/images/signin/signin-img-4.webp',
      alt: 'City skyline at night',
    },
    {
      src: '/images/signin/signin-img-5.webp',
      alt: 'Desert landscape',
    },
    {
      src: '/images/signin/signin-img-6.webp',
      alt: 'Tropical beach paradise',
    },
  ];

  const images = side === 'left' ? leftImages : rightImages;

  // Auto-advance images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full mx-auto overflow-hidden">
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image.src || '/placeholder.svg'}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
