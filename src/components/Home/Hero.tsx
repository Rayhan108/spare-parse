"use client";
// import { Carousel } from "antd";
// import SliderItem from "./CarouselItem/SliderItem";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
// import Image from "next/image";
import image from '../../../public/slide-image.png';

const Hero = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    console.log(onChange);

    return (
        <div className="container mx-auto flex flex-col-reverse md:flex-row">
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
            <div className="hidden md:block md:w-[20%] h-[420px] border-r border-gray-200 dark:border-gray-600">
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

            <div className=" w-full md:w-[80%] md:pl-5 lg:pl-5 py-5 lg:py-5">
                {/* <Carousel>
                    <SliderItem></SliderItem>
                </Carousel> */}
                <div className="flex flex-col xl:flex-row h-[400px] w-full">
                    <div className=" xl:w-[40%] bg-black dark:bg-[#1d1d1d] flex flex-col justify-center pl-10 lg:pl-18 py-5">
                        <div>
                            <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold">Up to 10%</h1>
                            <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold mt-4">off Voucher</h1>
                        </div>
                        <div>
                            <div className=' flex gap-1 items-center mt-8 xl:mt-12'>
                                <button className=' text-white border-b-2 py-2 border-white text-lg cursor-pointer'>Shop Now</button>
                                <IoArrowForward size={25} className=' text-white' />
                            </div>
                        </div>

                    </div>
                    <div className="xl:w-[60%] h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${image.src})` }}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
