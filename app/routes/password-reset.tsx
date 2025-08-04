// REPLACE YOUR password-reset.tsx WITH THIS - TRY EACH URL UNTIL ONE WORKS:

import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/server-runtime';
import { Form, useActionData, useSearchParams, Link } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = formData.get('token');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (!token || typeof token !== 'string') {
    return json({ error: 'Invalid reset token' }, { status: 400 });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return json(
      { error: 'Password must be at least 6 characters' },
      { status: 400 },
    );
  }

  if (password !== confirmPassword) {
    return json({ error: 'Passwords do not match' }, { status: 400 });
  }

  try {
    const apiUrl =
      process.env.VENDURE_API_URL || 'http://localhost:3000/shop-api';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
            mutation resetPassword($token: String!, $password: String!) {
              resetPassword(token: $token, password: $password) {
                __typename
                ... on CurrentUser {
                  id
                  identifier
                }
                ... on ErrorResult {
                  errorCode
                  message
                }
              }
            }
          `,
        variables: { token, password },
      }),
    });

    if (response.ok) {
      const result = await response.json();

      if (
        result.data?.resetPassword?.id ||
        result.data?.resetPassword?.__typename === 'CurrentUser'
      ) {
        return redirect('/sign-in?message=password-reset-success');
      } else if (result.data?.resetPassword?.message) {
        return json(
          { error: result.data.resetPassword.message },
          { status: 400 },
        );
      }
    }
  } catch (error) {
    console.log(error);
  }

  return json(
    { error: 'Could not connect to server. Contact support.' },
    { status: 500 },
  );
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="flex flex-col justify-center items-center h-svh">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Reset Link
          </h2>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link
            to="/forgot-password"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center sm:px-6 lg:px-8 h-svh relative overflow-hidden">
      <img
        src="https://res.cloudinary.com/vccpsacloud/image/upload/v1745920804/Ellipse_8_o819io.png"
        alt="Form background shadow"
        width={800}
        height={800}
        className="absolute -top-50 -right-44 md:right-0"
      />
      <img
        src="https://res.cloudinary.com/vccpsacloud/image/upload/v1745920804/Ellipse_8_o819io.png"
        alt="Form background shadow"
        width={600}
        height={600}
        className="rotate-180 absolute left-0 top-[25rem]"
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-6xl tracking-tight text-gray-900 font-semibold">
          Reset Password
        </h2>
        <p className="text-gray-300 text-center mt-4">
          Enter your new password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-30">
        <div className="py-8 px-4 sm:px-10">
          <Form method="post">
            <input type="hidden" name="token" value={token} />

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Confirm new password"
                />
              </div>

              {actionData?.error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">{actionData.error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Reset Password
              </button>
            </div>
          </Form>

          <div className="mt-6 text-center">
            <Link
              to="/sign-in"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
