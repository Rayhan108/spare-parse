"use client";

import ListedProductCart, { Product } from "@/components/Wishlist/ListedProductCart";
import {
  useGetWishlistQuery,

  useDeleteAllWishlistItemMutation,
} from "@/redux/features/wishlist/wishlistApi";
import Link from "next/link";
import { message, Spin } from "antd";
import { useState } from "react";


export interface WishlistItem {
  id: string;
  product: Product;
}

const Wishlist = () => {
  const { data: wishlist, isLoading, isError } = useGetWishlistQuery();
  // const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [deleteAllWishlistItem] = useDeleteAllWishlistItemMutation();
  const [clearing, setClearing] = useState(false);
  const handleClearWishlist = async () => {
    if (!wishlist || wishlist.length === 0) return;

    setClearing(true);
    try {
      for (const item of wishlist) {
        await deleteAllWishlistItem(item.id).unwrap();
      }
      message.success("Wishlist cleared successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "Failed to clear wishlist");
      } else {
        message.error("Failed to clear wishlist");
      }
    } finally {
      setClearing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <Spin size="large" />
        <p className="mt-4">Loading your wishlist...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center py-16 text-red-500">
        Failed to load wishlist.
      </p>
    );
  }

  return (
    <div className="container mx-auto py-16 px-3 md:px-0">
      {!wishlist || wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Looks like you haven&apos;t added anything to your wishlist yet.
            Explore our products and start shopping.
          </p>
          <Link
            href="/product"
            className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl dark:text-white">
              Wishlist ({wishlist.length})
            </h2>
            <button
              onClick={handleClearWishlist}
              disabled={clearing}
              className={`border px-8 md:px-12 py-2 md:py-3 rounded cursor-pointer dark:text-white ${
                clearing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {clearing ? "Clearing..." : "Clear Wishlist"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {wishlist.map((item: WishlistItem) => (
              <ListedProductCart key={item.id} product={item.product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
