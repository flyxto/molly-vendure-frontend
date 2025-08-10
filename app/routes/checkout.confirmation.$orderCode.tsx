// app/routes/checkout.confirmation.$orderCode.tsx - Simple version without GraphQL
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { orderCode } = params;
  const url = new URL(request.url);
  const resultIndicator = url.searchParams.get('resultIndicator');
  const sessionVersion = url.searchParams.get('sessionVersion');

  if (!orderCode) {
    throw new Response("Order code is required", { status: 400 });
  }

  return json({ 
    orderCode, 
    resultIndicator,
    sessionVersion,
    hasPaymentData: !!resultIndicator 
  });
}

export default function OrderConfirmation() {
  const { orderCode, resultIndicator, sessionVersion, hasPaymentData } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-xl">
        {/* Success Header */}
        <div className="flex items-center">
          <CheckCircleIcon className="h-8 w-8 text-green-500" />
          <h1 className="ml-3 text-3xl font-bold tracking-tight text-gray-900">
            Payment Successful!
          </h1>
        </div>

        {/* Payment Status */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Payment Completed Successfully
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Your payment has been processed and your order is confirmed.
                </p>
                {resultIndicator && (
                  <p className="mt-1">
                    <span className="font-medium">Transaction ID:</span> {resultIndicator}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-900">Order Number</dt>
                <dd className="mt-1 text-sm text-gray-600 font-mono">{orderCode}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900">Order Date</dt>
                <dd className="mt-1 text-sm text-gray-600">
                  {new Date().toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900">Payment Method</dt>
                <dd className="mt-1 text-sm text-gray-600">MPGS (Mastercard)</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900">Status</dt>
                <dd className="mt-1 text-sm text-gray-600">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Payment Confirmed
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Transaction Details */}
        {hasPaymentData && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Transaction Details</h2>
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                {resultIndicator && (
                  <div>
                    <dt className="text-sm font-medium text-gray-900">Result Indicator</dt>
                    <dd className="mt-1 text-sm text-gray-600 font-mono">{resultIndicator}</dd>
                  </div>
                )}
                {sessionVersion && (
                  <div>
                    <dt className="text-sm font-medium text-gray-900">Session Version</dt>
                    <dd className="mt-1 text-sm text-gray-600 font-mono">{sessionVersion}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-900">Payment Gateway</dt>
                  <dd className="mt-1 text-sm text-gray-600">MPGS - Mastercard Payment Gateway Services</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• You will receive an order confirmation email shortly</li>
            <li>• We'll send updates on your order status</li>
            <li>• Your order will be processed and shipped soon</li>
            <li>• Keep your order number ({orderCode}) for reference</li>
          </ul>
        </div>

        {/* Important Information */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Important Information</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Please save this confirmation page or take a screenshot</li>
            <li>• Contact customer support if you have any questions</li>
            <li>• Payment has been processed in LKR (Sri Lankan Rupees)</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 text-gray-900 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Print Confirmation
          </button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center border-t pt-6">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Email: support@mollyfashioncircle.lk | Phone: +94 777 220 633
          </p>
        </div>
      </div>
    </div>
  );
}