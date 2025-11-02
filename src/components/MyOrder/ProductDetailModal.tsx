"use client";

import { Modal } from "antd";
import Image from "next/image";
import productPic from "../../../public/products/wheel2.svg";

interface OrderItem {
  id: string;
  productName: string;
  price: number;
  discount?: number;
  productImages?: string[];
}

interface Order {
  orderId: string;
  createdAt?: string;
  status: string;
  quantity?: number; // total order quantity
  items: OrderItem[];
}

interface ProductDetailModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  order?: Order;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  order,
}) => {
  if (!order) return null;

  // Calculate subtotal considering discount and order-level quantity
  const calculatedSubtotal = order.items?.reduce(
    (sum, item) =>
      sum + ((Number(item.price) - (Number(item.discount) || 0)) * (order.quantity || 1)),
    0
  ) || 0;

  return (
    <Modal
      closable
      className="w-full md:w-[800px]"
      footer={false}
      width={800}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

        {/* Order Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-primary pt-8 pb-4 mb-6 text-sm text-gray-700 overflow-x-auto">
          <span className="whitespace-nowrap">Order ID</span>
          <span className="h-4 border-l border-gray-300"></span>
          <span className="whitespace-nowrap">{order.orderId}</span>
          <span className="h-4 border-l border-gray-300"></span>
          <span className="whitespace-nowrap">
            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}
          </span>
          <span className="h-4 border-l border-gray-300"></span>
          <span className="whitespace-nowrap">{order.items?.length || 0} Items</span>
          <span className="h-4 border-l border-gray-300"></span>
          <span className="text-orange-500 whitespace-nowrap">{order.status}</span>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px] lg:min-w-full">
            <div className="grid grid-cols-4 text-left text-gray-600 border-y border-primary px-4 py-3 sm:grid-cols-4 lg:grid-cols-4">
              <div className="font-normal">Product</div>
              <div className="font-normal">Quantity</div>
              <div className="font-normal">Price</div>
              <div className="font-normal text-right">Total</div>
            </div>

            <div className="space-y-4 mt-5 pb-5">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center bg-white border border-orange-200 rounded-lg p-4 sm:grid-cols-4 lg:grid-cols-4"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.productImages?.[0] || productPic}
                      alt={item.productName}
                      width={50}
                      height={50}
                      className="rounded-lg flex-shrink-0"
                    />
                    <span className="text-sm sm:text-base">{item.productName}</span>
                  </div>
                  <div className="text-sm sm:text-base">
                    {(order.quantity || 1).toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm sm:text-base">${item.price?.toFixed(2)}</div>
                  <div className="text-right text-sm sm:text-base">
                    ${((item.price - (item.discount || 0)) * (order.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-end mt-6 pr-4">
          <div className="text-lg font-semibold text-gray-800 whitespace-nowrap">
            Subtotal: <span className="ml-2">${calculatedSubtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
