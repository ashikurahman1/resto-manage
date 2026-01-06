import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-base-300/50 rounded-2xl ${className}`}></div>
  );
};

export const FoodCardSkeleton = () => (
  <div className="bg-base-100 rounded-[2.5rem] p-4 border border-base-200 shadow-sm space-y-4">
    <Skeleton className="h-64 w-full rounded-[2rem]" />
    <div className="px-4 space-y-3 pb-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-8 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="pt-4 flex justify-between items-center">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  </div>
);

export const OrderRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-10 py-6"><Skeleton className="h-8 w-16" /></td>
    <td><Skeleton className="h-6 w-32" /></td>
    <td><Skeleton className="h-12 w-12 rounded-2xl" /></td>
    <td><Skeleton className="h-8 w-20" /></td>
    <td className="px-10"><Skeleton className="h-10 w-28 rounded-full" /></td>
  </tr>
);

export const StatsCardSkeleton = () => (
  <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-sm border border-base-200 flex items-center gap-8">
    <Skeleton className="size-20 rounded-[1.5rem]" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-10 w-12" />
    </div>
  </div>
);

export default Skeleton;
