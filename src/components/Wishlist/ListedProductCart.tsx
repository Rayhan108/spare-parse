/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Imageurl } from "@/utils/Imageurl";
import { useDispatch } from "react-redux";
import { deleteFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ListedProductCart = ({ product }: any) => {
    const title = product?.name;
    const discount = product?.discount ? product.discount / 100 : 0;  // If no discount, treat it as 0
    const price = product?.price - (product?.price * discount);
    const originalPrice = product?.price;
    const discountPercentage = discount > 0 ? product?.discount : 0;
    const imageSrc = `${Imageurl}/${product?.images[0]}`;

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product))
        dispatch(deleteFromWishlist(product))
    }

    return (
        <div className=" overflow-hidden rounded">
            <div className="relative bg-[#f2fcf6] px-4 py-8">
                {
                    product?.discount &&
                    <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-2 shadow py-1 text-white">
                        -{discountPercentage}%
                    </div>
                }
                <button
                    onClick={() => dispatch(deleteFromWishlist(product))}
                    className="absolute right-2 top-2 "
                    aria-label="Remove item"
                >
                    <RiDeleteBin6Line size={40} className=" bg-white rounded-full p-2 cursor-pointer" />
                </button>
                <div className="flex h-58 items-center justify-center">
                    <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={title}
                        width={200}
                        height={200}
                        className="w-[200px] object-contain"
                    />
                </div>
            </div>
            <button
                onClick={handleAddToCart}
                className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
            >
                <HiOutlineShoppingCart size={25} />
                Add To Cart
            </button>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <div className="mt-1 flex items-center">
                    {
                        product?.discount ?
                            <>
                                <span className="text-xl font-bold text-orange-500">${price}</span>
                                <span className="ml-2 text-gray-500 line-through">${originalPrice}</span>
                            </>
                            :
                            <span className="text-xl font-bold text-orange-500">${price}</span>
                    }

                </div>
            </div>
        </div>
    );
};

export default ListedProductCart;