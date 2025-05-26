/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ConfigProvider, Steps } from "antd";
// import { useState } from "react";
import { Modal } from 'antd';
import { FaCheck } from "react-icons/fa6";

interface ProductDetailModalProps {
    isModalOpen: boolean;
    handleOk: () => any;
    handleCancel: () => any;
}
const ProductTrackModal: React.FC<ProductDetailModalProps> = ({ isModalOpen, handleOk, handleCancel }) => {

    // const [current, setCurrent] = useState(0);

    // const onChange = (value: number) => {
    //     console.log('onChange:', value);
    //     setCurrent(value);
    // };

    return (
        <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            className='w-full md:w-[800px]'
            footer={false}
            width={800}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>
                <h2 className='text-2xl font-semibold mb-4'>Order Track</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-primary pt-8 pb-4 mb-6 text-sm text-gray-700 overflow-x-auto">
                <span className='whitespace-nowrap'>Order Derail</span>
                <span className="h-4 border-l border-gray-300"></span>
                <span className='whitespace-nowrap'>#12345</span>
                <span className="h-4 border-l border-gray-300"></span>
                <span className='whitespace-nowrap'>15 May 2025</span>
                <span className="h-4 border-l border-gray-300"></span>
                <span className='whitespace-nowrap'>5 Items</span>
                <span className="h-4 border-l border-gray-300"></span>
                <span className="text-orange-500 whitespace-nowrap">To Ship</span>
            </div>
            <div className=" flex justify-center mb-10">
                <div className=" w-[350px] shadow-[0px_10px_30px_rgba(0,0,0,0.1)] border border-primary rounded-xl p-4 flex justify-center">
                    <ConfigProvider
                        theme={{
                            components: {
                                Steps: {
                                    "colorPrimary": "rgb(223,88,0)",
                                    "colorPrimaryBorder": "rgb(223,88,0)",
                                    "lineHeightSM": 2.6666666666666665,
                                    "lineWidth": 1
                                },
                            },
                        }}
                    >
                        <Steps
                            direction="vertical"
                            items={[
                                {
                                    title: 'Order Placed',
                                    description: 'Your order is successfully placed to Faithful Together Order id #2239798',
                                    icon: <FaCheck size={25} className=" bg-primary rounded-full mt-1.5 ml-1 p-1 text-white" />
                                },
                                {
                                    title: 'Processing',
                                    description: 'We have received your order, we will check and confirm shortly',
                                    icon: <FaCheck size={25} className=" bg-primary rounded-full mt-1.5 ml-1 p-1 text-white" />
                                },
                                {
                                    title: 'Confirmed',
                                    description: 'We have confirm your order.',
                                    icon: <FaCheck size={25} className=" bg-primary rounded-full mt-1.5 ml-1 p-1 text-white" />
                                },
                                {
                                    title: 'Packing',
                                    description: 'We are currently packing your order.',
                                    icon: <FaCheck size={25} className=" bg-primary rounded-full mt-1.5 ml-1 p-1 text-white" />
                                },
                                {
                                    title: 'Delivering',
                                    description: 'Rider (Jhon Alex +123456789) has picked up your order for delivering.',
                                    icon: <FaCheck size={25} className=" bg-primary rounded-full mt-1.5 ml-1 p-1 text-white" />
                                },
                                {
                                    title: 'Delivered',
                                    description: 'As soon as possible you will reveive your order.',
                                    icon: <FaCheck size={25} className=" rounded-full p-1 mt-1.5 ml-1 p-1  text-primary border border-primary" />
                                },
                            ]}
                        />

                    </ConfigProvider>

                </div>
            </div>


        </Modal >
    );
};

export default ProductTrackModal;