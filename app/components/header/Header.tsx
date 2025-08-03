import { Link, useLoaderData } from '@remix-run/react';
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
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const { t } = useTranslation();

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
                <Link to="/" className="flex items-center">
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    prefetch="intent"
                    className="py-2 px-3 text-center text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex items-center justify-center space-x-4">
                {/* Search Bar */}
                <div className="w-64">
                  <SearchBar />
                </div>

                {/* Shopping Bag */}
                <button
                  className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  onClick={onCartIconClick}
                  aria-label="Open cart tray"
                >
                  <ShoppingBag className="w-7 h-7" />
                  {cartQuantity ? (
                    <div className="absolute rounded-full top-0 right-0 bg-primary-600 w-4 h-4 flex items-center justify-center text-xs text-white p-1">
                      {cartQuantity}
                    </div>
                  ) : null}
                </button>

                {/* User Account */}
                {/* {isSignedIn ? t('account.myAccount') : t('account.signIn')} */}
                <Link
                  to={isSignedIn ? '/account' : '/sign-in'}
                  className="flex items-center space-x-1 p-1 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  {isSignedIn ? (
                    <Avatar>
                      <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Button>Sign In</Button>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </ScrollNavbar>
  );
}
