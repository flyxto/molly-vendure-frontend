import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useState } from 'react';
import { Price } from '~/components/products/Price';
import { getProductBySlug } from '~/providers/products/products';
import {
  FetcherWithComponents,
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext,
  MetaFunction,
} from '@remix-run/react';
import { CheckIcon, HeartIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { APP_META_TITLE } from '~/constants';
import { CartLoaderData } from '~/routes/api.active-order';
import { getSessionStorage } from '~/sessions';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import Alert from '~/components/Alert';
import { StockLevelLabel } from '~/components/products/StockLevelLabel';
import TopReviews from '~/components/products/TopReviews';
import { ScrollableContainer } from '~/components/products/ScrollableContainer';
import { useTranslation } from 'react-i18next';
import ProductImageGallery from '~/components/product-page-sections/ProductImageGallery';
import ProductInfo from '~/components/product-page-sections/ProductInfo';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '~/components/ui/button';
import ProductViewSeperator from '~/components/product-page-sections/ProductViewSeperator';
import ProductVideoPreview from '~/components/product-page-sections/ProductVideoPreview';
import SizeChart from '~/components/product-page-sections/SizeChart';
import RelatedProducts from '~/components/product-page-sections/RelatedProducts';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import ProductRatings from '~/components/product-page-sections/ProductRatings';
import ProductDetails from '~/components/product-page-sections/ProductDetails';

export const meta: MetaFunction = ({ data }) => {
  return [
    {
      title: data?.product?.name
        ? `${data.product.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

const paginationLimitMinimumDefault = 25;
const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  50,
  100,
]);

const { validator, filteredSearchLoader } = filteredSearchLoaderFromPagination(
  allowedPaginationLimits,
  paginationLimitMinimumDefault,
);

export async function loader({ params, request, context }: DataFunctionArgs) {
  const { product } = await getProductBySlug(params.slug!, { request });

  if (!product) {
    throw new Response('Not Found', { status: 404 });
  }

  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const error = session.get('activeOrderError');

  // Get the product's collection slug for search
  const collectionSlug =
    product.collections[1]?.slug || product.collections[0]?.slug;

  let searchResults = null;

  // Only search if the product belongs to a collection
  if (collectionSlug) {
    const {
      result,
      resultWithoutFacetValueFilters,
      facetValueIds,
      appliedPaginationLimit,
      appliedPaginationPage,
      term,
    } = await filteredSearchLoader({
      params: { ...params, slug: collectionSlug }, // Use collection slug instead of product slug
      request,
      context,
    });

    // Create randomized related products array (5 random items)
    const shuffleArray = (array: any[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const randomRelatedProducts = result?.items
      ? shuffleArray(result.items).slice(0, 4)
      : [];

    searchResults = {
      result,
      term,
      resultWithoutFacetValueFilters,
      facetValueIds,
      appliedPaginationLimit,
      appliedPaginationPage,
      randomRelatedProducts,
    };
  }

  return json(
    {
      product,
      error,
      result: searchResults?.result || null, // This will now have data
      randomRelatedProducts: searchResults?.randomRelatedProducts || [], // New random array
      searchResults,
    },
    {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    },
  );
}

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function ProductSlug() {
  const { product, error, result, randomRelatedProducts } =
    useLoaderData<typeof loader>();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};
  const addItemToOrderError = getAddItemToOrderError(error);
  const { t } = useTranslation();

  console.log('Random related products:', randomRelatedProducts);

  if (!product) {
    return <div>{t('product.notFound')}</div>;
  }

  const findVariantById = (id: string) =>
    product.variants.find((v) => v.id === id);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0].id,
  );
  const selectedVariant = findVariantById(selectedVariantId);
  if (!selectedVariant) {
    setSelectedVariantId(product.variants[0].id);
  }

  const qtyInCart =
    activeOrder?.lines.find((l) => l.productVariant.id === selectedVariantId)
      ?.quantity ?? 0;

  const asset = product.assets[0];
  const brandName = product.facetValues.find(
    (fv) => fv.facet.code === 'brand',
  )?.name;

  const [featuredAsset, setFeaturedAsset] = useState(
    selectedVariant?.featuredAsset,
  );

  // Slug name
  console.log(
    'product:',
    product.collections[1]?.slug || product.collections[0]?.slug,
  );

  return (
    <div>
      <div className="flex flex-col gap-20 mt-24">
        {/* Intro */}
        <div className="flex flex-col gap-8 max-w-7xl w-full mt-5 mx-auto px-4">
          <Breadcrumbs
            items={
              product.collections[product.collections.length - 1]
                ?.breadcrumbs ?? []
            }
          ></Breadcrumbs>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-16 ">
            {/* Left col */}
            <ProductImageGallery assets={product.assets} />
            {/* Right col */}
            <div className="flex flex-col md:col-span-3 md:gap-6">
              <div className="flex md:flex-col w-full gap-2 items-center md:items-start justify-between">
                <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
                  {product.name}
                </h1>

                {/* <div className="hidden sm:flex gap-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <svg
                          key={rating}
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-6.557 3.453 1.25-7.29L.196 7.318l7.306-1.063L10 0l2.498 6.255 7.306 1.063-4.497 4.43 1.25 7.29z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      (4.5 stars • 56 reviews)
                    </p>
                  </div>
                </div> */}
                <div className="flex md:hidden gap-2 items-center">
                  <p className="text-gray-500">4.5</p>
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-6.557 3.453 1.25-7.29L.196 7.318l7.306-1.063L10 0l2.498 6.255 7.306 1.063-4.497 4.43 1.25 7.29z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="py-2 md:py-4">
                <p className="text-2xl md:text-3xl font-medium text-black">
                  <Price
                    priceWithTax={selectedVariant?.priceWithTax}
                    currencyCode={selectedVariant?.currencyCode}
                  ></Price>
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-gray-500">{selectedVariant?.sku}</span>
                  <StockLevelLabel stockLevel={selectedVariant?.stockLevel} />
                </div>
              </div>

              {/* Product info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                {/* Facets / variants */}
                <activeOrderFetcher.Form
                  method="post"
                  action="/api/active-order"
                >
                  <input type="hidden" name="action" value="addItemToOrder" />
                  {1 < product.variants.length ? (
                    <div className="my-4">
                      <label
                        htmlFor="option"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {t('product.selectOption')}
                      </label>
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        id="productVariant"
                        value={selectedVariantId}
                        name="variantId"
                        onChange={(e) => {
                          setSelectedVariantId(e.target.value);

                          const variant = findVariantById(e.target.value);
                          if (variant) {
                            setFeaturedAsset(variant!.featuredAsset);
                          }
                        }}
                      >
                        {product.variants.map((variant) => (
                          <option key={variant.id} value={variant.id}>
                            {variant.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <input
                      type="hidden"
                      name="variantId"
                      value={selectedVariantId}
                    ></input>
                  )}

                  {/* Description */}
                  <div className="">
                    <h3 className="sr-only">{t('product.description')}</h3>

                    <div
                      className="text-base text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    />
                  </div>

                  {/* shipping content */}
                  {/* <section className="mt-12 pt-12 border-t text-xs">
                  <h3 className="text-gray-600 font-bold mb-2">
                    {t('product.shippingAndReturns')}
                  </h3>
                  <div className="text-gray-500 space-y-1">
                    <p>{t('product.shippingInfo')}</p>
                    <p>{t('product.shippingCostsInfo')}</p>
                    <p>{t('product.returnsInfo')}</p>
                  </div>
                </section> */}
                  {/* Add to cart button */}
                  <div className="flex sm:flex-col1 align-baseline mt-4">
                    <button
                      type="submit"
                      className={`w-full flex-1 py-4 ${
                        activeOrderFetcher.state !== 'idle'
                          ? 'bg-gray-400'
                          : qtyInCart === 0
                          ? 'bg-black hover:bg-black'
                          : 'bg-green-600 active:bg-green-700 hover:bg-green-700'
                      }
                                     transition-colors border border-transparent rounded-md py-3 px-8 flex items-center
                                      justify-center text-base font-medium text-white focus:outline-none
                                      focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full`}
                      disabled={activeOrderFetcher.state !== 'idle'}
                    >
                      {qtyInCart ? (
                        <span className="flex items-center">
                          <CheckIcon className="w-5 h-5 mr-1" /> {qtyInCart}{' '}
                          {t('product.inCart')}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          {t('product.addToCart')}
                        </span>
                      )}
                    </button>

                    {/* <button
                    type="button"
                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      {t('product.addToFavorites')}
                    </span>
                  </button> */}
                  </div>
                  {addItemToOrderError && (
                    <div className="mt-4">
                      <Alert message={addItemToOrderError} />
                    </div>
                  )}
                </activeOrderFetcher.Form>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-full mx-auto px-4">
          {/* <ProductRatings /> */}
          <ProductDetails />
        </div>
        <ProductViewSeperator />
        {/* <ProductVideoPreview /> */}
        {/* <SizeChart /> */}
        <RelatedProducts randomRelatedProducts={randomRelatedProducts} />
      </div>
      {/* <div className="mt-24">
        <TopReviews></TopReviews>
      </div> */}
    </div>
  );
}

export function CatchBoundary() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        {t('product.notFound')}
      </h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
        {/* Image gallery */}
        <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <span className="rounded-md overflow-hidden">
            <div className="w-full h-96 bg-slate-200 rounded-lg flex content-center justify-center">
              <PhotoIcon className="w-48 text-white"></PhotoIcon>
            </div>
          </span>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="">{t('product.notFoundInfo')}</div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderModificationError:
    case ErrorCode.OrderLimitError:
    case ErrorCode.NegativeQuantityError:
    case ErrorCode.InsufficientStockError:
      return error.message;
  }
}
