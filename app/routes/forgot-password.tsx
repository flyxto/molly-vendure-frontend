import { ActionFunctionArgs, json } from '@remix-run/server-runtime';
import { Form, useActionData, Link } from '@remix-run/react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return json(
      { error: 'Please provide a valid email address' },
      { status: 400 },
    );
  }

  try {
    // Direct GraphQL call without using the account provider
    const apiUrl =
      process.env.VENDURE_API_URL || 'http://localhost:3000/shop-api';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries()),
      },
      body: JSON.stringify({
        query: `
          mutation requestPasswordReset($emailAddress: String!) {
            requestPasswordReset(emailAddress: $emailAddress) {
              __typename
              ... on Success {
                success
              }
              ... on ErrorResult {
                errorCode
                message
              }
            }
          }
        `,
        variables: { emailAddress: email.trim() },
      }),
    });

    const result = await response.json();

    if (
      result.data?.requestPasswordReset?.success ||
      result.data?.requestPasswordReset?.__typename === 'Success'
    ) {
      return json({ success: true });
    } else {
      return json(
        {
          error:
            result.data?.requestPasswordReset?.message ||
            'Failed to send reset email',
        },
        { status: 400 },
      );
    }
  } catch (error) {
    return json({ error: 'Unable to connect to server' }, { status: 500 });
  }
}

export default function ForgotPasswordPage() {
  const actionData = useActionData<typeof action>();

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
          Forgot Password
        </h2>
        <p className="text-gray-300 text-center mt-4">
          Enter your email to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-30">
        <div className="py-8 px-4 sm:px-10">
          {actionData?.success ? (
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <p className="text-sm text-green-700">
                Password reset email sent! Check your inbox.
              </p>
            </div>
          ) : (
            <Form method="post">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your email address"
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
                  Send Reset Link
                </button>
              </div>
            </Form>
          )}

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
