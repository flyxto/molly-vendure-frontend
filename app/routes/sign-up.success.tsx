import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Form } from '@remix-run/react';
import { redirect } from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';

export async function action() {
  return redirect('/');
}

export default function SuccessPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-svh">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-md border-[#AF803C]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form className="space-y-6" method="post">
            <div>
              <div className="flex justify-center">
                <div className="flex-grow">
                  <CheckCircleIcon
                    className="h-20 w-20 m-auto mb-2 text-[#AF803C]"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <p className="text-center mb-5">{t('account.createdMessage')}</p>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[#AF803C] text-white shadow-xs hover:bg-[#AF803C]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('account.goHome')}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
