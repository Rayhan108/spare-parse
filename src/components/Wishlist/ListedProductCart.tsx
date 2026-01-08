"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteWishlistItemMutation } from "@/redux/features/wishlist/wishlistApi";
import { notification } from "antd";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";

export interface Product {
  id: string; 
  productName: string;
  price: number;
  discount?: number;
  productImages?: string[];
}
interface AddToCartRequest { productId: string }
interface ListedProductCartProps {
  product: Product;
}

const ListedProductCart = ({ product }: ListedProductCartProps) => {
  const [addToCart] = useAddToCartMutation();
  const [deleteWishlistItem, { isLoading }] = useDeleteWishlistItemMutation();
  const title = product.productName;
  const discount = product.discount ? product.discount / 100 : 0;
  const price = product.price - product.price * discount;
  const originalPrice = product.price;
  const discountPercentage = product.discount || 0;
   const [api, contextHolder] = notification.useNotification();
  const imageSrc =
    product.productImages && product.productImages.length > 0
      ? product.productImages[0]
      : "/placeholder.svg";

  const handleRemoveWishlist = async () => {
    try {
      await deleteWishlistItem(product.id).unwrap();
      api.open({
        type: "success",
        message: "Wishlist",
        description: "Item removed from wishlist successfully!",
        placement: "topRight",
      });
    } catch (error) {
      console.error("Failed to remove wishlist item:", error);
      api.open({
        type: "error",
        message: "Wishlist Error",
        description: "Could not remove the item. Please try again.",
        placement: "topRight",
      });
    }
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

  return (
    <div className="overflow-hidden rounded shadow-md">
      <div className="relative bg-[#f2fcf6] px-4 py-8">
        {discountPercentage > 0 && (
          <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-2 shadow py-1 text-white">
            -{discountPercentage}%
          </div>
        )}

        {contextHolder}

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
        className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer relative"   onClick={handleAddToCart} 
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
                dzd {price.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                dzd {originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-orange-500">
              dzd {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListedProductCart;
