"use client"
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { ConfigProvider, Input } from 'antd';
import { IoIosHeartEmpty } from 'react-icons/io';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { LuShoppingBag } from 'react-icons/lu';
import GoogleTranslate from '../translate/GoogleTranslate';

const Header = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [subMenu, setSubMenu] = useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem('darkMode');
        console.log(storedMode);
        if (storedMode === 'true') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
        else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Toggle theme between light and dark
    const handleToggle = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            localStorage.setItem('darkMode', String(newMode));
            return newMode;
        });
    };

    return (
        <div>
            <div className=" bg-black dark:bg-[#3f3f3f] h-12 text-md text-center text-white flex items-center justify-center">
                Summer Sale For All Parking Light And Free Express Delivery - OFF 50%! <span className=" ml-2 font-semibold underline cursor-pointer">ShopNow</span>
                <GoogleTranslate></GoogleTranslate>
            </div>
            <nav className='  border-b border-gray-200 dark:border-gray-600 dark:bg-black'>
                <div className=' container mx-auto py-4 flex items-center justify-between relative'>
                    <div>
                        {
                            isDarkMode ?
                                <h2 className=' text-5xl font-bold text-white'>Logo</h2>
                                :
                                <Image className='w-42' src={logo} width={500} height={500} alt="logo" />
                        }

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
                        <div onClick={() => setSubMenu(!subMenu)} className=' bg-[#df5800] flex items-center justify-center rounded-full p-1 '>
                            <GoPerson className='w-6 h-6 text-white cursor-pointer ' />
                        </div>


                    </div>
                    {
                        subMenu &&
                        // bg-gradient-to-r from-[#243631] to-[#6e7675] dark:bg-gradient-to-r dark:from-[#cfcfcf] dark:to-[#a8acab]
                        <div className='absolute w-[250px] bg-[#444444] dark:bg-[#c5c5c5] right-0 top-[80px] px-8 py-5 rounded-lg shadow-2xl transition-all z-50'>
                            <div className='flex items-center justify-between mb-5'>
                                <p className='text-gray-200 dark:text-black'>Dark Mode:</p>
                                <button
                                    onClick={handleToggle}
                                    className={`w-14 h-6 cursor-pointer flex items-center rounded-full p-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                                >
                                    <div
                                        className={`w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'translate-x-8' : ''}`}
                                    ></div>
                                </button>

                            </div>
                            <div className=' flex items-center gap-3 mb-4 cursor-pointer'>
                                <GoPerson className='w-6 h-6 text-white cursor-pointer dark:text-black ' />
                                <p className=' text-md text-white dark:text-black'>Manage My Account</p>
                            </div>
                            <div className=' flex items-center gap-3 mb-4 cursor-pointer'>
                                <LuShoppingBag className='w-6 h-6 text-white cursor-pointer dark:text-black ' />
                                <p className=' text-md text-white dark:text-black'>My Order</p>
                            </div>
                            <div className=' flex items-center gap-3 mb-3 cursor-pointer'>
                                <GoPerson className='w-6 h-6 text-white cursor-pointer dark:text-black ' />
                                <p className=' text-md text-white dark:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>

            </nav>

        </div>
    );
};

export default Header;