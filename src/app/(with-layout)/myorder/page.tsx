"use client"
import { Breadcrumb, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import productPic from '../../../../public/products/wheel2.svg';
import { useState } from "react";
import ProductDetailModal from "@/components/MyOrder/ProductDetailModal";
import ProductTrackModal from "@/components/MyOrder/ProductTrackModal";
import { CiDeliveryTruck } from "react-icons/ci";

const MyOrder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

    const showTrackModal = () => {
        setIsTrackModalOpen(true);
    };

    const handleTrackOk = () => {
        setIsTrackModalOpen(false);
    };

    const handleTrackCancel = () => {
        setIsTrackModalOpen(false);
    };

    interface OrderItem {
        key: string;
        image: string;
        name: string;
        price: number;
        quantity: number;
        subtotal: number;
    }

    const data: OrderItem[] = [
        {
            key: "1",
            image: "/tyre.png",
            name: "MRF Tyre",
            price: 650,
            quantity: 1,
            subtotal: 650,
        },
        {
            key: "2",
            image: "/tyre.png",
            name: "MRF Tyre",
            price: 550,
            quantity: 2,
            subtotal: 1100,
        },
        {
            key: "3",
            image: "/tyre.png",
            name: "MRF Tyre",
            price: 550,
            quantity: 2,
            subtotal: 1100,
        },
        {
            key: "4",
            image: "/tyre.png",
            name: "MRF Tyre",
            price: 550,
            quantity: 2,
            subtotal: 1100,
        },
        {
            key: "5",
            image: "/tyre.png",
            name: "MRF Tyre",
            price: 550,
            quantity: 2,
            subtotal: 1100,
        },
    ];

    return (
        <div className=" container mx-auto px-4 md:px-0 py-16">
            <Breadcrumb
                items={[
                    {
                        title: <Link href={`/`}><p className="dark:text-white">Home</p></Link>,
                    },
                    {
                        title: <Link className="dark:text-white" href={`/myorder`}><p className="dark:text-white">My Orders</p></Link>,
                    }
                ]}
            />
            <div className=" py-5 flex justify-end">
                <Select
                    defaultValue="delivered"
                    style={{ width: 200 }}
                    options={[
                        { value: 'delivered', label: 'Delivered' },
                        { value: 'to ship', label: 'To Ship' },
                    ]}
                />
            </div>

            <div className="overflow-x-scroll md:overflow-hidden">
                <table className="w-full border-separate border-spacing-y-8 ">
                    <thead>
                        <tr className="shadow-[0px_10px_30px_rgba(0,0,0,0.04)]">
                            <th className="p-4 text-left">Orders</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Quantity</th>
                            <th className="p-4 text-left">Subtotal</th>
                            <th className="p-4 text-left">Order Details</th>
                            <th className="p-4 text-left">Order Track</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr
                                key={item.key}
                                className="bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.05)] rounded-md"
                            >
                                <td className="p-4 flex items-center gap-3">
                                    <Image src={productPic} alt={item.name} width={40} height={40} />
                                    {item.name}
                                </td>
                                <td className="p-6">${item.price}</td>
                                <td className="p-6">{item.quantity.toString().padStart(2, "0")}</td>
                                <td className="p-6">${item.subtotal}</td>
                                <td className="p-6">
                                    <IoEyeOutline onClick={showModal} size={25} className="cursor-pointer text-lg" />
                                </td>
                                <td className="p-6">
                                    <CiDeliveryTruck onClick={showTrackModal} size={28} className="cursor-pointer text-lg" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ProductDetailModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></ProductDetailModal>
                <ProductTrackModal isModalOpen={isTrackModalOpen} handleOk={handleTrackOk} handleCancel={handleTrackCancel}></ProductTrackModal>
            </div>

        </div>
    );
};

export default MyOrder;