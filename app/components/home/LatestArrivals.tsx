import React, { useState, useEffect, useRef } from 'react';
import { ProductCard } from '../products/ProductCard';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from '../ui/button';
import ProductCarousel from './ProductCarousel';

function LatestArrivalsTitle() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const buttonRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isParagraphInView = useInView(paragraphRef, {
    once: true,
    amount: 0.5,
  });
  const isLeftLineInView = useInView(leftLineRef, { once: true, amount: 0.5 });
  const isRightLineInView = useInView(rightLineRef, {
    once: true,
    amount: 0.5,
  });
  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 });

  return (
    <div className="w-full translate-y-12 md:translate-y-0">
      <div>
        {/* H2 in the center with line to the left */}
        <div className="flex items-center justify-center w-full overflow-hidden ">
          <motion.hr
            ref={leftLineRef}
            className="border-[#655656] flex-grow hidden md:block"
            initial={{ width: 0, opacity: 0 }}
            animate={isLeftLineInView ? { width: '100%', opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          />
          <motion.h2
            ref={titleRef}
            className="text-3xl text-center md:text-5xl flex font-medium text-[#655656] md:whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            MEET OUR LATEST ARRIVALS
          </motion.h2>
          <motion.hr className="opacity-0 w-full hidden md:block" />
        </div>

        {/* P with text-right and width control for multiple lines */}
        <div className="hidden md:flex items-center justify-center w-full mt-4 space-x-4">
          <hr className="w-[50%] opacity-0" />
          <motion.p
            ref={paragraphRef}
            className="text-justify uppercase leading-tight text-sm max-w-md"
            initial={{ opacity: 0 }}
            animate={isParagraphInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
          >
            Discover our newest collection of stylish products designed to
            elevate your wardrobe. Each piece has been carefully selected to
            ensure quality and style.
          </motion.p>
          <motion.hr
            ref={rightLineRef}
            className="flex-grow border-[#AF803C]"
            initial={{ width: 0, opacity: 0 }}
            animate={isRightLineInView ? { width: '20%', opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          />
        </div>
      </div>
      <motion.div
        ref={buttonRef}
        className="flex md:hidden justify-center items-center my-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isButtonInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      >
        {/* <LocalizedClientLink href="/store">
          <Button variant="outline">Shop all</Button>
        </LocalizedClientLink> */}
      </motion.div>
    </div>
  );
}

// Add props interface
interface LatestArrivalsProps {
  vendureApiUrl?: string;
}

export default function LatestArrivals({ vendureApiUrl }: LatestArrivalsProps) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProductsByFacetValue(facetValueId: number, take: number) {
    const query = `
query SearchProducts($input: SearchInput!) {
  search(input: $input) {
    totalItems
    items {
      productId
      productName
      slug
      productAsset {
        id
        preview
      }
      priceWithTax {
        ... on PriceRange {
          min
          max
        }
        ... on SinglePrice {
          value
        }
      }
      currencyCode
    }
  }
}
    `;

    const variables = {
      input: {
        term: '',
        skip: 0,
        take: take,
        groupByProduct: true,
        facetValueFilters: [{ and: facetValueId }],
      },
    };

    try {
      const apiUrl = vendureApiUrl || '/api/vendure';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = (await response.json()) as any;

      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        throw new Error('GraphQL query failed');
      }

      return result.data.search.items.map((item: any) => ({
        id: item.productId,
        name: item.productName,
        slug: item.slug,
        featuredAsset: item.productAsset,
        variants: [
          {
            priceWithTax: item.priceWithTax?.value || item.priceWithTax?.min,
            currencyCode: item.currencyCode,
          },
        ],
      }));
    } catch (error) {
      console.error(
        `Error fetching products for facet ${facetValueId}:`,
        error,
      );
      throw error;
    }
  }

  async function getLatestProducts() {
    try {
      // Fetch 3 items from facet value 40
      const products40 = await fetchProductsByFacetValue(40, 3);

      // Fetch 3 items from facet value 41
      const products41 = await fetchProductsByFacetValue(41, 3);

      // Combine both arrays into a single array of 6 items
      const combinedProducts = [...products40, ...products41];

      console.log('Products from facet 40:', products40);
      console.log('Products from facet 41:', products41);
      console.log('Combined products:', combinedProducts);

      return combinedProducts;
    } catch (error) {
      console.error('Error fetching latest products:', error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getLatestProducts();
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error('Failed to get latest products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [vendureApiUrl]);

  if (loading) {
    return (
      <div className="text-center text-gray-400">
        Loading latest products...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  console.log('products : ', products);

  return (
    <div className="mx-auto max-w-7xl w-full sm:py-12 px-4">
      <LatestArrivalsTitle />
      <ProductCarousel products={products} />
      <div className="mt-4 sm:mt-10 hidden sm:grid grid-cols-3 gap-x-6 gap-y-12 w-full ">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            productAsset={item.featuredAsset}
            productName={item.name}
            slug={item.slug}
            priceWithTax={item.variants[0]?.priceWithTax}
            currencyCode={item.variants[0]?.currencyCode}
          />
        ))}
      </div>
    </div>
  );
}
