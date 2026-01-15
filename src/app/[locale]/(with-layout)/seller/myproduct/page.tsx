/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddProductModal from "@/components/Seller/MyProduct/AddProductModal";
import MyProductCart from "@/components/Seller/MyProduct/MyProductCart";
import MyProductSkeleton from "@/components/Seller/MyProduct/MyProductSkeleton";
import { useGetMyProductsQuery, useDeleteProductMutation } from "@/redux/features/seller/product/productApi";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { message, Pagination } from "antd";

const MyProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [page,setPage]=useState(1)
  const limit=11
  const { data, isLoading, error, refetch } = useGetMyProductsQuery({page,limit});
  const [deleteProduct] = useDeleteProductMutation();
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  // const handleOk = () => {
  //   setIsModalOpen(false);          
  //   console.log('here');
  //   message.success("Product added successfully!"); 
  //   setTimeout(() => {
  //     window.location.reload();     
  //   }, 200);                       
  // };
const handleOk = async () => {
  setIsModalOpen(false);
  message.success("Product added successfully!");
  await refetch();  // <-- THE REAL FIX
};


  const handleDelete = async (productId: string) => {
    try {
      const response = await deleteProduct(productId).unwrap();
      message.success(response.message || "Product deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Delete error:", err);
      message.error("Failed to delete product");
    }
  };

  if (isLoading) return <MyProductSkeleton />;
  if (error) return <p className="text-center mt-20 text-red-500">Error loading products</p>;

  const products = data?.data || [];
const totalOrdersCount = data?.meta?.total || 0;
    const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className="container mx-auto py-8 md:py-16 px-4 md:px-0">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 mt-20">
        <div className="overflow-hidden rounded">
          <div className="relative bg-[#f2fcf6] px-4 py-8 cursor-pointer" onClick={showModal}>
            <div className="flex h-58 items-center justify-center">
              <IoAdd className="dark:text-black" size={120} />
            </div>
          </div>
          <button
            onClick={showModal}
            className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
          >
            <IoAdd size={25} />
            Add Product
          </button>
     
        </div>


        {products.map((product:any) => (
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
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
           <AddProductModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
               <div className="flex justify-center mt-8 items-center dark:text-white">
        <Pagination
        current={page}
        pageSize={limit}
        total={totalOrdersCount}
        onChange={handlePageChange}
        className="dark:text-white"
      />
</div>
    </div>
  );
};

export default MyProduct;
