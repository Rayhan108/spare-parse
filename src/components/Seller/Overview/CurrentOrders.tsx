"use client";

import Image from "next/image";
import ordersIcon from "../../../../public/seller/orders-icon.svg";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { Select, Spin, message } from "antd";

import { useState } from "react";
import { useUpdateOrderStatusMutation } from "@/redux/features/seller/orderApi";

const { Option } = Select;

interface OrderItem {
  id: string;
  customerName: string;
  customerImage: string;
  createdAt: string;
  productName: string;
  productImages: string[];
  productDescription?: string;
  timeAgo?: string;
  status:string;
}

interface CurrentOrdersProps {
  orders: OrderItem[];
}

const CurrentOrders = ({ orders }: CurrentOrdersProps) => {
  const [updateOrderStatus ] = useUpdateOrderStatusMutation();
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    console.log("Dropdown changed:", orderId, newStatus);
    setLoadingOrderId(orderId);

    try {
      const res = await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      console.log("API response:", res);
      message.success(`Order status updated to ${res.data.status}`);
    } catch (err) {
      console.error("API error:", err);
      message.error("Failed to update order status");
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <div className="border rounded-xl border-primary p-4 sm:p-6 my-8 max-w-full overflow-x-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
            <Image
              src={ordersIcon}
              alt="Orders"
              width={48}
              height={48}
              className="bg-[#feefe6] p-1 sm:p-2 rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              Current Orders
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md dark:text-white">
              Manage your current orders and track booking orders.
            </p>
          </div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <Link href={"/seller/overview/orders"}>
            <MdOutlineArrowForwardIos className="cursor-pointer dark:text-white" size={24} />
          </Link>
        </div>
      </div>

      {/* Orders List */}
      <div className="border-t border-primary pt-2 sm:pt-4">
        {orders.length === 0 ? (
          <p className="text-gray-500 dark:text-white">No current orders.</p>
        ) : (
          orders.map((order) =>
            
            
            
            (
            
            <div
              key={order.id}
              className="flex flex-col sm:flex-row sm:gap-8 items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0 px-2 sm:px-0"
            >
              {/* Customer Info */}
              <div className="flex items-center gap-3 mb-3 sm:mb-0 flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={order.customerImage}
                    alt={order.customerName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{order.customerName}</p>
                  <p className="text-gray-500 text-sm dark:text-white">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={order.productImages[0] || "/products/wheel3.svg"}
                    alt={order.productName}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate dark:text-white">{order.productName}</p>
                  <p className="text-gray-500 text-sm truncate">{order.productDescription || "-"}</p>
                </div>
              </div>

              {/* Status Dropdown */}
            
              <div className="ml-auto mt-2 sm:mt-0 flex items-center gap-2">
                {loadingOrderId === order.id ? (
                  <Spin size="small" />
                ) : (
                  <Select
                    value={order.status}
                    onChange={(value) => handleStatusChange(order.id, value)}
                    style={{ width: 120 }}
                  >
                    <Option value="PENDING">PENDING</Option>
                    <Option value="PROCESSING">PROCESSING</Option>
                    <Option value="DELIVERED">DELIVERED</Option>
                    <Option value="CANCELLED">CANCELLED</Option>
                  </Select>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CurrentOrders;
