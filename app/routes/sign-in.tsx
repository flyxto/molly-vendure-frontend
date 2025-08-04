import { Link, useFetcher, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { login } from '~/providers/account/account';
import { ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '~/components/Button';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import ImageShuffles from '~/components/signin/ImageShuffle';
import { CheckCircleIcon } from 'lucide-react';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');
  if (typeof email === 'string' && typeof password === 'string') {
    const rememberMe = !!body.get('rememberMe');
    const redirectTo = (body.get('redirectTo') || '/account') as string;
    const result = await login(email, password, rememberMe, { request });
    if (result.__typename === 'CurrentUser') {
      return redirect(redirectTo, { headers: result._headers });
    } else {
      return json(result, {
        status: 401,
      });
    }
  }
}

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const login = useFetcher<ErrorResult>();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col justify-center sm:px-6 lg:px-8 h-svh relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/vccpsacloud/image/upload/v1745920804/Ellipse_8_o819io.png"
          alt="Form background shadow"
          width={800}
          height={800}
          className="absolute -top-50 -right-44 md:right-0 "
        />
        <img
          src="https://res.cloudinary.com/vccpsacloud/image/upload/v1745920804/Ellipse_8_o819io.png"
          alt="Form background shadow"
          width={600}
          height={600}
          className="rotate-180 absolute left-0 top-[25rem] "
        />

        <div className="absolute hidden md:block lg:-left-[10rem] xl:-left-[5rem] 2xl:-left-[10rem]  bottom-0 2xl:-bottom-[16rem] lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] lg:h-[50rem] xl:h-[50rem] 2xl:h-[70rem] z-20 ">
          <ImageShuffles side="left" />
        </div>
        <div className="absolute hidden md:block lg:-right-[10rem] xl:-right-[5rem] 2xl:-right-[10rem]  bottom-0 2xl:-bottom-[16rem] lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] lg:h-[50rem] xl:h-[50rem] 2xl:h-[70rem] z-20 ">
          <ImageShuffles side="right" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-6xl tracking-tight text-gray-900 font-semibold">
            Sign In
          </h2>
          <p className="text-gray-300 text-center mt-4">Welcome Back</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-30">
          <div className="py-8 px-4 sm:px-10">
            {/* <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 rounded p-4 text-center text-sm">
              <p>{t('vendure.demoCredentials')}</p>
              <p>
                {t('account.emailAddress')}
                {': '}
                <span className="font-bold">test@vendure.io</span>
              </p>
              <p>
                {t('account.password')}: <span className="font-bold">test</span>
              </p>
            </div> */}

            {searchParams.get('message') === 'password-reset-success' && (
              <div className="rounded-md bg-green-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Password Reset Successful
                    </h3>
                    <p className="text-sm text-green-700 mt-2">
                      Your password has been successfully reset. You can now
                      sign in with your new password.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <login.Form method="post">
              <fieldset disabled={login.state !== 'idle'} className="space-y-6">
                <input
                  type="hidden"
                  name="redirectTo"
                  value={searchParams.get('redirectTo') ?? undefined}
                />
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('account.emailAddress')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      defaultValue="test@vendure.io"
                      placeholder={t('account.emailAddress')}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('account.password')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder={t('account.password')}
                      defaultValue="test"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                      defaultChecked
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {t('account.rememberMe')}
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      {t('account.forgotPassword')}
                    </Link>
                  </div>
                </div>

                {login.data && login.state === 'idle' && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon
                          className="h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {t('account.errorSignIn')}
                        </h3>
                        <p className="text-sm text-red-700 mt-2">
                          {login.data.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <span className="flex gap-4 items-center">
                      {login.state !== 'idle' && (
                        <ArrowPathIcon className="animate-spin h-5 w-5 text-gray-500" />
                      )}
                      {t('account.signIn')}
                    </span>
                  </Button>
                </div>
              </fieldset>
            </login.Form>
            <p className="text-gray-400 text-center mt-4">
              Do not have an account?{' '}
              <span className="text-primary-600 font-medium">
                <Link to={'/sign-up'}>Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
