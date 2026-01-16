"use client";

import Image from "next/image";
import ordersIcon from "../../../../../../../public/seller/orders-icon.svg";
import { useState, useEffect } from "react";
import { Pagination, Select, Spin, message } from "antd";

import { useGetCurrentOrdersQuery } from "@/redux/features/order/seller/orderApi";
import { useUpdateOrderStatusMutation } from "@/redux/features/seller/orderApi";

interface OrderItem {
   orderId: string;
   customerName: string;
   customerImage: string;
   createdAt: string;
   status: string;
   paymentStatus?: string;
   items?: {
      productName: string;
      productImages: string[];
      price?: number;
   }[];
}

const { Option } = Select;

const Orders = () => {
   const { data, isLoading, refetch } = useGetCurrentOrdersQuery();
   const [updateOrderStatus] = useUpdateOrderStatusMutation();
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(10);
   const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
   const [localOrders, setLocalOrders] = useState<OrderItem[]>([]);

   useEffect(() => {
      if (data?.data) setLocalOrders(data.data);
   }, [data]);

   const handlePageChange = (page: number) => setCurrentPage(page);

   const handleStatusChange = async (orderId: string, newStatus: string) => {
      setLoadingOrderId(orderId);
      try {
         const res = await updateOrderStatus({
            orderId,
            status: newStatus,
         }).unwrap();
         message.success(`Order status updated to ${res.data.status}`);

         setLocalOrders((prev) =>
            prev.map((order) =>
               order.orderId === orderId
                  ? { ...order, status: res.data.status }
                  : order
            )
         );
         refetch();
      } catch (err) {
         console.error("Failed to update status:", err);
         message.error("Failed to update order status");
      } finally {
         setLoadingOrderId(null);
      }
   };

   if (isLoading) return <Spin className="mt-20 mx-auto" size="large" />;

   if (!localOrders || localOrders.length === 0)
      return (
         <p className="mt-10 text-center text-gray-500 dark:text-white">
            No orders found.
         </p>
      );

   return (
      <div className="container mx-auto px-4 md:px-0 py-8 md:py-16">
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
                        All Orders
                     </h2>
                     <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md dark:text-white">
                        Manage all your orders and track booking orders.
                     </p>
                  </div>
               </div>
               {/* <div>
            <Input placeholder="Search product" suffix={<CiSearch size={20} />} />
          </div> */}
            </div>

            {/* Orders List */}
            <div className="border-t border-primary pt-2 sm:pt-4">
               {localOrders.map((order) => {
                  const firstProduct = order.items?.[0];
                  return (
                     <div
                        key={order.orderId}
                        className="flex justify-between gap-16 items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0 px-2 sm:px-0"
                     >
                        {/* Customer Info */}
                        <div className="flex items-center gap-10">
                           <div className="flex items-center gap-3 mb-3 sm:mb-0 flex-shrink-0">
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                 <Image
                                    src={
                                       order.customerImage ||
                                       "https://via.placeholder.com/40"
                                    }
                                    alt={order.customerName || "Customer"}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                 />
                              </div>
                              <div>
                                 <p className="font-semibold text-gray-800 dark:text-white">
                                    {order.customerName}
                                 </p>
                                 <p className="text-gray-500 text-sm dark:text-white">
                                    {new Date(
                                       order.createdAt
                                    ).toLocaleDateString()}
                                 </p>
                              </div>
                           </div>

                           {/* Product Info */}
                           <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                                 <Image
                                    src={
                                       firstProduct?.productImages?.[0] ||
                                       "/products/wheel3.svg"
                                    }
                                    alt={firstProduct?.productName || "Product"}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                 />
                              </div>
                              <div className="min-w-0">
                                 <p className="font-semibold text-gray-800 truncate dark:text-white">
                                    {firstProduct?.productName || "-"}
                                 </p>
                                 <p className="text-gray-500 text-sm truncate">
                                    {`Price: DZD ${firstProduct?.price || 0}`}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Status & Payment */}
                        <div className="flex items-center gap-10">
                           <div className="ml-auto mt-2 sm:mt-0 flex items-center gap-2">
                              {loadingOrderId === order.orderId ? (
                                 <Spin size="small" />
                              ) : (
                                 <Select
                                    value={order.status}
                                    onChange={(value) =>
                                       handleStatusChange(order.orderId, value)
                                    }
                                    style={{ width: 120 }}
                                 >
                                    <Option value="PENDING">PENDING</Option>
                                    <Option value="PROCESSING">
                                       PROCESSING
                                    </Option>
                                    <Option value="DELIVERED">DELIVERED</Option>
                                    <Option value="CANCELLED">CANCELLED</Option>
                                 </Select>
                              )}
                           </div>
                           <div>
                              <p>{order.paymentStatus || "-"}</p>
                           </div>
                           <div className="text-gray-400 mt-2 sm:mt-0 sm:ml-auto text-sm">
                              {new Date(order.createdAt).toLocaleTimeString()}
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Pagination */}
         <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.meta?.total || 0}
            onChange={handlePageChange}
         />
      </div>
   );
};

export default Orders;
