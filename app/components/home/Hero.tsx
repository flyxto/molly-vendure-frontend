/** @format */

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <div className="h-[100svh] relative overflow-hidden md:rounded-b-4xl bg-gradient-to-b from-black/0 via-[#af803c]/70 via-50% to-black/0">
      {/* Background Image */}
      {/* <Image src={heroBg} alt="hero" fill className="object-cover " /> */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover">
        <source
          src="https://res.cloudinary.com/vccpsacloud/video/upload/v1744904277/dzq60wvulaf7xrbzsjs7.mp4"
          type="video/mp4"
        />
      </video> */}

      {/* Temporary Banner >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

      <div className="w-full h-64 bg-gradient-to-t from-white to-transparent absolute bottom-0 z-50"></div>
      {/* mobile */}
      <motion.div
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier that slows down at the end
        }}
        className="absolute -left-56 top-10 md:hidden h-svh"
      >
        <img
          src="/images/home-page/hero_2.webp"
          alt="hero-2"
          width={900}
          height={900}
        />
      </motion.div>
      <>
        <motion.div
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier that slows down at the end
          }}
          className="absolute top-20 lg:top-16 xl:top-10 left-0 hidden md:block z-10 w-[25rem] lg:w-[35rem] xl:w-[45rem]"
        >
          <img
            src="/images/home-page/hero_1.webp"
            alt="hero-1"
            width={800}
            height={800}
          />
        </motion.div>

        {/* Hero 2 - comes from right */}
        <motion.div
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier that slows down at the end
          }}
          className="absolute top-20 lg:top-16 xl:top-10 -right-20 -scale-x-[1] hidden md:block z-10 w-[32rem] lg:w-[45rem] xl:w-[55rem]"
        >
          <img
            src="/images/home-page/hero_2.webp"
            alt="hero-2"
            width={900}
            height={900}
          />
        </motion.div>

        {/* Hero 3 - fades in after the other animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5, // Wait for the other animations to complete
            duration: 3,
            ease: [0, 0, 0.2, 1], // custom ease that starts fast and significantly slows down
          }}
          className="absolute top-20 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <img
            src="/images/home-page/hero_3.webp"
            alt="hero-3"
            width={420}
            height={420}
          />
        </motion.div>
      </>
      {/* Temporary Banner >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

      {/* Gradient Overlay */}

      {/* Text Overlay - Centered in page */}
      <div className="absolute inset-0 z-50 flex flex-col justify-center items-center text-white">
        <div className="max-w-[60rem] mx-auto flex flex-col gap-2 px-4">
          {/* Top row */}
          <div className="flex items-center justify-center overflow-hidden">
            <div className="flex-shrink-0 text-center md:text-left md:mr-8">
              <motion.h1
                className="text-4xl md:text-6xl whitespace-nowrap"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                SHOP HASSLE-FREE
              </motion.h1>
            </div>
            <div className="flex-grow hidden md:block">
              <motion.p
                className="text-[10px] lg:text-sm text-justify uppercase font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              >
                Explore stylish, comfortable fashion made for every day. Curated
                collections that keep you on trend through every season
              </motion.p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-center">
            <div className="hidden md:block flex-grow md:mr-8">
              <motion.p
                className="text-[10px] lg:text-sm text-justify uppercase font-light "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              >
                Refresh your wardrobe with modern essentials and standout
                pieces. Our fashion blends comfort and style perfect for making
                everyday outfits effortlessly chic
              </motion.p>
            </div>
            <div className="flex-shrink-0 text-center md:text-left overflow-hidden">
              <motion.h1
                className="text-4xl md:text-6xl whitespace-nowrap leading-tight"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                LOOK STUNNING
              </motion.h1>
            </div>
          </div>
        </div>
        <a href="#category-section">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
          >
            <Button className="py-6 font-normal mt-8 md:hidden">
              Shop Now
            </Button>
          </motion.div>
        </a>
      </div>
      <motion.div
        className="absolute z-50 bottom-0 w-full flex flex-col gap-1 items-center justify-center text-center text-black pb-2"
        initial={{ y: 0 }}
        animate={{
          y: [0, -10, 0], // Float up and down
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 1,
        }}
      >
        <p>Shop our New Arrivals</p>
        <ChevronDownIcon className="w-4 h-4" />
      </motion.div>
    </div>
  );
}
