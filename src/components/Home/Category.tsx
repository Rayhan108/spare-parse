"use client";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper"; // <-- fix here
import "swiper/css";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductCart, { Product } from "./ProductCart";
import {
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  Category,
} from "@/redux/features/categories/categoriesApi";
import ProductSkeleton from "@/utils/ProductSkeleton";


const CategoryComponent = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Fetch all categories
  const { data: categoryData, isLoading: catLoading, isError: catError } = useGetAllCategoriesQuery();

  // Fetch products for selected category
  const { data: productData, isLoading: prodLoading } = useGetProductsByCategoryQuery(
    selectedCategoryId!,
    { skip: !selectedCategoryId }
  );

  const categories: Category[] = categoryData?.data ?? [];
  const products: Product[] = productData?.data ?? [];

  useEffect(() => {
    if (selectedCategoryId) console.log("Selected Category ID:", selectedCategoryId);
    if (productData?.data) console.log("Products for selected category:", productData.data);
  }, [selectedCategoryId, productData]);

  return (
    <div className="container mx-auto py-20 md:py-32">
      {/* Header */}
      <div className="flex gap-2 items-center mb-5">
        <span className="bg-primary h-10 px-[10px] rounded-md"></span>
        <p className="text-primary font-semibold text-lg">Categories</p>
      </div>

      <div className="flex justify-between items-center mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-5xl dark:text-white">
          Browse By Category
        </h2>
        <div className="flex items-center gap-4">
          <button className="bg-[#f5f5f5] p-2 rounded-full" onClick={() => swiper?.slidePrev()}>
            <FiArrowLeft className="cursor-pointer w-6 md:w-8 h-6 md:h-8" />
          </button>
          <button className="bg-[#f5f5f5] p-2 rounded-full" onClick={() => swiper?.slideNext()}>
            <FiArrowRight className="cursor-pointer w-6 md:w-8 h-6 md:h-8" />
          </button>
        </div>
      </div>

      {/* Category Carousel */}
      <Swiper
        spaceBetween={30}
        breakpoints={{
          1200: { slidesPerView: 6 },
          1024: { slidesPerView: 5 },
          800: { slidesPerView: 4 },
          600: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
          320: { slidesPerView: 1 },
        }}
        onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
        className="flex"
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => setSelectedCategoryId(item.id)}
              className={`${item.id === selectedCategoryId ? "bg-primary" : ""
                } border flex flex-col items-center justify-center h-[170px] rounded cursor-pointer transition dark:border-gray-100`}
            >
              <Image
                src={item.iconUrl}
                alt={item.name}
                width={500}
                height={500}
                className="w-16 dark:filter dark:invert dark:brightness-0.5 dark:sepia dark:saturate-200 dark:hue-rotate-90"
              />
              <h3 className="text-xl text-center mt-4 dark:text-white">{item.name}</h3>
            </div>
          </SwiperSlide>
        ))}

        {/* {catLoading && (
          <SwiperSlide>
            <div className="border flex flex-col items-center justify-center h-[170px] rounded opacity-60">
              <p className="text-gray-400 text-sm">Loading...</p>
            </div>
          </SwiperSlide>
        )} */}


        {catLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="border flex flex-col items-center justify-center h-[170px] rounded animate-pulse bg-gray-200 dark:bg-gray-700">
                <div className="h-24 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </SwiperSlide>
          ))}


        {catError && (
          <SwiperSlide>
            <div className="border flex flex-col items-center justify-center h-[170px] rounded opacity-60">
              <p className="text-gray-400 text-sm">Failed to load</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Products Section */}
      {selectedCategoryId && (
        <div className="mt-16">
          {/* <h3 className="text-2xl font-semibold mb-6 dark:text-white">
            Products in this Category
          </h3> */}

          {prodLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
