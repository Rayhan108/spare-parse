import Image from 'next/image';
import logo from '../../../public/logo.svg';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { ConfigProvider, Input } from 'antd';
import { IoIosHeartEmpty } from 'react-icons/io';
import { PiShoppingCartLight } from 'react-icons/pi';

const Header = () => {
    return (
        <div>
            <div className=" bg-black dark:bg-amber-300 h-10 text-md text-center text-white flex items-center justify-center">
                Summer Sale For All Parking Light And Free Express Delivery - OFF 50%! <span className=" ml-2 font-semibold underline cursor-pointer">ShopNow</span>
            </div>
            <nav className='  border-b border-gray-200'>
                <div className=' container mx-auto py-4 flex items-center justify-between'>
                    <div>
                        <Image className='w-42' src={logo} width={500} height={500} alt="logo" />
                    </div>
                    <div className=' flex items-center justify-between gap-12'>
                        <Link href='/' className=' text-lg'>Home</Link>
                        <Link href='/' className=' text-lg'>Contact</Link>
                        <Link href='/' className=' text-lg'>About</Link>
                        <Link href='/' className=' text-lg'>Sign Up</Link>
                    </div>
                    <div className=' w-[350px] flex items-center justify-between gap-4'>
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
                        <IoIosHeartEmpty className=' w-8 h-8 cursor-pointer'  />
                        <PiShoppingCartLight className=' w-8 h-8 cursor-pointer' />

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;