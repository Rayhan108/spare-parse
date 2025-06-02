"use client"
import { ConfigProvider, Input } from "antd";
import Link from "next/link";
import { AiOutlineSend } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { LuCopyright } from "react-icons/lu";
import { PiTiktokLogoLight } from "react-icons/pi";
import { RiFacebookLine } from "react-icons/ri";

const Footer = () => {
    return (
        <div className=' bg-[#383838] dark:bg-[#1d1d1d] px-3 lg:px-0'>
            <div className=" container mx-auto py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-between">
                <div>
                    <h2 className="text-2xl text-white mb-4">Exclusive</h2>
                    <p className="text-xl text-white mb-4">Subscribe</p>
                    <p className="text-lg text-white mb-3">Get 10% off your first order</p>
                    <ConfigProvider
                        theme={
                            {
                                "components": {
                                    "Input": {
                                        "hoverBg": "rgba(255,0,0,0)",
                                        "activeBg": "rgba(255,0,0,0)",
                                        "addonBg": "rgba(0,0,0,0)",
                                        "activeBorderColor": "rgb(255,255,255)",
                                        "hoverBorderColor": "rgb(255,255,255)",
                                        "colorPrimaryHover": "rgb(255,255,255)",
                                        "colorPrimaryActive": "rgb(255,255,255)",
                                        "colorBorder": "rgb(255,255,255)",
                                        "controlHeight": 38,
                                        "borderRadius": 3,
                                        "colorBgContainer": "rgba(255,0,0,0)",
                                        "colorText": "rgba(237,237,237,0.88)",
                                    }
                                }
                            }
                        }
                    >
                        <Input
                            className="custom-input"
                            placeholder="Enter your email"
                            suffix={<AiOutlineSend className="text-white cursor-pointer" size={20} />}
                        />

                    </ConfigProvider>

                </div>
                <div>
                    <h2 className="text-2xl text-white mb-4">Support</h2>
                    <p className=" text-white">111 Bijoy sarani, Dhaka,</p>
                    <p className="mb-4 text-white">DH 1515, Bangladesh.</p>
                    <p className="mb-4 text-white">xxxxxxx@gmail.com</p>
                    <p className=" text-white">+xxxx-xxxxx-xxxx</p>
                </div>
                <div>
                    <h2 className="text-2xl text-white mb-4">Account</h2>
                    <div className=" flex flex-col gap-5 text-white">
                        <Link href={'/'}>My Account</Link>
                        <Link href={'/'}>Sign Up As a Seller</Link>
                        <Link href={'/'}>Cart</Link>
                        <Link href={'/'}>Wishlist</Link>
                        <Link href={'/'}>Shop</Link>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl text-white mb-4">Quick Link</h2>
                    <div className=" flex flex-col gap-5 text-white">
                        <Link href={'/'}>Privacy Policy</Link>
                        <Link href={'/'}>Terms Of Use</Link>
                        <Link href={'/'}>FAQ</Link>
                        <Link href={'/'}>Contact</Link>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl text-white mb-4">Join With US</h2>
                    <div className=" flex gap-3">
                        <RiFacebookLine size={30} className=" text-white cursor-pointer" />
                        <FaXTwitter size={25} className=" text-white cursor-pointer" />
                        <IoLogoInstagram size={27} className=" text-white cursor-pointer" />
                        <PiTiktokLogoLight size={27} className=" text-white cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className=" flex items-center justify-center text-white border-t border-white py-4">
                <LuCopyright size={22} /><p className=" text-sm md:text-lg ml-2">Copyright Sparedoc 2025. All right reserved</p>
            </div>
        </div>
    );
};

export default Footer;