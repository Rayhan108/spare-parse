"use client";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import Image from "next/image";
import { useState } from "react";
import ProductCart, { Product } from "./ProductCart";
import {
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  Category,
} from "@/redux/features/categories/categoriesApi";
import ProductSkeleton from "@/utils/ProductSkeleton";
import { useTranslations, useLocale } from "next-intl";

const CategoryComponent = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const {
    data: categoryData,
    isLoading: catLoading,
    isError: catError,
  } = useGetAllCategoriesQuery();
  const { data: productData, isLoading: prodLoading } =
    useGetProductsByCategoryQuery(selectedCategoryId!, {
      skip: !selectedCategoryId,
    });
  const t = useTranslations("categories");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const categories: Category[] = categoryData?.data ?? [];
  const products: Product[] = productData?.data ?? [];

  // ✅ RTL-aware navigation handlers
  const handlePrev = () => {
    if (isRTL) {
      swiper?.slideNext();
    } else {
      swiper?.slidePrev();
    }
  };

  const handleNext = () => {
    if (isRTL) {
      swiper?.slidePrev();
    } else {
      swiper?.slideNext();
    }
  };

  return (
    <div className="container mx-auto py-20 md:py-32 px-4 lg:px-0">
      {/* Header */}
      <div className="flex gap-2 items-center mb-5">
        <span className="bg-primary h-10 px-[10px] rounded-md"></span>
        <p className="text-primary font-semibold text-lg">{t("title")}</p>
      </div>

      <div className="flex justify-between items-center mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-5xl dark:text-white">
          {t("browseByCategory")}
        </h2>
        
        {/* ✅ RTL-aware arrow buttons */}
        <div className="flex items-center gap-4" dir="ltr">
          {/* Previous Button - Always on left visually */}
          <button
            className="bg-[#f5f5f5] dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <FiArrowLeft className="cursor-pointer w-6 md:w-8 h-6 md:h-8 dark:text-white" />
          </button>
          
          {/* Next Button - Always on right visually */}
          <button
            className="bg-[#f5f5f5] dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={handleNext}
            aria-label="Next"
          >
            <FiArrowRight className="cursor-pointer w-6 md:w-8 h-6 md:h-8 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Category Carousel - ✅ RTL support */}
      <Swiper
        dir={isRTL ? "rtl" : "ltr"}
        key={isRTL ? "rtl" : "ltr"} // Force re-render on direction change
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
              className={`${
                item.id === selectedCategoryId
                  ? "bg-primary border-primary"
                  : "border-gray-200 dark:border-gray-600"
              } border flex flex-col items-center justify-center h-[170px] rounded cursor-pointer transition hover:border-primary hover:shadow-md`}
            >
              <Image
                src={item.iconUrl}
                alt={item.name}
                width={500}
                height={500}
                className="w-16"
              />
              <h3
                className={`text-xl text-center mt-4 ${
                  item.id === selectedCategoryId
                    ? "text-white"
                    : "dark:text-white"
                }`}
              >
                {item.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}

        {catLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="border border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center h-[170px] rounded animate-pulse bg-gray-200 dark:bg-gray-700">
                <div className="h-16 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              </div>
            </SwiperSlide>
          ))}

        {catError && (
          <SwiperSlide>
            <div className="border border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center h-[170px] rounded opacity-60">
              <p className="text-gray-400 text-sm">{t("failedToLoad")}</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Products Section */}
      {selectedCategoryId && (
        <div className="mt-16">
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
            <p className="text-gray-400">{t("failedToLoad")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;