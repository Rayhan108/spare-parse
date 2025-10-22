"use client";

import Image from "next/image";
import { Rate, notification } from "antd";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useDeleteWishlistItemMutation,
} from "@/redux/features/wishlist/wishlistApi";
import Cookies from "js-cookie";

// ------------------- Product type -------------------
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

// ------------------- Wishlist item type -------------------
export interface WishlistItem {
  id: string;
  product: Product;
}

// ------------------- Props -------------------
interface ProductCartProps {
  product: Product;
}

// ------------------- Component -------------------
const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
  const discountPercentage: number = product.discount ?? 0;
  const discount: number = discountPercentage / 100;
  const price: number = product.price - product.price * discount;
  const originalPrice: number = product.price;

  // ✅ API hooks
  const { data: wishlist } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [api, contextHolder] = notification.useNotification();
  // Check if product is already in wishlist
  const wishlistItem: WishlistItem | undefined = wishlist?.find(
    (item: WishlistItem) => item.product.id === product.id
  );
  const isAdded: boolean = Boolean(wishlistItem);

  const imageUrl: string =
    product.productImages && product.productImages.length > 0
      ? product.productImages[0]
      : "/no-image.png";

  // ------------------- Handle wishlist toggle -------------------


  const handleWishlistToggle = async (): Promise<void> => {
    try {
      // ✅ Check if user is logged in
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
        await deleteWishlistItem(wishlistItem.id).unwrap();
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
      if (err instanceof Error) {
        api.open({
          type: "error",
          message: "Wishlist Error",
          description: err.message,
          placement: "topRight",
        });
      } else {
        api.open({
          type: "error",
          message: "Wishlist Error",
          description: "Failed to update wishlist",
          placement: "topRight",
        });
      }
    }
  };

  // ------------------- Component JSX -------------------
  return (
    <div className="relative">
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

      {/* <IoIosHeartEmpty
        onClick={handleWishlistToggle}
        className={`${isAdded ? "bg-primary text-white" : "bg-[#e6fbef]"
          } p-2 w-10 h-10 rounded-full top-2 right-2 absolute cursor-pointer transition`}
      /> */}


      <>
  {contextHolder} {/* <-- Render this once at the top level of your component */}

  <IoIosHeartEmpty
    onClick={handleWishlistToggle}
    className={`${
      isAdded ? "bg-primary text-white" : "bg-[#e6fbef]"
    } p-2 w-10 h-10 rounded-full top-2 right-2 absolute cursor-pointer transition`}
  />
</>


      <div className="mt-6 pb-2 md:pb-5">
        <h2 className="text-sm md:text-xl mb-1 md:mb-4 font-semibold dark:text-white">
          {product.productName}
        </h2>
        <div className="flex flex-col md:flex-row items-start md:text-lg md:items-center gap-0 md:gap-3 font-semibold">
          {discountPercentage > 0 ? (
            <>
              <span className="text-xl font-bold text-orange-500">
                ${price.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-orange-500">
              ${price.toFixed(2)}
            </span>
          )}
          <Rate disabled allowHalf defaultValue={product._count?.review ?? 0} />
          <p className="dark:text-white">({product._count?.review ?? 0})</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
