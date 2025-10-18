'use client'; // This is important for Next.js client components

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

// Type definitions for Lenis (if official types aren't complete)
type LenisOptions = {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
};

interface SmoothScrollWrapperProps {
  children: ReactNode;
}

export default function SmoothScrollWrapper({
  children,
}: SmoothScrollWrapperProps): JSX.Element {
  // Changed return type here
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    } as LenisOptions);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>; // Wrapped in fragment to return JSX.Element
}
