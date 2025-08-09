// app/components/checkout/mpgs/MPGSPayments.tsx - Fixed to match backend response
import { useState, useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

declare global {
  interface Window {
    Checkout: any;
    mpgsErrorCallback: (error: any) => void;
    mpgsCancelCallback: () => void;
  }
}

// Updated interface to match the actual MPGS API response
interface MPGSSessionData {
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

interface MPGSPaymentsProps {
  orderCode: string;
  sessionData: MPGSSessionData;
  paymentMethod: {
    id: string;
    code: string;
    name: string;
  };
  activeOrder?: any;
}

export function MPGSPayments({
  orderCode,
  sessionData,
  paymentMethod,
  activeOrder,
}: MPGSPaymentsProps) {
  const fetcher = useFetcher();
  const { t } = useTranslation();

  const [isLoadingScript, setIsLoadingScript] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<
    'embedded' | 'fullpage' | null
  >(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (sessionData?.result === 'SUCCESS') {
      loadMPGSScript();
    } else {
      setError('Failed to create payment session');
    }
  }, [sessionData]);

  const loadMPGSScript = async () => {
    if (scriptLoadedRef.current || typeof window === 'undefined') {
      if (scriptLoadedRef.current) {
        configureMPGSCheckout();
      }
      return;
    }

    setIsLoadingScript(true);

    // Set up global callbacks
    window.mpgsErrorCallback = (error: any) => {
      console.error('MPGS Error:', error);
      setError(
        `Payment failed: ${
          error.cause || error.explanation || 'Unknown error'
        }`,
      );
    };

    window.mpgsCancelCallback = () => {
      console.log('Payment cancelled by user');
      setError('Payment was cancelled');
    };

    try {
      const script = document.createElement('script');
      script.src =
        'https://cbcmpgs.gateway.mastercard.com/static/checkout/checkout.min.js';
      script.setAttribute('data-error', 'mpgsErrorCallback');
      script.setAttribute('data-cancel', 'mpgsCancelCallback');

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      scriptLoadedRef.current = true;
      setIsScriptLoaded(true);
      configureMPGSCheckout();
    } catch (error) {
      setError('Failed to load payment gateway');
    } finally {
      setIsLoadingScript(false);
    }
  };

  const configureMPGSCheckout = () => {
    if (!sessionData || typeof window.Checkout === 'undefined') {
      setError('Payment gateway not available');
      return;
    }

    try {
      window.Checkout.configure({
        session: {
          id: sessionData.session.id, // Use the correct nested session ID
        },
      });
    } catch (error) {
      console.error('Error configuring checkout:', error);
      setError('Failed to configure payment gateway');
    }
  };

  const handlePaymentMethodSelect = async (method: 'embedded' | 'fullpage') => {
    setSelectedMethod(method);
    setError(null);

    if (!isScriptLoaded) {
      setError('Payment gateway not ready');
      return;
    }

    try {
      if (method === 'embedded') {
        window.Checkout.showEmbeddedPage('#mpgs-embed-target');
      } else {
        window.Checkout.showPaymentPage();
      }
    } catch (error) {
      console.error('Error showing payment:', error);
      setError('Failed to show payment form');
    }
  };

  // Check URL for payment result (when returning from full page checkout)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultIndicator = urlParams.get('resultIndicator');

    if (resultIndicator && sessionData?.successIndicator) {
      // Submit the payment
      const formData = new FormData();
      formData.append('paymentMethodCode', paymentMethod.code);
      formData.append('mpgsResultIndicator', resultIndicator);
      formData.append('mpgsSuccessIndicator', sessionData.successIndicator);

      fetcher.submit(formData, { method: 'post' });
    }
  }, [sessionData, paymentMethod.code, fetcher]);

  const handleRetry = () => {
    setError(null);
    setSelectedMethod(null);
    scriptLoadedRef.current = false;
    setIsScriptLoaded(false);
    loadMPGSScript();
  };

  if (!sessionData) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">
          {t('checkout.noSessionData', 'Payment session not available')}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Payment Method Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {paymentMethod.name}
        </h3>
        <p className="text-gray-600">
          Secure payment powered by Mastercard Payment Gateway Services
        </p>
      </div>

      {/* Order Summary */}
      {activeOrder && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-medium">{orderCode}</span>
            </div>
            <div className="flex justify-between">
              <span>Items:</span>
              <span className="font-medium">{activeOrder.totalQuantity}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                {activeOrder.currencyCode}{' '}
                {(activeOrder.totalWithTax / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Session Info for Debug */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h5 className="font-medium text-blue-900 mb-2">Debug Info:</h5>
          <div className="text-xs text-blue-700 space-y-1">
            <p>
              <strong>Session ID:</strong> {sessionData.session.id}
            </p>
            <p>
              <strong>Merchant:</strong> {sessionData.merchant}
            </p>
            <p>
              <strong>Result:</strong> {sessionData.result}
            </p>
            <p>
              <strong>Success Indicator:</strong> {sessionData.successIndicator}
            </p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoadingScript && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading payment gateway...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 font-medium">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-sm text-red-700 underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Payment Method Selection */}
      {isScriptLoaded && !error && !selectedMethod && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Select Payment Method
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => handlePaymentMethodSelect('embedded')}
              className="flex items-center justify-center px-6 py-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className="text-center">
                <div className="text-lg mb-1">💳</div>
                <div>Pay on this page</div>
                <div className="text-xs text-gray-500 mt-1">
                  Stay on this page to complete payment
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePaymentMethodSelect('fullpage')}
              className="flex items-center justify-center px-6 py-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className="text-center">
                <div className="text-lg mb-1">🌐</div>
                <div>Secure payment page</div>
                <div className="text-xs text-gray-500 mt-1">
                  Redirect to secure payment page
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Embedded Payment Container */}
      {selectedMethod === 'embedded' && (
        <div className="mt-6">
          <div
            id="mpgs-embed-target"
            className="min-h-96 border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50"
          >
            {/* MPGS will inject the payment form here */}
          </div>
          <button
            onClick={() => setSelectedMethod(null)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            ← Choose different payment method
          </button>
        </div>
      )}

      {/* Processing State for Full Page */}
      {selectedMethod === 'fullpage' && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Redirecting to secure payment page...</p>
        </div>
      )}

      {/* Security Information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              🔒 SSL Secured
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              💳 PCI Compliant
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              🛡️ 3D Secure
            </span>
          </div>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Your payment information is encrypted and secure. We never store
            your card details.
          </p>
        </div>
      </div>

      {/* Processing Overlay */}
      {fetcher.state === 'submitting' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-900 font-medium">
                Processing your payment...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please do not close this window
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
