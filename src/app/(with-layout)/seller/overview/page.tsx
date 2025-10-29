// "use client";

// import Image from "next/image";
// import logo from "../../../../../public/seller/seller-icon.svg";
// import { LuCalendarCheck } from "react-icons/lu";
// import { PiWallet } from "react-icons/pi";
// import CurrentOrders from "@/components/Seller/Overview/CurrentOrders";
// import LastReviews from "@/components/Seller/Overview/LastReviews";
// import TransactionsTable from "@/components/Seller/Overview/TransactionsTable";
// import { useState } from "react";
// import { Pagination, Spin } from "antd";
// import { useGetCurrentOrdersQuery } from "@/redux/features/order/seller/orderApi";
// import { useGetMyProductReviewsQuery } from "@/redux/features/review/seller/reviewApi";

// // Define Review interface matching LastReviews props
// interface Review {
//   id: number;
//   name: string;
//   date: string;
//   productName: string;
//   productDescription: string;
//   timeAgo?: string;
//   userImage: string;
//   productImage: string;
// }

// // Define Order interface matching CurrentOrders props

// interface OrderItem {
//   id: string;
//   customerName: string;
//   customerImage: string;
//   createdAt: string;
//   productName: string;
//   productImages: string[];
//   productDescription?: string;
//   timeAgo?: string;
//   status: string; // ❗ Must exist
// }


// const Overview = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   // Fetch current orders and reviews
//   const { data: ordersData, isLoading: isOrdersLoading } = useGetCurrentOrdersQuery();
//   const { data: reviewsData, isLoading: isReviewsLoading } = useGetMyProductReviewsQuery();

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   // Show loader while fetching
//   if (isOrdersLoading || isReviewsLoading) return <Spin className="mt-20 mx-auto" size="large" />;

//   // Helper function for "time ago"
//   const getTimeAgo = (dateStr: string) => {
//     const date = new Date(dateStr);
//     const now = new Date();
//     const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

//     if (diff < 60) return `${diff}s ago`;
//     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//     return `${Math.floor(diff / 86400)}d ago`;
//   };

//   // Map API orders to CurrentOrders component props
// //   const mappedOrders: Order[] =
// //     ordersData?.data.map((order) => ({
// //       id: order.orderId,
// //       customerName: order.customerName,
// //       customerImage: order.customerImage || "https://via.placeholder.com/40",
// //       createdAt: order.createdAt,
// //       productName: order.items[0]?.productName || "-",
// //       productDescription: `Price: $${order.items[0]?.price || 0}`,
// //       productImages: order.items[0]?.productImages || [],
// //       timeAgo: getTimeAgo(order.createdAt),
// //     })) || [];

// const mappedOrders: OrderItem[] =
//   ordersData?.data.map((order) => {
//     const firstProduct = order.items[0];
//     return {
//       id: order.orderId,
//       customerName: order.customerName,
//       customerImage: order.customerImage || "https://via.placeholder.com/40",
//       createdAt: order.createdAt,
//       productName: firstProduct?.productName || "-",
//       productDescription: `Price: $${firstProduct?.price || 0}`,
//       productImages: firstProduct?.productImages || [],
//       timeAgo: getTimeAgo(order.createdAt),
//       status: order.status || "PENDING",  // ✅ Include status
//     };
//   }) || [];


//   // Map API reviews to LastReviews component props
//   const mappedReviews: Review[] =
//     reviewsData?.data.map((review, index) => ({
//       id: index + 1,
//       name: review.customerName,
//       date: new Date(review.createdAt).toLocaleDateString(),
//       userImage: review.customerImage || "https://via.placeholder.com/40",
//       productName: review.productName,
//       productDescription: review.comment,
//       productImage: review.productImages[0] || "https://via.placeholder.com/60",
//       timeAgo: getTimeAgo(review.createdAt),
//     })) || [];

//   const currentOrdersCount = ordersData?.data.length || 0;
//   const totalOrdersCount = ordersData?.meta.total || 0;
//   const availableBalance = 450; // Replace with actual API value if available

//   return (
//     <div className="container mx-auto px-4 md:px-0 py-8 md:py-16">
//       {/* Header */}
//       <div className="flex items-center gap-5">
//         <Image src={logo} width={400} height={400} alt="logo" className="w-22 rounded-full" />
//         <div>
//           <h1 className="text-3xl sm:text-4xl font-semibold dark:text-white">
//             Welcome Back, Hatem!
//           </h1>
//           <p className="mt-1 dark:text-white">
//             Here’s an overview of your business performance and activities today.
//           </p>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
//           <div>
//             <p className="text-lg text-gray-600 mb-2 dark:text-white">Current Orders</p>
//             <p className="text-3xl font-bold dark:text-white">{currentOrdersCount}</p>
//           </div>
//           <div className="bg-primary rounded-full p-3">
//             <LuCalendarCheck className="h-6 w-6 text-white" />
//           </div>
//         </div>

//         <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
//           <div>
//             <p className="text-lg text-gray-600 mb-2 dark:text-white">Available Balance</p>
//             <p className="text-3xl font-bold dark:text-white">${availableBalance}</p>
//           </div>
//           <div className="bg-primary rounded-full p-3">
//             <PiWallet className="h-6 w-6 text-white" />
//           </div>
//         </div>

//         <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
//           <div>
//             <p className="text-lg text-gray-600 mb-2 dark:text-white">Total Orders</p>
//             <p className="text-3xl font-bold dark:text-white">{totalOrdersCount}</p>
//           </div>
//           <div className="bg-primary rounded-full p-3">
//             <LuCalendarCheck className="h-6 w-6 text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Orders & Reviews */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-8">
//         <CurrentOrders orders={mappedOrders} />
//         <LastReviews reviews={mappedReviews} />
//       </div>

//       {/* Transactions Table */}
//       <div className="mb-5 mt-10">
//         <TransactionsTable />
//       </div>

//       {/* Pagination */}
//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={totalOrdersCount}
//         onChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default Overview;



"use client";

import Image from "next/image";
import logo from "../../../../../public/seller/seller-icon.svg";
import { LuCalendarCheck } from "react-icons/lu";
import { PiWallet } from "react-icons/pi";
import CurrentOrders from "@/components/Seller/Overview/CurrentOrders";
import LastReviews from "@/components/Seller/Overview/LastReviews";
import TransactionsTable from "@/components/Seller/Overview/TransactionsTable";
import { useState } from "react";
import { Pagination, Spin } from "antd";
import { useGetCurrentOrdersQuery } from "@/redux/features/order/seller/orderApi";
import { useGetMyProductReviewsQuery } from "@/redux/features/review/seller/reviewApi";
import { useGetDashboardSummaryQuery } from "@/redux/features/seller/dashboardSummary/dashboardApi";

// Define Review interface matching LastReviews props
interface Review {
  id: number;
  name: string;
  date: string;
  productName: string;
  productDescription: string;
  timeAgo?: string;
  userImage: string;
  productImage: string;
}

// Define Order interface matching CurrentOrders props
interface OrderItem {
  id: string;
  customerName: string;
  customerImage: string;
  createdAt: string;
  productName: string;
  productImages: string[];
  productDescription?: string;
  timeAgo?: string;
  status: string; // ❗ Must exist
}

const Overview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch current orders, reviews, and dashboard summary
  const { data: ordersData, isLoading: isOrdersLoading } = useGetCurrentOrdersQuery();
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetMyProductReviewsQuery();
  const { data: dashboardData, isLoading: isDashboardLoading } = useGetDashboardSummaryQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Show loader while fetching
  if (isOrdersLoading || isReviewsLoading || isDashboardLoading) 
    return <Spin className="mt-20 mx-auto" size="large" />;

  // Helper function for "time ago"
  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Map API orders to CurrentOrders component props
  const mappedOrders: OrderItem[] =
    ordersData?.data.map((order) => {
      const firstProduct = order.items[0];
      return {
        id: order.orderId,
        customerName: order.customerName,
        customerImage: order.customerImage || "https://via.placeholder.com/40",
        createdAt: order.createdAt,
        productName: firstProduct?.productName || "-",
        productDescription: `Price: $${firstProduct?.price || 0}`,
        productImages: firstProduct?.productImages || [],
        timeAgo: getTimeAgo(order.createdAt),
        status: order.status || "PENDING",
      };
    }) || [];

  // Map API reviews to LastReviews component props
  const mappedReviews: Review[] =
    reviewsData?.data.map((review, index) => ({
      id: index + 1,
      name: review.customerName,
      date: new Date(review.createdAt).toLocaleDateString(),
      userImage: review.customerImage || "https://via.placeholder.com/40",
      productName: review.productName,
      productDescription: review.comment,
      productImage: review.productImages[0] || "https://via.placeholder.com/60",
      timeAgo: getTimeAgo(review.createdAt),
    })) || [];

  // ✅ Use API values for summary cards
  const currentOrdersCount = dashboardData?.data.currentOrders || 0;
  const totalOrdersCount = dashboardData?.data.totalOrders || 0;
  const availableBalance = dashboardData?.data.totalSalesAmount || 0;

  return (
    <div className="container mx-auto px-4 md:px-0 py-8 md:py-16">
      {/* Header */}
      <div className="flex items-center gap-5">
        <Image src={logo} width={400} height={400} alt="logo" className="w-22 rounded-full" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold dark:text-white">
            Welcome Back, Hatem!
          </h1>
          <p className="mt-1 dark:text-white">
            Here’s an overview of your business performance and activities today.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 mb-2 dark:text-white">Current Orders</p>
            <p className="text-3xl font-bold dark:text-white">{currentOrdersCount}</p>
          </div>
          <div className="bg-primary rounded-full p-3">
            <LuCalendarCheck className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 mb-2 dark:text-white">Available Balance</p>
            <p className="text-3xl font-bold dark:text-white">${availableBalance.toFixed(2)}</p>
          </div>
          <div className="bg-primary rounded-full p-3">
            <PiWallet className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 mb-2 dark:text-white">Total Orders</p>
            <p className="text-3xl font-bold dark:text-white">{totalOrdersCount}</p>
          </div>
          <div className="bg-primary rounded-full p-3">
            <LuCalendarCheck className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Orders & Reviews */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-8">
        <CurrentOrders orders={mappedOrders} />
        <LastReviews reviews={mappedReviews} />
      </div>

      {/* Transactions Table */}
      <div className="mb-5 mt-10">
        <TransactionsTable />
      </div>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalOrdersCount}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Overview;
