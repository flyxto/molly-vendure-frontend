import { Link } from '@remix-run/react';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ShoppingBag } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavigationProps {
  navLinks: NavLink[];
  onCartIconClick: () => void;
  cartQuantity: number;
  isSignedIn: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showMobileSearch: boolean;
  setShowMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileNavigation({
  navLinks,
  onCartIconClick,
  cartQuantity,
  isSignedIn,
  mobileMenuOpen,
  setMobileMenuOpen,
  showMobileSearch,
  setShowMobileSearch,
}: MobileNavigationProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Header */}
      <div className="relative flex justify-between items-center lg:hidden px-4">
        {/* Hamburger Menu */}
        <button
          className="p-1 text-gray-700 hover:text-primary-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 w-fit h-fit flex justify-center items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/images/nav-and-footer/navbar-molly_logo.png"
              alt={'common.logoAlt'}
              height={30}
              width={120}
            />
          </Link>
        </div>

        {/* Search and Cart Icons */}
        <div className="flex items-center space-x-2">
          <button
            className="p-1 text-gray-700 hover:text-primary-600"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          <button
            className="relative p-1 text-gray-700 hover:text-primary-600"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartQuantity ? (
              <div className="absolute rounded-full -top-1 -right-1 bg-primary-600 min-w-4 min-h-4 flex items-center justify-center text-xs text-white">
                {cartQuantity}
              </div>
            ) : null}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="lg:hidden bg-white w-full border-t border-gray-100 px-4 py-5 rounded-b-lg">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white absolute top-16 left-0 right-0 z-40 shadow-lg border-t">
          <div className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                prefetch="intent"
                className="py-2 text-gray-800 hover:text-primary-600 border-b border-gray-100 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* User Account Link */}
            <Link
              to={isSignedIn ? '/account' : '/sign-in'}
              className="flex items-center space-x-1 p-1 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isSignedIn ? (
                <div className="flex gap-2 items-center w-full justify-between">
                  <p className="text-lg uppercase">Profile</p>
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Button className="w-full py-4">Sign In</Button>
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
