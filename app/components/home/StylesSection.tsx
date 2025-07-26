/** @format */
'use client';

import { motion } from 'framer-motion';

export default function StylesSection() {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const imageHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const lineDrawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  return (
    <div className="hidden md:block px-4">
      <motion.div className="mx-auto max-w-7xl  container relative">
        <div className="flex items-center justify-center w-full mb-2 space-x-4">
          <motion.hr
            className="flex-grow border-t border-[#AF803C] opacity-0 sm:opacity-100"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <motion.h2
            className="text-3xl md:text-5xl font-medium text-[#655656] whitespace-nowrap"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
          >
            ENCHANTING STYLES
          </motion.h2>
          <motion.hr
            className="flex-grow border-t border-[#AF803C] opacity-0"
            // initial={{ opacity: 0, x: 100 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.8, ease: "easeOut" }}
            // viewport={{ once: true, amount: 0.2 }}
          />
        </div>
      </motion.div>
      <div className="h-14 flex mx-auto max-w-7xl justify-center items-center container my-4">
        <motion.div
          className="w-px h-full bg-black"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative flex flex-col w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-4xl uppercase font-semibold">
            Shop the <br />
            Latest Trends
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="/images/home-page/styles-mobile-image_1.png"
            alt="img1"
            width={120}
            height={120}
            className="absolute right-0 -top-20 z-10"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="/images/home-page/styles-mobile-shadow_blob.png"
            alt="img1"
            width={600}
            height={600}
            className="absolute -right-30 -top-20 -z-10"
          />
        </motion.div>
        <div className="h-80 flex mx-auto max-w-7xl justify-center items-center container my-4">
          <motion.div
            className="w-px h-full bg-black"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex justify-center"
        >
          <p className="ml-12 text-4xl uppercase font-light">
            Find Your
            <br />
            Perfect Look
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: 10 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <img
            src="/images/home-page/styles-mobile-image_2.png"
            alt="img1"
            width={120}
            height={120}
            className="absolute left-0 top-30 z-10"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <img
            src="/images/home-page/styles-mobile-shadow_blob.png"
            alt="img1"
            width={600}
            height={600}
            className="absolute -left-40 top-50 -z-10"
          />
        </motion.div>
        <div className="h-52 flex mx-auto max-w-7xl justify-center items-center container my-4">
          <motion.div
            className="w-px h-full bg-black"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.5, delay: 0.8 }}
            viewport={{ once: true, amount: 0.6 }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex items-start"
        >
          <p className="ml-12 text-4xl text-right uppercase font-semibold">
            Fresh Fits <br />
            Await
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <img
            src="/images/home-page/styles-mobile-image_3.png"
            alt="img1"
            width={210}
            height={210}
            className="absolute right-0 bottom-0"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <img
            src="/images/home-page/styles-mobile-shadow_blob.png"
            alt="img1"
            width={600}
            height={600}
            className="absolute -right-25 bottom-10 scale-150 -z-10"
          />
        </motion.div>
        <div className="h-52 flex mx-auto max-w-7xl justify-center items-center container my-4">
          <motion.div
            className="w-px h-full bg-black"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.5, delay: 0.8 }}
            viewport={{ once: true, amount: 0.6 }}
          />
        </div>
      </div>

      {/* Desktop View */}
      <motion.div
        className="hidden md:flex container h-fit max-w-7xl mx-auto items-end justify-between relative md:gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* absolute row */}
        <motion.div
          className="absolute top-0 flex justify-between items-center w-full gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div
            className="h-px bg-black w-full opacity-0"
            // initial={{ width: 0 }}
            // whileInView={{ width: "100%" }}
            // transition={{ duration: 1, delay: 1.4 }}
            // viewport={{ once: true, amount: 0.8 }}
          />
          <motion.p
            className="max-w-xs uppercase text-justify leading-tight text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </motion.p>
          <motion.div
            className="h-px bg-black w-full"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, delay: 1.4 }}
            viewport={{ once: true, amount: 0.8 }}
          />
        </motion.div>

        {/* col 1 */}
        <motion.div
          className="flex flex-col gap-4 w-fit h-fit"
          variants={itemVariants}
        >
          <motion.h1
            className="md:text-3xl lg:text-4xl xl:text-5xl font-semibold uppercase px-2"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Shop the
            <br /> Latest Trends
          </motion.h1>
          <motion.div>
            <img
              src="/images/home-page/new_arrivals-img_6.png"
              alt="img1"
              width={560}
              height={650}
              className="border border-black rounded-md"
            />
          </motion.div>
        </motion.div>

        {/* col 2 */}
        <motion.div
          className="flex flex-col gap-4 w-fit h-fit"
          variants={itemVariants}
        >
          <motion.h1
            className="md:text-3xl lg:text-4xl xl:text-5xl font-extralight uppercase px-2"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Find Your
            <br /> Perfect Look
          </motion.h1>
          <motion.div>
            <img
              src="/images/home-page/new_arrivals-img_4.png"
              alt="img2"
              width={460}
              height={500}
              className="border border-black rounded-md"
            />
          </motion.div>
        </motion.div>

        {/* col 3 */}
        <motion.div
          className="flex flex-col gap-4 w-fit h-fit"
          variants={itemVariants}
        >
          <motion.h1
            className="md:text-3xl lg:text-4xl xl:text-5xl font-semibold uppercase px-2"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Fresh Fits
            <br /> Await
          </motion.h1>
          <motion.div>
            <img
              src="/images/home-page/new_arrivals-img_5.png"
              alt="img3"
              width={340}
              height={400}
              className="border border-black rounded-md"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
