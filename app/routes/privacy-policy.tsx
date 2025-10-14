import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Privacy Policy - Molly Fashion Circle' },
    { name: 'description', content: 'Privacy Policy for Molly Fashion Circle' },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col max-w-4xl w-full gap-12">
        <div className="flex flex-col bg-white gap-8">
          <div className="flex flex-col gap-2 mt-24">
            <h1 className="text-3xl font-bold text-black text-center items-center">Privacy Policy</h1>
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
            </div>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <div className="flex flex-col text-black">
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
            </div>
            <div className="flex">
              <p>
                By using our websites, you agree to the terms of this Privacy
                Policy.
              </p>
            </div>

            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              2. Information We Collect
            </h2>
            <p className="text-black">
              We may collect the following types of information:
            </p>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold">
                    Personal Information:
                  </h3>
                  <ul className="list-disc list-inside text-black flex flex-col gap-4 ml-8">
                    <li>
                      Name, email address, phone number, billing/shipping
                      address.
                    </li>
                    <li>
                      Payment details (processed securely via our payment
                      gateway).
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">
                    Non-Personal Information:
                  </h3>
                  <ul className="list-disc list-inside text-black flex flex-col gap-1 ml-8">
                    <li>
                      Browser type, IP address, device information, and browsing
                      behavior on our site (for analytics and performance
                      improvement).
                    </li>
                  </ul>
                </div>
              </div>

              <div className=" flex-col">
                <h3 className="text-lg font-semibold">
                  Cookies and Tracking Data:
                </h3>
                <p className="text-black">
                  We use cookies to personalize your experience, analyze
                  traffic, and store shopping cart data. (See "Cookies" section
                  below.)
                </p>
              </div>
            </div>

            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              3. How We Use Your Information
            </h2>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-black">
                  Molly Fashion Circle and its service partners use your
                  personal information to:
                </p>
                <ul className="list-disc list-inside text-black flex flex-col gap-4 ml-8">
                  <li>Process and deliver your product orders.</li>
                  <li>
                    Provide customer support and respond to your inquiries.
                  </li>
                  <li>
                    Send updates about your orders or promotions (only with your
                    consent).
                  </li>
                  <li>Improve our website and user experience.</li>
                  <li>Conduct internal analytics and performance tracking.</li>
                </ul>
              </div>
              <div className="flex flex-col">
                <p className="text-black">
                  We do <strong>not</strong> sell, rent, or lease customer
                  information to third parties.
                </p>
              </div>
            </div>

            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              4. Sharing Your Information
            </h2>
            <p className="text-black">
              We may share your information only in the following cases:
            </p>
            <ul className="list-disc list-inside text-black flex flex-col gap-4 ml-8">
              <li>
                With trusted third-party service providers (e.g., payment
                processors, delivery partners) who assist in operating our
                business.
              </li>
              <li>
                When required by law, legal process, or to protect the rights
                and property of Molly Fashion Circle.
              </li>
              <li>
                In case of a merger or transfer of business assets, your
                information may be part of the transferred assets.
              </li>
            </ul>
            <p className="text-black">
              All partners are required to maintain the confidentiality of your
              data and use it only for the agreed purpose.
            </p>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              5. Security of Your Information
            </h2>
            <div className="flex flex-col text-black">
              <p>
                We take the security of your personal information seriously.
              </p>
              <p>
                All sensitive data, such as payment information, is encrypted
                using <strong>SSL (Secure Socket Layer)</strong> technology.
              </p>
              <p>
                Our systems are hosted in secure environments with restricted
                access.
              </p>
              <p>
                However, no method of transmission over the Internet is 100%
                secure. You use our site at your own risk.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">6. Cookies</h2>
            <div className="flex flex-col gap-3 text-black leading-relaxed">
              <div className="flex flex-col">
                <p>A cookie is a small data file stored on your device.</p>
                <p>We use cookies to:</p>
              </div>
              <ul className="list-disc flex flex-col gap-6 ml-8">
                <li>Keep track of your shopping cart and login session.</li>
                <li>Analyze web traffic and improve website performance.</li>
                <li>Personalize your browsing experience.</li>
              </ul>

              <div className="flex flex-col gap-6 mt-4">
                <h3 className="text-lg font-semibold">
                  Examples of Cookies We Use:
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-center font-semibold">
                          Cookie Name
                        </th>
                        <th className="text-center font-semibold">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pt-2">CART</td>
                        <td className="pt-2">
                          Associate your session with your shopping cart.
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-2">CUSTOMER</td>
                        <td className="pt-2">
                          Encrypted identifier of your account.
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-2">FRONTEND</td>
                        <td className="pt-2">Session ID for your visit.</td>
                      </tr>
                      <tr>
                        <td className="pt-2">CURRENCY</td>
                        <td className="pt-2">
                          Stores your preferred currency.
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-2">PERSISTENT_SHOPPING_CART</td>
                        <td className="pt-2">
                          Links to your previous cart items if you return.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              7. Managing Your Information
            </h2>
            <div className="flex flex-col gap-4 text-black leading-relaxed">
              <p>You can contact us anytime to:</p>
              <ul className="list-disc list-inside flex flex-col gap-4">
                <li>Request access to or correction of your personal data.</li>
                <li>Opt out of promotional emails.</li>
                <li>
                  Request deletion of your account or stored data (subject to
                  legal obligations).
                </li>
              </ul>
              <p>
                Please email us at{' '}
                <a
                  href="mailto:hello@mollyfashion.lk"
                  className="text-black font-bold"
                >
                  hello@mollyfashion.lk
                </a>{' '}
                for any such requests.
              </p>
            </div>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              8. International Data Transfers
            </h2>
            <p className="text-black leading-tight">
              Your information may be stored and processed in Sri Lanka or other
              countries where our service providers operate. By using our
              services, you consent to such transfers, which comply with
              applicable data protection laws.
            </p>
            <hr className="border-t border-black mt-6" />
          </section>

          <section className="flex flex-col gap-4 mb-28">
            <h2 className="text-2xl font-semibold">
              9. Updates to This Policy
            </h2>
            <div className="flex flex-col gap-3 text-black leading-tight">
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
