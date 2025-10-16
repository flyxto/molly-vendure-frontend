import { useEffect, useState, useRef } from 'react';

interface ScrollNavbarProps {
  children: (
    mobileMenuOpen: boolean,
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    showMobileSearch: boolean,
    setShowMobileSearch: React.Dispatch<React.SetStateAction<boolean>>,
  ) => React.ReactNode;
}

export function ScrollNavbar({ children }: ScrollNavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Handle outside clicks to close mobile search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMobileSearch &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }
    };

    if (showMobileSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileSearch]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dynamic gradient based on mobile menu state
  const gradientClass =
    mobileMenuOpen || showMobileSearch
      ? 'bg-white' // Solid white when mobile menu is open
      : 'bg-gradient-to-b from-white via-white via-20% to-white/0'; // Original gradient when closed

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 h-20 lg:h-32 z-30 w-full ${gradientClass} py-4 ${
        isVisible ? 'transform-none' : '-translate-y-full'
      } transition-transform duration-300 ease-in-out`}
    >
      {children(
        mobileMenuOpen,
        setMobileMenuOpen,
        showMobileSearch,
        setShowMobileSearch,
      )}
    </nav>
  );
}
