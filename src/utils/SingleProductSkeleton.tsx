"use client";

import { useState } from "react";

export default function SingleProductSkeleton() {
  const [specsOpen, setSpecsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"reference" | "description" | "reviews">("description");

  return (
    <div className="min-h-screen p-4 md:p-6 animate-pulse">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-gray-300"></div>
          <div className="h-6 w-1/3 rounded bg-gray-300"></div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr_350px]">
          {/* Left Image Thumbnails */}
          <div className="flex flex-col gap-3">
            <div className="h-20 w-full rounded bg-gray-300"></div>
            <div className="h-20 w-full rounded bg-gray-300"></div>
            <div className="h-20 w-full rounded bg-gray-300"></div>
          </div>

          {/* Main Image */}
          <div className="h-80 w-full rounded bg-gray-300"></div>

          {/* Right Panel */}
          <div className="space-y-4">
            <div className="h-6 w-1/2 rounded bg-gray-300"></div>
            <div className="h-5 w-1/3 rounded bg-gray-300"></div>
            <div className="h-8 w-1/4 rounded bg-gray-300 mt-4"></div>

            {/* Sizes */}
            <div className="flex gap-2 mt-4">
              <div className="h-8 w-12 rounded bg-gray-300"></div>
              <div className="h-8 w-12 rounded bg-gray-300"></div>
              <div className="h-8 w-12 rounded bg-gray-300"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <div className="h-10 flex-1 rounded bg-gray-300"></div>
              <div className="h-10 flex-1 rounded bg-gray-300"></div>
            </div>

            {/* Delivery & Return Info */}
            <div className="space-y-2 mt-6">
              <div className="h-16 rounded bg-gray-300"></div>
              <div className="h-16 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex gap-4 border-b">
            <div className="h-6 w-24 rounded bg-gray-300"></div>
            <div className="h-6 w-24 rounded bg-gray-300"></div>
            <div className="h-6 w-24 rounded bg-gray-300"></div>
          </div>

          {/* Tab content */}
          <div className="space-y-4">
            <div className="h-6 w-full rounded bg-gray-300"></div>
            <div className="h-6 w-full rounded bg-gray-300"></div>
            <div className="h-6 w-3/4 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
