"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Image from 'next/image';
import wheel1 from '../../../../../public/products/wheel1.svg';
import wheel2 from '../../../../../public/products/wheel2.svg';
import wheel3 from '../../../../../public/products/wheel3.svg';
import wheel4 from '../../../../../public/products/wheel4.svg';
import { Rate } from 'antd';
import { FiMinus } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { IoIosHeartEmpty } from 'react-icons/io';
import { PiTruck } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import Reviews from '@/components/Products/Review';
import Description from '@/components/Products/Description';


const SingleProduct = () => {
    const wheels = [wheel1, wheel2, wheel3, wheel4];
    const sizes = ['17', '18', '19']; // Array of sizes
    const [activeTab, setActiveTab] = useState("description")
    const [selectedWheel, setSelectedWheel] = useState(wheel2);
    const [selectedSize, setSelectedSize] = useState<string | null>('17');

    const handleSelectWheel = (wheel: any) => {
        setSelectedWheel(wheel);
    };

    const handleSelectSize = (size: string) => {
        setSelectedSize(size);
    };


    return (
        <div>
            <div className="container mx-auto py-20 flex gap-8">
                <div className='w-1/2 flex gap-5'>
                    <div className=' cursor-pointer flex flex-col gap-5 w-[20%]'>
                        {wheels.map((wheel, index) => (
                            <div
                                key={index}
                                className={` `}
                                onClick={() => handleSelectWheel(wheel)}
                            >
                                <Image
                                    src={wheel}
                                    alt={`Wheel ${index + 1}`}
                                    width={500}
                                    height={500}
                                    className=' p-8  bg-[#f2fcf6]'
                                />
                            </div>
                        ))}
                    </div>
                    <div className=' w-[80%] bg-[#f2fcf6] flex items-center justify-center'>
                        <Image
                            src={selectedWheel}
                            alt={`Wheel`}
                            width={500}
                            height={500}
                            className=' p-8'
                        />
                    </div>
                </div>
                <div className=' w-1/2'>
                    <h2 className=' text-2xl font-semibold'>MRF Car Wheel Tyre 17/250</h2>
                    <div className=' flex gap-3 items-center mt-3'>
                        <Rate disabled defaultValue={4} />
                        <p className=' text-[#7f7f7f]'>(150 Reviews)</p>
                        <p className=' text-[#7f7f7f]'>|</p>
                        <p className=' text-primary'>In Stock</p>
                    </div>
                    <div className=' py-4'>
                        <h1 className=' text-5xl font-bold'>$292.00</h1>
                    </div>
                    <div>
                        <p className=' text-lg pb-4 border-b-2 border-[#7f7f7f]'>The MRF 17/250 tyre appears to refer to a motorcycle tyre with a 17-inch rim diameter and a 2.50-inch width. This size is commonly used on commuter motorcycles, particularly for front-wheel applications. </p>
                    </div>
                    <div className=' text-2xl flex justify-between items-center mt-4'>
                        <div className=' flex items-center'>
                            <h3>Brand:</h3>
                            <h3>MRF</h3>
                        </div>
                        <div className=' flex items-center'>
                            <h3>Colour:</h3>
                            <h3>Black</h3>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-6'>
                        <div className=' flex items-center'>
                            <h3 className=' text-2xl'>Size: </h3>
                            <div className='flex gap-3 items-center ml-3'>
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`border py-[6px] rounded-md px-2 cursor-pointer ${selectedSize === size ? 'bg-primary text-white' : 'bg-white'
                                            }`}
                                        onClick={() => handleSelectSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className=' flex items-center'>
                            <button className=' py-[10px] rounded-l-md  px-2 border cursor-pointer hover:bg-primary hover:text-white'><FiMinus /></button>
                            <button className=' py-[6px] border-t border-y px-6'>2</button>
                            <button className=' py-[10px] rounded-r-md  px-2 border cursor-pointer hover:bg-primary hover:text-white'><LuPlus /></button>
                        </div>
                    </div>
                    <div className='mt-6 flex justify-between items-center'>
                        <div className=' flex gap-4'>
                            <button className='border-2 border-primary px-14 py-2 text-lg rounded text-primary font-semibold cursor-pointer'>Add to Cart</button>
                            <button className=' text-white bg-primary px-14 py-2 text-lg rounded cursor-pointer'>Buy Now</button>
                        </div>
                        <div>
                            <button className=' cursor-pointer'>
                                <IoIosHeartEmpty className=' border px-[7px] py-[4px] rounded w-10 h-10' />
                            </button>
                        </div>
                    </div>
                    <div className=' border mt-8 rounded-md'>
                        <div className=' py-5 px-6 flex items-center gap-5 text-lg border-b'>
                            <PiTruck size={30} />
                            <div>
                                <p className=' font-semibold'>$50 off standard delivery in your area.</p>
                                <p>Enter your postal code for Delivery Availability</p>
                            </div>
                        </div>
                        <div className=' py-5 px-6 flex items-center gap-5 text-lg'>
                            <TfiReload size={30} />
                            <div>
                                <p className=' font-semibold'>Return Delivery</p>
                                <p>Free 30 Days Delivery Returns. Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className=" container mx-auto">
                {/* Custom Tabs */}
                <div className="w-full">
                    <div className="flex border-b">
                        <div className="w-full flex">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`flex-1 py-3 text-center ${activeTab === "description"
                                    ? "border-b-2 border-black font-medium"
                                    : "text-gray-500 hover:text-gray-700"
                                    } cursor-pointer`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`flex-1 py-3 text-center ${activeTab === "reviews" ? "border-b-2 border-black font-medium" : "text-gray-500 hover:text-gray-700"
                                    } cursor-pointer`}
                            >
                                Reviews(48)
                            </button>
                        </div>
                    </div>

                    {/* Description Tab Content */}
                    {activeTab === "description" && (
                        <Description></Description>
                    )}

                    {/* Reviews Tab Content */}
                    {activeTab === "reviews" && (
                        <Reviews></Reviews>

                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
