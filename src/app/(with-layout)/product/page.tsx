"use client"
import ProductCart from "@/components/Home/ProductCart";
import { Input, Pagination, Select } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import wheel from '../../../../public/products/wheels.jpg'
import sparksPlug from '../../../../public/products/car-sparks-plug.jpg'
import engine from '../../../../public/products/engine.jpg'
import engine1 from '../../../../public/products/engine1.jpg'
import engineOil from '../../../../public/products/engine_oil.jpg'
// import engineOil1 from '../../../../public/products/engine_oil1.jpg'
import exhaust from '../../../../public/products/exhaust.jpg'
import exhaust1 from '../../../../public/products/exhaust1.jpg'
import lights from '../../../../public/products/lights.jpg'
// import lights1 from '../../../../public/products/lights1.jpg'

const Product = () => {
    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage);
    const pageSize = 10;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const products = [
        { id: 1, title: 'Wheels', image: wheel, price: 250, rating: 4, reviews: 84 },
        { id: 2, title: 'Spark Plug', image: sparksPlug, price: 35, rating: 5, reviews: 42 },
        { id: 3, title: 'Engine', image: engine, price: 950, rating: 4, reviews: 110 },
        { id: 4, title: 'Engine Type 2', image: engine1, price: 1000, rating: 4, reviews: 89 },
        { id: 5, title: 'Engine Oil', image: engineOil, price: 45, rating: 4, reviews: 67 },
        // { id: 6, title: 'Engine Oil Type 2', image: engineOil1, price: 50, rating: 3, reviews: 58 },
        { id: 7, title: 'Exhaust', image: exhaust, price: 320, rating: 5, reviews: 96 },
        { id: 8, title: 'Exhaust Type 2', image: exhaust1, price: 350, rating: 4, reviews: 78 },
        { id: 9, title: 'Lights', image: lights, price: 120, rating: 4, reviews: 123 },
        //   { id: 10, title: 'Lights Type 2', image: lights1, price: 130, rating: 5, reviews: 145 },
    ];
    return (
        <div className=" container mx-auto py-8 md:py-16 ">
            <div className=" container mx-auto shadow-md border-t-[10px] border-t-[#f56100] border-b border-b-[#FCCEB0] border-r border-r-[#FCCEB0] border-l border-l-[#FCCEB0] py-14">
                <div className="text-center">
                    <h2 className="text-4xl font-semibold dark:text-white">Select Your Vehicle</h2>
                    <p className="text-[#5A5B54] mt-3 dark:text-gray-300">For finding the correct part</p>
                </div>
                <div className=" px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                    {/* Select 1 */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white">1</span>
                        <Select
                            // defaultValue="2025"
                            placeholder="Year"
                            className="w-full"
                            options={[
                                { value: '2025', label: '2025' },
                                { value: '2024', label: '2024' },
                                { value: '2023', label: '2023' },
                                { value: '2022', label: '2022' },
                                { value: '2021', label: '2021' },
                            ]}
                        />
                    </div>
                    {/* Select 2 */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white">2</span>
                        <Select
                            placeholder="Brand"
                            className="w-full"
                            options={[
                                { value: 'toyota', label: 'Toyota' },
                                { value: 'honda', label: 'Honda' },
                                { value: 'ford', label: 'Ford' },
                                { value: 'chevrolet', label: 'Chevrolet' },
                                { value: 'bmw', label: 'BMW' },
                                { value: 'audi', label: 'Audi' },
                                { value: 'mercedes', label: 'Mercedes-Benz' },
                            ]}
                        />
                    </div>
                    {/* Select 3 */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white">3</span>
                        <Select
                            placeholder="Model"
                            className="w-full"
                            options={[
                                { value: 'camry', label: 'Toyota Camry' },
                                { value: 'accord', label: 'Honda Accord' },
                                { value: 'mustang', label: 'Ford Mustang' },
                                { value: 'impala', label: 'Chevrolet Impala' },
                                { value: 'x5', label: 'BMW X5' },
                                { value: 'a4', label: 'Audi A4' },
                                { value: 'c_class', label: 'Mercedes-Benz C-Class' },
                            ]}
                        />
                    </div>
                    {/* Select 4 */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white">4</span>
                        <Select
                            placeholder="Engine Power"
                            className="w-full"
                            options={[
                                { value: '150', label: '150 HP' },
                                { value: '200', label: '200 HP' },
                                { value: '250', label: '250 HP' },
                                { value: '300', label: '300 HP' },
                                { value: '350', label: '350 HP' },
                                { value: '400', label: '400 HP' },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className=" mt-10 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <span className="bg-primary h-10 px-[10px] rounded-md">
                    </span>
                    <p className="text-primary font-semibold text-lg">Our Products</p>
                </div>
                <div className=" w-[280px]">
                    <Input className=' w-[280px]' placeholder="Search product" suffix={<CiSearch size={20} />} />
                </div>
            </div>

            <div className="container mx-auto  mt-10 mb-8" >
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
                    {products.map((product) => (
                        <ProductCart
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            rating={product.rating}
                            reviews={product.reviews}
                        />
                    ))}
                </div>
            </div>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={50}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default Product;