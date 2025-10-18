import { RootLoaderData } from '~/root';
import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import InfiniteMarquee from './MarqueeComponent';

const navigation = {
  store: [
    { page: 'contact', href: '/contact', label: 'Contact' },
    {
      page: 'Privacy Policy',
      href: '/privacy-policy',
      label: 'Privacy Policy',
    },
    {
      page: 'Terms & Conditions',
      href: '/terms-conditions',
      label: 'Terms & Conditions',
    },
  ],
};

// Hardcoded navigation links
const footerLinks = [
  { href: '/', label: 'HOME' },
  { href: '/collections/home-lifestyle', label: 'HOME & LIFESTYLE' },
  { href: '/collections/women', label: 'WOMEN' },
  { href: '/collections/men', label: 'MEN' },
  { href: '/contact', label: 'CONTACT US' },
];

export default function Footer({
  collections,
}: {
  collections: RootLoaderData['collections'];
}) {
  const { t } = useTranslation();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if the current URL contains /pages/coming-soon
    const currentUrl = window.location.href;
    if (currentUrl.includes('/pages/coming-soon')) {
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, []);

  // Return null if on the coming-soon page
  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
      <footer
        className="bg-[#AC8537] rounded-t-3x relative z-30"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        {/* Desktop View */}
        <div className="hidden md:block max-w-7xl mx-auto container pt-5 md:px-4">
          <div className="h-[30%] flex">
            <div className="w-[20%] items-center flex border-r-white border-r border-b border-b-white">
              {/* Logo */}
              <img
                src="/images/nav-and-footer/footer-molly_logo.png"
                alt="MOLLY FASHION CIRCLE"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="w-[80%] border-b border-b-white flex justify-end items-center relative">
              <div className="relative">
                <img
                  src="/images/nav-and-footer/payment-types.webp"
                  alt="Payment methods accepted"
                  width={250}
                  height={100}
                />
              </div>
            </div>
          </div>

          <div className="h-[80%] flex">
            <div className="w-[80%] uppercase text-white mt-4">
              <p className="text-xs block">
                Premium fashion and lifestyle products
              </p>
              <p className="text-xs block">curated for the modern consumer.</p>
              <p className="text-xs block">
                Discover quality, style, and comfort
              </p>
              <p className="text-xs block">in every piece we offer.</p>

              <div className="mt-14 w-fit">
                <a
                  href="https://www.instagram.com/molly_fashion_circle/"
                  className="text-white hover:text-[#201b11] transition flex items-center gap-3"
                >
                  <AiFillInstagram size={28} />
                  <p className="text-xs">INSTAGRAM</p>
                </a>
              </div>
              <div className="mt-4 w-fit">
                <a
                  href="https://web.facebook.com/SLmolly"
                  className="text-white hover:text-[#201b11] transition flex items-center gap-3"
                >
                  <FaFacebookSquare size={24} />

                  <p className="text-xs">FACEBOOK</p>
                </a>
              </div>
            </div>

            <div className="w-[20%] border-l border-l-white pl-8 flex flex-col space-y-4">
              {/* Hardcoded Collection Links */}
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white hover:text-[#201b11] mt-4 uppercase text-sm"
                >
                  {link.label}
                </Link>
              ))}

              {/* Store Links */}
              {navigation.store.map(({ page, href, label }) => (
                <a
                  key={page}
                  href={href}
                  className="text-white hover:text-[#201b11] uppercase text-sm"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-28 py-6">
          <div className="py-3 w-full bg-white rounded-full"></div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden w-full flex flex-col items-center text-white px-4 pt-6">
          {/* Logo */}
          <div className="w-full flex justify-center border-b border-white pb-4">
            <img
              src="/images/nav-and-footer/footer-molly_logo.png"
              alt="MOLLY FASHION CIRCLE"
              className="max-h-16 object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="w-full flex flex-col items-center space-y-3 mt-6 border-b border-white pb-6">
            {/* Hardcoded Collection Links */}
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-white hover:text-[#201b11] uppercase"
              >
                {link.label}
              </Link>
            ))}

            {/* Store Links */}
            {navigation.store.map(({ page, href, label }) => (
              <a
                key={page}
                href={href}
                className="text-white hover:text-[#201b11] uppercase"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Social Media */}
          <div className="flex justify-center space-x-6 my-4">
            <a
              href="https://www.instagram.com/molly_fashion_circle/"
              className="text-white hover:text-[#201b11]"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.017 2.04c3.291 0 3.68.012 4.975.072 1.2.055 1.85.249 2.284.413.574.223.983.49 1.413.92.43.43.697.839.92 1.413.164.434.358 1.084.413 2.284.06 1.295.072 1.684.072 4.975s-.012 3.68-.072 4.975c-.055 1.2-.249 1.85-.413 2.284-.223.574-.49.983-.92 1.413-.43.43-.839.697-1.413.92-.434.164-1.084.358-2.284.413-1.295.06-1.684.072-4.975.072s-3.68-.012-4.975-.072c-1.2-.055-1.85-.249-2.284-.413-.574-.223-.983-.49-1.413-.92-.43-.43-.697-.839-.92-1.413-.164-.434-.358-1.084-.413-2.284-.06-1.295-.072-1.684-.072-4.975s.012-3.68.072-4.975c.055-1.2.249-1.85.413-2.284.223-.574.49-.983.92-1.413.43-.43.839-.697 1.413-.92.434-.164 1.084-.358 2.284-.413 1.295-.06 1.684-.072 4.975-.072zm0-2.04c-3.347 0-3.768.014-5.085.074-1.318.061-2.218.275-3.008.586-.815.317-1.507.742-2.196 1.43-.688.689-1.113 1.381-1.43 2.196-.311.79-.525 1.69-.586 3.008C.014 8.271 0 8.692 0 12.017s.014 3.746.074 5.063c.061 1.318.275 2.218.586 3.008.317.815.742 1.507 1.43 2.196.689.688 1.381 1.113 2.196 1.43.79.311 1.69.525 3.008.586 1.317.06 1.738.074 5.085.074s3.768-.014 5.085-.074c1.318-.061 2.218-.275 3.008-.586.815-.317 1.507-.742 2.196-1.43.688-.689 1.113-1.381 1.43-2.196.311-.79.525-1.69.586-3.008.06-1.317.074-1.738.074-5.063s-.014-3.746-.074-5.063c-.061-1.318-.275-2.218-.586-3.008-.317-.815-.742-1.507-1.43-2.196-.689-.688-1.381-1.113-2.196-1.43-.79-.311-1.69-.525-3.008-.586C15.785.014 15.364 0 12.017 0z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M12.017 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <div className="border-r border-white h-8"></div>
            <a
              href="https://web.facebook.com/SLmolly"
              className="text-white hover:text-[#201b11]"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.630.771-1.630 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Marquee */}
        <div className="w-full text-white py-6 border-t border-t-white  border-b border-b-white">
          <div className="overflow-hidden">
            <InfiniteMarquee />
          </div>
        </div>

        {/* Payment methods for mobile */}
        <div className="md:hidden flex justify-center my-4">
          <img
            src="/images/nav-and-footer/payment-types.webp"
            alt="Payment methods accepted"
            width={200}
            height={80}
          />
        </div>

        {/* Copyright & Links */}
        <div className="text-white py-4 px-4 flex flex-col md:flex-row md:justify-between text-center md:text-left text-xs max-w-7xl mx-auto">
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()} MOLLY FASHION CIRCLE. ALL RIGHTS
            RESERVED
          </div>
          <div className="flex justify-center md:justify-end gap-4">
            {/* <a href="/privacy-policy" className="hover:underline uppercase">
              Privacy Policy
            </a>
            <a href="/terms-conditions" className="hover:underline uppercase">
              Terms & Conditions
            </a> */}
          </div>
        </div>
      </footer>
    </>
  );
}
