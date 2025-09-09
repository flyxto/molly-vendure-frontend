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

    const result = await addPaymentToOrder(
      { method: paymentMethodCode, metadata: { nonce: paymentNonce } },
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
    <div className="flex flex-col items-center divide-gray-200 divide-y">
      {eligiblePaymentMethods.map((paymentMethod) =>
        paymentMethod.code === 'mpgs-hosted-checkout' ? (
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
                  value="mpgs-hosted-checkout"
                />
                <p className="text-gray-600">
                  {t('checkout.mpgsInstructions', {
                    defaultValue:
                      'Click the button below to complete your payment.',
                  })}
                </p>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Pay with Mastercard
                </button>
              </Form>
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
