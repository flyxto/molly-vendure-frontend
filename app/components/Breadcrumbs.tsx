import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export function Breadcrumbs({
  items,
  productName,
}: {
  items: { name: string; slug: string; id: string }[];
  productName?: string;
}) {
  const { t } = useTranslation();

  // Filter out root collection and get the last collection (most specific)
  const filteredItems = items.filter(
    (item) => item.name !== '__root_collection__',
  );

  // For breadcrumbs, we only want the last (most specific) collection
  const lastCollection =
    filteredItems.length > 0 ? filteredItems[filteredItems.length - 1] : null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1 md:space-x-2">
        {/* Home */}
        <li>
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 text-xs md:text-sm font-medium"
          >
            Home
          </Link>
        </li>

        {/* Collection (if exists) */}
        {lastCollection && (
          <li className="flex items-center">
            <ChevronRightIcon
              className="flex-shrink-0 h-4 w-4 text-gray-400 mx-1 md:mx-2"
              aria-hidden="true"
            />
            <Link
              to={'/collections/' + lastCollection.slug}
              className="text-gray-500 hover:text-gray-700 text-xs md:text-sm font-medium"
            >
              {lastCollection.name}
            </Link>
          </li>
        )}

        {/* Product name (if provided) */}
        {productName && (
          <li className="flex items-center">
            <ChevronRightIcon
              className="flex-shrink-0 h-4 w-4 text-gray-400 mx-1 md:mx-2"
              aria-hidden="true"
            />
            <span className="text-gray-700 text-xs md:text-sm font-medium">
              {productName}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
