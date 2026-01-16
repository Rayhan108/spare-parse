/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import AddProductModal from "@/components/Seller/MyProduct/AddProductModal";

import { useState } from "react";
import { IoAdd } from "react-icons/io5";

const MyProductSkeleton = ({refetch}:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const skeletonCards = Array.from({ length: 3 });

  return (
    <div className="container mx-auto py-8 md:py-16 px-4 md:px-0">
 

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-10 mt-20">
        {/* Add Product Card */}
        <div className="overflow-hidden rounded">
          <div
            className="relative bg-[#f2fcf6] px-4 py-8 cursor-pointer flex items-center justify-center"
            onClick={showModal}
          >
            <IoAdd size={120} />
          </div>
          <button
            onClick={showModal}
            className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
          >
            <IoAdd size={25} />
            Add Product
          </button>
          <AddProductModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            refetch={refetch}
          />
        </div>

        {/* Skeleton Product Cards */}
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded border border-gray-200 animate-pulse"
          >
            <div className="bg-gray-200 dark:bg-gray-700 h-40 w-full" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2" />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProductSkeleton;
