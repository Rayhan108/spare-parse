/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ListedProductCart from "@/components/Wishlist/ListedProductCart";
import { makeWishlistEmpty } from "@/redux/features/wishlist/wishlistSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";


const Wishlist = () => {
    const wishlist = useSelector((state: any) => state.wishlist)
    const dispatch = useDispatch();

    return (
        <div className=" container mx-auto py-16 px-3 md:px-0 ">

            {
                !wishlist.products.length ?
                    <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            Your Wishlist is Empty
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Looks like you haven&apos;t added anything to your wishlist yet. Explore our products and start shopping.
                        </p>
                        <Link
                            href={`/product`}
                            className=" px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
                        >
                            Shop Now
                        </Link>
                    </div>

                    :

                    <>
                        <div className=" flex justify-between items-center">
                            <h2 className=" text-2xl dark:text-white">Wishlist ({wishlist.products.length})</h2>
                            <button onClick={ () => dispatch(makeWishlistEmpty())} className=" border px-8 md:px-12 py-2 md:py-3 rounded cursor-pointer dark:text-white">Clear Wishlist</button>
                        </div>


                        <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                            {
                                wishlist?.products?.map((product: any) =>
                                    <ListedProductCart key={product?._id} product={product}></ListedProductCart>
                                )
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default Wishlist;