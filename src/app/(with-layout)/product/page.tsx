


"use client";

import Link from "next/link";
// import ProductCart, { Product } from "./ProductCart";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ProductSkeleton from "@/utils/ProductSkeleton";
import ProductCart,{Product} from "@/components/Home/ProductCart";

// ------------------- API Response Type -------------------
interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Product[];
}

// ------------------- Component -------------------
const ExploreProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery(undefined) as {
    data?: ApiResponse;
    isLoading: boolean;
  };

  return (
    <div className="container mx-auto pb-20 mt-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
        {isLoading
          ? [...Array(8)].map((_, index) => <ProductSkeleton key={index} />)
          : data?.data?.map((product) => (
              <ProductCart
                key={product.id}
                product={{
                  ...product,
                  productImages: product.productImages || [], // ensure array
                  _count: { review: product._count?.review || 0 }, // ensure review exists
                }}
              />
          ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/product">
          <button className="md:text-xl bg-primary px-8 md:px-16 py-2 md:py-4 text-white rounded cursor-pointer">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreProducts;
