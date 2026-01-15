"use client";

import { Breadcrumb, Pagination, Select, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { useState } from "react";
import ProductDetailModal from "@/components/MyOrder/ProductDetailModal";
import ProductTrackModal from "@/components/MyOrder/ProductTrackModal";
import productPic from "../../../../../public/products/wheel2.svg";
import { useGetMyOrdersQuery, Order } from "@/redux/features/order/orderApi";

const MyOrder = () => {
  const [status,setStatus]=useState('PENDING')
  const [page,setPage]=useState(1)
  const limit=7
  const { data: ordersData, isLoading, isError } = useGetMyOrdersQuery({status,page,limit});
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);


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


 
  const totalOrdersCount = ordersData?.meta?.total || 0;
    const handlePageChange = (page: number) => {
    setPage(page);
  };
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
          value={status}
          style={{ width: 200 }}
          onChange={(value) => setStatus(value)}
          options={[
            { value: "", label: "All Orders" },
            { value: "PROCESSING", label: "Processing" },
            { value: "DELIVERED", label: "Delivered" },
            { value: "SHIPPED", label: "Shipped" },
            { value: "CANCELLED", label: "Cancel" },
            { value: "RETURNED", label: "Returned" },
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
            {ordersData?.data?.map((order: Order) => {
              const firstItem = order.items?.[0];

              const subtotal = order.items?.reduce(
                (sum, item) => sum + (item.price - (item.discount || 0)),
                0
              );

              const quantity = order.items?.length || 0;

              return (
                <tr
                  key={order.orderId}
                  className="bg-white dark:bg-[#24292E] shadow-[0px_10px_30px_rgba(0,0,0,0.05)] rounded-md"
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

                  <td className="p-6">${order.totalAmount?.toFixed(2)}..</td>
                  <td className="p-6">{quantity.toString().padStart(2, "0")}</td>
                  <td className="p-6">${subtotal?.toFixed(2)}..</td>

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
        <div className="flex justify-center items-center dark:text-white">
        <Pagination
        current={page}
        pageSize={limit}
        total={totalOrdersCount}
        onChange={handlePageChange}
        className="dark:text-white"
      />
</div>
      </div>
    </div>
  );
};

export default MyOrder;
