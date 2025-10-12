import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';
import Hero from '~/components/home/Hero';
import StylesSection from '~/components/home/StylesSection';
import TimeDeals from '~/components/home/TimeDeals';
import LatestArrivals from '~/components/home/LatestArrivals';
import CategorySection from '~/components/home/CategorySection';
import Hero2 from '~/components/home/Hero2';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request, { take: 20 });
  return {
    collections,
    vendureApiUrl: process.env.VENDURE_API_URL,
  };
}

export default function Index() {
  const { collections, vendureApiUrl } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const headerImage = collections[0]?.featuredAsset?.preview;

  return (
    <>
      <div className="flex flex-col min-h-screen gap-20 overflow-x-hidden w-full">
        <Hero2 />
        <StylesSection />
        <LatestArrivals vendureApiUrl={vendureApiUrl} />
        <CategorySection />
        <TimeDeals />
      </div>
      {/* <section
        aria-labelledby="category-heading"
        className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-light tracking-tight text-gray-900"
          >
            {t('common.shopByCategory')}
          </h2>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
              <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a
            href="~/routes/__cart/index#"
            className="block text-sm font-semibold text-primary-600 hover:text-primary-500"
          >
            {t('common.browseCategories')}
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </section> */}
    </>
  );
}
