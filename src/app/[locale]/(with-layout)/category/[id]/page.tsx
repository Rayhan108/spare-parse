"use client";
import { IoArrowForward } from "react-icons/io5";
import image from '../../../../../../public/slide-image.png'
import ProductCart, { Product } from "@/components/Home/ProductCart";
import 'swiper/css';
import { useGetProductsByCategoryQuery } from "@/redux/features/categories/categoriesApi";
import { useParams } from "next/navigation";
import ProductSkeleton from "@/utils/ProductSkeleton";
import Link from "next/link";

const Category = () => {
  const params = useParams();
  const categoryId = params?.id as string; 
  const { data: productData, isLoading: prodLoading } = useGetProductsByCategoryQuery(categoryId ?? "");
  const products: Product[] = productData?.data ?? [];

  return (
    <div className="container mx-auto px-4 md:px-0 py-8 md:py-16">
      {/* ---------- Hero Section ---------- */}
      <div className="flex flex-col xl:flex-row h-[400px] w-full">
        <div className=" xl:w-[40%] bg-black dark:bg-[#1d1d1d] flex flex-col justify-center pl-10 lg:pl-18 py-5">
          <div>
            <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold">Up to 10%</h1>
            <h1 className="text-white text-3xl lg:text-4xl xl:text-6xl font-semibold mt-4">off Voucher</h1>
          </div>
          <div className=' flex gap-1 items-center mt-8 xl:mt-12'>
            <Link href="/product">
              <button className="text-white border-b-2 py-2 border-white text-lg cursor-pointer">
                Shop Now
              </button>
            </Link>
            <IoArrowForward size={25} className=' text-white' />
          </div>
        </div>
        <div className="xl:w-[60%] h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${image.src})` }}></div>
      </div>


      {/* ---------- Explore Products Section (Dynamic) ---------- */}
      <div className=" pt-16">
        <div className="flex gap-2 items-center mb-5">
          <span className="bg-primary h-10  rounded-md"></span>
          <p className="text-primary font-semibold text-lg">Our Products</p>
        </div>
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl dark:text-white">Explore Our Products</h2>
        </div>
        {prodLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
