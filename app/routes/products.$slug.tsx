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
  useNavigation,
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
import { ShoppingBag, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import ProductViewSeperator from '~/components/product-page-sections/ProductViewSeperator';
import ProductVideoPreview from '~/components/product-page-sections/ProductVideoPreview';
import SizeChart from '~/components/product-page-sections/SizeChart';
import RelatedProducts from '~/components/product-page-sections/RelatedProducts';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import ProductRatings from '~/components/product-page-sections/ProductRatings';
import ProductDetails from '~/components/product-page-sections/ProductDetails';

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

const parseVariants = (variants: any[]) => {
  return variants.map((variant) => {
    const words = variant.name.trim().split(/\s+/);
    const lastWord = words[words.length - 1];
    const secondLastWord = words.length > 1 ? words[words.length - 2] : null;

    let color = null;
    let size = null;
    let baseName = variant.name;

    if (SIZE_OPTIONS.includes(lastWord.toUpperCase())) {
      size = lastWord.toUpperCase();
      color = secondLastWord?.replace(/-/g, ' ');
      baseName = words.slice(0, -2).join(' ');
    } else {
      color = lastWord.replace(/-/g, ' ');
      baseName = words.slice(0, -1).join(' ');
    }

    return {
      ...variant,
      parsedColor: color,
      parsedSize: size,
      baseName: baseName,
    };
  });
};

export const meta: MetaFunction = ({ data }: any) => {
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

// Loading component
function ProductPageLoader() {
  return (
    <div className="flex flex-col gap-20 py-16 md:py-24">
      <div className="flex flex-col gap-8 max-w-7xl w-full mt-5 mx-auto px-4">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-16">
          {/* Left col - Image skeleton */}
          <div className="md:col-span-3">
            <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Right col - Product info skeleton */}
          <div className="flex flex-col md:col-span-3 gap-6">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>

            {/* Color/Size skeletons */}
            <div className="space-y-4 mt-8">
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-20 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Button skeleton */}
            <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse mt-8"></div>
          </div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="max-w-7xl w-full mx-auto px-4 space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
``;

export default function ProductSlug() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  // Show loader while navigating
  if (isLoading) {
    return <ProductPageLoader />;
  }

  const { product, error, result, randomRelatedProducts } =
    useLoaderData<typeof loader>();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};
  const addItemToOrderError = getAddItemToOrderError(error);
  const { t } = useTranslation();

  console.log('description :', product.description);

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

  const parsedVariants = parseVariants(product.variants);
  const colors = [...new Set(parsedVariants.map((v) => v.parsedColor))].filter(
    Boolean,
  ) as string[];
  const sizes = [...new Set(parsedVariants.map((v) => v.parsedSize))]
    .filter(Boolean)
    .sort((a, b) => {
      const order = SIZE_OPTIONS.indexOf(a) - SIZE_OPTIONS.indexOf(b);
      return order;
    }) as string[];

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const getAvailableSizesForColor = (color: string | null) => {
    if (!color) return sizes;
    return parsedVariants
      .filter((v) => v.parsedColor === color && v.parsedSize)
      .map((v) => v.parsedSize)
      .filter(Boolean);
  };

  const getAvailableColorsForSize = (size: string | null) => {
    if (!size) return colors;
    return parsedVariants
      .filter((v) => v.parsedSize === size && v.parsedColor)
      .map((v) => v.parsedColor)
      .filter(Boolean);
  };

  return (
    <div>
      <div className="flex flex-col gap-20 py-16 md:py-24">
        {/* Intro */}
        <div className="flex flex-col gap-8 max-w-7xl w-full mt-5 mx-auto px-4">
          <Breadcrumbs
            items={
              product.collections[product.collections.length - 1]
                ?.breadcrumbs ?? []
            }
            productName={product.name}
          ></Breadcrumbs>
          <h1 className="text-xl md:text-3xl font-semibold text-gray-900 md:hidden block">
            {product.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 ">
            {/* Left col */}
            <ProductImageGallery assets={product.assets} />
            {/* Right col */}
            <div className="flex flex-col md:col-span-3 md:gap-6">
              <div className="flex md:flex-col w-full gap-2 items-center md:items-start justify-between">
                <h1 className="text-xl md:text-3xl font-semibold text-gray-900 hidden md:block">
                  {product.name}
                </h1>

                {/* <div className="flex md:hidden gap-2 items-center">
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
                </div> */}
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
              <div className="mt-4 sm:mt-16 lg:mt-0">
                {/* Facets / variants */}
                <activeOrderFetcher.Form
                  method="post"
                  action="/api/active-order"
                >
                  <input type="hidden" name="action" value="addItemToOrder" />

                  {1 < product.variants.length ? (
                    <div className="my-4 space-y-6">
                      {/* Color Selection */}
                      {colors.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Color
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {colors.map((color) => {
                              const isAvailable =
                                sizes.length === 0 ||
                                getAvailableColorsForSize(
                                  selectedSize,
                                ).includes(color);

                              return (
                                <button
                                  key={color}
                                  type="button"
                                  disabled={!isAvailable}
                                  onClick={() => {
                                    // Toggle color selection - unselect if already selected
                                    if (selectedColor === color) {
                                      setSelectedColor(null);
                                      setSelectedSize(null);
                                      return;
                                    }

                                    setSelectedColor(color);
                                    // Get available sizes for this color
                                    const availableSizes =
                                      getAvailableSizesForColor(color);

                                    // If product has no sizes (color only), directly set the variant
                                    if (sizes.length === 0) {
                                      const newVariant = parsedVariants.find(
                                        (v) => v.parsedColor === color,
                                      );
                                      if (newVariant) {
                                        setSelectedVariantId(newVariant.id);
                                        setFeaturedAsset(
                                          newVariant.featuredAsset,
                                        );
                                      }
                                      return;
                                    }

                                    // If current size is not available for this color, select the first available size
                                    if (sizes.length > 0) {
                                      if (
                                        !availableSizes.includes(selectedSize)
                                      ) {
                                        setSelectedSize(
                                          availableSizes[0] || null,
                                        );
                                      }
                                    }

                                    // Find and set the variant
                                    const newVariant = parsedVariants.find(
                                      (v) => {
                                        if (sizes.length > 0) {
                                          const targetSize =
                                            availableSizes.includes(
                                              selectedSize,
                                            )
                                              ? selectedSize
                                              : availableSizes[0];
                                          return (
                                            v.parsedColor === color &&
                                            v.parsedSize === targetSize
                                          );
                                        } else {
                                          return v.parsedColor === color;
                                        }
                                      },
                                    );

                                    if (newVariant) {
                                      setSelectedVariantId(newVariant.id);
                                      setFeaturedAsset(
                                        newVariant.featuredAsset,
                                      );
                                    }
                                  }}
                                  className={`px-4 py-2 rounded-md border-2 transition-all ${
                                    selectedColor === color
                                      ? 'border-[#AF803C] bg-[#AF803C] text-white'
                                      : isAvailable
                                      ? 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  {color.replace(/-/g, ' ')}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Size Selection */}
                      {sizes.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Size
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => {
                              const availableSizes =
                                getAvailableSizesForColor(selectedColor);
                              const isAvailable = availableSizes.includes(size);

                              return (
                                <button
                                  key={size}
                                  type="button"
                                  disabled={!isAvailable}
                                  onClick={() => {
                                    // Toggle size selection - unselect if already selected
                                    if (selectedSize === size) {
                                      setSelectedSize(null);
                                      return;
                                    }

                                    setSelectedSize(size);
                                    // Find and set the variant with current color and this size
                                    const newVariant = parsedVariants.find(
                                      (v) =>
                                        v.parsedColor === selectedColor &&
                                        v.parsedSize === size,
                                    );
                                    if (newVariant) {
                                      setSelectedVariantId(newVariant.id);
                                      setFeaturedAsset(
                                        newVariant.featuredAsset,
                                      );
                                    }
                                  }}
                                  className={`px-4 py-2 rounded-md border-2 transition-all min-w-[60px] ${
                                    selectedSize === size
                                      ? 'border-[#AF803C] bg-[#AF803C] text-white'
                                      : isAvailable
                                      ? 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  {size}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <input
                        type="hidden"
                        name="variantId"
                        value={selectedVariantId}
                      />
                    </div>
                  ) : (
                    <input
                      type="hidden"
                      name="variantId"
                      value={selectedVariantId}
                    ></input>
                  )}

                  <div className="flex sm:flex-col1 align-baseline mt-8">
                    <button
                      type="submit"
                      className={`w-full flex-1 py-4 ${
                        activeOrderFetcher.state !== 'idle' ||
                        !selectedColor ||
                        (sizes.length > 0 && !selectedSize)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : qtyInCart === 0
                          ? 'bg-[#AF803C] text-white shadow-xs hover:bg-[#AF803C]/80'
                          : 'bg-green-600 active:bg-green-700 hover:bg-green-700'
                      }
                    transition-colors border border-transparent rounded-md py-3 px-8 flex items-center
                      justify-center text-base font-medium text-white focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full`}
                      disabled={
                        activeOrderFetcher.state !== 'idle' ||
                        !selectedColor ||
                        (sizes.length > 0 && !selectedSize)
                      }
                    >
                      {activeOrderFetcher.state !== 'idle' ? (
                        <span className="flex items-center">
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Adding...
                        </span>
                      ) : qtyInCart ? (
                        <span className="flex items-center">
                          ( {qtyInCart} ) {t('Add More+')}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          {t('product.addToCart')}
                        </span>
                      )}
                    </button>
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
          {/* Description */}
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="mt-4">
            <h3 className="sr-only">{t('product.description')}</h3>

            <div
              className="text-base max-w-3xl text-gray-700 
        [&>p]:mb-4 [&>p:last-child]:mb-0
        [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
        [&>table_td]:border [&>table_td]:border-gray-300 [&>table_td]:px-4 [&>table_td]:py-2
        [&>table_th]:border [&>table_th]:border-gray-300 [&>table_th]:px-4 [&>table_th]:py-2 [&>table_th]:bg-gray-100
        [&>table_strong]:font-semibold
        [&_strong]:font-semibold
        [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
        [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          </div>
        </div>
        <RelatedProducts randomRelatedProducts={randomRelatedProducts} />
      </div>
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
