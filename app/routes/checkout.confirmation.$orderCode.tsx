import { DataFunctionArgs } from '@remix-run/server-runtime';
import { getOrderByCode } from '~/providers/orders/order';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { CartContents } from '~/components/cart/CartContents';
import { CartTotals } from '~/components/cart/CartTotals';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRevalidator } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { OrderDetailFragment } from '~/generated/graphql';
import { useTranslation } from 'react-i18next';

// Helper function to call the MPGS return handler
async function callMpgsReturnHandler(
  orderCode: string,
  resultIndicator: string,
) {
  const response = await fetch('/api/mpgs-return', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      orderCode,
      resultIndicator,
    }),
  });

  const data = await response.json();

  //console.log('API Response:', data);

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Payment verification failed');
  }

  return data;
}

export async function loader({ params, request }: DataFunctionArgs) {
  try {
    const order = await getOrderByCode(params.orderCode!, { request });
    return {
      order,
      error: false,
    };
  } catch (ex) {
    return {
      order: null,
      error: true,
    };
  }
}

export default function CheckoutConfirmation() {
  const { order, error } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const revalidator = useRevalidator();
  const [retries, setRetries] = useState(1);
  const [settlementStatus, setSettlementStatus] = useState<
    'idle' | 'processing' | 'success' | 'failed'
  >('idle');
  const [settlementMessage, setSettlementMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Prevent duplicate calls
  const { t } = useTranslation();

  const orderNotFound = !order && !error;
  const orderErrored = !order && error;
  const maxRetries = 5;
  const retriesExhausted = retries >= maxRetries;
  const retryTimeout = 2500;

  // Check for MPGS return parameters
  const resultIndicator = searchParams.get('resultIndicator');
  const orderCode = searchParams.get('orderCode') || order?.code;

  const retry = () => {
    if (!window) return;
    setRetries(retries + 1);
    window.setTimeout(() => {
      if (retries > maxRetries) return;
      revalidator.revalidate();
    }, retryTimeout);
  };

  // Handle MPGS payment return and auto-settlement
  useEffect(() => {
    const handleMpgsReturn = async () => {
      // Only process if we have both required parameters, haven't processed yet, and not currently processing
      if (
        resultIndicator &&
        orderCode &&
        settlementStatus === 'idle' &&
        !isProcessing
      ) {
        setIsProcessing(true); // Prevent duplicate calls
        setSettlementStatus('processing');
        setSettlementMessage('Processing your payment...');

        try {
          //console.log('Processing MPGS return...', { orderCode, resultIndicator });

          // Call the mutation to handle return and settle payment
          const result = await callMpgsReturnHandler(
            orderCode,
            resultIndicator,
          );

          //console.log('MPGS return result:', result);

          if (result.success) {
            setSettlementStatus('success');
            setSettlementMessage('Payment completed successfully!');

            // Revalidate to get updated order state
            setTimeout(() => {
              revalidator.revalidate();
            }, 1000);

            // Clear URL parameters after successful processing
            const url = new URL(window.location.href);
            url.searchParams.delete('resultIndicator');
            url.searchParams.delete('orderCode');
            url.searchParams.delete('sessionVersion');
            url.searchParams.delete('checkoutVersion');
            window.history.replaceState({}, '', url.toString());
          } else {
            setSettlementStatus('failed');
            setSettlementMessage(
              result.message || 'Payment verification failed',
            );
          }
        } catch (err) {
          console.error('Error processing MPGS return:', err);
          setSettlementStatus('failed');
          setSettlementMessage(
            err instanceof Error
              ? err.message
              : 'An error occurred while processing your payment',
          );
        } finally {
          setIsProcessing(false);
        }
      }
    };

    handleMpgsReturn();
  }, [resultIndicator, orderCode, settlementStatus, isProcessing]);

  useEffect(() => {
    if (orderErrored) {
      retry();
    }
  }, [order]);

  useEffect(() => {
    if (
      revalidator.state === 'idle' &&
      orderErrored &&
      retries <= maxRetries &&
      retries > 1
    ) {
      retry();
    }
  }, [revalidator.state]);

  if (orderNotFound) {
    return (
      <div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {t('checkout.orderNotFound')}
        </h2>
      </div>
    );
  }

  if (orderErrored && retriesExhausted) {
    return (
      <div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          <XCircleIcon className="text-red-600 w-8 h-8 sm:w-12 sm:h-12"></XCircleIcon>
          <span>{t('checkout.orderErrorTitle')}</span>
        </h2>
        <p className="text-lg text-gray-700">
          {t('checkout.orderErrorMessage')}
        </p>
      </div>
    );
  }

  if (orderErrored || settlementStatus === 'processing') {
    return (
      <div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-gray-900"></div>
          <span>
            {settlementStatus === 'processing'
              ? settlementMessage
              : t('checkout.orderProcessing')}
          </span>
        </h2>
      </div>
    );
  }

  // Show settlement failure message
  if (settlementStatus === 'failed') {
    return (
      <div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          <XCircleIcon className="text-red-600 w-8 h-8 sm:w-12 sm:h-12"></XCircleIcon>
          <span>Payment Failed</span>
        </h2>
        <p className="text-lg text-gray-700 mb-4">{settlementMessage}</p>
        <button
          onClick={() => (window.location.href = '/checkout')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Return to Checkout
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        <CheckCircleIcon className="text-green-600 w-8 h-8 sm:w-12 sm:h-12"></CheckCircleIcon>
        <span>{t('order.summary')}</span>
      </h2>
      <p className="text-lg text-gray-700">
        {t('checkout.orderSuccessMessage')}{' '}
        <span className="font-bold">{order!.code}</span>
      </p>

      {/* Show settlement success message */}
      {settlementStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-green-700">{settlementMessage}</p>
            </div>
          </div>
        </div>
      )}

      {order!.active && (
        <div className="rounded-md bg-blue-50 p-4 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                {t('checkout.paymentMessage')}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-12">
        <div className="mb-6">
          <CartContents
            orderLines={order!.lines}
            currencyCode={order!.currencyCode}
            editable={false}
          />
        </div>
        <CartTotals order={order as OrderDetailFragment}></CartTotals>
      </div>
    </div>
  );
}
