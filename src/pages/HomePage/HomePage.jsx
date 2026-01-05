import React from 'react';
import Hero from '../../components/home/Hero';
import FilterBar from '../../components/home/FilterBar';
import FoodCard from '../../components/home/FoodCard';

const HomePage = () => {
  return (
    <div className="px-4">
      <Hero />
      <FilterBar />
      {/* <FoodCard /> */}
    </div>
  );
};

export default HomePage;
