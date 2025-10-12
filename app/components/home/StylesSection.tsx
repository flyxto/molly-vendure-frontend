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
          <motion.hr className="flex-grow border-t border-[#AF803C] opacity-0" />
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
          <motion.div className="h-px bg-black w-full opacity-0" />
          <motion.p
            className="max-w-xs uppercase text-justify leading-tight text-xs lg:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Discover curated styles that suit every mood and moment. From
            timeless classics to bold new trends, find looks that define you.
            Express yourself effortlessly.
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
          <motion.div className="w-full max-w-[31.25rem] aspect-[5/7] overflow-hidden border rounded-md">
            <img
              src="/images/home-page/styles-img-1-1.webp"
              alt="img1"
              width={560}
              height={650}
              className="w-full h-full object-cover rounded-md"
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
          <motion.div className="w-full max-w-[27.813rem] aspect-[27.813/36.25] overflow-hidden border rounded-md">
            <img
              src="/images/home-page/styles-img-2-1.webp"
              alt="img2"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-md"
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
          <motion.div className="w-full max-w-[19.5rem] aspect-[39/53] overflow-hidden border rounded-md">
            <img
              src="/images/home-page/styles-img-3-1.webp"
              alt="img3"
              width={340}
              height={400}
              className="w-full h-full object-cover rounded-md"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
