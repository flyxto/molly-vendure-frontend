import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export default function Hero2() {
  return (
    <div
      className="h-[100svh] relative overflow-hidden dm-sans flex"
      style={{
        backgroundImage: 'url(/images/home-page/grid-bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Heading */}
      <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 text-center lg:text-left relative z-20 flex flex-col  justify-between items-center lg:items-start">
        <div className="flex flex-col items-center lg:items-start">
          <div className="overflow-hidden w-fit pr-4">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#CBAC50] font-semibold tracking-tighter leading-[1]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Fresh Fits
            </motion.h1>
          </div>
          <div className="overflow-hidden w-fit">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#CBAC50] font-semibold tracking-tighter leading-[1]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              for a New Season
            </motion.h1>
          </div>
          <motion.p
            className="text-[#948674] text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
          >
            Natural textures, earthy tones, and timeless silhouettes.
          </motion.p>
        </div>
        {/* Left image - hidden on mobile, adjusted positioning for tablets */}
        <motion.div
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className=" hidden lg:block z-20 w-32 sm:w-40 md:w-48 lg:w-[15rem]"
        >
          <img
            src="/images/home-page/hero-img-1.webp"
            alt="hero-1"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Mobile image */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="md:hidden z-20 flex justify-center"
        >
          <img
            src="/images/home-page/hero-img-1.webp"
            alt="hero-2"
            className="w-[16rem] h-auto"
          />
        </motion.div>

        {/* tablet image */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="hidden lg:hidden z-20 md:flex justify-center"
        >
          <img
            src="/images/home-page/hero-img-2.webp"
            alt="hero-2"
            className="w-[40rem] h-auto"
          />
        </motion.div>

        {/* <a href="#category-section">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
          >
            <Button className="py-6 font-normal mt-2 md:hidden">
              Shop Now
            </Button>
          </motion.div>
        </a> */}
      </div>

      {/* Right image - adjusted for all screen sizes */}
      <motion.div
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="absolute top-20 lg:top-16 xl:top-10 bottom-0 -right-12 sm:-right-16 md:-right-20 lg:-right-24 hidden lg:flex items-end z-20 w-48 sm:w-64 md:w-80 lg:w-[48rem] xl:w-[56rem]"
      >
        <img
          src="/images/home-page/hero-img-2.webp"
          alt="hero-2"
          className="w-full max-h-full object-contain object-bottom"
        />
      </motion.div>

      {/* gradient 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
        className="absolute top-0 bottom-0 left-0 z-10 flex justify-center"
      >
        <img
          src="/images/home-page/shadow-blob1.webp"
          alt="gradient-1"
          className="w-[34rem] h-auto"
        />
      </motion.div>
      {/* gradient 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
        className="absolute right-0 z-10 flex justify-center"
      >
        <img
          src="/images/home-page/shadow-blob2.webp"
          alt="gradient-1"
          className="w-[34rem] h-auto"
        />
      </motion.div>
    </div>
  );
}
