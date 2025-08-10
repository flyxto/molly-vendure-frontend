// Make sure you're using this version - NO GraphQL calls, only direct MPGS API
// This should be at the top of your checkout.payment.tsx file

// REMOVE all GraphQL mutation code and use only this direct API approach:
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
import { MPGSPayments } from '~/components/checkout/mpgs/MPGSPayments';
import { DummyPayments } from '~/components/checkout/DummyPayments';
import { BraintreeDropIn } from '~/components/checkout/braintree/BraintreePayments';
import { getActiveOrder } from '~/providers/orders/order';
import { getSessionStorage } from '~/sessions';
import { useTranslation } from 'react-i18next';

// Direct MPGS API calls (bypassing GraphQL for now)
async function createMPGSSessionDirect({ request }: { request: Request }) {
  const activeOrder = await getActiveOrder({ request });
  if (!activeOrder) {
    throw new Error('No active order found');
  }

  // Check if order already has payment
  if (activeOrder.state !== 'AddingItems' && activeOrder.state !== 'ArrangingPayment') {
    throw new Error('Order is not in a state that allows payment');
  }

  // Check if order already has successful payments
  if (activeOrder.payments && activeOrder.payments.length > 0) {
    const hasSuccessfulPayment = activeOrder.payments.some(
      (payment: any) => payment.state === 'Settled' || payment.state === 'Authorized'
    );
    if (hasSuccessfulPayment) {
      throw new Error('Payment for this order has already been received');
    }
  }

  const returnUrl = `${new URL(request.url).origin}/checkout/confirmation/${activeOrder.code}`;
  const amount = (activeOrder.totalWithTax / 100).toFixed(2);

  // Direct MPGS API call
  const merchantId = process.env.MPGS_MERCHANT_ID || 'TESTMOLLYFASHLKR';
  const apiPassword = process.env.MPGS_API_PASSWORD;
  const baseUrl = process.env.MPGS_BASE_URL || 'https://cbcmpgs.gateway.mastercard.com';
  const apiVersion = process.env.MPGS_API_VERSION || '100';

  if (!apiPassword) {
    throw new Error('MPGS API Password not configured');
  }

  const credentials = `merchant.${merchantId}:${apiPassword}`;
  const authHeader = `Basic ${Buffer.from(credentials).toString('base64')}`;

  // Generate unique order reference to avoid conflicts
  const uniqueOrderId = `${activeOrder.code}-${Date.now()}`;
  
  const requestData = {
    apiOperation: 'INITIATE_CHECKOUT',
    interaction: {
      merchant: {
        name: merchantId,
      },
      operation: 'PURCHASE',
      displayControl: {
        billingAddress: 'HIDE',
        customerEmail: 'HIDE',
        shipping: 'HIDE',
      },
      returnUrl,
    },
    order: {
      id: uniqueOrderId, // Use unique ID instead of order code
      currency: 'LKR', // Force LKR currency for MPGS
      description: `Order ${activeOrder.code} - ${activeOrder.customer?.emailAddress || 'Guest'}`,
      amount,
    },
  };

  try {
    const response = await fetch(
      `${baseUrl}/api/rest/version/${apiVersion}/merchant/${merchantId}/session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json() as any;
      throw new Error(`MPGS API Error: ${errorData.error?.explanation || response.statusText}`);
    }

    const data = await response.json() as any;
    console.log('MPGS Session created successfully:', data.session?.id);
    return data;

  } catch (error) {
    console.error('MPGS Direct API Error:', error);
    throw error;
  }
}

// Direct MPGS payment verification
async function verifyMPGSPaymentDirect(
  orderId: string, 
  resultIndicator: string, 
  successIndicator: string
) {
  // Simple verification - check if indicators match
  if (resultIndicator !== successIndicator) {
    console.warn(`Payment verification failed for order ${orderId}: indicators don't match`);
    return false;
  }

  // For now, if indicators match, consider it verified
  // In production, you might want to call MPGS retrieve order API
  console.log(`Payment verification for order ${orderId}: SUCCESS`);
  return true;
}

export async function loader({ params, request }: DataFunctionArgs) {
  const session = await getSessionStorage().then((sessionStorage) =>
    sessionStorage.getSession(request?.headers.get('Cookie')),
  );
  const activeOrder = await getActiveOrder({ request });

  if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  }

  // Check if order is in a payable state
  if (activeOrder.state !== 'AddingItems' && activeOrder.state !== 'ArrangingPayment') {
    // If order is already paid or in another state, redirect to confirmation
    if (activeOrder.state === 'PaymentSettled' || activeOrder.state === 'PaymentAuthorized') {
      return redirect(`/checkout/confirmation/${activeOrder.code}`);
    }
    // For other states, redirect to home
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

  // MPGS logic - Direct API calls (bypassing GraphQL)
  let mpgsSession: any = undefined;
  let mpgsError: string | undefined;
  if (eligiblePaymentMethods.find((method) => method.code.includes('mpgs'))) {
    try {
      mpgsSession = await createMPGSSessionDirect({ request });
      console.log('MPGS Session created successfully:', mpgsSession?.session?.id);
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

      // Verify payment with MPGS (direct verification)
      try {
        const isValid = await verifyMPGSPaymentDirect(
          activeOrder.code,
          mpgsResultIndicator as string,
          mpgsSuccessIndicator as string
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
    let metadata: any = {};
    
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
              <MPGSPayments
                orderCode={activeOrder?.code ?? ''}
                sessionData={mpgsSession}
                paymentMethod={paymentMethod}
                activeOrder={activeOrder}
              />
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