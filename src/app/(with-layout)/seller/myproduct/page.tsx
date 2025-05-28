"use client"
import AddProductModal from "@/components/Seller/MyProduct/AddProductModal";
import MyProductCart from "@/components/Seller/MyProduct/MyProductCart";
import SelectProduct from "@/components/Seller/MyProduct/SelectProduct";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

const MyProduct = () => {
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
    return (
        <div className=" container mx-auto py-8 md:py-16 px-4 md:px-0">
            <SelectProduct></SelectProduct>
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 mt-20">
                <div className=" overflow-hidden rounded">
                    <div className="relative bg-[#f2fcf6] px-4 py-8">
                        <div onClick={showModal} className="flex h-58 items-center justify-center cursor-pointer">
                            <IoAdd size={120} />
                        </div>
                    </div>
                    <button
                        onClick={showModal}
                        className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
                    >
                        <IoAdd size={25} />
                        Add Product
                    </button>
                    <AddProductModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></AddProductModal>
                </div>
                <MyProductCart></MyProductCart>
                <MyProductCart></MyProductCart>
                <MyProductCart></MyProductCart>
                <MyProductCart></MyProductCart>
                <MyProductCart></MyProductCart>
                <MyProductCart></MyProductCart>
                <MyProductCart></MyProductCart>
            </div>
        </div>
    );
};

export default MyProduct;