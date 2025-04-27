"use client";
import { Carousel } from "antd";

import SliderItem from "./CarouselItem/SliderItem";
// import Image from "next/image";

const Hero = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    console.log(onChange);

    return (
        <div className="container mx-auto flex">
            <div className="w-[20%] h-[400px] border-r border-gray-200 dark:border-gray-600">
                <div className="flex flex-col items-start gap-5 pt-10">
                    <button className="text-lg cursor-pointer dark:text-white">Engine Oil</button>
                    <button className="text-lg cursor-pointer dark:text-white">Spark Plug</button>
                    <button className="text-lg cursor-pointer dark:text-white">Looking Glass</button>
                    <button className="text-lg cursor-pointer dark:text-white">Head Light</button>
                    <button className="text-lg cursor-pointer dark:text-white">Wheel </button>
                    <button className="text-lg cursor-pointer dark:text-white">Parking Light</button>
                    <button className="text-lg cursor-pointer dark:text-white">Engine</button>
                </div>
            </div>
            <div className="w-[80%] pl-10 py-10">
                <Carousel>
                    <SliderItem></SliderItem>
                </Carousel>
            </div>
        </div>
    );
};

export default Hero;
