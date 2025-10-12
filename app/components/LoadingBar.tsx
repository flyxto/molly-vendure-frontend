import { useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';

/**
 * Centered loading overlay with blurred background
 * Shows in the center of the page during navigation
 */
export function LoadingBar() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const isNavigating = navigation.state !== 'idle';

  useEffect(() => {
    if (isNavigating) {
      // Show immediately when navigation starts
      setShouldRender(true);
      // Small delay before fade-in animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // Fade out
      setIsVisible(false);
      // Remove from DOM after animation completes
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isNavigating]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="progressbar"
      aria-label="Loading"
      aria-live="polite"
    >
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

      {/* Loading spinner container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {/* Animated spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-gray-200"></div>

          {/* Spinning ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary-600 border-r-primary-600 animate-spin"></div>

          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 animate-pulse">
            Loading...
          </p>
          <p className="text-sm text-gray-500 mt-1">Please wait</p>
        </div>
      </div>
    </div>
  );
}
