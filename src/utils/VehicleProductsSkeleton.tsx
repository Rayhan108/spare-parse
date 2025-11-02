
"use client";

import React from "react";

const VehicleProductsSkeleton = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black p-4 md:p-8 container mx-auto">
      {/* Vehicle Info Skeleton */}
      <div className="h-10 sm:h-12 md:h-14 bg-gray-300 dark:bg-gray-700 rounded mb-6 animate-pulse w-2/3"></div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="border border-gray-300 dark:border-gray-700 rounded p-4 md:p-6 bg-white dark:bg-gray-900 animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="flex-1 space-y-6 md:space-y-8">
          {[1, 2].map((category) => (
            <div key={category}>
              {/* Category Header Skeleton */}
              <div className="h-6 md:h-8 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-2 md:mb-4 animate-pulse"></div>

              {/* Products Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex flex-col bg-white dark:bg-gray-900 animate-pulse"
                  >
                    <div className="w-full aspect-[4/3] bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default VehicleProductsSkeleton;
