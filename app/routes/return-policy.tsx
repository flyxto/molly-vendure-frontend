import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Returns & Exchange Policy - Molly Fashion Circle' },
    {
      name: 'description',
      content: 'Returns & Exchange Policy for Molly Fashion Circle',
    },
  ];
};

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 pt-24 sm:pt-32">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Returns & Exchange Policy
          </h1>
          <div className="space-y-2 text-sm sm:text-base text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">
                Effective Date:
              </span>{' '}
              2025 October
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <span className="font-semibold text-gray-900">Website:</span>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <a
                  href="https://www.mollyfashion.lk"
                  className="text-[#AF803C] hover:text-[#8B6630] underline transition-colors break-all"
                >
                  www.mollyfashion.lk
                </a>
                <span className="hidden sm:inline text-gray-400">|</span>
                <a
                  href="https://www.mollyfashioncircle.lk"
                  className="text-[#AF803C] hover:text-[#8B6630] underline transition-colors break-all"
                >
                  www.mollyfashioncircle.lk
                </a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            At Molly Fashion Circle, we aim to make your shopping experience
            seamless and enjoyable. If you are not fully satisfied with your
            purchase, we offer flexible return and exchange options as outlined
            below.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 sm:space-y-12">
          {/* Section 1 - Returns Policy */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              1. Returns Policy
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                You may return items within{' '}
                <strong className="text-gray-900">7 days</strong> of receiving
                your order.
              </p>
              <ul className="space-y-3 ml-4 sm:ml-6">
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Returned items must be unused, in original packaging, with
                    all tags attached, and in the same condition as received.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>Returns must be shipped via courier services.</span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Return shipping costs are the customer's responsibility,
                    unless the return is due to an error on our part (e.g.,
                    defective or incorrect product).
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 - Exchange Policy */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              2. Exchange Policy
            </h2>
            <div className="space-y-4">
              <ul className="space-y-3 ml-4 sm:ml-6">
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Products are eligible for exchange if they are new, unworn,
                    unaltered, and resellable.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    For hygiene reasons, white garments, underwear, swimwear,
                    and nightwear cannot be exchanged if the seal has been
                    broken, removed, or the product has been used.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Exchange requests must be made to our customer support team
                    within <strong className="text-gray-900">2 days</strong> of
                    receiving your order.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Delivery charges apply for exchanges, including pickup and
                    reattempted deliveries.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Exchanges are not available on sale, discounted, or
                    promotional items.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Once the returned product passes inspection at our
                    warehouse, the exchange will be processed promptly.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 - Credit Note Policy */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              3. Credit Note Policy (Refund Alternative)
            </h2>
            <div className="space-y-6">
              <div className="bg-amber-50 border-l-4 border-[#AF803C] p-4 rounded-r-lg">
                <p className="text-gray-900 font-medium">
                  Molly Fashion Circle does <strong>not</strong> offer cash
                  refunds. Instead, a credit note will be issued when a
                  replacement product cannot be provided.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  When a Credit Note Will Be Issued
                </h3>
                <ul className="space-y-3 ml-4 sm:ml-6">
                  <li className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                      •
                    </span>
                    <span>
                      If a product is defective, incorrect, or damaged during
                      delivery and a replacement is not available at that time.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Credit Note Details
                </h3>
                <ul className="space-y-3 ml-4 sm:ml-6">
                  <li className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                      •
                    </span>
                    <span>
                      The credit note will be equal to the value of the approved
                      return (excluding shipping charges).
                    </span>
                  </li>
                  <li className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                      •
                    </span>
                    <span>
                      It will be processed within{' '}
                      <strong className="text-gray-900">3 business days</strong>{' '}
                      after the returned item has been inspected.
                    </span>
                  </li>
                  <li className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                      •
                    </span>
                    <span>
                      Credit notes will be issued electronically and can be used
                      on future purchases on our website.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 - Non-Returnable Items */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              4. Non-Returnable Items
            </h2>
            <ul className="space-y-3 ml-4 sm:ml-6">
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>Gift cards</span>
              </li>
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>Sale/discounted items</span>
              </li>
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>
                  White garments, underwear, or swimwear with broken seals
                </span>
              </li>
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>Used, worn, or altered products</span>
              </li>
            </ul>
          </section>

          {/* Section 5 - Return & Exchange Process Timeline */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              5. Return & Exchange Process Timeline
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#AF803C] text-white flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Contact Customer Support
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Notify us within{' '}
                      <strong className="text-gray-900">7 days</strong> of
                      receiving your item.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#AF803C] text-white flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Send the Item Back
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ship via courier with tracking. Our support team will
                      guide you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#AF803C] text-white flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Inspection
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our warehouse team will verify the product's condition.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#AF803C] text-white flex items-center justify-center font-semibold text-sm">
                    4
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Process Completion
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      An exchange or credit note will be issued within{' '}
                      <strong className="text-gray-900">3 business days</strong>{' '}
                      after inspection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 - Shipping Guidelines */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              6. Shipping Guidelines
            </h2>
            <ul className="space-y-3 ml-4 sm:ml-6">
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>
                  Keep the tracking number or order number for reference.
                </span>
              </li>
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>Ensure the package is securely sealed.</span>
              </li>
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>
                  Include your order number and reason for return in the
                  package.
                </span>
              </li>
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                <span>
                  If the return is due to our error, we will provide a prepaid
                  shipping label.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
