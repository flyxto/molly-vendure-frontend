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
    <div className="flex justify-center w-full">
      <div className="flex flex-col max-w-4xl w-full gap-12">
        <div className="flex flex-col bg-white gap-8">
          <div className="flex flex-col gap-4 mt-28">
            <h1 className="text-4xl font-bold text-black text-center">
              Terms and Conditions
            </h1>
            <div className="flex flex-col text-black gap-1">
              <p>
                <strong>Effective Date:</strong> 2025 October
              </p>
              <div className="flex gap-2">
                <strong>Website:</strong>
                <div className="flex gap-2">
                  <a
                    href="https://www.mollyfashion.lk"
                    className="text-blue-600 underline"
                  >
                    www.mollyfashion.lk
                  </a>
                  <span>|</span>
                  <a
                    href="https://www.mollyfashioncircle.lk"
                    className="text-blue-600 underline"
                  >
                    www.mollyfashioncircle.lk
                  </a>
                </div>
              </div>
              <hr className="border-t border-black mt-6" />
            </div>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">1. General</h2>
            <div className="flex flex-col gap-6 text-black leading-tight">
              <div className="flex flex-col gap-4">
                <p>
                  Molly Fashion Circle ("we", "our", or "us") owns and operates
                  this website. By accessing and using this website, you agree
                  to comply with these <strong>Terms and Conditions</strong>,
                  which govern your use of our website and services
                  (collectively referred to as "the Services").
                </p>
                <p>
                  We may update these Terms at any time without prior notice. It
                  is your responsibility to check this page regularly for any
                  updates. Continued use of our website after changes are posted
                  means you accept those updates.
                </p>
              </div>

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
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              2. Privacy Policy
            </h2>
            <div className="flex flex-col gap-3 text-black">
              <p>
                Your use of this website is also governed by our Privacy Policy,
                which outlines how we collect, use, and protect your personal
                information. By using this site, you consent to such data
                practices and confirm that the information you provide is
                accurate.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              3. Prohibited Uses
            </h2>
            <p className="text-black leading-relaxed">
              You agree <strong>not to</strong> misuse this website. This
              includes (but is not limited to):
            </p>
            <ul className="list-disc text-black flex flex-col gap-6 ml-8">
              <li>Engaging in or encouraging any criminal activity.</li>
              <li>Transmitting viruses, malware, or other harmful code.</li>
              <li>
                Attempting unauthorized access to our systems or user data.
              </li>
              <li>
                Disrupting website functionality or interfering with other
                users.
              </li>
              <li>
                Sending spam, promotional content, or misleading messages.
              </li>
            </ul>
            <div className="flex flex-col gap-3 text-black leading-relaxed">
              <p>
                We will report any unlawful activities to the relevant
                authorities and cooperate fully with investigations.
              </p>
              <p>
                Molly Fashion Circle will not be liable for any damage caused by
                attacks, viruses, or other harmful materials due to your use of
                our website.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              4. Intellectual Property
            </h2>
            <div className="flex flex-col gap-6 text-black leading-tight">
              <p>
                All content on this website — including text, images, logos,
                videos, and software — is the property of Molly Fashion Circle
                or its licensors and is protected by copyright and trademark
                laws.
              </p>
              <div className="flex flex-col gap-1">
                <p>
                  You may view, download, and print content for personal,
                  non-commercial use only.
                </p>
                <p>
                  You may <strong>not</strong> copy, reproduce, modify,
                  distribute, or exploit any material from this website without
                  prior written permission.
                </p>
              </div>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              5. Terms of Sale
            </h2>
            <p className="text-black">
              By placing an order through our website, you agree to the
              following terms:
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-black">
                  (a) Our Contract
                </h3>
                <div className="flex flex-col text-black">
                  <p>
                    When you place an order, you will receive an acknowledgment
                    email confirming receipt.
                  </p>
                  <p>
                    This does <strong>not</strong> mean your order has been
                    accepted.
                  </p>
                  <p>
                    A contract is formed only when we send you an email
                    confirming that your products have been dispatched.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-black">
                  (b) Pricing and Availability
                </h3>
                <div className="flex flex-col gap-6 text-black leading-tight">
                  <div className="flex flex-col gap-1">
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

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-black">
                  (c) Payment
                </h3>
                <div className="flex flex-col gap-6 text-black">
                  <div className="flex flex-col gap-1">
                    <p>
                      We accept valid debit/credit cards and other listed
                      payment methods.
                    </p>
                    <p>By submitting payment, you confirm that:</p>
                  </div>
                  <ul className="list-disc flex flex-col gap-4 ml-8">
                    <li>You are the authorized cardholder.</li>
                    <li>You have sufficient funds to complete the purchase.</li>
                  </ul>
                  <p>
                    All transactions are processed securely. Payments are
                    debited at the time of order authorization.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-black">
                  (d) Delivery
                </h3>
                <div className="flex flex-col text-black">
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
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              6. Limitation of Liability
            </h2>
            <div className="flex flex-col gap-6 text-black leading-tight">
              <div className="flex flex-col gap-1">
                <p>
                  The content on this website is provided "as is" without
                  guarantees of any kind.
                </p>
                <p>
                  To the fullest extent permitted by law, Molly Fashion Circle
                  shall not be liable for any direct, indirect,
                  incidental, or consequential damages arising from your use of
                  this website or its content.
                </p>
              </div>
              <p>
                This does not exclude liability for fraud,
                death, or personal injury caused by negligence.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              7. Linking to Our Website
            </h2>
            <div className="flex flex-col text-black">
              <p>
                You may link to our homepage in a fair and lawful manner that
                does not damage our reputation or suggest endorsement where none
                exists.
              </p>
              <p>
                You may not frame our website or link to any
                page other than the homepage without written permission.
              </p>
              <p>
                We reserve the right to revoke linking permission at any time.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              8. Third-Party Content and Trademarks
            </h2>
            <div className="flex flex-col text-black">
              <p>
                Any trademarks, product names, or images featured on this site
                belong to their respective owners.
              </p>
              <p>
                Use of these names or images does not imply endorsement by Molly
                Fashion Circle unless explicitly stated.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">9. Indemnity</h2>
            <p className="text-black leading-relaxed">
              You agree to indemnify and hold harmless Molly Fashion Circle, its
              employees, affiliates, and agents from any claims, damages, or
              expenses arising from your breach of these Terms or misuse of the
              website.
            </p>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">10. Variation</h2>
            <p className="text-black leading-relaxed">
              We reserve the right to modify or remove any part of the website,
              products, or services at any time without notice.
            </p>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              11. Severability
            </h2>
            <p className="text-black leading-relaxed">
              If any part of these Terms is deemed invalid or unenforceable, the
              remaining sections will continue in full force.
            </p>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-black">
              12. Complaints
            </h2>
            <div className="flex flex-col text-black">
              <p>
                We value your satisfaction and aim to resolve any issues
                quickly.
              </p>
              <p>
                Please contact us via{' '}
                <a
                  href="mailto:hello@mollyfashion.lk"
                  className="text-black hover:underline font-bold"
                >
                  hello@mollyfashion.lk
                </a>{' '}
                for complaints, feedback, or support.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4 mb-28">
            <h2 className="text-2xl font-semibold text-black">
              13. Entire Agreement
            </h2>
            <p className="text-black leading-relaxed">
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
