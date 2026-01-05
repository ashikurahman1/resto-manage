import React from 'react';
import { MdSearch, MdExpandMore, MdTune } from 'react-icons/md';

const FilterBar = () => {
  return (
    <div className="sticky top-[72px] z-40 mb-8 rounded-xl bg-base-100 p-4 shadow-sm border border-base-200 container mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary">
            <MdSearch size={20} />
          </div>
          <input
            className="block w-full rounded-lg border-0 bg-base-200 py-3 pl-10 pr-4 text-base-content placeholder:text-base-content/50 focus:ring-2 focus:ring-primary/50 sm:text-sm"
            placeholder="Search for dishes (e.g., Pasta, Burger)..."
            type="text"
          />
        </div>

        {/* Category Filters */}
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <div className="relative min-w-[160px]">
            <select className="w-full appearance-none rounded-lg border-0 bg-base-200 py-3 pl-4 pr-10 text-sm font-medium text-base-content focus:ring-2 focus:ring-primary/50 cursor-pointer">
              <option value="all">All Categories</option>
              <option value="starters">Starters</option>
              <option value="mains">Main Courses</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
              <MdExpandMore size={20} />
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-base-200 px-4 py-3 text-sm font-medium text-base-content hover:bg-base-300 transition-colors">
            <MdTune size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
