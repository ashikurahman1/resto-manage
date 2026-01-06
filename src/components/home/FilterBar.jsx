import React from 'react';
import { MdSearch, MdExpandMore, MdTune } from 'react-icons/md';

const FilterBar = ({ onSearch, onCategoryChange, categories }) => {
  return (
    <div className="container mx-auto mb-8 rounded-xl border border-base-200 bg-base-100 p-4 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
            <MdSearch size={20} />
          </div>
          <input
            className="block w-full rounded-lg border-0 bg-base-200 py-3 pl-10 pr-4 text-base-content placeholder:text-base-content/50 focus:ring-2 focus:ring-primary/50 sm:text-sm"
            placeholder="Search for dishes..."
            type="text"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="no-scrollbar flex w-full items-center gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
          <div className="relative min-w-[160px]">
            <select 
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-lg border-0 bg-base-200 py-3 pl-4 pr-10 text-sm font-medium text-base-content focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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
