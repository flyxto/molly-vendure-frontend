import { Link, useLoaderData, useNavigation } from '@remix-run/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { UserIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { ScrollNavbar } from '~/components/header/ScrollNavbar';
import { MobileNavigation } from '~/components/header/MobileNavigation';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useState } from 'react';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const navigation = useNavigation();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const { t } = useTranslation();

  // Check if we're currently navigating
  const isNavigating = navigation.state !== 'idle';

  // Define navigation links similar to Medusa structure
  const navLinks = [
    { href: '/', label: 'HOME' },
    ...data.collections.map((collection) => ({
      href: `/collections/${collection.slug}`,
      label: collection.name.toUpperCase(),
    })),
    { href: '/contact', label: 'CONTACT US' },
  ];

  return (
    <>
      {/* Fullscreen Navigation Loader */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-md">
          <div className="flex flex-col items-center space-y-4">
            {/* Spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-primary-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
            </div>
            {/* Loading text */}
            {/* <p className="text-gray-600 font-medium">Loading...</p> */}
          </div>
        </div>
      )}

      <ScrollNavbar>
        {(
          mobileMenuOpen,
          setMobileMenuOpen,
          showMobileSearch,
          setShowMobileSearch,
        ) => (
          <>
            {/* Mobile Navigation */}
            <MobileNavigation
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              showMobileSearch={showMobileSearch}
              setShowMobileSearch={setShowMobileSearch}
              navLinks={navLinks}
              onCartIconClick={onCartIconClick}
              cartQuantity={cartQuantity}
              isSignedIn={isSignedIn}
            />
            <div className="max-w-7xl mx-auto container px-4">
              {/* Desktop View */}
              <div className="hidden lg:flex justify-between items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center" prefetch="intent">
                    <img
                      src="/images/nav-and-footer/navbar-molly_logo.png"
                      width={140}
                      height={40}
                      alt={t('common.logoAlt')}
                      className="max-w-[120px] sm:max-w-full"
                    />
                  </Link>
                </div>

                {/* Navigation Items */}
                <div className="flex items-center justify-center space-x-1">
                  {navLinks.map((link) => {
                    // Check if this specific link is being navigated to
                    const isActiveLink =
                      navigation.state === 'loading' &&
                      navigation.location?.pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        prefetch="intent"
                        className={`py-2 px-3 text-center transition-all duration-200 relative ${
                          isActiveLink
                            ? 'text-primary-600 opacity-70'
                            : 'text-gray-700 hover:text-primary-600'
                        }`}
                      >
                        {link.label}
                        {/* Loading indicator under active link */}
                        {isActiveLink && (
                          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full animate-pulse"></span>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Right side actions */}
                <div className="flex items-center justify-center space-x-4">
                  {/* Search Bar */}
                  <div className="w-64">
                    <SearchBar />
                  </div>

                  {/* Shopping Bag */}
                  <button
                    className={`relative p-2 transition-all duration-200 ${
                      isNavigating
                        ? 'text-gray-400 cursor-wait'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                    onClick={onCartIconClick}
                    aria-label="Open cart tray"
                    disabled={isNavigating}
                  >
                    <ShoppingBag className="w-7 h-7" />
                    {cartQuantity ? (
                      <div className="absolute rounded-full top-0 right-0 bg-primary-600 w-4 h-4 flex items-center justify-center text-xs text-white p-1">
                        {cartQuantity}
                      </div>
                    ) : null}
                  </button>

                  {/* User Account */}
                  <Link
                    to={isSignedIn ? '/account' : '/sign-in'}
                    prefetch="intent"
                    className={`flex items-center space-x-1 p-1 transition-all duration-200 ${
                      isNavigating
                        ? 'text-gray-400 pointer-events-none'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {isSignedIn ? (
                      <Avatar>
                        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Button disabled={isNavigating}>
                        {isNavigating ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </ScrollNavbar>
    </>
  );
}
