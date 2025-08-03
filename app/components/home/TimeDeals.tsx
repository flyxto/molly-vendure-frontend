/** @format */
'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export default function TimeDeals() {
  return (
    <div className="w-full max-w-7xl mx-auto md:px-4 mb-20">
      <div className="mb-10">
        {/* H2 + Left Line */}
        <div className="items-center justify-center flex mb-2">
          {/* Group Left Line + Heading */}
          <motion.div className="items-center flex-grow hidden md:flex">
            <div className="h-px flex-grow"></div>
          </motion.div>

          {/* Heading (centered with motion) */}
          <motion.h2
            className="text-3xl md:text-5xl text-center font-medium text-[#655656] mx-4"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            LIMITED-TIME DEALS
          </motion.h2>

          {/* Right Line */}
          <motion.div
            className="flex-grow hidden md:block h-px bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'right' }}
          />
        </div>

        {/* Paragraphs */}
        <motion.div
          className="text-justify mt-4 items-center hidden md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {/* Left Gold Line */}
          <motion.div
            className="w-20 h-px bg-[#AC8537] mr-4"
            initial={{ width: 0 }}
            whileInView={{ width: '5rem' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
          />

          <div className="grid grid-rows-2 w-full">
            <motion.p
              className="uppercase leading-tight text-sm"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. SED DO
              EIUSMOD TEMPOR
            </motion.p>
            <motion.p
              className="uppercase leading-tight text-sm"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM
              VENIAM
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Hero Banner */}
      <motion.div
        className="pr-4 sm:pr-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="relative w-full h-[280px] sm:h-[320px] mb-4 rounded-r-md sm:rounded-lg  bg-[#B3C5C7] group">
          <div className="absolute inset-0 p-8 z-10 flex flex-col justify-center">
            <div className="flex flex-col items-start">
              <h2 className="text-4xl sm:text-5xl text-white mb-2">DENIM</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h2 className="text-4xl sm:text-5xl text-white">REFRESH</h2>
                <div className="inline-block bg-white text-[#AF803C] w-fit font-medium px-6 py-2 rounded-full">
                  25% OFF
                </div>
              </div>
            </div>
            <div className="flex items-center mt-auto pt-8">
              <Button>View all</Button>
              <div className="h-px bg-white flex-grow ml-4"></div>
            </div>
          </div>
          <div className="absolute hidden md:block right-0 h-full w-full z-10">
            <img
              src="/images/home-page/deals-img-2.webp"
              alt="Denim refresh collection"
              width={300}
              height={300}
              className="pt-5 absolute bottom-0 right-5 md:group-hover:scale-110 md:group-hover:translate-y-[-1.2rem] transition-transform duration-700 w-64 sm:w-[34rem]"
            />
          </div>
          <div className=" md:hidden absolute right-0 h-full w-1/2 z-20">
            <img
              src="/images/home-page/deals-img-1-mobile.webp"
              alt="Feminine flowy fashion"
              width={220}
              height={220}
              className="pt-5 absolute bottom-0 right-0 sm:right-20 md:group-hover:scale-150 md:group-hover:translate-y-[-5rem] transition-transform duration-700 w-[11rem]"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
        viewport={{ once: true }}
      >
        {/* Denim Banner */}
        <div className="pl-4 sm:pl-0">
          <div className="relative h-[280px] sm:h-[400px] rounded-l-md sm:rounded-lg bg-[#DCDCDC] group">
            <div className="absolute h-full w-full right-0  sm:inset-0 p-8 z-10 flex flex-col">
              <div>
                <h2 className="text-4xl sm:text-5xl text-white text-right sm:text-left">
                  {/* DENIM
                  <br />
                  REFRESH */}
                  FEMININE, <br />
                  FLOWY
                </h2>
                <div className="flex flex-col items-end sm:items-start mt-2 w-full gap-4">
                  <div className="inline-block bg-white w-fit text-[#AF803C] font-medium px-6 py-2 rounded-full">
                    50% OFF
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-row flex-row-reverse  items-center mt-auto">
                <Button>View all</Button>
                <div className="h-px bg-white flex-grow ml-4"></div>
              </div>
            </div>
            <div className="absolute right-0 h-full w-[15rem] sm:w-[18rem] z-20">
              <img
                src="/images/home-page/deals-img-1.webp"
                alt="Feminine flowy fashion"
                width={220}
                height={220}
                className="pt-5 absolute bottom-0 right-52 sm:right-2 md:group-hover:scale-125 md:group-hover:translate-y-[-3.18rem] transition-transform duration-700 w-[25rem] sm:w-[20rem]"
              />
            </div>
          </div>
        </div>

        {/* Cool Styles Banner */}
        <motion.div
          className="pr-4 sm:pr-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.6 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[280px] sm:h-[400px] rounded-r-md sm:rounded-lg group bg-[#CDD9CA]">
            <div className="absolute inset-0 z-10">
              <div className="absolute top-0 left-0 sm:right-0 p-8 z-30 flex flex-col items-end">
                <h2 className="text-4xl sm:text-5xl text-white mb-2 text-left sm:text-right">
                  COOL
                  <br />
                  STYLES!
                </h2>
                <div className="inline-block bg-white text-[#AF803C] font-medium px-6 py-2 rounded-full">
                  25% OFF
                </div>
              </div>
              <div className="absolute bottom-8 right-0 left-0 px-8  flex items-center flex-row-reverse sm:flex-row">
                <div className="h-px bg-white flex-grow mr-4 ml-4 "></div>
                <Button>View all</Button>
              </div>

              {/* Image takes the full left side */}
              <div className="absolute w-[280px] bottom-0 right-0 sm:inset-0 z-20">
                <img
                  src="/images/home-page/deals-img-3.webp"
                  alt="Cool styles collection"
                  width={400}
                  height={400}
                  className="pt-5 absolute bottom-0 right-0 md:md:group-hover:scale-125 md:md:group-hover:translate-y-[-3.2rem] transition-transform duration-700 sm:ml-10 w-[12rem] sm:w-[14rem]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
