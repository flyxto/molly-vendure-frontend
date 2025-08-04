import {
  HashtagIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Form, Outlet, useLoaderData, useMatches } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { TabProps } from '~/components/tabs/Tab';
import { TabsContainer } from '~/components/tabs/TabsContainer';
import { getActiveCustomerDetails } from '~/providers/customer/customer';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({ activeCustomer });
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName } = activeCustomer!;
  const { t } = useTranslation();

  const tabs: TabProps[] = [
    {
      Icon: UserCircleIcon,
      text: t('account.details'),
      to: './',
    },
    {
      Icon: ShoppingBagIcon,
      text: t('account.purchaseHistory'),
      to: './history',
    },
    {
      Icon: MapPinIcon,
      text: t('account.addresses'),
      to: './addresses',
    },
    {
      Icon: HashtagIcon,
      text: t('account.password'),
      to: './password',
    },
  ];

  return (
    <div className="min-h-svh max-w-7xl xl:mx-auto px-4 pt-24 py-12 md:py-24">
      <div className="w-full flex justify-between items-start md:items-end">
        <div className="">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 ">
            {t('account.myAccount')}
          </h2>
          <p className="text-gray-500 mt-4">
            {t('account.welcomeBack')}, {firstName} {lastName}
          </p>
        </div>
        <Form method="post" action="/api/logout">
          <Button
            type="submit"
            className="!mt-2 border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white hover:scale-100"
          >
            {t('account.signOut')}
          </Button>
        </Form>
      </div>
      <TabsContainer tabs={tabs}>
        <Outlet></Outlet>
      </TabsContainer>
    </div>
  );
}
