"use client";
import { IoArrowForward } from "react-icons/io5";
import image from '../../../../../public/slide-image.png'
import ProductCart, { Product } from "@/components/Home/ProductCart";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import mobile from '../../../../../public/mobile.png'
import mobile2 from '../../../../../public/mobile2.png'
import mobile3 from '../../../../../public/mobile3.png'
import Image from "next/image";
import { useState } from "react";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { useGetProductsByCategoryQuery } from "@/redux/features/categories/categoriesApi";
import { useParams } from "next/navigation";
import { Swiper as SwiperClass } from 'swiper';
import ProductSkeleton from "@/utils/ProductSkeleton";
import Link from "next/link";

const Category = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [select, setSelect] = useState<string | null>(null);

  const params = useParams();
  const categoryId = params?.id as string; // <-- get category id from the route
  const { data: productData, isLoading: prodLoading } = useGetProductsByCategoryQuery(categoryId ?? "");
  const products: Product[] = productData?.data ?? [];

  const items = [
    { src: mobile, alt: 'Engine Oil', title: 'Engine Oil' },
    { src: mobile2, alt: 'Exhaust', title: 'Exhaust' },
    { src: mobile3, alt: 'Spark Plug', title: 'Spark Plug' },
    { src: mobile, alt: 'Head Light', title: 'Head Light' },
    { src: mobile3, alt: 'Wheel', title: 'Wheel' },
    { src: mobile2, alt: 'Engine', title: 'Engine' },
    { src: mobile, alt: 'Spark Plug', title: 'Spark Plug' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-0 py-8 md:py-16">
      {/* ---------- Hero Section ---------- */}
      <div className="flex flex-col xl:flex-row h-[400px] w-full">
        <div className=" xl:w-[40%] bg-black dark:bg-[#1d1d1d] flex flex-col justify-center pl-10 lg:pl-18 py-5">
          <div>
            <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold">Up to 10%</h1>
            <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold mt-4">off Voucher</h1>
          </div>
          <div className=' flex gap-1 items-center mt-8 xl:mt-12'>
            <Link href="/product">
              <button className="text-white border-b-2 py-2 border-white text-lg cursor-pointer">
                Shop Now
              </button>
            </Link>
            <IoArrowForward size={25} className=' text-white' />
          </div>
        </div>
        <div className="xl:w-[60%] h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${image.src})` }}></div>
      </div>

      {/* ---------- Brands Section (Static) ---------- */}
      <div>
        <h2 className=" text-3xl lg:text-4xl xl:text-6xl text-center mt-14 md:mt-20">Brands</h2>
      </div>

      {/* ---------- Categories Carousel ---------- */}
      <div className=" flex justify-between items-center gap-5 mt-8 md:mt-14 mb-8">
        <button onClick={() => swiper?.slidePrev()}>
          <MdOutlineArrowBackIosNew className="cursor-pointer w-6 md:w-10 h-6 md:h-10" />
        </button>
        <Swiper
          spaceBetween={30}
          breakpoints={{
            1200: { slidesPerView: 5 },
            1024: { slidesPerView: 3 },
            800: { slidesPerView: 3 },
            600: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
          }}
          onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
          className="flex"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => setSelect(item.title)} className={`${item.title === select && " "} flex flex-col items-center justify-center  rounded cursor-pointer`}>
                <Image src={item.src} alt={item.alt} width={500} height={500} className="dark:text-white w-52" />
                <h3 className="text-xl text-center mt-4 dark:text-white">{item.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={() => swiper?.slideNext()}>
          <MdOutlineArrowForwardIos className="cursor-pointer w-6 md:w-10 h-6 md:h-10" />
        </button>
      </div>

      {/* ---------- Explore Products Section (Dynamic) ---------- */}
      <div className=" pt-16">
        <div className="flex gap-2 items-center mb-5">
          <span className="bg-primary h-10 px-[10px] rounded-md"></span>
          <p className="text-primary font-semibold text-lg">Our Products</p>
        </div>
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl dark:text-white">Explore Our Products</h2>
        </div>
        {prodLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
