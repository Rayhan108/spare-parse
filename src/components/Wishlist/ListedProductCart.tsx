"use client";

import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/redux/features/cart/cartSlice";
import { useDeleteWishlistItemMutation } from "@/redux/features/wishlist/wishlistApi";

// ------------------- Product type -------------------
export interface Product {
  id: string; // <-- product ID
  productName: string;
  price: number;
  discount?: number;
  productImages?: string[];
}

interface ListedProductCartProps {
  product: Product; // only product is needed
}

const ListedProductCart = ({ product }: ListedProductCartProps) => {
//   const dispatch = useDispatch();
  const [deleteWishlistItem, { isLoading }] = useDeleteWishlistItemMutation();

  // Title and pricing
  const title = product.productName;
  const discount = product.discount ? product.discount / 100 : 0;
  const price = product.price - product.price * discount;
  const originalPrice = product.price;
  const discountPercentage = product.discount || 0;

  // Image
  const imageSrc =
    product.productImages && product.productImages.length > 0
      ? product.productImages[0]
      : "/placeholder.svg";

  // ------------------- Handlers -------------------
//   const handleAddToCart = async () => {
//     dispatch(addToCart(product));
//     await handleRemoveWishlist();
//   };

  const handleRemoveWishlist = async () => {
    try {
      // Use product.id, not wishlist ID
      await deleteWishlistItem(product.id).unwrap();
    } catch (error) {
      console.error("Failed to remove wishlist item:", error);
      alert("Could not remove the item from wishlist. Please try again.");
    }
  };

  // ------------------- Render -------------------
  return (
    <div className="overflow-hidden rounded shadow-md">
      <div className="relative bg-[#f2fcf6] px-4 py-8">
        {discountPercentage > 0 && (
          <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-2 shadow py-1 text-white">
            -{discountPercentage}%
          </div>
        )}

        <button
          onClick={handleRemoveWishlist}
          disabled={isLoading}
          className="absolute right-2 top-2"
          aria-label="Remove item"
        >
          <RiDeleteBin6Line
            size={40}
            className={`bg-white rounded-full p-2 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </button>

        <div className="flex h-58 items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            width={200}
            height={200}
            className="w-[200px] object-contain"
          />
        </div>
      </div>

      <button
        // onClick={handleAddToCart}
        className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
      >
        <HiOutlineShoppingCart size={25} />
        Add To Cart
      </button>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="mt-1 flex items-center">
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
        </div>
      </div>
    </div>
  );
};

export default ListedProductCart;
