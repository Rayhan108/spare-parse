"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Package, Truck, Info, Check, RotateCcw } from "lucide-react";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import Image from "next/image";
import ReferencesTab from "./Tabs/ReferencesTab";
import VehiclesTab from "./Tabs/VehiclesTab";
import AlternativesTab from "./Tabs/AlternativesTab";

type Tab = "references" | "vehicles" | "alternatives";

interface NumberItem {
  value: string;
  isLink: boolean;
}

interface ReferenceItem {
  manufacturer: string;
  numbers: NumberItem[];
}

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<Tab>("references");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          Loading product details...
        </p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <p className="text-lg text-red-600 dark:text-red-400">
          Failed to load product details.
        </p>
      </div>
    );
  }

  const product = data.data;

  // Prepare references
  const referenceItems: ReferenceItem[] = [];
  if (product.references?.length) {
    referenceItems.push({
      manufacturer: "OE Numbers",
      numbers: product.references.map((ref: any) => ({
        value: ref.number,
        isLink: true,
      })),
    });
  }
  if (product.crossReferences?.length) {
    referenceItems.push({
      manufacturer: "Cross Reference Numbers",
      numbers: product.crossReferences.map((ref: any) => ({
        value: ref.number,
        isLink: false,
      })),
    });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-8 p-6 lg:p-0 mb-6">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 md:mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 md:h-10 md:w-10">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="h-5 w-5 md:h-6 md:w-6"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold md:text-2xl">{product.productName}</h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(300px,400px)_1fr] xl:grid-cols-[400px_1fr_350px]">
          {/* Product Image */}
          <div className="flex items-start justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-6">
            <Image
              src={product.productImages?.[0] || "/placeholder.png"}
              alt={product.productName}
              width={400}
              height={400}
              unoptimized
              className="w-full max-w-[350px] object-contain"
            />
          </div>

          {/* Specs & Shipping */}
          <div className="space-y-4">
            {/* Specifications */}
            <div className="border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 text-base font-medium md:text-lg border-b border-gray-300 dark:border-gray-700 p-4">
                <Package className="h-4 w-4 md:h-5 md:w-5 text-gray-500 dark:text-gray-300" />
                Specifications
              </div>
              <div className="p-4">
                {product.sections?.flatMap((section: any, sectionIndex: number) =>
                  section.fields.map((field: any, fieldIndex: number) => (
                    <div
                      key={`${sectionIndex}-${fieldIndex}`}
                      className="flex flex-col gap-1 border-b border-gray-300 dark:border-gray-700 py-2 last:border-0 sm:flex-row sm:justify-between"
                    >
                      <span className="text-sm text-gray-500 dark:text-gray-300">{field.fieldName}</span>
                      <span className="text-sm font-medium">{field.valueString ?? field.valueInt ?? field.valueFloat ?? "-"}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 text-base font-medium md:text-lg p-4">
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-gray-500 dark:text-gray-300" />
                Shipping Details
              </div>
              <div className="p-4">
                {product.shippings?.map((ship: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 border-b border-gray-300 dark:border-gray-700 py-2 last:border-0 sm:flex-row sm:justify-between"
                  >
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {ship.countryName} ({ship.carrier})
                    </span>
                    <span className="text-sm font-medium">
                      ${ship.cost} — {ship.deliveryMin}-{ship.deliveryMax} days
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price & Cart */}
          <div className="lg:col-span-2 xl:col-span-1">
            <div className="sticky top-4 border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold md:text-4xl">${product.price}</div>
                <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500 dark:text-gray-300">
                  <span>Price excludes VAT</span>
                  <Info className="h-3 w-3 md:h-4 md:w-4" />
                </div>
              </div>

              <div className="space-y-2 border-y border-gray-300 dark:border-gray-700 py-4">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="font-medium">Dispatch on next business day</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                  <RotateCcw className="h-4 w-4" />
                  <span>Easy returns</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="w-20 rounded border border-gray-300 dark:border-gray-700 px-2 text-center bg-white dark:bg-gray-800 text-black dark:text-white"
                />
                <button className="flex-1 py-2 flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 mt-6">
          {["references", "vehicles", "alternatives"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`pb-3 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 dark:text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "references" && <ReferencesTab referenceItems={referenceItems} />}
        {activeTab === "vehicles" && <VehiclesTab fitVehicles={product.fitVehicles || []} />}
        {activeTab === "alternatives" && <AlternativesTab similarProducts={product.similarProducts || []} />}
      </div>
    </div>
  );
}
