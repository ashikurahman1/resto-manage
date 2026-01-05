import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

const FoodCard = ({ dish }) => {
  return (
    <div className="group flex flex-col rounded-xl bg-base-100 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl border border-transparent dark:border-base-300 overflow-hidden">
      <div className="aspect-[4/3] w-full bg-base-300 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${dish.image})` }}
        ></div>
        {dish.badge && (
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-white ${
              dish.badgeColor || 'bg-black/80'
            }`}
          >
            {dish.badge}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-base-content line-clamp-1">
            {dish.name}
          </h3>
          <span className="text-lg font-bold text-primary">${dish.price}</span>
        </div>
        <p className="mb-4 text-sm text-base-content/60 line-clamp-2 flex-1">
          {dish.description}
        </p>
        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="inline-flex items-center rounded-md bg-base-200 px-2 py-1 text-xs font-medium text-base-content/70">
            {dish.category}
          </span>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary/90">
            <MdAddShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
