import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Terms and Conditions - Molly Fashion Circle' },
    {
      name: 'description',
      content: 'Terms and Conditions for Molly Fashion Circle',
    },
  ];
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 pt-24 sm:pt-32">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Terms and Conditions
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
              1. General
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Molly Fashion Circle ("we", "our", or "us") owns and operates
                this website. By accessing and using this website, you agree to
                comply with these{' '}
                <strong className="text-gray-900">Terms and Conditions</strong>,
                which govern your use of our website and services (collectively
                referred to as "the Services").
              </p>
              <p>
                We may update these Terms at any time without prior notice. It
                is your responsibility to check this page regularly for any
                updates. Continued use of our website after changes are posted
                means you accept those updates.
              </p>
              <p>
                We reserve the right to modify, suspend, or withdraw any part of
                the website without notice. We are not liable if the website is
                unavailable for any reason.
              </p>
              <p>
                This website may include links to third-party sites. Molly
                Fashion Circle has no control over these sites and is not
                responsible for their content or any damages resulting from
                their use.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              2. Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of this website is also governed by our Privacy Policy,
              which outlines how we collect, use, and protect your personal
              information. By using this site, you consent to such data
              practices and confirm that the information you provide is
              accurate.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              3. Prohibited Uses
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                You agree <strong className="text-gray-900">not to</strong>{' '}
                misuse this website. This includes (but is not limited to):
              </p>
              <ul className="space-y-3 ml-4 sm:ml-6">
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>Engaging in or encouraging any criminal activity.</span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Transmitting viruses, malware, or other harmful code.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Attempting unauthorized access to our systems or user data.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Disrupting website functionality or interfering with other
                    users.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#AF803C] mt-1.5 flex-shrink-0">•</span>
                  <span>
                    Sending spam, promotional content, or misleading messages.
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We will report any unlawful activities to the relevant
                authorities and cooperate fully with investigations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Molly Fashion Circle will not be liable for any damage caused by
                attacks, viruses, or other harmful materials due to your use of
                our website.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              4. Intellectual Property
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                All content on this website — including text, images, logos,
                videos, and software — is the property of Molly Fashion Circle
                or its licensors and is protected by copyright and trademark
                laws.
              </p>
              <p>
                You may view, download, and print content for personal,
                non-commercial use only.
              </p>
              <p>
                You may <strong className="text-gray-900">not</strong> copy,
                reproduce, modify, distribute, or exploit any material from this
                website without prior written permission.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              5. Terms of Sale
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                By placing an order through our website, you agree to the
                following terms:
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    (a) Our Contract
                  </h3>
                  <div className="space-y-2 text-gray-700 leading-relaxed">
                    <p>
                      When you place an order, you will receive an
                      acknowledgment email confirming receipt.
                    </p>
                    <p>
                      This does <strong className="text-gray-900">not</strong>{' '}
                      mean your order has been accepted.
                    </p>
                    <p>
                      A contract is formed only when we send you an email
                      confirming that your products have been dispatched.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    (b) Pricing and Availability
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <div className="space-y-2">
                      <p>
                        All prices listed are subject to change without notice.
                      </p>
                      <p>While we strive for accuracy, errors may occur.</p>
                      <p>
                        If an error in pricing is discovered after you place an
                        order, we will contact you to confirm or cancel it. If
                        canceled, any payments made will be refunded in full.
                      </p>
                    </div>
                    <p>
                      Delivery costs are displayed at checkout and included in
                      your total payment.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    (c) Payment
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <div className="space-y-2">
                      <p>
                        We accept valid debit/credit cards and other listed
                        payment methods.
                      </p>
                      <p>By submitting payment, you confirm that:</p>
                    </div>
                    <ul className="space-y-3 ml-4 sm:ml-6">
                      <li className="flex gap-3">
                        <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                          •
                        </span>
                        <span>You are the authorized cardholder.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#AF803C] mt-1.5 flex-shrink-0">
                          •
                        </span>
                        <span>
                          You have sufficient funds to complete the purchase.
                        </span>
                      </li>
                    </ul>
                    <p>
                      All transactions are processed securely. Payments are
                      debited at the time of order authorization.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    (d) Delivery
                  </h3>
                  <div className="space-y-2 text-gray-700 leading-relaxed">
                    <p>
                      Delivery times may vary depending on product availability
                      and location.
                    </p>
                    <p>
                      We are not responsible for postal delays or events beyond
                      our control.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              6. Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The content on this website is provided "as is" without
                guarantees of any kind.
              </p>
              <p>
                To the fullest extent permitted by law, Molly Fashion Circle
                shall not be liable for any direct, indirect, incidental, or
                consequential damages arising from your use of this website or
                its content.
              </p>
              <p>
                This does not exclude liability for fraud, death, or personal
                injury caused by negligence.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              7. Linking to Our Website
            </h2>
            <div className="space-y-2 text-gray-700 leading-relaxed">
              <p>
                You may link to our homepage in a fair and lawful manner that
                does not damage our reputation or suggest endorsement where none
                exists.
              </p>
              <p>
                You may not frame our website or link to any page other than the
                homepage without written permission.
              </p>
              <p>
                We reserve the right to revoke linking permission at any time.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              8. Third-Party Content and Trademarks
            </h2>
            <div className="space-y-2 text-gray-700 leading-relaxed">
              <p>
                Any trademarks, product names, or images featured on this site
                belong to their respective owners.
              </p>
              <p>
                Use of these names or images does not imply endorsement by Molly
                Fashion Circle unless explicitly stated.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              9. Indemnity
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Molly Fashion Circle, its
              employees, affiliates, and agents from any claims, damages, or
              expenses arising from your breach of these Terms or misuse of the
              website.
            </p>
          </section>

          {/* Section 10 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              10. Variation
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or remove any part of the website,
              products, or services at any time without notice.
            </p>
          </section>

          {/* Section 11 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              11. Severability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If any part of these Terms is deemed invalid or unenforceable, the
              remaining sections will continue in full force.
            </p>
          </section>

          {/* Section 12 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              12. Complaints
            </h2>
            <div className="space-y-2 text-gray-700 leading-relaxed">
              <p>
                We value your satisfaction and aim to resolve any issues
                quickly.
              </p>
              <p>
                Please contact us via{' '}
                <a
                  href="mailto:hello@mollyfashion.lk"
                  className="text-[#AF803C] hover:text-[#8B6630] font-semibold underline transition-colors break-all"
                >
                  hello@mollyfashion.lk
                </a>{' '}
                for complaints, feedback, or support.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              13. Entire Agreement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions constitute the entire agreement between
              you and Molly Fashion Circle and supersede any prior understanding
              related to your use of this website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
