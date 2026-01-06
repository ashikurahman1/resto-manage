import React, { useState, useMemo } from 'react';
import FoodCard from '../../components/home/FoodCard';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../../components/Loader/Loader';
import api from '../../api/axios';
import { useQuery } from '@tanstack/react-query';
import { MdVerified, MdOutlineTimer, MdStar, MdRestaurant } from 'react-icons/md';
import { FoodCardSkeleton } from '../../components/shared/Skeleton';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const response = await api.get('/foods');
      return response.data;
    },
  });

  const filteredFoods = useMemo(() => {
    let result = foods;
    if (selectedCategory !== 'all') {
      result = result.filter(food => food.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [searchQuery, selectedCategory, foods]);

  const categories = useMemo(() => 
    [...new Set(foods.map(food => food.category))],
  [foods]);

  const heroImage = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1000"; // Fallback high quality
  // Note: I will use the generated image if possible, but for consistency in this edit:
  const salmonImage = foods.length > 0 ? foods[0].main_image : heroImage;

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-base-200/50 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-primary/10"
              >
                <MdStar /> Gourmet Selection 2024
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-base-content tracking-tighter leading-[0.9]"
              >
                Savor the <br />
                <span className="text-primary italic">Art</span> of Food
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-base-content/60 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Experience a symphony of flavors crafted with passion, precision, and the freshest local ingredients.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 p-3 bg-base-100 rounded-[2.5rem] shadow-2xl shadow-base-200/50 border border-base-200"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search flavors..."
                    className="input input-lg w-full bg-base-200 border-none rounded-3xl font-bold h-14 pl-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 size-5 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <select
                  className="select select-lg bg-base-200 border-none rounded-3xl font-bold h-14 sm:w-48 capitalize"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Flavors</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="flex-1 relative group"
            >
              <div className="relative z-10 size-[320px] sm:size-[450px] lg:size-[550px] rounded-[3rem] overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-2xl border-[12px] border-base-100">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Delicious Hero Dish" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 size-40 bg-primary/20 backdrop-blur-3xl rounded-full animate-pulse" />
              <div className="absolute -bottom-10 -left-10 size-60 bg-secondary/10 backdrop-blur-3xl rounded-full" />
              <div className="absolute top-1/2 right-0 translate-x-1/2 p-6 bg-base-100 rounded-3xl shadow-xl border border-base-200 hidden md:block z-20">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-success/10 rounded-2xl flex items-center justify-center text-success"><MdVerified size={24}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Guaranteed</p>
                    <p className="text-sm font-black text-base-content">Fresh Ingredients</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-base-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tighter">Pure <span className="text-primary italic">Excellence</span></h2>
            <p className="text-base-content/50 font-medium max-w-2xl mx-auto">Discover the pillars that make RestoManage the premier destination for food lovers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<MdRestaurant size={32} />} 
              title="Expert Chefs" 
              desc="Our culinary team brings decades of experience from Michelin-star kitchens." 
            />
            <FeatureCard 
              icon={<MdOutlineTimer size={32} />} 
              title="Quick Service" 
              desc="Fast yet meticulous preparation ensuring your food arrives at the perfect temperature." 
            />
            <FeatureCard 
              icon={<MdStar size={32} />} 
              title="Premium Taste" 
              desc="We source only the finest seasonal produce for an unparalleled flavor profile." 
            />
          </div>
        </div>
      </section>

      {/* Menu List */}
      <section className="py-24 border-t border-base-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-16 px-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tighter">Explore <span className="text-primary italic">Menu</span></h2>
              <p className="text-base-content/40 font-bold uppercase tracking-widest text-[10px] mt-2">Crafted for your delight</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <div key="skeleton-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {[...Array(8)].map((_, i) => (
                  <FoodCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
              >
                {filteredFoods.map((food) => (
                  <FoodCard key={food.id} dish={{...food, image: food.main_image}} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoading && filteredFoods.length === 0 && (
            <div className="text-center py-32 bg-base-200/50 rounded-[3rem] border-2 border-dashed border-base-300">
              <h3 className="text-3xl font-black opacity-20 uppercase tracking-tighter">No matching flavors</h3>
              <p className="text-base-content/40 mt-3 font-medium">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-10 bg-base-200/50 rounded-[3rem] border border-base-200 group transition-all"
  >
    <div className="size-16 bg-primary text-white rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20 mb-8 rotate-3 group-hover:rotate-0 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-base-content mb-4 tracking-tight">{title}</h3>
    <p className="text-base-content/50 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

export default HomePage;
