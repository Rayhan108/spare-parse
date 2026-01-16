/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

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
import { useTranslations } from "next-intl";

// Default placeholder images - make sure these exist in your public folder
const DEFAULT_AVATAR = "/default-avatar.png";
const DEFAULT_PRODUCT = "/default-product.png";
const DEFAULT_SELLER_ICON = "/seller-icon.svg";

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
  status: string;
}

// Helper function to safely get image URL
const getSafeImageUrl = (
  imageUrl: string | null | undefined,
  fallback: string
): string => {
  if (!imageUrl || imageUrl.trim() === "") {
    return fallback;
  }
  return imageUrl;
};

// Helper function to safely get image array
const getSafeImageArray = (
  images: string[] | null | undefined,
  fallback: string
): string[] => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return [fallback];
  }
  // Filter out any null/undefined/empty values from the array
  const validImages = images.filter(
    (img) => img && typeof img === "string" && img.trim() !== ""
  );
  return validImages.length > 0 ? validImages : [fallback];
};

const Overview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const t = useTranslations("sellerOverview");

  // Fetch current orders, reviews, and dashboard summary
  const { data: ordersData, isLoading: isOrdersLoading } =
    useGetCurrentOrdersQuery();
  const { data: reviewsData, isLoading: isReviewsLoading } =
    useGetMyProductReviewsQuery();
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetDashboardSummaryQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Show loader while fetching
  if (isOrdersLoading || isReviewsLoading || isDashboardLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Helper function for "time ago"
  const getTimeAgo = (dateStr: string) => {
    if (!dateStr) return "N/A";
    
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

      if (diff < 0) return "Just now";
      if (diff < 60) return `${diff}s ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error:any) {
      return "N/A";
    }
  };

  // Map API orders to CurrentOrders component props
  const mappedOrders: OrderItem[] = Array.isArray(ordersData?.data)
    ? ordersData.data.map((order: any) => {
        const firstProduct = order.items?.[0];
        return {
          id: order.orderId || `order-${Date.now()}`,
          customerName: order.customerName || "Unknown",
          customerImage: getSafeImageUrl(order.customerImage, DEFAULT_AVATAR),
          createdAt: order.createdAt || new Date().toISOString(),
          productName: firstProduct?.productName || "-",
          productDescription: `Price: dzd${firstProduct?.price || 0}`,
          productImages: getSafeImageArray(
            firstProduct?.productImages,
            DEFAULT_PRODUCT
          ),
          timeAgo: getTimeAgo(order.createdAt),
          status: order.status || "PENDING",
        };
      })
    : [];

  // Map API reviews to LastReviews component props
  const mappedReviews: Review[] = Array.isArray(reviewsData?.data?.data)
    ? reviewsData.data.data.map((review: any, index: number) => ({
        id: index + 1,
        name: review.customerName || "Unknown User",
        date: review.createdAt
          ? new Date(review.createdAt).toLocaleDateString()
          : "N/A",
        userImage: getSafeImageUrl(review.customerImage, DEFAULT_AVATAR),
        productName: review.productName || "Product Name",
        productDescription: review.comment || "",
        productImage: getSafeImageUrl(
          review.productImages?.[0],
          DEFAULT_PRODUCT
        ),
        timeAgo: getTimeAgo(review.createdAt),
      }))
    : [];

  // Use API values for summary cards
  const currentOrdersCount = dashboardData?.data?.currentOrders || 0;
  const totalOrdersCount = dashboardData?.data?.totalOrders || 0;
  const availableBalance = dashboardData?.data?.totalSalesAmount || 0;
  const SellerName = dashboardData?.data?.sellerName || "Seller";

  return (
    <div className="container mx-auto px-4 md:px-0 py-8 md:py-16">
      {/* Header */}
      <div className="flex items-center gap-5">
        <Image
          src={DEFAULT_SELLER_ICON}
          width={400}
          height={400}
          alt="logo"
          className="w-22 rounded-full"
        />
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold dark:text-white">
            {t("welcomeMessage")} {SellerName}!
          </h1>
          <p className="mt-1 dark:text-white">{t("overviewDescription")}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 mb-2 dark:text-white">
              {t("currentOrders")}s
            </p>
            <p className="text-3xl font-bold dark:text-white">
              {currentOrdersCount}
            </p>
          </div>
          <div className="bg-primary rounded-full p-3">
            <LuCalendarCheck className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 mb-2 dark:text-white">
              {t("availableBalance")}
            </p>
            <p className="text-3xl font-bold dark:text-white">
              DZD {availableBalance.toFixed(2)}
            </p>
          </div>
          <div className="bg-primary rounded-full p-3">
            <PiWallet className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 mb-2 dark:text-white">
              {t("totalOrders")}
            </p>
            <p className="text-3xl font-bold dark:text-white">
              {totalOrdersCount}
            </p>
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
        className="dark:text-white"
      />
    </div>
  );
};

export default Overview;