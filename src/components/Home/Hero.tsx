"use client";
import { Carousel } from "antd";

import SliderItem from "./CarouselItem/SliderItem";
import Link from "next/link";
// import Image from "next/image";

const Hero = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    console.log(onChange);

    return (
        <div className="container mx-auto flex flex-col md:flex-row">
            <div>
                <div className="grid grid-cols-2 md:hidden justify-start items-start gap-3 pt-5">
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Engine Oil</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Spark Plug</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Looking Glass</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Head Light</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Wheel</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Parking Light</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Engine</button></Link>
                </div>
            </div>
            <div className="hidden md:block md:w-[20%] h-[400px] border-r border-gray-200 dark:border-gray-600">
                <div className="flex flex-col items-start gap-5 pt-10">
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Engine Oil</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Spark Plug</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Looking Glass</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Head Light</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Wheel</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Parking Light</button></Link>
                    <Link href={`/category/7777`}><button className="text-lg cursor-pointer dark:text-white">Engine</button></Link>
                </div>
            </div>

            <div className=" w-full md:w-[80%] md:pl-5 lg:pl-10 py-5 lg:py-10">
                <Carousel>
                    <SliderItem></SliderItem>
                </Carousel>
            </div>
        </div>
    );
};

export default Hero;
