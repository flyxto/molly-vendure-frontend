// app/components/checkout/mpgs/CheckoutForm.tsx - Standalone form component
import { useState, useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

interface CheckoutFormProps {
  sessionData: {
    sessionId: string;
    successIndicator: string;
    merchantId: string;
    checkoutMode: string;
  };
  paymentMethod: {
    id: string;
    code: string;
    name: string;
  };
  onPaymentSuccess?: (resultIndicator: string) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
}

export function CheckoutForm({
  sessionData,
  paymentMethod,
  onPaymentSuccess,
  onPaymentError,
  className = '',
}: CheckoutFormProps) {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    loadScript();
  }, []);

  const loadScript = async () => {
    if (scriptLoadedRef.current) {
      configureCheckout();
      return;
    }

    try {
      const script = document.createElement('script');
      script.src =
        'https://cbcmpgs.gateway.mastercard.com/static/checkout/checkout.min.js';
      script.setAttribute('data-error', 'mpgsErrorCallback');
      script.setAttribute('data-cancel', 'mpgsCancelCallback');

      // Set up global callbacks
      (window as any).mpgsErrorCallback = (error: any) => {
        const errorMessage = `Payment failed: ${
          error.cause || error.explanation || 'Unknown error'
        }`;
        setError(errorMessage);
        onPaymentError?.(errorMessage);
      };

      (window as any).mpgsCancelCallback = () => {
        const cancelMessage = 'Payment was cancelled';
        setError(cancelMessage);
        onPaymentError?.(cancelMessage);
      };

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      scriptLoadedRef.current = true;
      configureCheckout();
    } catch (error) {
      setError('Failed to load payment gateway');
    }
  };

  const configureCheckout = () => {
    if (typeof (window as any).Checkout === 'undefined') {
      setError('Payment gateway not available');
      return;
    }

    try {
      (window as any).Checkout.configure({
        session: {
          id: sessionData.sessionId,
        },
      });
      setIsLoaded(true);
    } catch (error) {
      setError('Failed to configure payment gateway');
    }
  };

  const showEmbeddedPayment = () => {
    try {
      (window as any).Checkout.showEmbeddedPage('#mpgs-embed-target');
    } catch (error) {
      setError('Failed to show payment form');
    }
  };

  const showPaymentPage = () => {
    try {
      (window as any).Checkout.showPaymentPage();
    } catch (error) {
      setError('Failed to open payment page');
    }
  };

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
      >
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => {
            setError(null);
            scriptLoadedRef.current = false;
            loadScript();
          }}
          className="mt-2 text-sm text-red-700 underline"
        >
          {t('common.tryAgain', 'Try Again')}
        </button>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
        <p className="text-gray-600">
          {t('checkout.loadingPaymentForm', 'Loading payment form...')}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4 mb-6">
        <button
          onClick={showEmbeddedPayment}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {t('checkout.payWithCardEmbedded', 'Pay with Card (Embedded)')}
        </button>

        <button
          onClick={showPaymentPage}
          className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          {t('checkout.payWithCardFullPage', 'Pay with Card (Full Page)')}
        </button>
      </div>

      <div
        id="mpgs-embed-target"
        className="min-h-96 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
      ></div>
    </div>
  );
}
