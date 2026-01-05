import React, { useEffect, useState } from 'react';
import Hero from '../../components/home/Hero';
import FilterBar from '../../components/home/FilterBar';
import FoodCard from '../../components/home/FoodCard';
import Newsletter from '../../components/home/Newsletter';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../../components/Loader/Loader';

import Testimonials from '../../components/home/Testimonials';
const dummyDish = {
  id: 1,
  name: 'Truffle Mushroom Risotto',
  price: '18.50',
  description:
    'Creamy Arborio rice slow-cooked with wild mushrooms, truffle oil, and aged Parmesan cheese.',
  image:
    'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800',
  category: 'Main Course',
  badge: "Chef's Choice",
  badgeColor: 'bg-orange-500',
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <AnimatePresence>
      {loading ? (
        <Loader key="loader" />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4"
        >
          <Hero />
          <FilterBar />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FoodCard dish={dummyDish} />
          </div>
          <div>
            {/*
             */}
            <div className="mt-12 flex justify-center">
              <p className="text-sm text-[#9a734c] dark:text-gray-500">
                Showing 6 of 24 dishes
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="rounded-lg border border-[#e7dbcf] dark:border-[#3e342b] bg-transparent px-6 py-2 text-sm font-medium text-[#1b140d] dark:text-white hover:bg-[#f3ede7] dark:hover:bg-[#2c241b] transition-colors">
                Load More
              </button>
            </div>
          </div>
          <Testimonials />
          <Newsletter />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePage;
