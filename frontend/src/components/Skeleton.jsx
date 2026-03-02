import React from 'react';
import { cn } from '../lib/utils';

// Simple skeleton component for loading states
export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/5",
        className
      )}
      {...props}
    />
  );
};

// Page loading skeleton
export const PageLoadingSkeleton = () => {
  return (
    <div className="min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Hero skeleton */}
        <div className="space-y-6 mb-20">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-16 w-3/4 max-w-2xl" />
          <Skeleton className="h-6 w-full max-w-xl" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 p-6 rounded-[22px] border border-white/10">
              <Skeleton className="h-14 w-14 rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Card loading skeleton
export const CardSkeleton = () => {
  return (
    <div className="p-6 rounded-[22px] border border-white/10 space-y-4">
      <Skeleton className="aspect-[4/3] rounded-xl" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
};

// Project grid skeleton
export const ProjectGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export default Skeleton;
