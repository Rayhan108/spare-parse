"use client";

import { Breadcrumb, Select, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { useState } from "react";
import ProductDetailModal from "@/components/MyOrder/ProductDetailModal";
import ProductTrackModal from "@/components/MyOrder/ProductTrackModal";
import productPic from "../../../../public/products/wheel2.svg";
import { useGetMyOrdersQuery, Order } from "@/redux/features/order/orderApi";

const MyOrder = () => {
  const { data: ordersData, isLoading, isError } = useGetMyOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("ALL"); // "ALL" shows all orders

  const showDetailModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const showTrackModal = (order: Order) => {
    setSelectedOrder(order);
    setIsTrackModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load orders.</p>
      </div>
    );


  const filteredOrders = ordersData?.data?.filter((order: Order) => {
    if (filterStatus === "ALL") return true;
    return order.status === filterStatus;
  });

  return (
    <div className="container mx-auto px-4 md:px-0 py-16">
      <Breadcrumb
        items={[
          { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
          { title: <Link href="/myorder"><p className="dark:text-white">My Orders</p></Link> },
        ]}
      />

      <div className="py-5 flex justify-end">
        <Select
          value={filterStatus}
          style={{ width: 200 }}
          onChange={(value) => setFilterStatus(value)}
          options={[
            { value: "ALL", label: "All Orders" },
            { value: "PROCESSING", label: "Processing" },
            { value: "DELIVERED", label: "Delivered" },
            { value: "TO_SHIP", label: "To Ship" },
          ]}
        />
      </div>

      <div className="overflow-x-scroll md:overflow-hidden">
        <table className="w-full border-separate border-spacing-y-8">
          <thead>
            <tr className="shadow-[0px_10px_30px_rgba(0,0,0,0.04)]">
              <th className="p-4 text-left dark:text-white">Orders</th>
              <th className="p-4 text-left dark:text-white">Price</th>
              <th className="p-4 text-left dark:text-white">Quantity</th>
              <th className="p-4 text-left dark:text-white">Subtotal</th>
              <th className="p-4 text-left dark:text-white">Order Details</th>
              <th className="p-4 text-left dark:text-white">Order Track</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order: Order) => {
              const firstItem = order.items?.[0];

              const subtotal = order.items?.reduce(
                (sum, item) => sum + (item.price - (item.discount || 0)),
                0
              );

              const quantity = order.items?.length || 0;

              return (
                <tr
                  key={order.orderId}
                  className="bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.05)] rounded-md"
                >
                  <td className="p-4 flex items-center gap-3">
                    <Image
                      src={firstItem?.productImages?.[0] || productPic}
                      alt={firstItem?.productName || "Product"}
                      width={40}
                      height={40}
                    />
                    {firstItem?.productName || "N/A"}
                  </td>

                  <td className="p-6">${order.totalAmount?.toFixed(2)}</td>
                  <td className="p-6">{quantity.toString().padStart(2, "0")}</td>
                  <td className="p-6">${subtotal?.toFixed(2)}</td>

                  <td className="p-6">
                    <IoEyeOutline
                      onClick={() => showDetailModal(order)}
                      size={25}
                      className="cursor-pointer text-lg"
                    />
                  </td>

                  <td className="p-6">
                    <CiDeliveryTruck
                      onClick={() => showTrackModal(order)}
                      size={28}
                      className="cursor-pointer text-lg"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedOrder && (
          <>
            <ProductDetailModal
              isModalOpen={isModalOpen}
              handleOk={() => setIsModalOpen(false)}
              handleCancel={() => setIsModalOpen(false)}
              order={selectedOrder}
            />
            <ProductTrackModal
              isModalOpen={isTrackModalOpen}
              handleOk={() => setIsTrackModalOpen(false)}
              handleCancel={() => setIsTrackModalOpen(false)}
              order={selectedOrder}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
