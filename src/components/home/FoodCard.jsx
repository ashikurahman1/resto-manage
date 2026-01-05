import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

const FoodCard = ({ dish }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-transparent bg-base-100 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-base-200">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-200">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${dish.image})` }}
        />
        {dish.popular && (
          <div className="absolute top-3 left-3 rounded bg-base-100/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-base-content backdrop-blur-sm">
            Popular
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="line-clamp-1 text-lg font-bold text-base-content">
            {dish.name}
          </h3>
          <span className="text-lg font-bold text-primary">${dish.price}</span>
        </div>
        <p className="mb-4 flex-1 line-clamp-2 text-sm text-base-content/70">
          {dish.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="rounded-md bg-base-200 px-2 py-1 text-xs font-medium text-base-content/80">
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
