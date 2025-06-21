"use client"
import { ConfigProvider, Drawer, Input } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { PiShoppingCartLight } from "react-icons/pi";


interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

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
        <Drawer
            // title=""

            closable={{ 'aria-label': 'Close Button' }}
            onClose={onClose}
            open={open}
        >
            <div className=" mb-5 ">
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
            </div>
            <div className=' flex flex-col gap-3 mb-6'>
                <Link onClick={onClose} href='/' className=' text-lg text-black '><p className="text-black">Home</p></Link>
                <Link onClick={onClose} href='/contact' className=' text-lg text-black '><p className="text-black">Contact</p></Link>
                <Link onClick={onClose} href='/about' className=' text-lg text-black '><p className="text-black">About</p></Link>
                {/* <Link onClick={onClose} href='/seller/myproduct' className=' text-lg '><p></p>My Product</Link> */}
                <Link onClick={onClose} href='/auth/sign-up' className=' text-lg text-black '><p className="text-black">Sign Up</p></Link>
            </div>

            <div>
                <div className=" flex gap-3 mt-5 items-center">
                    <Link onClick={onClose} href={`/wishlist`}><IoIosHeartEmpty className=' w-9 h-9 cursor-pointer  text-black' /></Link>
                    <Link onClick={onClose} href={`/cart`}><PiShoppingCartLight className=' w-9 h-9 cursor-pointer  text-black' /></Link>
                </div>
                <div className='  bg-[#636363]  right-0 top-[80px] px-8 py-5 rounded-lg shadow-2xl transition-all z-50 mt-6'>
                    <div className='flex items-center justify-between mb-5'>
                        <p className='text-gray-200 '>Dark Mode:</p>
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
                        <Link onClick={onClose} className=' flex  gap-3' href={`/myprofile`}>
                            <GoPerson className='w-6 h-6 text-white cursor-pointer  ' />
                            <p className=' text-md text-white '>Manage My Account</p>
                        </Link>
                    </div>
                    <div onClick={onClose} className=' flex items-center gap-3 mb-4 cursor-pointer'>
                        <Link className=' flex  gap-3' href={`/myorder`}>
                            <LuShoppingBag className='w-6 h-6 text-white cursor-pointer  ' />
                            <p className=' text-md text-white '>My Order</p>
                        </Link>
                    </div>
                    {/* <div className=' flex items-center gap-3 mb-4 cursor-pointer'>
                        <Link className=' flex  gap-3' href={`/seller/overview`}>
                            <LuShoppingBag className='w-6 h-6 text-white cursor-pointer  ' />
                            <p className=' text-md text-white '>Seller Overview</p>
                        </Link>
                    </div> */}
                    <div className=' mb-3 cursor-pointer'>
                        <Link onClick={onClose} className=' flex items-center gap-3' href={`/auth/login`}>
                            <GoPerson className='w-6 h-6 text-white cursor-pointer  ' />
                            <p className=' text-md text-white '>Logout</p>
                        </Link>
                    </div>
                </div>

            </div>
        </Drawer>
    );
};

export default MobileMenu;