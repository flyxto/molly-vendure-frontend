import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Privacy Policy - Molly Fashion Circle' },
    { name: 'description', content: 'Privacy Policy for Molly Fashion Circle' },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 pt-24 sm:pt-32">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Privacy Policy
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
        </div>

        {/* Content */}
        <div className="space-y-10 sm:space-y-12">
          {/* Section 1 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              1. Introduction
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Molly Fashion Circle ("we", "our", or "us") is committed to
                protecting your privacy and ensuring that your personal
                information is handled in a safe and responsible manner.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our websites, make
                purchases, or interact with our services.
              </p>
              <p className="font-medium text-gray-900">
                By using our websites, you agree to the terms of this Privacy
                Policy.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may collect the following types of information:
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Personal Information:
                </h3>
                <ul className="space-y-2 ml-4 sm:ml-6">
                  <li className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                      •
                    </span>
                    <span>
                      Name, email address, phone number, billing/shipping
                      address.
                    </span>
                  </li>
                  <li className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                      •
                    </span>
                    <span>
                      Payment details (processed securely via our payment
                      gateway).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Non-Personal Information:
                </h3>
                <ul className="space-y-2 ml-4 sm:ml-6">
                  <li className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                      •
                    </span>
                    <span>
                      Browser type, IP address, device information, and browsing
                      behavior on our site (for analytics and performance
                      improvement).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Cookies and Tracking Data:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies to personalize your experience, analyze
                  traffic, and store shopping cart data. (See "Cookies" section
                  below.)
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              3. How We Use Your Information
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Molly Fashion Circle and its service partners use your personal
                information to:
              </p>
              <ul className="space-y-3 ml-4 sm:ml-6">
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>Process and deliver your product orders.</span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Provide customer support and respond to your inquiries.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Send updates about your orders or promotions (only with your
                    consent).
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>Improve our website and user experience.</span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Conduct internal analytics and performance tracking.
                  </span>
                </li>
              </ul>
              <div className="bg-amber-50 border-l-4 border-[#AF803C] p-4 rounded-r-lg">
                <p className="text-gray-900 font-medium">
                  We do <strong>not</strong> sell, rent, or lease customer
                  information to third parties.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              4. Sharing Your Information
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We may share your information only in the following cases:
              </p>
              <ul className="space-y-3 ml-4 sm:ml-6">
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    With trusted third-party service providers (e.g., payment
                    processors, delivery partners) who assist in operating our
                    business.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    When required by law, legal process, or to protect the
                    rights and property of Molly Fashion Circle.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    In case of a merger or transfer of business assets, your
                    information may be part of the transferred assets.
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                All partners are required to maintain the confidentiality of
                your data and use it only for the agreed purpose.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              5. Security of Your Information
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We take the security of your personal information seriously.
              </p>
              <p>
                All sensitive data, such as payment information, is encrypted
                using{' '}
                <strong className="text-gray-900">
                  SSL (Secure Socket Layer)
                </strong>{' '}
                technology.
              </p>
              <p>
                Our systems are hosted in secure environments with restricted
                access.
              </p>
              <p className="text-gray-600 italic">
                However, no method of transmission over the Internet is 100%
                secure. You use our site at your own risk.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              6. Cookies
            </h2>
            <div className="space-y-6">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>A cookie is a small data file stored on your device.</p>
                <p>We use cookies to:</p>
              </div>
              <ul className="space-y-3 ml-4 sm:ml-6">
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Keep track of your shopping cart and login session.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Analyze web traffic and improve website performance.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>Personalize your browsing experience.</span>
                </li>
              </ul>

              <div className="space-y-4 mt-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Examples of Cookies We Use:
                </h3>
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                  <div className="inline-block min-w-full align-middle px-6 sm:px-0">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Cookie Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Purpose
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            CART
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Associate your session with your shopping cart.
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            CUSTOMER
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Encrypted identifier of your account.
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            FRONTEND
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Session ID for your visit.
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            CURRENCY
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Stores your preferred currency.
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 break-words">
                            PERSISTENT_
                            <wbr />
                            SHOPPING_CART
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Links to your previous cart items if you return.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              7. Managing Your Information
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                You can contact us anytime to:
              </p>
              <ul className="space-y-3 ml-4 sm:ml-6">
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Request access to or correction of your personal data.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>Opt out of promotional emails.</span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Request deletion of your account or stored data (subject to
                    legal obligations).
                  </span>
                </li>
              </ul>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  Please email us at{' '}
                  <a
                    href="mailto:hello@mollyfashion.lk"
                    className="text-[#AF803C] hover:text-[#8B6630] font-semibold underline transition-colors break-all"
                  >
                    hello@mollyfashion.lk
                  </a>{' '}
                  for any such requests.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              8. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be stored and processed in Sri Lanka or other
              countries where our service providers operate. By using our
              services, you consent to such transfers, which comply with
              applicable data protection laws.
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              9. Updates to This Policy
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Molly Fashion Circle may update this Privacy Policy
                periodically.
              </p>
              <p>
                Any changes will be posted on this page with the updated
                "Effective Date."
              </p>
              <p>
                We encourage you to review this page regularly to stay informed
                on how we protect your data.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
