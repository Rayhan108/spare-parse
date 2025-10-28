// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import Image from 'next/image';
// import productImage from '../../../../../../public/products/wheel3.svg'
// import ordersIcon from '../../../../../../public/seller/orders-icon.svg'
// import { useState } from 'react';
// import { Input, Pagination, Select } from 'antd';
// import { CiSearch } from 'react-icons/ci';

// const Orders = () => {
//     const orders = [
//         {
//             id: 1,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/11', // Replace with your image path
//             productImage: productImage, // Replace with your image path
//         },
//         {
//             id: 2,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/9',
//             productImage: productImage,
//         },
//         {
//             id: 3,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/5',
//             productImage: productImage,
//         },
//         {
//             id: 4,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/12',
//             productImage: productImage,
//         },
//         {
//             id: 5,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/2',
//             productImage: productImage,
//         },
//         {
//             id: 5,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to  a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/2',
//             productImage: productImage,
//         },
//         {
//             id: 2,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/9',
//             productImage: productImage,
//         },
//         {
//             id: 3,
//             name: 'John Doe',
//             date: 'Jun 10, 2025',
//             productName: 'MRF Car Wheel Tyre 17/250',
//             productDescription: 'The MRF 17/250 tyre appears to refer to a...',
//             timeAgo: '34m ago',
//             userImage: 'https://avatar.iran.liara.run/public/5',
//             productImage: productImage,
//         },
//     ];
//     const [currentPage, setCurrentPage] = useState(1);
//     console.log(currentPage);
//     const pageSize = 10;
//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const handleChange = (value: any) => {
//         console.log(value);
//     }

//     return (
//         <div className=' container mx-auto px-4 md:px-0 py-8 md:py-16'>
//             <div className="border rounded-xl border-primary p-4 sm:p-6 my-8 max-w-full overflow-x-auto">
//                 <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
//                     <div className="flex items-center">
//                         {/* Calendar Icon */}
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
//                             <Image
//                                 src={ordersIcon}
//                                 alt="Calendar"
//                                 width={48}
//                                 height={48}
//                                 className="bg-[#feefe6] p-1 sm:p-2 rounded-lg"
//                             />
//                         </div>
//                         <div>
//                             <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">All Orders</h2>
//                             <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md dark:text-white">
//                                 Manage your all orders and track booking orders.
//                             </p>
//                         </div>
//                     </div>
//                     <div>
//                         <Input className='' placeholder="Search product" suffix={<CiSearch size={20} />} />
//                     </div>

//                 </div>

//                 <div className="border-t border-primary pt-2 sm:pt-4">
//                     {orders.map((order, index) => (
//                         <div
//                             key={index}
//                             className="flex justify-between gap-16 items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0 px-2 sm:px-0"
//                         >
//                             <div className=' flex items-center  gap-10'>
//                                 <div className="flex items-center gap-3 mb-3 sm:mb-0 flex-shrink-0">
//                                     <div className="w-10 h-10 rounded-full overflow-hidden">
//                                         <Image
//                                             src={order?.userImage}
//                                             alt={order?.name}
//                                             width={40}
//                                             height={40}
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                     <div>
//                                         <p className="font-semibold text-gray-800 dark:text-white">{order?.name}</p>
//                                         <p className="text-gray-500 text-sm dark:text-white">{order?.date}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-2 sm:gap-4">
//                                     <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center ">
//                                         <Image
//                                             src={order?.productImage}
//                                             alt={order?.productName}
//                                             width={48}
//                                             height={48}
//                                             className="object-contain"
//                                         />
//                                     </div>
//                                     <div className="min-w-0">
//                                         <p className="font-semibold text-gray-800 truncate dark:text-white">{order?.productName}</p>
//                                         <p className="text-gray-500 text-sm truncate ">{order?.productDescription}</p>
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className=' flex items-center gap-10 '>
//                                 <div>
//                                     <Select
//                                         defaultValue="Pending"
//                                         style={{ width: 120 }}
//                                         onChange={handleChange}
//                                         options={[
//                                             { value: 'Pending', label: 'Pending' },
//                                             { value: 'Approved', label: 'Approved' },
//                                             { value: 'Rejected', label: 'Rejected' },
//                                         ]}
//                                     />
//                                 </div>

//                                 <div>
//                                     <p>Pending</p>
//                                 </div>

//                                 <div className="text-gray-400 mt-2 sm:mt-0 sm:ml-auto text-sm">
//                                     {order?.timeAgo}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <Pagination
//                 current={currentPage}
//                 pageSize={pageSize}
//                 total={50}
//                 onChange={handlePageChange}
//             />
//         </div>
//     );
// };

// export default Orders;


"use client";

import Image from "next/image";
import ordersIcon from "../../../../../../public/seller/orders-icon.svg";
import { useState } from "react";
import { Input, Pagination, Select, Spin } from "antd";
import { CiSearch } from "react-icons/ci";
import { useGetCurrentOrdersQuery } from "@/redux/features/order/seller/orderApi";

const Orders = () => {
  const { data, isLoading } = useGetCurrentOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (value: string) => {
    console.log("Order status changed to:", value);
  };

  if (isLoading) return <Spin className="mt-20 mx-auto" />;

  // Flatten orders for display
  const orders = data?.data || [];

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
          <div>
            <Input
              placeholder="Search product"
              suffix={<CiSearch size={20} />}
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="border-t border-primary pt-2 sm:pt-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex justify-between gap-16 items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0 px-2 sm:px-0"
            >
              <div className="flex items-center gap-10">
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
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {order.customerName}
                    </p>
                    <p className="text-gray-500 text-sm dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <Image
                      src={order.items[0]?.productImages[0] || ""}
                      alt={order.items[0]?.productName}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate dark:text-white">
                      {order.items[0]?.productName}
                    </p>
                    <p className="text-gray-500 text-sm truncate">
                      {/* Product description not in API, you can leave empty */}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & Time */}
              <div className="flex items-center gap-10">
                <Select
                  defaultValue={order.status}
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "PENDING", label: "Pending" },
                    { value: "DELIVERED", label: "Delivered" },
                    { value: "REJECTED", label: "Rejected" },
                  ]}
                />
                <div>
                  <p>{order.paymentStatus}</p>
                </div>
                <div className="text-gray-400 mt-2 sm:mt-0 sm:ml-auto text-sm">
                  {/* Can convert createdAt to relative time if needed */}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data?.meta.total || 0}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Orders;
