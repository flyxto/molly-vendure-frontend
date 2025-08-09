// app/routes/checkout.payment.tsx - Fixed TypeScript types
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
  addPaymentToOrder,
  createStripePaymentIntent,
  generateBraintreeClientToken,
  getEligiblePaymentMethods,
  getNextOrderStates,
  transitionOrderToState,
} from '~/providers/checkout/checkout';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { OutletContext } from '~/types';
import { CurrencyCode, ErrorCode, ErrorResult } from '~/generated/graphql';
import { StripePayments } from '~/components/checkout/stripe/StripePayments';
import { MPGSPayments } from '~/components/checkout/mpgs/MPGSPayments'; // New MPGS component
import { DummyPayments } from '~/components/checkout/DummyPayments';
import { BraintreeDropIn } from '~/components/checkout/braintree/BraintreePayments';
import { getActiveOrder } from '~/providers/orders/order';
import { getSessionStorage } from '~/sessions';
import { useTranslation } from 'react-i18next';

// Type definitions for MPGS responses
interface MPGSSessionResponse {
  checkoutMode: string;
  merchant: string;
  result: string;
  session: {
    id: string;
    updateStatus: string;
    version: string;
  };
  successIndicator: string;
}

interface MPGSErrorResult {
  errorCode: string;
  message: string;
}

interface MPGSGraphQLResponse {
  data?: {
    createMPGSSession?: MPGSSessionResponse | MPGSErrorResult;
    verifyMPGSPayment?: boolean;
  };
  errors?: Array<{
    message: string;
  }>;
}

// MPGS session creation using Shop API
async function createMPGSSession({
  request,
}: {
  request: Request;
}): Promise<MPGSSessionResponse> {
  const activeOrder = await getActiveOrder({ request });
  if (!activeOrder) {
    throw new Error('No active order found');
  }

  const returnUrl = `${new URL(request.url).origin}/checkout/confirmation/${
    activeOrder.code
  }`;
  const amount = (activeOrder.totalWithTax / 100).toFixed(2);

  // Get session data for customer authentication
  const session = await getSessionStorage().then((sessionStorage) =>
    sessionStorage.getSession(request?.headers.get('Cookie')),
  );

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add customer session token if available
  const customerToken = session.get('vendure-token');
  if (customerToken) {
    headers['Authorization'] = `Bearer ${customerToken}`;
  }

  // Call Vendure SHOP API (not admin API)
  const response = await fetch(`${process.env.VENDURE_API_URL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        mutation CreateMPGSSession($input: CreateMPGSSessionInput!) {
          createMPGSSession(input: $input) {
            ... on MPGSSessionResponse {
              checkoutMode
              merchant
              result
              session {
                id
                updateStatus
                version
              }
              successIndicator
            }
            ... on ErrorResult {
              errorCode
              message
            }
          }
        }
      `,
      variables: {
        input: {
          orderId: activeOrder.code,
          amount,
          currency: activeOrder.currencyCode,
          returnUrl,
          description: `Order ${activeOrder.code} - ${
            activeOrder.customer?.emailAddress || 'Guest'
          }`,
        },
      },
    }),
  });

  const data = (await response.json()) as MPGSGraphQLResponse;

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  if (!data.data?.createMPGSSession) {
    throw new Error('No MPGS session data received');
  }

  const sessionData = data.data.createMPGSSession;

  // Check if it's an error result
  if ('errorCode' in sessionData) {
    throw new Error(sessionData.message);
  }

  return sessionData as MPGSSessionResponse;
}

// MPGS payment verification using Shop API
async function verifyMPGSPayment(
  orderId: string,
  resultIndicator: string,
  successIndicator: string,
  request: Request,
): Promise<boolean> {
  const session = await getSessionStorage().then((sessionStorage) =>
    sessionStorage.getSession(request?.headers.get('Cookie')),
  );

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const customerToken = session.get('vendure-token');
  if (customerToken) {
    headers['Authorization'] = `Bearer ${customerToken}`;
  }

  const response = await fetch(`${process.env.VENDURE_API_URL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        mutation VerifyMPGSPayment($input: VerifyMPGSPaymentInput!) {
          verifyMPGSPayment(input: $input)
        }
      `,
      variables: {
        input: { orderId, resultIndicator, successIndicator },
      },
    }),
  });

  const data = (await response.json()) as MPGSGraphQLResponse;

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data?.verifyMPGSPayment || false;
}

export async function loader({ params, request }: DataFunctionArgs) {
  const session = await getSessionStorage().then((sessionStorage) =>
    sessionStorage.getSession(request?.headers.get('Cookie')),
  );
  const activeOrder = await getActiveOrder({ request });

  //check if there is an active order if not redirect to homepage
  if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  }

  const { eligiblePaymentMethods } = await getEligiblePaymentMethods({
    request,
  });
  const error = session.get('activeOrderError');

  // Existing Stripe logic
  let stripePaymentIntent: string | undefined;
  let stripePublishableKey: string | undefined;
  let stripeError: string | undefined;
  if (eligiblePaymentMethods.find((method) => method.code.includes('stripe'))) {
    try {
      const stripePaymentIntentResult = await createStripePaymentIntent({
        request,
      });
      stripePaymentIntent =
        stripePaymentIntentResult.createStripePaymentIntent ?? undefined;
      stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    } catch (e: any) {
      stripeError = e.message;
    }
  }

  // Existing Braintree logic
  let brainTreeKey: string | undefined;
  let brainTreeError: string | undefined;
  if (
    eligiblePaymentMethods.find((method) => method.code.includes('braintree'))
  ) {
    try {
      const generateBrainTreeTokenResult = await generateBraintreeClientToken({
        request,
      });
      brainTreeKey =
        generateBrainTreeTokenResult.generateBraintreeClientToken ?? '';
    } catch (e: any) {
      brainTreeError = e.message;
    }
  }

  // MPGS logic - Server-side session creation
  let mpgsSession: MPGSSessionResponse | undefined = undefined;
  let mpgsError: string | undefined;
  if (eligiblePaymentMethods.find((method) => method.code.includes('mpgs'))) {
    try {
      mpgsSession = await createMPGSSession({ request });
    } catch (e: any) {
      mpgsError = e.message;
      console.error('MPGS Session Creation Error:', e);
    }
  }

  return json({
    eligiblePaymentMethods,
    stripePaymentIntent,
    stripePublishableKey,
    stripeError,
    brainTreeKey,
    brainTreeError,
    mpgsSession,
    mpgsError,
    error,
  });
}

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const paymentMethodCode = body.get('paymentMethodCode');
  const paymentNonce = body.get('paymentNonce');

  // Handle MPGS payment verification
  const mpgsResultIndicator = body.get('mpgsResultIndicator');
  const mpgsSuccessIndicator = body.get('mpgsSuccessIndicator');

  if (typeof paymentMethodCode === 'string') {
    const { nextOrderStates } = await getNextOrderStates({
      request,
    });
    if (nextOrderStates.includes('ArrangingPayment')) {
      const transitionResult = await transitionOrderToState(
        'ArrangingPayment',
        { request },
      );
      if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
        throw new Response('Not Found', {
          status: 400,
          statusText: transitionResult.transitionOrderToState?.message,
        });
      }
    }

    // Handle MPGS payment verification before adding to order
    if (paymentMethodCode.includes('mpgs')) {
      if (!mpgsResultIndicator || !mpgsSuccessIndicator) {
        throw new Response('Missing MPGS payment data', { status: 400 });
      }

      const activeOrder = await getActiveOrder({ request });
      if (!activeOrder) {
        throw new Response('No active order', { status: 400 });
      }

      // Verify payment with MPGS
      try {
        const isValid = await verifyMPGSPayment(
          activeOrder.code,
          mpgsResultIndicator as string,
          mpgsSuccessIndicator as string,
          request,
        );

        if (!isValid) {
          throw new Response('Payment verification failed', { status: 400 });
        }
      } catch (error) {
        console.error('MPGS Payment Verification Error:', error);
        throw new Response('Payment verification failed', { status: 400 });
      }
    }

    // Prepare metadata based on payment method
    let metadata: Record<string, any> = {};

    if (paymentMethodCode.includes('mpgs')) {
      metadata = {
        resultIndicator: mpgsResultIndicator,
        successIndicator: mpgsSuccessIndicator,
      };
    } else if (paymentNonce) {
      metadata = { nonce: paymentNonce };
    }

    const result = await addPaymentToOrder(
      { method: paymentMethodCode, metadata },
      { request },
    );

    if (result.addPaymentToOrder.__typename === 'Order') {
      return redirect(
        `/checkout/confirmation/${result.addPaymentToOrder.code}`,
      );
    } else {
      throw new Response('Payment Failed', {
        status: 400,
        statusText: result.addPaymentToOrder?.message,
      });
    }
  }

  throw new Response('Invalid request', { status: 400 });
}

export default function CheckoutPayment() {
  const {
    eligiblePaymentMethods,
    stripePaymentIntent,
    stripePublishableKey,
    stripeError,
    brainTreeKey,
    brainTreeError,
    mpgsSession,
    mpgsError,
    error,
  } = useLoaderData<typeof loader>();
  const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
  const { t } = useTranslation();

  const paymentError = getPaymentError(error);

  return (
    <div className="flex flex-col items-center divide-gray-200 divide-y">
      {eligiblePaymentMethods.map((paymentMethod) =>
        paymentMethod.code.includes('braintree') ? (
          <div className="py-3 w-full" key={paymentMethod.id}>
            {brainTreeError ? (
              <div>
                <p className="text-red-700 font-bold">
                  {t('checkout.braintreeError')}
                </p>
                <p className="text-sm">{brainTreeError}</p>
              </div>
            ) : (
              <BraintreeDropIn
                fullAmount={activeOrder?.totalWithTax ?? 0}
                currencyCode={
                  activeOrder?.currencyCode ?? ('USD' as CurrencyCode)
                }
                show={true}
                authorization={brainTreeKey!}
              />
            )}
          </div>
        ) : paymentMethod.code.includes('stripe') ? (
          <div className="py-12" key={paymentMethod.id}>
            {stripeError ? (
              <div>
                <p className="text-red-700 font-bold">
                  {t('checkout.stripeError')}
                </p>
                <p className="text-sm">{stripeError}</p>
              </div>
            ) : (
              <StripePayments
                orderCode={activeOrder?.code ?? ''}
                clientSecret={stripePaymentIntent!}
                publishableKey={stripePublishableKey!}
              />
            )}
          </div>
        ) : paymentMethod.code.includes('mpgs') ? (
          <div className="py-12 w-full" key={paymentMethod.id}>
            {mpgsError ? (
              <div>
                <p className="text-red-700 font-bold">
                  {t('checkout.mpgsError', 'MPGS Payment Error')}
                </p>
                <p className="text-sm">{mpgsError}</p>
              </div>
            ) : (
              mpgsSession && (
                <MPGSPayments
                  orderCode={activeOrder?.code ?? ''}
                  sessionData={mpgsSession}
                  paymentMethod={paymentMethod}
                  activeOrder={activeOrder}
                />
              )
            )}
          </div>
        ) : (
          <div className="py-12" key={paymentMethod.id}>
            <DummyPayments
              paymentMethod={paymentMethod}
              paymentError={paymentError}
            />
          </div>
        ),
      )}
    </div>
  );
}

function getPaymentError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderPaymentStateError:
    case ErrorCode.IneligiblePaymentMethodError:
    case ErrorCode.PaymentFailedError:
    case ErrorCode.PaymentDeclinedError:
    case ErrorCode.OrderStateTransitionError:
    case ErrorCode.NoActiveOrderError:
      return error.message;
  }
}
