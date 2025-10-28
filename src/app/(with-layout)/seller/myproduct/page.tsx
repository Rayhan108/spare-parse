// "use client"
// import AddProductModal from "@/components/Seller/MyProduct/AddProductModal";
// import MyProductCart from "@/components/Seller/MyProduct/MyProductCart";
// import SelectProduct from "@/components/Seller/MyProduct/SelectProduct";
// import { useState } from "react";
// import { IoAdd } from "react-icons/io5";


// const MyProduct = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);


//     const showModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleOk = () => {
//         setIsModalOpen(false);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <div className=" container mx-auto py-8 md:py-16 px-4 md:px-0">
//             <SelectProduct></SelectProduct>
//             <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 mt-20">
//                 <div className=" overflow-hidden rounded">
//                     <div className="relative bg-[#f2fcf6] px-4 py-8">
//                         <div onClick={showModal} className="flex h-58 items-center justify-center cursor-pointer">
//                             <IoAdd size={120} />
//                         </div>
//                     </div>
//                     <button
//                         onClick={showModal}
//                         className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
//                     >
//                         <IoAdd size={25} />
//                         Add Product
//                     </button>
//                     <AddProductModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></AddProductModal>

//                 </div>
//                 <MyProductCart></MyProductCart>
//                 <MyProductCart></MyProductCart>
//                 <MyProductCart></MyProductCart>
//                 <MyProductCart></MyProductCart>
//                 <MyProductCart></MyProductCart>
//                 <MyProductCart></MyProductCart>
//                 <MyProductCart></MyProductCart>
//             </div>
//         </div>
//     );
// };

// export default MyProduct;


"use client";

import AddProductModal from "@/components/Seller/MyProduct/AddProductModal";
import MyProductCart from "@/components/Seller/MyProduct/MyProductCart";
import SelectProduct from "@/components/Seller/MyProduct/SelectProduct";
import { useGetMyProductsQuery } from "@/redux/features/seller/productApi";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

const MyProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetMyProductsQuery();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  if (isLoading) return <p className="text-center mt-20">Loading products...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Error loading products</p>;

  const products = data?.data || [];

  return (
    <div className="container mx-auto py-8 md:py-16 px-4 md:px-0">
      <SelectProduct />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 mt-20">
        {/* Add Product Card */}
        <div className="overflow-hidden rounded">
          <div className="relative bg-[#f2fcf6] px-4 py-8 cursor-pointer" onClick={showModal}>
            <div className="flex h-58 items-center justify-center">
              <IoAdd size={120} />
            </div>
          </div>
          <button
            onClick={showModal}
            className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
          >
            <IoAdd size={25} />
            Add Product
          </button>
          <AddProductModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>

        {/* Dynamic Products */}
        {products.map((product) => (
          <MyProductCart
            key={product.id}
            id={product.id}
            name={product.productName}
            description={product.description}
            price={product.price}
            discount={product.discount}
            stock={product.stock}
            images={product.productImages}
            isVisible={product.isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProduct;
