"use client"
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { ConfigProvider, Input } from 'antd';
import { IoIosHeartEmpty } from 'react-icons/io';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { useState } from 'react';

const Header = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle theme between light and dark
    const handleToggle = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newMode;
        });
    };
    return (
        <div>
            <div className=" bg-black dark:bg-[#009840] h-10 text-md text-center text-white flex items-center justify-center">
                Summer Sale For All Parking Light And Free Express Delivery - OFF 50%! <span className=" ml-2 font-semibold underline cursor-pointer">ShopNow</span>
            </div>
            <nav className='  border-b border-gray-200  dark:bg-black'>
                <div className=' container mx-auto py-4 flex items-center justify-between'>
                    <div>
                        <Image className='w-42' src={logo} width={500} height={500} alt="logo" />
                    </div>
                    <div className=' flex items-center justify-between gap-12'>
                        <Link href='/' className=' text-lg dark:text-white'>Home</Link>
                        <Link href='/' className=' text-lg dark:text-white'>Contact</Link>
                        <Link href='/' className=' text-lg dark:text-white'>About</Link>
                        <Link href='/' className=' text-lg dark:text-white'>Sign Up</Link>
                    </div>
                    <div className=' w-[380px] flex items-center justify-between gap-4'>
                        <ConfigProvider
                            theme={{
                                components: {
                                    "Input": {
                                        "activeBorderColor": "rgba(22,119,255,0)",
                                        "hoverBorderColor": "rgba(64,150,255,0)",
                                        "colorBorder": "rgba(217,217,217,0)",
                                        "colorPrimaryHover": "rgba(64,150,255,0)",
                                        "colorPrimaryActive": "rgba(9,89,217,0)",
                                        "controlHeight": 36,
                                    }
                                },
                            }}
                        >
                            <Input style={{ backgroundColor: '#f0f0f0' }} suffix={<FiSearch className=" text-black w-6 h-6" />} className=' w-[280px]' placeholder='What are you looking for?' type="text" />
                        </ConfigProvider>
                        <IoIosHeartEmpty className=' w-10 h-10 cursor-pointer dark:text-white' />
                        <PiShoppingCartLight className=' w-10 h-10 cursor-pointer dark:text-white' />
                        <div className=' bg-[#009840] flex items-center justify-center rounded-full p-1 '>
                            <GoPerson className='w-6 h-6 text-white cursor-pointer ' />
                        </div>
                        <button
                            onClick={handleToggle}
                            className={`w-18 h-6 cursor-pointer flex items-center rounded-full p-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'translate-x-4' : ''}`}
                            ></div>
                        </button>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;