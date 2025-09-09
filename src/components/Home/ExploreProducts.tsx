/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link";
import ProductCart from "./ProductCart";
// import wheel from '../../../public/products/wheels.jpg'
// import sparksPlug from '../../../public/products/car-sparks-plug.jpg'
// import engine from '../../../public/products/engine.jpg'
// import engine1 from '../../../public/products/engine1.jpg'
// import engineOil from '../../../public/products/engine_oil.jpg'
// // import engineOil1 from '../../../public/products/engine_oil1.jpg'
// import exhaust from '../../../public/products/exhaust.jpg'
// import exhaust1 from '../../../public/products/exhaust1.jpg'
// import lights from '../../../public/products/lights.jpg'
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ProductSkeleton from "@/utils/ProductSkeleton";
// import lights1 from '../../../public/products/lights1.jpg'


const ExploreProducts = () => {
    const { data, isLoading } = useGetAllProductsQuery(undefined);
    console.log(data?.data?.data);
    // const products = [
    //     { id: 1, title: 'Wheels', image: wheel, price: 250, rating: 4, reviews: 84 },
    //     { id: 2, title: 'Spark Plug', image: sparksPlug, price: 35, rating: 5, reviews: 42 },
    //     { id: 3, title: 'Engine', image: engine, price: 950, rating: 4, reviews: 110 },
    //     { id: 4, title: 'Engine Type 2', image: engine1, price: 1000, rating: 4, reviews: 89 },
    //     { id: 5, title: 'Engine Oil', image: engineOil, price: 45, rating: 4, reviews: 67 },
    //     // { id: 6, title: 'Engine Oil Type 2', image: engineOil1, price: 50, rating: 3, reviews: 58 },
    //     { id: 7, title: 'Exhaust', image: exhaust, price: 320, rating: 5, reviews: 96 },
    //     { id: 8, title: 'Exhaust Type 2', image: exhaust1, price: 350, rating: 4, reviews: 78 },
    //     { id: 9, title: 'Lights', image: lights, price: 120, rating: 4, reviews: 123 },
    //     //   { id: 10, title: 'Lights Type 2', image: lights1, price: 130, rating: 5, reviews: 145 },
    // ];

    return (
        <div className="container mx-auto pb-20">
            <div className="flex gap-2 items-center mb-5">
                <span className="bg-primary h-10 px-[10px] rounded-md">
                </span>
                <p className="text-primary font-semibold text-lg">Our Products</p>
            </div>
            <div className="flex justify-between items-center mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-5xl dark:text-white">Explore Our Products</h2>
            </div>
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
                {
                    isLoading ?
                        [...Array(8)].map((_, index) => (
                            <ProductSkeleton key={index}></ProductSkeleton>
                        ))
                        :
                        data?.data?.data?.map((product: any) => (
                            <ProductCart
                                key={product?._id}
                                id={product?._id}
                                image={product?.images[0]}
                                title={product?.name}
                                price={product?.price}
                                rating={5}
                                reviews={100}
                            />
                        ))
                }
            </div>
            <div className=" flex justify-center mt-10">
                <Link href={'/product'}><button className=" md:text-xl bg-primary px-8 md:px-16 py-2 md:py-4 text-white rounded cursor-pointer">View All Products</button></Link>
            </div>
        </div>
    );
};

export default ExploreProducts;