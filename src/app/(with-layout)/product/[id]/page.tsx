// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { Package } from "lucide-react";
// import ReferencesTab from "./Tabs/ReferencesTab";
// import VehiclesTab from "./Tabs/VehiclesTab";
// import AlternativesTab from "./Tabs/AlternativesTab";
// import ShippingRates from "./Tabs/ShippingRates";
// import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
// import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
// import { toast } from "react-toastify";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// type Tab = "references" | "vehicles" | "alternatives";

// interface Seller { userId: string; companyName: string; logo: string | null }
// interface Category { id: string; name: string }
// interface Brand { id: string; brandName: string; brandImage: string | null }
// interface Reference { id: string; type: string; number: string }
// interface Shipping { id: string; countryName: string; countryCode: string; carrier: string; cost: number; deliveryMin: number; deliveryMax: number; isDefault: boolean }
// interface SectionField { id: string; sectionId: string; fieldName: string; valueString: string | null; valueInt: number | null; valueFloat: number | null; valueDate: string | null }
// interface Section { id: string; sectionName: string; parentId: string | null; fields: SectionField[] }

// interface Product {
//   id: string;
//   productName: string;
//   description: string;
//   price: number;
//   discount: number;
//   stock: number;
//   productImages: string[];
//   isVisible: boolean;
//   createdAt: string;
//   updatedAt: string;
//   seller: Seller;
//   category?: Category;
//   brand?: Brand;
//   sections?: Section[];
//   references?: Reference[];
//   shippings?: Shipping[];
//   fitVehicles?: string[];
//   similarProducts?: AlternativeProduct[];
// }

// interface AlternativeProduct { id: string; companyName: string; productCode: string; productName: string; image?: string; price: number; dispatch?: string }
// interface NumberItem { value: string; isLink: boolean }
// interface ReferenceItem { manufacturer: string; numbers: NumberItem[] }
// interface FitVehicle {
//   id: string;
//   engine: {
//     engineCode: string;
//     hp: number;
//     ccm: number;
//     fuelType: string;
//     generation: {
//       generationName: string;
//       body: string;
//       productionStart: string;
//       productionEnd: string | null;
//       model: { modelName: string; brand: { brandName: string } };
//     };
//   };
// }

// // Request type for add-to-cart
// interface AddToCartRequest {
//   productId: string;
// }

// export default function SingleProduct() {
//   const { id } = useParams<{ id: string }>();
//   const { data, isLoading, isError } = useGetSingleProductQuery(id);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [activeTab, setActiveTab] = useState<Tab>("references");

//   const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

//   if (isLoading) return <p>Loading product...</p>;
//   if (isError || !data?.data) return <p>Failed to load product details.</p>;

//   const product: Product = data.data;

//   const handleAddToCart = async () => {
//     try {
//       const payload: AddToCartRequest = { productId: product.id  };
//       const response = await addToCart(payload).unwrap();
//       toast.success(response.message);
//     } catch (err) {
//       // Type guard
//       if ('status' in (err as FetchBaseQueryError)) {
//         const fetchError = err as FetchBaseQueryError;
//         const message =
//           'data' in fetchError && fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
//             ? (fetchError.data as { message: string }).message
//             : 'Failed to add product to cart';
//         toast.error(message);
//       } else {
//         toast.error('Failed to add product to cart');
//       }
//       console.error("Add to cart failed:", err);
//     }
//   };

//   // Map references
//   const referenceItems: ReferenceItem[] = [];
//   if (product.references?.length) {
//     referenceItems.push({
//       manufacturer: "OE Numbers",
//       numbers: product.references.map((ref) => ({ value: ref.number, isLink: ref.type === "OE" })),
//     });
//     referenceItems.push({
//       manufacturer: "Supplier Numbers",
//       numbers: product.references.filter((r) => r.type !== "OE").map((ref) => ({ value: ref.number, isLink: false })),
//     });
//   }

//   // Map fitVehicles
//   const mappedFitVehicles: FitVehicle[] = (product.fitVehicles || []).map((modelName, index) => ({
//     id: String(index),
//     engine: {
//       engineCode: "N/A",
//       hp: 0,
//       ccm: 0,
//       fuelType: "Unknown",
//       generation: { generationName: "N/A", body: "N/A", productionStart: "2000-01-01", productionEnd: null, model: { modelName, brand: { brandName: "Unknown" } } },
//     },
//   }));

//   return (
//     <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-8 p-6 lg:p-0 mb-6">
//       <div className="mx-auto container mt-6">
//         {/* Header */}
//         <div className="mb-6 flex items-center gap-3 md:mb-8">
//           <h1 className="text-xl font-semibold md:text-2xl">{product.productName}</h1>
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(300px,400px)_1fr] xl:grid-cols-[400px_1fr_350px]">
//           {/* Product Image */}
//           <div className="flex items-start justify-center rounded-lg border p-4 md:p-6">
//             <Image src={product.productImages?.[0] || "/placeholder.png"} alt={product.productName} width={400} height={400} unoptimized className="w-full max-w-[350px] object-contain" />
//           </div>

//           {/* Specs */}
//           <div className="space-y-4">
//             {product.sections?.map((section) => (
//               <div key={section.id} className="border rounded-lg">
//                 <div className="flex items-center gap-2 font-medium border-b p-4">
//                   <Package className="h-4 w-4 text-gray-500" /> {section.sectionName}
//                 </div>
//                 <div className="px-4">
//                   {section.fields.map((field) => (
//                     <div key={field.id} className="flex justify-between py-2 border-b last:border-0">
//                       <span className="text-sm text-gray-500">{field.fieldName}</span>
//                       <span className="text-sm font-medium">{field.valueString ?? field.valueInt ?? field.valueFloat ?? "-"}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Price & Cart */}
//           <div className="lg:col-span-2 xl:col-span-1">
//             <div className="sticky top-4 border rounded-lg p-4 md:p-6 space-y-4">
//               <div className="text-3xl font-bold">${product.price}</div>
//               <div className="flex gap-2">
//                 <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 1)} className="w-20 border px-2 text-center" />
//                 <button onClick={handleAddToCart} disabled={isAdding} className="flex-1 py-2 rounded bg-primary text-white">
//                   {isAdding ? "Adding..." : "Add To Cart"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 my-6">
//           {["references", "vehicles", "alternatives"].map((tab) => (
//             <button key={tab} onClick={() => setActiveTab(tab as Tab)} className={`pb-3 text-sm font-medium ${activeTab === tab ? "border-b-2 text-primary" : "text-gray-500"}`}>
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="py-2">
//           <ShippingRates shippings={product.shippings || []} />
//         </div>

//         {activeTab === "references" && <ReferencesTab referenceItems={referenceItems} />}
//         {activeTab === "vehicles" && <VehiclesTab fitVehicles={mappedFitVehicles} />}
//         {activeTab === "alternatives" && <AlternativesTab similarProducts={product.similarProducts || []} />}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReferencesTab from "./Tabs/ReferencesTab";
import VehiclesTab from "./Tabs/VehiclesTab";
import AlternativesTab from "./Tabs/AlternativesTab";
import ShippingRates from "./Tabs/ShippingRates";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
// import { toast } from "react-toastify";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Package, Info, Check, RotateCcw } from "lucide-react";
import SingleProductSkeleton from "@/utils/SingleProductSkeleton";
import Cookies from "js-cookie";
import { notification } from "antd";

type Tab = "references" | "vehicles" | "alternatives";

// Interfaces
interface Seller { userId: string; companyName: string; logo: string | null }
interface Category { id: string; name: string }
interface Brand { id: string; brandName: string; brandImage: string | null }
interface Reference { id: string; type: string; number: string }
interface Shipping { id: string; countryName: string; countryCode: string; carrier: string; cost: number; deliveryMin: number; deliveryMax: number; isDefault: boolean }
interface SectionField { id: string; sectionId: string; fieldName: string; valueString: string | null; valueInt: number | null; valueFloat: number | null; valueDate: string | null }
interface Section { id: string; sectionName: string; parentId: string | null; fields: SectionField[] }

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

interface AlternativeProduct { id: string; companyName: string; productCode?: string; productName: string; image?: string; price: number; inStock?: boolean; dispatch?: string }

interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  productImages: string[];
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  seller: Seller;
  category?: Category;
  brand?: Brand;
  sections?: Section[];
  references?: Reference[];
  shippings?: Shipping[];
  fitVehicles?: FitVehicle[];
  similarProducts?: AlternativeProduct[];
}

// Add to cart request
interface AddToCartRequest { productId: string }

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<Tab>("references");
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
const [api, contextHolder] = notification.useNotification();
  if (isLoading) return <SingleProductSkeleton />;
  if (isError || !data?.data) return <p>Failed to load product details.</p>;

  const product: Product = data.data;





  const handleAddToCart = async () => {
  try {
    // ✅ Check if user is logged in
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
      description: response.message || "Product added to cart successfully!",
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
        numbers: product.references.filter(r => r.type === "OE").map(ref => ({ value: ref.number, isLink: true })),
      },
      {
        manufacturer: "Supplier Numbers",
        numbers: product.references.filter(r => r.type !== "OE").map(ref => ({ value: ref.number, isLink: false })),
      }
    ]
    : [];

  // Vehicles
  const fitVehicles: FitVehicle[] = product.fitVehicles || [];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-8 p-6 lg:p-0 mb-6">
      <div className="mx-auto container mt-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 md:mb-8">
          <h1 className="text-xl font-semibold md:text-2xl">{product.productName}</h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(300px,400px)_1fr] xl:grid-cols-[400px_1fr_350px]">
          {/* Product Image */}
          <div className="flex items-start justify-center rounded-lg border p-4 md:p-6">
            <Image
              src={product.productImages?.[0] || "/placeholder.png"}
              alt={product.productName}
              width={400}
              height={400}
              unoptimized
              className="w-full max-w-[350px] object-contain"
            />
          </div>

          {/* Specs */}
          <div className="space-y-4">
            {product.sections?.map(section => (
              <div key={section.id} className="border rounded-lg">
                <div className="flex items-center gap-2 font-medium border-b p-4">
                  <Package className="h-4 w-4 text-gray-500" /> {section.sectionName}
                </div>
                <div className="px-4">
                  {section.fields.map(field => (
                    <div key={field.id} className="flex justify-between py-2 border-b last:border-0">
                      <span className="text-sm text-gray-500">{field.fieldName}</span>
                      <span className="text-sm font-medium">{field.valueString ?? field.valueInt ?? field.valueFloat ?? "-"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Price & Shipping Column */}
          <div className="lg:col-span-2 xl:col-span-1 flex flex-col gap-4">
            {/* Shipping Details */}
            {/* <div className="border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
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
            </div> */}

            {/* Price & Cart */}
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
                 {contextHolder}
                <button

                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 py-2 flex items-center justify-center gap-2 rounded bg-primary text-white"
                >
                  {isAdding ? "Adding..." : "Add To Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Tabs */}
        <div className="flex gap-4 my-6">
          {["references", "vehicles", "alternatives"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`pb-3 text-sm font-medium ${activeTab === tab ? "border-b-2 text-primary" : "text-gray-500"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="py-2">
          <ShippingRates shippings={product.shippings || []} />
        </div>

        {activeTab === "references" && <ReferencesTab referenceItems={referenceItems} />}
        {activeTab === "vehicles" && <VehiclesTab fitVehicles={fitVehicles} />}
        {activeTab === "alternatives" && <AlternativesTab similarProducts={product.similarProducts || []} />}
      </div>
    </div>
  );
}

