
"use client";

import { useState } from "react";
import { Input } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductByEngineQuery } from "@/redux/features/products/productsApi";
import VehicleProductsSkeleton from "@/utils/VehicleProductsSkeleton";

// --- Types ---
interface Product {
  id: string;
  productName: string;
  productImages: string[];
  price: number;
  brandName: string;
}

interface Category {
  id: string;
  name: string;
  iconUrl: string;
  products: Product[];
}

interface Vehicle {
  engineId: string;
  engineCode: string;
  modelName: string;
  brandName: string;
}

interface VehicleProductsData {
  vehicle: Vehicle;
  categories: Category[];
}

interface VehicleProductsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: VehicleProductsData;
}

// --- Component ---
export default function VehicleProductsPage() {
  const [brandFilter, setBrandFilter] = useState("");
  const searchParams = useSearchParams();
  const engineId = searchParams.get("engineId") || "";

  const router = useRouter();

  // Handle product click
  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`); // adjust the path to your Single Product page route
  };

  const { data: apiResponse, isLoading, isError } =
    useGetProductByEngineQuery(engineId) as {
      data?: VehicleProductsApiResponse;
      isLoading: boolean;
      isError: boolean;
    };

  if (isLoading) return <VehicleProductsSkeleton ></VehicleProductsSkeleton>;
  if (isError || !apiResponse?.data) return <p className="text-center py-8">Failed to load products.</p>;

  const { vehicle, categories } = apiResponse.data;

  const filterByBrand = (products: Product[]) =>
    brandFilter
      ? products.filter((p) =>
        p.brandName.toLowerCase().includes(brandFilter.toLowerCase())
      )
      : products;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4 md:p-8 container mx-auto">
      {/* Vehicle Info */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
        {vehicle.brandName} {vehicle.modelName} ({vehicle.engineCode})
      </h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="border border-gray-300 dark:border-gray-700 rounded p-4 md:p-6 bg-white dark:bg-gray-900">
            <label className="block text-sm font-semibold mb-2">Filter Brand:</label>
            <Input
              type="text"
              placeholder="Enter brand"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full mb-4"
            />
            <button
              onClick={() => setBrandFilter("")}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 text-sm font-medium"
            >
              Show All
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 space-y-6 md:space-y-8">
          {categories.map((category: Category) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-2 md:mb-4">
               
                <h2 className="text-lg md:text-xl font-semibold">{category.name}</h2>
              </div>

              {/* Products Grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
                {filterByBrand(category.products).map((product: Product) => (
                  <div
                    onClick={() => handleProductClick(product.id)}
                    key={product.id}
                    className="border dark:border-gray-700 rounded-lg p-3 flex flex-col hover:shadow-lg transition bg-white dark:bg-gray-900"
                  >
                    <div className="w-full aspect-[4/3] relative mb-2">
                      <Image
                        src={product.productImages[0] || "/placeholder.svg"}
                        alt={product.productName}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">
                      {product.productName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Brand: {product.brandName}
                    </p>
                    <p className="font-semibold text-sm sm:text-base">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
