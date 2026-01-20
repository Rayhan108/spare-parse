/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ProductSkeleton from "@/utils/ProductSkeleton";
import ProductCart from "@/components/Home/ProductCart";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Pagination, InputNumber } from "antd";
import { FilterOutlined, DollarOutlined, StockOutlined } from "@ant-design/icons";

const ExploreProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceMin: 100,
    priceMax: 1000,
    stockMin: 1,
    stockMax: 100,
  });

  const pageSize = 10;
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");

  const { data, isLoading } = useGetAllProductsQuery({
    searchTerm: searchTerm || "",
    page: currentPage,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    stockMin: filters.stockMin,
    stockMax: filters.stockMax,
  }) as {
    data?: any;
    isLoading: boolean;
  };

  const totalOrdersCount = data?.meta?.total || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (value: number | null, key: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 pb-20 mt-10 md:mt-20">
      {/* Header Section: Title and Typable Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
        
        {/* Title Section */}
        <div className="flex gap-2 items-center">
          <span className="bg-primary h-10 w-2 rounded-md"></span>
          <p className="text-primary font-bold text-2xl uppercase tracking-wider">Our Products</p>
        </div>

        {/* Eye-Catching Typable Filter Group */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 flex flex-wrap items-center gap-4 justify-start md:justify-end">
          <div className="flex items-center gap-2 text-gray-500 mr-2">
            <FilterOutlined className="text-primary text-lg" />
            <span className="text-sm font-bold uppercase tracking-tight hidden sm:inline">Quick Filters</span>
          </div>

          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 w-full md:w-auto">
            {/* Price Min */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Min Price</span>
              <InputNumber
                prefix={<DollarOutlined className="text-gray-400" />}
                value={filters.priceMin}
                onChange={(val) => handleFilterChange(val, "priceMin")}
                className="w-full md:w-32 custom-input-number"
                placeholder="Min"
              />
            </div>

            {/* Price Max */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Max Price</span>
              <InputNumber
                prefix={<DollarOutlined className="text-gray-400" />}
                value={filters.priceMax}
                onChange={(val) => handleFilterChange(val, "priceMax")}
                className="w-full md:w-32 custom-input-number"
                placeholder="Max"
              />
            </div>

            {/* Stock Min */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Min Stock</span>
              <InputNumber
                prefix={<StockOutlined className="text-gray-400" />}
                value={filters.stockMin}
                onChange={(val) => handleFilterChange(val, "stockMin")}
                className="w-full md:w-32 custom-input-number"
                placeholder="Min"
              />
            </div>

            {/* Stock Max */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Max Stock</span>
              <InputNumber
                prefix={<StockOutlined className="text-gray-400" />}
                value={filters.stockMax}
                onChange={(val) => handleFilterChange(val, "stockMax")}
                className="w-full md:w-32 custom-input-number"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {isLoading
          ? [...Array(8)].map((_, index) => <ProductSkeleton key={index} />)
          : data?.data?.map((product: any) => (
              <ProductCart
                key={product.id}
                product={{
                  ...product,
                  productImages: product.productImages || [],
                  _count: { review: product._count?.review || 0 },
                }}
              />
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalOrdersCount}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="bg-white dark:bg-zinc-800 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800"
        />
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-12">
        <Link href="/product">
          <button className="transition-all duration-300 hover:bg-opacity-90 hover:shadow-xl active:scale-95 md:text-lg font-semibold bg-primary px-12 py-4 text-white rounded-xl shadow-lg shadow-primary/20 cursor-pointer">
            View All Collection
          </button>
        </Link>
      </div>

      {/* Custom styles for Ant Design InputNumber */}
      <style jsx global>{`
        .custom-input-number {
          border-radius: 10px !important;
          overflow: hidden;
          height: 42px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          border-color: #f3f4f6 !important;
          background: #f9fafb !important;
        }
        .custom-input-number:hover, .custom-input-number:focus-within {
          border-color: #3b82f6 !important; /* Adjust to your primary color */
          background: #fff !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1) !important;
        }
        .dark .custom-input-number {
          background: #18181b !important;
          border-color: #27272a !important;
        }
        .dark .custom-input-number input {
          color: white !important;
        }
        .ant-input-number-affix-wrapper > .ant-input-number-prefix {
            margin-right: 8px;
        }
      `}</style>
    </div>
  );
};

export default ExploreProducts;