import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
  addPaymentToOrder,
  getEligiblePaymentMethods,
  getNextOrderStates,
  transitionOrderToState,
} from '~/providers/checkout/checkout';
import { useLoaderData, Form } from '@remix-run/react';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import { DummyPayments } from '~/components/checkout/DummyPayments';
import { getActiveOrder } from '~/providers/orders/order';
import { getSessionStorage } from '~/sessions';
import { useTranslation } from 'react-i18next';
import { CreditCardIcon, DollarSign } from 'lucide-react';

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

  return json({
    eligiblePaymentMethods,
    error,
  });
}

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const paymentMethodCode = body.get('paymentMethodCode');
  const paymentNonce = body.get('paymentNonce');

  if (typeof paymentMethodCode === 'string') {
    const { nextOrderStates } = await getNextOrderStates({ request });
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

    // Fetch the active order again to get the order code for the return URL
    const activeOrder = await getActiveOrder({ request });
    if (!activeOrder) {
      throw new Response('Not Found', {
        status: 400,
        statusText: 'No active order found',
      });
    }

    // Dynamically create the return URL based on the request origin and order code
    const returnUrl = `${new URL(request.url).origin}/checkout/confirmation/${
      activeOrder.code
    }`;

    const result = await addPaymentToOrder(
      {
        method: paymentMethodCode,
        metadata: {
          nonce: paymentNonce,
          returnUrl, // Pass the dynamic returnUrl to the backend
        },
      },
      { request },
    );

    if (result.addPaymentToOrder.__typename === 'Order') {
      const payment = result.addPaymentToOrder.payments?.find(
        (p) => p.method === paymentMethodCode,
      );

      const sessionId = payment?.metadata?.public?.sessionId;

      if (sessionId) {
        // Corrected hosted checkout URL to use path parameters
        const hostedCheckoutUrl = `https://cbcmpgs.gateway.mastercard.com/checkout/pay/${sessionId}?checkoutVersion=1.0.0`;
        return redirect(hostedCheckoutUrl);
      } else {
        // For non-redirect payments, go to confirmation
        return redirect(
          `/checkout/confirmation/${result.addPaymentToOrder.code}`,
        );
      }
    } else {
      throw new Response('Not Found', {
        status: 400,
        statusText: result.addPaymentToOrder?.message,
      });
    }
  }

  return null;
}

export default function CheckoutPayment() {
  const { eligiblePaymentMethods, error } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  const paymentError = getPaymentError(error);

  return (
    <div className="flex flex-col-reverse items-center">
      {eligiblePaymentMethods.map((paymentMethod) => {
        // Mastercard Payment
        if (paymentMethod.code === 'commercial-bank') {
          return (
            <div className="py-12" key={paymentMethod.id}>
              {paymentError ? (
                <div>
                  <p className="text-red-700 font-bold">
                    {t('checkout.mpgsError', {
                      defaultValue: 'MPGS payment initialization failed.',
                    })}
                  </p>
                  <p className="text-sm">{paymentError}</p>
                </div>
              ) : (
                <Form
                  method="post"
                  className="flex flex-col items-center space-y-4"
                >
                  <input
                    type="hidden"
                    name="paymentMethodCode"
                    value="commercial-bank"
                  />

                  <button
                    type="submit"
                    className="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <CreditCardIcon className="w-5 h-5 mr-3"></CreditCardIcon>{' '}
                    Online Payments
                  </button>
                </Form>
              )}
            </div>
          );
        }

        // Cash on Delivery Payment
        if (paymentMethod.code === 'cash-on-delivery') {
          return (
            <div className="py-12" key={paymentMethod.id}>
              {paymentError ? (
                <div>
                  <p className="text-red-700 font-bold">
                    {t('checkout.codError', {
                      defaultValue: 'Cash on Delivery payment failed.',
                    })}
                  </p>
                  <p className="text-sm">{paymentError}</p>
                </div>
              ) : (
                <Form
                  method="post"
                  className="flex flex-col items-center space-y-4"
                >
                  <input
                    type="hidden"
                    name="paymentMethodCode"
                    value="cash-on-delivery"
                  />

                  <button
                    type="submit"
                    className="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <DollarSign className="w-5 h-5 mr-3" />
                    Cash on Delivery
                  </button>
                </Form>
              )}
            </div>
          );
        }

        // Fallback for other payment methods (optional - can be removed)
        return null;
      })}
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
