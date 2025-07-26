// app/routes/contact.tsx

import { json, type MetaFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import type { ActionFunctionArgs } from '@remix-run/node';
import { useState, useEffect } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';

export const meta: MetaFunction = () => {
  return [
    { title: 'Contact Us | Vendure Store' },
    {
      name: 'description',
      content: "Get in touch with us. We'd love to hear from you!",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  // Basic validation
  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.name = 'Name is required';
  }

  if (
    !email ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = 'Valid email is required';
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.message = 'Message is required';
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors, success: false }, { status: 400 });
  }

  // Here you would send the email or save to database
  console.log('Contact form submission:', { name, email, phone, message });

  return json({ success: true, errors: {} });
}

// Address Item Component
function AddressItem({
  text,
  dialogueText,
  comma = true,
}: {
  text: string;
  dialogueText: string;
  comma?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <p
        className="font-semibold text-xl md:text-2xl mr-1 hover:text-[#D4A66C] hover:cursor-pointer transition duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
        {comma ? ',' : ''}
      </p>
      {isHovered && (
        <div className="absolute -top-8 left-2 z-30">
          <div className="bg-[#2671F7] text-white px-3 py-1 rounded text-sm">
            {dialogueText}
          </div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#2671F7] mx-auto"></div>
        </div>
      )}
    </div>
  );
}

// Address Block Component
function AddressBlock({
  branchNumber,
  no,
  street,
  town,
}: {
  branchNumber: string;
  no: string;
  street: string;
  town: string;
}) {
  return (
    <div>
      {/* Branch Header */}
      <div className="flex items-center mb-2 text-[#CDCDCD]">
        <MapPinIcon className="w-4 h-4 mr-2" />
        <span className="text-xs uppercase">branch {branchNumber}</span>
      </div>

      {/* Address Block */}
      <div className="text-black">
        {/* Number and Street */}
        <div className="flex flex-wrap">
          <AddressItem text={no} dialogueText="Number" />
          <AddressItem text={street} dialogueText="Street" />
        </div>

        {/* Town */}
        <div className="flex flex-wrap mt-1">
          <AddressItem text={town} dialogueText="Town" />
        </div>

        {/* Country*/}
        <div className="flex flex-wrap mt-1">
          <AddressItem text="Sri Lanka" dialogueText="Country" comma={false} />
        </div>
      </div>
    </div>
  );
}

// Mobile Address Display Component
function MobileAddressDisplay({
  no,
  street,
  town,
}: {
  no: string;
  street: string;
  town: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="mb-3">
        <MapPinIcon className="text-gray-400 w-6 h-6" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-xl">
          {no}, {street},
        </p>
        <p className="font-semibold text-xl">{town}, Sri Lanka</p>
      </div>
    </div>
  );
}

// Location Section Component
function LocationSection() {
  const branches = [
    {
      id: 1,
      branchNumber: '01',
      no: 'No.64',
      street: 'Thissa Mawatha',
      town: 'Kuliyapitiya',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31653.913197601283!2d80.02597502022358!3d7.467598744371462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae32c5daa6a2c75%3A0x777639b5517a55f4!2sKuliyapitiya!5e0!3m2!1sen!2sus!4v1713384057387!5m2!1sen!2sus',
    },
    {
      id: 2,
      branchNumber: '02',
      no: 'No.64',
      street: 'Thissa Mawatha',
      town: 'Colombo',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80549624506!2d79.82144362449093!3d6.921837070105396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1713384057387!5m2!1sen!2sus',
    },
    {
      id: 3,
      branchNumber: '03',
      no: 'No.64',
      street: 'Thissa Mawatha',
      town: 'Kandy',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31686.098196129207!2d80.61021196810652!3d7.293790934787464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1713384057387!5m2!1sen!2sus',
    },
  ];

  const [currentMapUrl, setCurrentMapUrl] = useState(branches[0].mapUrl);
  const [activeBranch, setActiveBranch] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleBranchChange = (id: number) => {
    setActiveBranch(id);
    const branch = branches.find((branch) => branch.id === id);
    setCurrentMapUrl(branch?.mapUrl ?? branches[0].mapUrl);
  };

  const activeBranchData = branches.find(
    (branch) => branch.id === activeBranch,
  );

  return (
    <div className="max-w-7xl mx-auto container mt-12 relative overflow-y-hidden">
      {/* shadow blob */}
      <img
        src="https://res.cloudinary.com/vccpsacloud/image/upload/v1745920804/Ellipse_8_o819io.png"
        alt="Form background shadow"
        width={250}
        height={300}
        className="absolute bottom-50 left-0 right-0 mx-auto rotate-90 block lg:hidden z-0"
      />

      {/* Mobile View */}
      {isMobile ? (
        <div className="relative z-10">
          <div className="flex flex-col items-center px-4">
            {/* Branch Selector */}
            <div className="relative flex items-center justify-between bg-gray-200 rounded-full p-0.5 w-full">
              {/* Sliding Indicator */}
              <div
                className="absolute h-8 bg-white rounded-full shadow-md transition-all duration-300 z-10"
                style={{
                  width: `${100 / branches.length}%`,
                  left: `${(activeBranch - 1) * (100 / branches.length)}%`,
                  transform: 'translateX(1px)',
                }}
              ></div>

              {/* Tabs */}
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => handleBranchChange(branch.id)}
                  className={`py-2 text-sm font-medium z-20 flex-1 text-center transition-colors duration-300 ${
                    activeBranch === branch.id
                      ? 'text-[#2671F7]'
                      : 'text-gray-600 opacity-70'
                  }`}
                >
                  Branch {branch.branchNumber}
                </button>
              ))}
            </div>

            {/* First Vertical Divider */}
            <div className="h-16 mt-2 border-l border-gray-300"></div>

            {/* Address Display */}
            <MobileAddressDisplay
              no={activeBranchData?.no || ''}
              street={activeBranchData?.street || ''}
              town={activeBranchData?.town || ''}
            />

            {/* Second Vertical Divider */}
            <div className="h-16 border-l mb-2 border-gray-300"></div>

            {/* Map Display */}
            <div className="w-full">
              <div className="h-96 rounded-lg overflow-hidden border shadow-md">
                <iframe
                  src={currentMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop View */
        <div className="flex flex-col gap-8 relative z-10">
          {/* Address Section */}
          <div className="flex flex-col md:flex-row justify-between w-full gap-4">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="cursor-pointer"
                onMouseEnter={() => setCurrentMapUrl(branch.mapUrl)}
              >
                <AddressBlock
                  branchNumber={branch.branchNumber}
                  no={branch.no}
                  street={branch.street}
                  town={branch.town}
                />
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="w-full">
            <div className="h-[500px] rounded-lg overflow-hidden border shadow-md">
              <iframe
                src={currentMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div>
      {/* Contact Hero Section */}
      <div className="mx-auto max-w-7xl container px-4 relative z-40">
        {/* Model image positioned at the top right */}
        <div className="absolute top-24 right-0 w-[45%] h-full z-20 hidden lg:block">
          <img
            src="https://res.cloudinary.com/vccpsacloud/image/upload/v1745920806/model-2_ztprvs.png"
            alt="Fashion model"
            height={550}
            width={450}
            className="object-contain border border-transparent"
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
            }}
          />
        </div>

        {/* Heading */}
        <div className="flex flex-row lg:mt-32 mt-20 relative z-10">
          <div className="w-full lg:w-[40%]">
            <h1 className="uppercase text-4xl sm:text-5xl lg:text-7xl">
              contact us
            </h1>
          </div>
          <div className="hidden lg:flex w-[60%] items-center">
            <hr className="border-[#888888] border-1 w-full relative z-10" />
          </div>
        </div>

        {/* Content and form */}
        <div className="flex">
          <div className="w-full lg:w-[60%] relative z-10">
            {/* content-para*/}
            <div className="mt-2 lg:w-[80%] w-full">
              <p className="uppercase hidden lg:block text-xs max-w-md text-[#888888]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
              <p className="uppercase block lg:hidden text-xs max-w-md text-[#888888]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod
              </p>
            </div>

            {/* contact info */}
            <div className="mt-20 relative pl-8">
              {/* Phone section */}
              <div className="flex relative">
                <div className="absolute -left-8">
                  <PhoneIcon className="rotate-90 text-[#A27D2A] w-4 h-4" />
                </div>
                <div>
                  <div className="uppercase text-xs text-[#A27D2A] mb-1">
                    PHONE
                  </div>
                  <div className="text-lg">0912345678</div>
                  <div className="text-lg">0917654321</div>
                </div>
                {/* Vertical line */}
                <div className="absolute left-4 -translate-x-10 top-7 h-32 border-l border-[#DDDDDD]"></div>
              </div>

              {/* Gap between phone and email */}
              <div className="h-24"></div>

              {/* Email section */}
              <div className="flex relative">
                <div className="absolute -left-8">
                  <EnvelopeIcon className="text-[#A27D2A] w-4 h-4" />
                </div>
                <div>
                  <div className="uppercase text-xs text-[#A27D2A] mb-1">
                    EMAIL
                  </div>
                  <div className="text-lg">mollyfashioncircle@gmail.com</div>
                </div>
                {/* Vertical line */}
                <div className="absolute left-4 -translate-x-10 top-7 h-32 border-l border-[#DDDDDD]"></div>
              </div>

              {/* Gap between email and fax */}
              <div className="h-28"></div>

              {/* Fax section */}
              <div className="flex relative mt-1">
                <div className="absolute -left-8">
                  <PrinterIcon className="text-[#A27D2A] w-4 h-4" />
                </div>
                <div>
                  <div className="uppercase text-xs text-[#A27D2A] mb-1">
                    FAX
                  </div>
                  <div className="text-lg">0912345678</div>
                  <div className="text-lg">0912345678</div>
                </div>
              </div>
            </div>

            {/* Question section  */}
            <div className="mt-20 pb-16">
              <h2 className="text-3xl lg:text-5xl">Got Style Questions?</h2>
              <h2 className="text-3xl lg:text-5xl mb-6">Drop Us a Hello!</h2>

              <div className="lg:mt-16 mt-10">
                <div className="max-w-md border-0 lg:shadow-none">
                  <div className="p-0 space-y-6">
                    {actionData?.success && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700">
                          Thank you for your message! We'll get back to you
                          soon.
                        </p>
                      </div>
                    )}

                    <Form method="post" className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-xs uppercase font-medium block"
                        >
                          NAME
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary-500"
                        />
                        {actionData?.errors?.name && (
                          <p className="text-sm text-red-600">
                            {actionData.errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-xs uppercase font-medium block"
                        >
                          EMAIL
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary-500"
                        />
                        {actionData?.errors?.email && (
                          <p className="text-sm text-red-600">
                            {actionData.errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-xs uppercase font-medium block"
                        >
                          PHONE NUMBER
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-xs uppercase font-medium block"
                        >
                          MESSAGE
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-md h-32 focus:outline-none focus:border-primary-500"
                        />
                        {actionData?.errors?.message && (
                          <p className="text-sm text-red-600">
                            {actionData.errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Sending...' : 'Send'}
                      </button>

                      {/* Vertical line only on desktop */}
                      <div className="relative hidden lg:block">
                        <div className="absolute left-10 h-24 border-l border-[#DDDDDD]"></div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <LocationSection />
    </div>
  );
}
