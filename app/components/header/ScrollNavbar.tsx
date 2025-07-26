import { useEffect, useState } from 'react';

interface ScrollNavbarProps {
  children: React.ReactNode;
}

export function ScrollNavbar({ children }: ScrollNavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <nav
      className={`fixed top-0 h-20 lg:h-32 z-[100] w-full bg-gradient-to-b from-white via-white via-20% to-white/0 py-4 ${
        isVisible ? 'transform-none' : '-translate-y-full'
      } transition-transform duration-300 ease-in-out`}
    >
      {children}
    </nav>
  );
}
