"use client";

import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import image from '../../../public/slide-image.png';
import { useGetAllCategoriesQuery, Category } from "@/redux/features/categories/categoriesApi";
import { useTranslations } from "next-intl";

const HeroCategorySkeleton = () => (
 <>
  <div className="h-8 w-[90%] bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse "></div>
  <div className="h-8 w-[90%] bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse "></div>
  <div className="h-8 w-[90%] bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse "></div>
  <div className="h-8 w-[90%] bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse "></div>
  <div className="h-8 w-[90%] bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse "></div>
  <div className="h-8 w-[90%] bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse "></div>
  
</>

);

const Hero = () => {
  const { data: categoryData, isLoading, isError } = useGetAllCategoriesQuery();
  const categories: Category[] = categoryData?.data ?? [];
const t = useTranslations('hero')
  const renderCategories = () => {
    if (isLoading) return <HeroCategorySkeleton />;
    if (isError) return <p className="text-red-500">Failed to load categories</p>;
    return categories.map((cat) => (
      <Link key={cat.id} href={`/category/${cat.id}`}>
        <button className="text-lg cursor-pointer dark:text-white">{cat.name}</button>
      </Link>
    ));
  };

  return (
    <div className="container mx-auto flex flex-col-reverse md:flex-row">
     
      <div className="grid grid-cols-2 md:hidden gap-3 pt-5">
        {renderCategories()}
      </div>

   
      <div className="hidden md:flex md:flex-col md:w-[20%] gap-5 pt-10 h-[420px] border-r border-gray-200 dark:border-gray-600">
        {renderCategories()}
      </div>


      <div className="w-full md:w-[80%] md:pl-5 lg:pl-5 py-5 lg:py-5">
        <div className="flex flex-col xl:flex-row h-[400px] w-full">
          
          <div className="xl:w-[40%] bg-black dark:bg-[#1d1d1d] flex flex-col justify-center pl-10 lg:pl-18 py-5">
            <div>
              <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold">{t('exploreOur')}</h1>
              <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold mt-4">{t('products')}</h1>
            </div>
            <div className="flex gap-1 items-center mt-8 xl:mt-12">
              <Link href={`/product`}>
                <button className="text-white border-b-2 py-2 border-white text-lg cursor-pointer">{t('shopNow')}</button>
              </Link>
              <IoArrowForward size={25} className="text-white" />
            </div>
          </div>


          <div
            className="xl:w-[60%] h-[400px] bg-cover bg-center"
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
