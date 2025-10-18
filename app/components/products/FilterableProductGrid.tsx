import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import {
  ProductCard,
  ProductCardSkeleton,
} from '~/components/products/ProductCard';
import {
  translatePaginationFrom,
  translatePaginationTo,
} from '~/utils/pagination';
import { Pagination } from '~/components/Pagination';
import { NoResultsHint } from '~/components/products/NoResultsHint';
import { useRef } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@remix-run/react';

export function FilterableProductGrid({
  result,
  resultWithoutFacetValueFilters,
  facetValueIds,
  appliedPaginationPage,
  appliedPaginationLimit,
  allowedPaginationLimits,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  slug,
}: Awaited<
  ReturnType<
    ReturnType<
      typeof filteredSearchLoaderFromPagination
    >['filteredSearchLoader']
  >
> & {
  allowedPaginationLimits: Set<number>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (arg0: boolean) => void;
  slug?: string;
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );

  return (
    <div className="gap-x-4 w-full flex flex-col">
      <FacetFilterControls
        facetFilterTracker={facetValuesTracker.current}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      {isLoading ? (
        <div className="w-full mt-8">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 gap-x-4 w-full">
            {Array.from({ length: appliedPaginationLimit }).map((_, index) => (
              <ProductCardSkeleton key={index} collectionSlug={slug} />
            ))}
          </div>
        </div>
      ) : result.items.length > 0 ? (
        <div className="w-full mt-8">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 gap-x-4 w-full">
            {result.items.map((item) => (
              <ProductCard
                key={item.productId}
                {...item}
                collectionSlug={slug}
              />
            ))}
          </div>

          <div className="flex flex-row justify-between items-center gap-4 mt-8">
            <span className="self-start text-gray-500 text-sm mt-2">
              {t('product.showing')}{' '}
              {translatePaginationFrom(
                appliedPaginationPage,
                appliedPaginationLimit,
              )}{' '}
              {t('product.to')}{' '}
              {translatePaginationTo(
                appliedPaginationPage,
                appliedPaginationLimit,
                result.items.length,
              )}
            </span>
            <Pagination
              appliedPaginationLimit={appliedPaginationLimit}
              allowedPaginationLimits={allowedPaginationLimits}
              totalItems={result.totalItems}
              appliedPaginationPage={appliedPaginationPage}
            />
          </div>
        </div>
      ) : (
        <NoResultsHint
          facetFilterTracker={facetValuesTracker.current}
          className={'sm:col-span-4 sm:p-4'}
        />
      )}
    </div>
  );
}
