"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { notification, Button } from "antd";
import Cookies from "js-cookie";
import { Package, Info, Check, RotateCcw } from "lucide-react";

import ReferencesTab from "./Tabs/ReferencesTab";
import VehiclesTab from "./Tabs/VehiclesTab";
import AlternativesTab from "./Tabs/AlternativesTab";
import ShippingRates from "./Tabs/ShippingRates";
import Reviews from "@/components/Products/Review";
import SingleProductSkeleton from "@/utils/SingleProductSkeleton";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

type Tab = "references" | "vehicles" | "alternatives" | "reviews";
interface Seller {
   userId: string;
   companyName: string;
   logo: string | null;
}
interface Category {
   id: string;
   name: string;
}
interface Brand {
   id: string;
   brandName: string;
   brandImage: string | null;
}
interface Reference {
   id: string;
   type: string;
   number: string;
}
interface Shipping {
   id: string;
   countryName: string;
   countryCode: string;
   carrier: string;
   cost: number;
   deliveryMin: number;
   deliveryMax: number;
   isDefault: boolean;
}
interface SectionField {
   id: string;
   sectionId: string;
   fieldName: string;
   valueString: string | null;
   valueInt: number | null;
   valueFloat: number | null;
   valueDate: string | null;
}
interface Section {
   id: string;
   sectionName: string;
   parentId: string | null;
   fields: SectionField[];
}

interface FitVehicle {
   id: string;
   engine: {
      engineCode: string;
      hp: number;
      ccm: number;
      fuelType: string;
      generation: {
         generationName: string;
         body: string;
         productionStart: string;
         productionEnd: string | null;
         model: { modelName: string; brand: { brandName: string } };
      };
   };
}

interface AlternativeProduct {
   id: string;
   companyName: string;
   productCode?: string;
   productName: string;
   image?: string;
   price: number;
   inStock?: boolean;
   dispatch?: string;
}

interface Product {
   id: string;
   productName: string;
   description?: string;
   price: number;
   discount?: number;
   stock?: number;
   productImages?: string[];
   isVisible?: boolean;
   createdAt?: string;
   updatedAt?: string;
   seller?: Seller;
   category?: Category;
   brand?: Brand;
   sections?: Section[];
   references?: Reference[];
   shippings?: Shipping[];
   fitVehicles?: FitVehicle[];
   similarProducts?: AlternativeProduct[];
   averageRating?: number;
}

interface AddToCartRequest {
   productId: string;
}

export default function SingleProduct() {
   const user = useSelector(selectCurrentUser);
   const { id } = useParams<{ id: string }>();
   const { data, isLoading, isError } = useGetSingleProductQuery(id);
   const [quantity, setQuantity] = useState<number>(1);
   const [activeTab, setActiveTab] = useState<Tab>("references");
   const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
   const [api, contextHolder] = notification.useNotification();

   if (isLoading) return <SingleProductSkeleton />;
   if (isError || !data?.data) return <p>Failed to load product details.</p>;

   const product: Product = data.data;
   const role = user?.role;
   const removeHTMLTags = (input: string) => {
      return input.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
   };

   const handleAddToCart = async () => {
      try {
         const token = Cookies.get("hatem-ecommerce-token");
         if (!token) {
            api.open({
               type: "warning",
               message: "Login Required",
               description: "Please log in to add products to your cart.",
               placement: "topRight",
            });
            return;
         }

         const payload: AddToCartRequest = { productId: product.id };
         const response = await addToCart(payload).unwrap();

         api.open({
            type: "success",
            message: "Cart",
            description:
               response.message || "Product added to cart successfully!",
            placement: "topRight",
         });
      } catch (err: unknown) {
         let errorMessage = "Failed to add product to cart";
         if (err && typeof err === "object" && "data" in err) {
            const fetchError = err as { data?: { message?: string } };
            errorMessage = fetchError.data?.message || errorMessage;
         } else if (err instanceof Error) {
            errorMessage = err.message;
         }

         api.open({
            type: "error",
            message: "Cart Error",
            description: errorMessage,
            placement: "topRight",
         });

         console.error("Add to cart failed:", err);
      }
   };

   const referenceItems = product.references?.length
      ? [
           {
              manufacturer: "OE Numbers",
              numbers: product.references
                 .filter((r) => r.type === "OE")
                 .map((ref) => ({ value: ref.number, isLink: true })),
           },
           {
              manufacturer: "Supplier Numbers",
              numbers: product.references
                 .filter((r) => r.type !== "OE")
                 .map((ref) => ({ value: ref.number, isLink: false })),
           },
        ]
      : [];

   const fitVehicles: FitVehicle[] = product.fitVehicles || [];

   const discountPercentage: number = product.discount ?? 0;
   const discount: number = discountPercentage / 100;
   const price: number = product.price - product.price * discount;
   const originalPrice: number = product.price;

   return (
      // FIX 1: overflow-x-hidden পুরো পেজে হরাইজন্টাল স্ক্রল বন্ধ করে
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-8 p-6 lg:p-0 mb-6 overflow-x-hidden">
         {contextHolder}
         {/* FIX 2: container এ overflow-hidden যোগ করা হয়েছে */}
         <div className="mx-auto container mt-6 overflow-hidden">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3 md:mb-8">
               <h1 className="text-xl font-semibold md:text-2xl break-words">
                  {product.productName}
               </h1>
            </div>

            {/* Main Grid */}
            {/* FIX 3: overflow-hidden যোগ করা হয়েছে গ্রিডে */}
            <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(300px,400px)_1fr] xl:grid-cols-[400px_1fr_350px] overflow-hidden">
               {/* 1. Product Image Column */}
               <div className="flex items-start justify-center rounded-lg border p-4 md:p-6 h-fit overflow-hidden">
                  <Image
                     src={product.productImages?.[0] || "/placeholder.png"}
                     alt={product.productName}
                     width={400}
                     height={400}
                     unoptimized
                     className="w-full max-w-[350px] object-contain"
                  />
               </div>

               {/* 2. Middle Column: Specification & Description */}
               {/* FIX 4: min-w-0 এবং overflow-hidden যোগ করা হয়েছে - এটি সবচেয়ে গুরুত্বপূর্ণ ফিক্স */}
               <div className="flex flex-col gap-4 min-w-0 overflow-hidden">
                  {/* Specification Section */}
                  <div className="space-y-4 min-w-0 overflow-hidden">
                     {product.sections?.map((section) => (
                        <div
                           key={section.id}
                           className="border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                           <div className="flex items-center gap-2 font-medium border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 rounded-t-lg overflow-hidden">
                              <Package className="h-4 w-4 text-gray-500 shrink-0" />
                              <span className="truncate">
                                 {section.sectionName}
                              </span>
                           </div>
                           <div className="px-4 py-2 overflow-hidden">
                              {section.fields.map((field) => (
                                 <div
                                    key={field.id}
                                    className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 gap-2 overflow-hidden"
                                 >
                                    <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                                       {field.fieldName}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-right break-words overflow-hidden">
                                       {field.valueString ??
                                          field.valueInt ??
                                          field.valueFloat ??
                                          "-"}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Description Section (Fully Fixed) */}
                  {product.description && (
                     <div className="border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden w-full max-w-full">
                        {/* Header */}
                        <div className="flex items-center gap-2 font-medium border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
                           <Info className="h-4 w-4 text-gray-500 shrink-0" />
                           <span className="text-gray-900 dark:text-white">
                              Product Description
                           </span>
                        </div>

                        <div className="p-4 overflow-hidden w-full max-w-full">
                           <div
                              className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed w-full max-w-full overflow-hidden"
                              style={{
                                 wordWrap: "break-word",
                                 overflowWrap: "break-word",
                                 wordBreak: "break-word",
                                 hyphens: "auto",
                                 whiteSpace: "pre-wrap",
                              }}
                           >
                              {removeHTMLTags(product.description)}
                           </div>
                        </div>
                     </div>
                  )}
               </div>

               {/* 3. Price & Cart Column */}
               <div className="lg:col-span-2 xl:col-span-1 flex flex-col gap-4 min-w-0 overflow-hidden">
                  <div className="sticky top-4 border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-6 space-y-4 overflow-hidden">
                     {/* Price content */}
                     <div className="space-y-2">
                        {discountPercentage > 0 ? (
                           <>
                              <span className="text-xl font-bold text-orange-500">
                                 DZD {price.toFixed(2)}
                              </span>
                              <span className="ml-2 text-gray-500 line-through">
                                 DZD {originalPrice.toFixed(2)}
                              </span>
                           </>
                        ) : (
                           <span className="text-xl font-bold text-orange-500">
                              DZD {price.toFixed(2)}
                           </span>
                        )}
                        <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500 dark:text-gray-300">
                           <span>Price excludes VAT</span>
                           <Info className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
                        </div>
                     </div>

                     <div className="space-y-2 border-y border-gray-300 dark:border-gray-700 py-4">
                        <div className="flex items-center gap-2 text-sm text-green-600">
                           <Check className="h-4 w-4 shrink-0" />
                           <span className="font-medium">
                              Dispatch on next business day
                           </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                           <RotateCcw className="h-4 w-4 shrink-0" />
                           <span>Easy returns</span>
                        </div>
                     </div>

                     {role == "BUYER" && (
                        <div className="flex gap-2">
                           <input
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) =>
                                 setQuantity(Number(e.target.value) || 1)
                              }
                              className="w-20 rounded border border-gray-300 dark:border-gray-700 px-2 text-center bg-white dark:bg-gray-800 text-black dark:text-white"
                           />
                           <Button
                              onClick={handleAddToCart}
                              loading={isAdding}
                              className="flex-1 !bg-primary !text-white"
                           >
                              Add To Cart
                           </Button>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 my-6 overflow-x-auto">
               {["references", "vehicles", "alternatives", "reviews"].map(
                  (tab) => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab as Tab)}
                        className={`pb-3 text-sm font-medium whitespace-nowrap ${
                           activeTab === tab
                              ? "border-b-2 text-primary"
                              : "text-gray-500"
                        }`}
                     >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                     </button>
                  )
               )}
            </div>

            <div className="py-2 overflow-hidden">
               <ShippingRates shippings={product.shippings || []} />
            </div>

            <div className="overflow-hidden">
               {activeTab === "references" && (
                  <ReferencesTab referenceItems={referenceItems} />
               )}
               {activeTab === "vehicles" && (
                  <VehiclesTab fitVehicles={fitVehicles} />
               )}
               {activeTab === "alternatives" && (
                  <AlternativesTab
                     similarProducts={product.similarProducts || []}
                  />
               )}
               {activeTab === "reviews" && (
                  <Reviews
                     avgReview={product.averageRating ?? 0}
                     id={product.id}
                  />
               )}
            </div>
         </div>
      </div>
   );
}
