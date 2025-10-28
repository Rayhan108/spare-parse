"use client";

import { FaStar } from "react-icons/fa6";
import ordersIcon from "../../../../../../public/seller/orders-icon.svg";
import Image from "next/image";
import { Input, Pagination, Spin } from "antd";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useGetMyProductReviewsQuery } from "@/redux/features/review/seller/reviewApi";
const Reviews = () => {
  const { data, isLoading } = useGetMyProductReviewsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Spin className="mt-20 mx-auto" />;

  const reviews = data?.data || [];

  return (
    <div className="container mx-auto px-4 md:px-0 py-8 md:py-14">
      <div className="border rounded-xl border-primary p-4 sm:p-6 my-8 max-w-full overflow-x-auto">
        {/* Header */}
        <div className="flex sm:items-center sm:justify-between flex-col gap-4 sm:flex-row mb-4 sm:mb-6 px-2 sm:px-0">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
              <Image
                src={ordersIcon}
                alt="Reviews"
                width={48}
                height={48}
                className="bg-[#feefe6] p-1 sm:p-2 rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                All Reviews
              </h2>
              <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md dark:text-white">
                See your product reviews
              </p>
            </div>
          </div>
          <div>
            <Input placeholder="Search product" suffix={<CiSearch size={20} />} />
          </div>
        </div>

        {/* Reviews List */}
        <div className="border-t border-primary pt-2 sm:pt-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex gap-8 items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0 px-2 sm:px-0"
            >
              {/* Left side: user + product info */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-center w-full">
                {/* User info */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={review.customerImage}
                      alt={review.customerName}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{review.customerName}</p>
                    <p className="text-gray-500 text-sm dark:text-white">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex sm:hidden gap-1 items-center mt-3 sm:mt-0 flex-shrink-0 text-sm">
                    <FaStar className="text-yellow-400" size={20} />
                    <p className=" dark:text-white">({review.rating})</p>
                  </div>
                </div>

                {/* Product info */}
                <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={review.productImages[0]}
                      alt={review.productName}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate dark:text-white">{review.productName}</p>
                    <p className="text-gray-500 text-sm truncate">{`$${review.price}`}</p>
                  </div>
                </div>
              </div>

              {/* Right side: star rating */}
              <div className=" hidden sm:flex gap-1 items-center mt-3 sm:mt-0 flex-shrink-0 text-sm">
                <FaStar className="text-yellow-400" size={20} />
                <p className=" dark:text-white">({review.rating})</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data?.meta.total || 0}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Reviews;
