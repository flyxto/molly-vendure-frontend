/** @format */
'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeDCardDemo } from './ThreeDCardDemo';

export default function CategorySection() {
  // Define the category types
  type CategoryType = 'mens' | 'womens' | 'kids' | 'homeNlifestyle';

  // Initialize state for selected category and images
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('mens');
  const [selectedCategoryImages, setSelectedCategoryImages] = useState<
    string[]
  >([]);
  const [selectedCategoryParagraphs, setSelectedCategoryParagraphs] = useState({
    topLeft: '',
    bottomRight: '',
  });

  // Define category images mapping
  const categoriesImages: Record<CategoryType, string[]> = {
    mens: [
      '/Images/home-page/mens-img-2.jpg',
      '/Images/home-page/mens-img-1.jpg',
      '/Images/home-page/mens-img-3.jpg',
    ],
    womens: [
      '/Images/home-page/womens-img-2.jpg',
      '/Images/home-page/womens-img-1.jpg',
      '/Images/home-page/womens-img-3.jpg',
    ],
    kids: [
      '/Images/home-page/new_arrivals-img_3.png',
      '/Images/home-page/new_arrivals-img_1.png',
      '/Images/home-page/new_arrivals-img_2.png',
    ],
    homeNlifestyle: [
      '/Images/home-page/new_arrivals-img_6.png',
      '/Images/home-page/new_arrivals-img_4.png',
      '/Images/home-page/new_arrivals-img_5.png',
    ],
  };

  // Define category paragraphs mapping
  const categoriesParagraphs: Record<
    CategoryType,
    { topLeft: string; bottomRight: string }
  > = {
    mens: {
      topLeft:
        "Discover our latest men's collection featuring contemporary designs, premium fabrics, and impeccable tailoring for the modern gentleman.",
      bottomRight:
        "From casual essentials to formal attire, our men's range combines timeless style with innovative details for versatile wardrobes.",
    },
    womens: {
      topLeft:
        "Explore our women's collection with elegant silhouettes, vibrant patterns, and luxurious materials designed for the confident, fashion-forward woman.",
      bottomRight:
        "Each piece in our women's line balances sophistication with practicality, offering versatile options for every occasion.",
    },
    kids: {
      topLeft:
        "Our kids' collection brings playful designs, comfortable fabrics, and durable construction together for active little ones who love to explore.",
      bottomRight:
        'Thoughtfully crafted with growing children in mind, featuring easy-care materials and adjustable details that move with them.',
    },
    homeNlifestyle: {
      topLeft:
        'Transform your living spaces with our curated home & lifestyle collection featuring unique designs that blend form and function.',
      bottomRight:
        'Each piece in our home collection tells a story, bringing warmth and character to create inviting environments that reflect your personal style.',
    },
  };

  // Define categories for display
  const categories = [
    {
      name: 'mens',
      displayName: 'Men',
      link: '/categories/mens',
      images: categoriesImages.mens[0],
    },
    {
      name: 'womens',
      displayName: 'Women',
      link: '/categories/womens',
      images: categoriesImages.womens[0],
    },
    {
      name: 'kids',
      displayName: 'Kids',
      link: '/categories/kids',
      images: categoriesImages.kids[0],
    },
    {
      name: 'homeNlifestyle',
      displayName: 'home & lifestyle',
      link: '/categories/homenlifestyle',
      images: categoriesImages.homeNlifestyle[0],
    },
  ];

  // Update selected category content when category changes
  useEffect(() => {
    setSelectedCategoryImages(
      categoriesImages[selectedCategory] || categoriesImages.mens,
    );
    setSelectedCategoryParagraphs(
      categoriesParagraphs[selectedCategory] || categoriesParagraphs.mens,
    );
  }, [selectedCategory]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="max-w-7xl w-full mx-auto lg:px-4 flex flex-col gap-10 relative lg:pb-80">
      <div className="pt-12 h-full w-16 absolute -z-10 hidden lg:block">
        <div className="h-full w-px bg-black flex mx-auto"></div>
      </div>
      {/* title */}
      <motion.div
        className="flex justify-between gap-10 items-start w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="hidden lg:block text-justify uppercase leading-tight text-sm max-w-xs pl-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
          consequuntur tenetur consequatur, explicabo in blanditiis molestias
          dolor impedit distinctio
        </motion.p>

        <div className="w-full flex gap-10 items-center justify-center overflow-hidden px-4 sm:px-0">
          <motion.h2
            className="text-3xl text-center md:text-5xl flex font-medium uppercase text-[#655656] md:whitespace-nowrap "
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6, ease: 'circOut' }}
          >
            fashion for everyone
          </motion.h2>

          <div className="w-full hidden lg:block relative">
            <motion.div
              className="h-[0.2px] bg-[#655656] absolute right-0 top-1/2 transform -translate-y-1/2"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.6 }}
              style={{ transformOrigin: 'right' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Desktop view */}
      <>
        {/* Category Menu - left side */}
        <motion.div
          className="hidden lg:flex flex-col mt-56 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is in view
        >
          {categories.map((category, index) => (
            <a key={index} href={category.link}>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 group cursor-pointer"
                onMouseEnter={() =>
                  setSelectedCategory(category.name as CategoryType)
                }
              >
                <div className="relative w-16 h-16">
                  {category.name === selectedCategory && (
                    <img
                      src="/images/home-page/menu_star.png"
                      alt="menu-star"
                      className="bg-white p-2"
                    />
                  )}
                </div>
                <p className="text-5xl uppercase whitespace-nowrap">
                  {category.displayName}
                </p>
                <ArrowUpRight className="h-14 w-14 text-gray-100 group-hover:text-black font-bold group-hover:rotate-45 transition" />
                <hr className="group-hover:flex-grow transition-all duration-500 border-[#AF803C]" />
              </motion.div>
            </a>
          ))}
        </motion.div>
        {/* 3d card - right side */}
        <motion.div
          className="absolute hidden lg:block right-0"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'circOut' }}
        >
          <ThreeDCardDemo
            images={selectedCategoryImages}
            paragraphs={selectedCategoryParagraphs}
          />
        </motion.div>
      </>

      {/* Mobile view */}
      <div className="grid lg:hidden grid-cols-2">
        {categories.map((category, index) => (
          <a key={index} href={category.link}>
            <div className="aspect-[3/4] sm:aspect-square relative flex justify-center items-center active:opacity-80 overflow-hidden ">
              <img
                src={category.images}
                alt={`${category.displayName} category`}
                className="w-full h-full object-cover object-top"
              />
              <div
                className={`absolute text-white px-4 z-10 ${
                  category.name === 'homeNlifestyle' ? 'flex-col' : 'flex'
                } flex smooth-shadow w-full text-center justify-center items-center`}
              >
                <p
                  className={`uppercase ${
                    category.name === 'homeNlifestyle' ? 'text-3xl' : 'text-4xl'
                  }`}
                >
                  {category.displayName}
                </p>
                <ArrowUpRight className="h-14 w-14" />
              </div>
              <div className="absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-t from-black/0 via-black to-transparent opacity-50"></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
