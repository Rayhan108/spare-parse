"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { notification } from "antd";
import EditProductModal from "./EditProductModal";

interface MyProductCartProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  isVisible: boolean;
  onDelete?: (id: string) => Promise<void>; 
}

const MyProductCart: React.FC<MyProductCartProps> = ({
  id,
  name,
  price,
  discount,
  stock,
  images,
  isVisible,
  onDelete,
}) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const discountedPrice = discount > 0 ? price - price * (discount / 100) : price;
  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };


  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onDelete) return;

    try {
      await onDelete(id);
      api.success({
        message: "Deleted",
        description: "Item deleted successfully!",
        placement: "topRight",
      });
    } catch (err) {
      api.error({
        message: "Error",
        description: `Failed to delete item: ${err}`,
        placement: "topRight",
      });
    }
  };


  const showEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  return (
    <div className="overflow-hidden rounded border border-white hover:shadow-lg transition cursor-pointer relative">
      {contextHolder} 
      <div className="relative bg-[#f2fcf6] px-4 py-8">
        {discount > 0 && (
          <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-4 py-1 text-white">
            -{discount}%
          </div>
        )}

        <button
          onClick={handleRemove}
          className="absolute right-2 top-2"
          aria-label="Remove item"
        >
          <RiDeleteBin6Line size={40} className="bg-white rounded-full p-2 cursor-pointer" />
        </button>

        {/* Edit button */}
        <button
          onClick={showEditModal}
          className="absolute left-2 top-2"
          aria-label="Edit item"
        >
          <TbEdit size={40} className="bg-white rounded-full p-2 cursor-pointer" />
        </button>

        {/* Product image */}
        <div className="flex h-58 items-center justify-center">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={name}
            width={200}
            height={200}
            className="w-[200px] object-contain"
          />
        </div>
      </div>

      {/* Details button */}
      <button
        className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
        onClick={handleCardClick}
      >
        Details
      </button>

      {/* Product info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <div className="mt-1 flex items-center">
          <span className="text-xl font-bold text-orange-500">${discountedPrice.toFixed(2)}</span>
          {discount > 0 && <span className="ml-2 text-gray-500 line-through">${price.toFixed(2)}</span>}
        </div>
        <p className="mt-1 text-sm text-gray-600">Stock: {stock}</p>
        {!isVisible && <p className="text-sm text-red-500 mt-1">Not Visible</p>}
      </div>

      {/* Edit modal */}
      <EditProductModal
        isModalOpen={isEditModalOpen}
        handleOk={() => setIsEditModalOpen(false)}
        handleCancel={() => setIsEditModalOpen(false)}
        productId={id}
      />
    </div>
  );
};

export default MyProductCart;
