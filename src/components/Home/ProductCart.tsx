/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { Rate, notification } from "antd";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import Cookies from "js-cookie";


import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useDeleteWishlistItemMutation,
} from "@/redux/features/wishlist/wishlistApi";

import { useGetProductReviewsQuery } from "@/redux/features/services/reviewApi";


export interface Product {
  id: string;
  productName: string;
  price: number;
  discount?: number;
  productImages?: string[];
  _count: {
    review: number;
  };
}

export interface WishlistItem {
  productId: string;
  product: Product;
}

interface ProductCartProps {
  product: Product;
}


const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
  const discountPercentage: number = product.discount ?? 0;
  const discount: number = discountPercentage / 100;
  const price: number = product.price - product.price * discount;
  const originalPrice: number = product.price;


  const { data: wishlist } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [api, contextHolder] = notification.useNotification();
// console.log("wishlist check--->",wishlist);
  const wishlistItem: WishlistItem | undefined = wishlist?.find(
    (item: WishlistItem) => item.productId === product.id
  );
  const isAdded: boolean = Boolean(wishlistItem);

  const imageUrl: string =
    product.productImages && product.productImages.length > 0
      ? product.productImages[0]
      : "/no-image.png";

  const handleWishlistToggle = async (): Promise<void> => {
    try {
      const token = Cookies.get("hatem-ecommerce-token");
      if (!token) {
        api.open({
          type: "warning",
          message: "Login Required",
          description: "Please log in to manage your wishlist.",
          placement: "topRight",
        });
        return;
      }

      if (isAdded && wishlistItem) {
        await deleteWishlistItem(wishlistItem?.productId).unwrap();
        api.open({
          type: "success",
          message: "Wishlist",
          description: "Removed from wishlist successfully!",
          placement: "topRight",
        });
      } else {
        await addToWishlist({ productId: product.id }).unwrap();
        api.open({
          type: "success",
          message: "Wishlist",
          description: "Added to wishlist successfully!",
          placement: "topRight",
        });
      }
    } catch (err: unknown) {
      api.open({
        type: "error",
        message: "Wishlist Error",
        description:
          err instanceof Error ? err.message : "Failed to update wishlist",
        placement: "topRight",
      });
    }
  };


  const { data: reviewData } = useGetProductReviewsQuery(
    { productId: product.id },
    { skip: !product?.id }
  );


  const reviews = reviewData?.data || [];
  const totalRatings = reviews.length;
  const averageRating =
    totalRatings > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
      : 0;

  // Debugging logs for dynamic updates
  // useEffect(() => {
  //   console.log("Reviews:", reviews);
  //   console.log("Average rating:", averageRating);
  // }, [reviews, averageRating]);


  return (
    <div className="relative">
      {contextHolder}

      {discountPercentage > 0 && (
        <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-2 shadow py-1 text-white">
          -{discountPercentage}%
        </div>
      )}


      <Link href={`/product/${product.id}`}>
        <Image
          src={imageUrl}
          alt={product.productName}
          height={500}
          width={500}
          className="w-full h-[300px] object-cover cursor-pointer rounded-xl"
        />
      </Link>


      <IoIosHeartEmpty
        onClick={handleWishlistToggle}
        className={`${isAdded ? "bg-primary text-white" : "bg-[#e6fbef] dark:bg-[#24292E]"
          } p-2 w-10 h-10 rounded-full top-2 right-2 absolute cursor-pointer transition`}
      />

      {/* Product Info */}
      <div className="mt-6 pb-2 md:pb-5">
        <h2 className="text-sm md:text-xl mb-1 md:mb-4 font-semibold dark:text-white">
          {product.productName}
        </h2>

        <div className="flex flex-col md:flex-row items-start md:text-lg md:items-center gap-0 md:gap-2 font-semibold">
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

          {/* Dynamic Rating */}
          <div className="flex items-center gap-2 mt-1 md:mt-0">
            <Rate disabled allowHalf value={averageRating} />
            <p className="dark:text-white text-sm">({totalRatings})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
