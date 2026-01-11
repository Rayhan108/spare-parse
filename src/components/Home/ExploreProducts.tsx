/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import ProductCart from "./ProductCart";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ProductSkeleton from "@/utils/ProductSkeleton";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";




const ExploreProducts = () => {

const page =1
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query');
const { data, isLoading } = useGetAllProductsQuery({
  searchTerm: searchTerm || '',
  page

}) as {
  data?: any;
  isLoading: boolean;

};
const t=useTranslations('exploreProducts')
// console.log("query--->",encodeURIComponent(query||""));

  return (
    <div className="container mx-auto pb-20" id="our-products">
      <div className="flex gap-2 items-center mb-5">
        <span className="bg-primary h-10 px-10 rounded-md"></span>
        <p className="text-primary font-semibold text-lg">{t('title')}</p>
      </div>

      <div className="flex justify-between items-center mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-5xl dark:text-white">
          {t('ourProducts')}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
        {isLoading
          ? [...Array(8)]?.map((_, index) => <ProductSkeleton key={index} />)
          : data?.data?.map((product:any) => (
              <ProductCart
                key={product?.id}
                product={{
                  ...product,
                  productImages: product?.productImages || [], 
                  _count: { review: product?._count?.review || 0 },
                }}
              />
          )).slice(0,4)}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/product">
          <button className="md:text-xl bg-primary px-8 md:px-16 py-2 md:py-4 text-white rounded cursor-pointer">
            {t('viewAllProducts')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreProducts;
