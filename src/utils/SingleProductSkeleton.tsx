"use client";

export default function SingleProductSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-8 p-6 lg:p-0 mb-6 animate-pulse">
      <div className="mx-auto container mt-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 md:mb-8">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(300px,400px)_1fr] xl:grid-cols-[400px_1fr_350px]">
          {/* Product Image */}
          <div className="flex items-start justify-center rounded-lg border border-gray-200 p-4 md:p-6">
            <div className="w-full max-w-[350px] h-[350px] bg-gray-200 dark:bg-gray-700 rounded object-contain"></div>
          </div>

          {/* Specs */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 font-medium border-b border-gray-200 p-4">
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="px-4 space-y-2 py-2">
                  {[1, 2, 3].map((f) => (
                    <div key={f} className="flex justify-between">
                      <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-1/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Price & Cart Column */}
          <div className="lg:col-span-2 xl:col-span-1 flex flex-col gap-4">
            <div className="sticky top-4 border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-6 space-y-4">
              <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded text-3xl md:text-4xl"></div>
              <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded text-xs md:text-sm"></div>
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 my-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>

        {/* Shipping Rates */}
        <div className="py-2">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* References / Vehicles / Alternatives */}
        <div className="space-y-4 mt-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
