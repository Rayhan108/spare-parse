import { Breadcrumb, ConfigProvider, Input } from "antd";
import Link from "next/link";
import productImage from '../../../../public/products/monitor.png'
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Cart = () => {
    return (
        <div className="container mx-auto py-16 px-3 md:px-0 ">
            <Breadcrumb
                items={[
                    {
                        title: <Link href={`/`}><p className="dark:text-white">Home</p></Link>,
                    },
                    {
                        title: <Link className="dark:text-white" href={`/cart`}><p className="dark:text-white">Cart</p></Link>,
                    },
                ]}
            />
            <div className=" mt-8 overflow-x-scroll md:overflow-x-visible">
                <div className=" w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center">
                    <p className=" w-[100px] md:w-full dark:text-white">Product</p>
                    <p className=" w-[100px] md:w-full text-center dark:text-white">Price</p>
                    <p className=" w-[100px] md:w-full text-center dark:text-white">Quantity</p>
                    <p className=" w-[100px] md:w-full text-end dark:text-white">Subtotal</p>
                </div>
                {/* table body🙀 While integrating api just run a map here🫡 */}
                <div className="  overflow-x-scroll  md:overflow-x-visible w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4">
                    <div className=" flex items-center gap-5 w-[100px] md:w-full">
                        <Image src={productImage} alt="img" width={200} height={200} className=" w-10" />
                        <h1 className=" dark:text-white">LCD Monitor</h1>
                    </div>
                    <div className="w-[100px] md:w-full flex justify-center">
                        <p className=" dark:text-white">$650</p>
                    </div>

                    <div className="w-[100px] md:w-full flex justify-center">
                        <div className=" w-[80px] h-[50px] border-[2px] border-[#999999] rounded-lg flex justify-between items-center px-3">
                            <div>
                                <h3 className=" text-lg font-semibold dark:text-white">01</h3>
                            </div>
                            <div className="">
                                <IoIosArrowUp size={20} className=" cursor-pointer dark:text-white" />
                                <IoIosArrowDown size={20} className=" cursor-pointer dark:text-white" />
                            </div>

                        </div>
                    </div>

                    <div className=" flex items-center gap-5 w-[100px] md:w-full justify-end">
                        <p className=" dark:text-white">$650</p>
                        <RiDeleteBin6Line size={25} className=" cursor-pointer dark:text-white" />
                    </div>
                </div>
                {/* end table body */}
            </div>
            <div className=" mt-10 flex flex-col lg:flex-row ">
                <div className=" flex items-start">
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    "colorBorder": "rgb(67,67,67)",
                                    "activeBorderColor": "rgb(67,67,67)",
                                    "hoverBorderColor": "rgb(67,67,67)",
                                    "colorPrimary": "rgb(67,67,67)",
                                    "controlHeight": 46
                                },
                            },
                        }}
                    >
                        <Input placeholder="Coupon Code" style={{ width: "300px" }} />
                    </ConfigProvider>

                    <button className=" bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">Apply Coupon</button>
                </div>
                <div className=" w-full flex lg:justify-end mt-8 lg:mt-0">
                    <div className=" w-full sm:w-[450px] ">
                        <div className="border border-gray-600 dark:border-white rounded-md p-6">
                            <h2 className="text-xl font-medium mb-4 dark:text-white">Cart Total</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 dark:text-white">Subtotal:</span>
                                    <span className="font-medium dark:text-white">$1750</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-gray-700 dark:text-white">Shipping:</span>
                                    <span className="text-gray-700 dark:text-white">Free</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-gray-700 font-medium dark:text-white">Total:</span>
                                    <span className="font-medium dark:text-white">$1750</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded">
                                    Proceed to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;