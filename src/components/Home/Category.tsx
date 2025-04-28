/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import engine from '../../../public/category/engine.svg'
import engine_oil from '../../../public/category/engine_oil.svg'
import exhaust from '../../../public/category/exhaust.svg'
import light from '../../../public/category/head_light.svg'
import spark_plug from '../../../public/category/spark_plug.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import { useState } from "react";

const Category = () => {
    const [swiper, setSwiper] = useState<any>(null);

    const items = [
        { src: engine_oil, alt: 'Engine Oil', title: 'Engine Oil' },
        { src: exhaust, alt: 'Exhaust', title: 'Exhaust' },
        { src: light, alt: 'Head Light', title: 'Head Light' },
        { src: exhaust, alt: 'Wheel', title: 'Wheel' },
        { src: spark_plug, alt: 'Spark Plug', title: 'Spark Plug' },
        { src: engine, alt: 'Engine', title: 'Engine' },
        { src: spark_plug, alt: 'Spark Plug', title: 'Spark Plug' },
    ];

    return (
        <div className="container mx-auto py-32">
            <div className="flex gap-2 items-center mb-5">
                <span className="bg-primary h-10 px-[10px] rounded-md">
                </span>
                <p className="text-primary font-semibold text-lg">Categories</p>
            </div>
            <div className="flex justify-between items-center mb-16">
                <h2 className="text-5xl dark:text-white">Browse By Category</h2>
                <div className="flex items-center gap-4">
                    <button
                        className="bg-[#f5f5f5] p-2 rounded-full"
                        onClick={() => swiper?.slidePrev()}
                    >
                        <FiArrowLeft size={35} className="cursor-pointer" />
                    </button>
                    <button
                        className="bg-[#f5f5f5] p-2 rounded-full"
                        onClick={() => swiper?.slideNext()}
                    >
                        <FiArrowRight size={35} className="cursor-pointer" />
                    </button>
                </div>
            </div>
            <div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={6}
                    onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
                    className="flex"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="border flex flex-col items-center justify-center h-[170px] rounded cursor-pointer">
                                <Image src={item.src} alt={item.alt} width={500} height={500} className="dark:text-white w-16" />
                                <h3 className="text-xl text-center mt-4 dark:text-white">{item.title}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Category;
