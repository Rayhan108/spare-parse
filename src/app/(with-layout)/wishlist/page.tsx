"use client";

import ListedProductCart from "@/components/Wishlist/ListedProductCart";


const Wishlist = () => {


    return (
        <div className=" container mx-auto py-16 px-3 md:px-0 ">
            <div className=" flex justify-between items-center">
                <h2 className=" text-2xl">Wishlist (4)</h2>
                <button className=" border px-8 md:px-12 py-2 md:py-3 rounded cursor-pointer">Move All To Cart</button>
            </div>


            <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                <ListedProductCart></ListedProductCart>
                <ListedProductCart></ListedProductCart>
                <ListedProductCart></ListedProductCart>
                <ListedProductCart></ListedProductCart>
                <ListedProductCart></ListedProductCart>
                <ListedProductCart></ListedProductCart>
                <ListedProductCart></ListedProductCart>
                <ListedProductCart></ListedProductCart>
            </div>
        </div>
    );
};

export default Wishlist;