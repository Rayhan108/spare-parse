

// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";

// // // import { Breadcrumb,Checkbox, ConfigProvider, Input, message } from "antd";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { RiDeleteBin6Line } from "react-icons/ri";
// // // import { useState } from "react";
// // // import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";

// // // const Cart = () => {
// // //     const { data, isLoading } = useGetCartQuery();
// // //     console.log(" useGetCartQuery data:", data?.data);
// // //     const [selectedIds, setSelectedIds] = useState<string[]>([]);
// // //     const [deleteCartItem, ] = useDeleteCartItemMutation();
// // //     if (isLoading) {
// // //         return (
// // //             <div className="flex justify-center items-center h-[50vh]">
// // //                 <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
// // //             </div>
// // //         );
// // //     }

// // //     const cartItems = data?.data || [];

// // //     // ✅ Handle checkbox toggle
// // //     const handleSelect = (id: string, checked: boolean) => {
// // //         setSelectedIds((prev) =>
// // //             checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
// // //         );
// // //     };

// // //     // ✅ Filter only selected items
// // //     const selectedItems = cartItems.filter((item) =>
// // //         selectedIds.includes(item.id)
// // //     );

// // //     // ✅ Calculate total of selected items
// // //     const total = selectedItems.reduce(
// // //         (sum, item) => sum + item.product.price,
// // //         0
// // //     );

// // //     // ✅ On checkout send only selected items
// // //     const handleCheckout = () => {
// // //         if (selectedItems.length === 0) {
// // //             alert("Please select at least one product to checkout!");
// // //             return;
// // //         }

// // //         const checkoutPayload = selectedItems.map((item) => ({
// // //             productId: item.product.id,
// // //             quantity: 1,
// // //             price: item.product.price,
// // //         }));

// // //         console.log("Selected items for checkout:", checkoutPayload);

// // //         // Example: Navigate to checkout page with selected items
// // //         // router.push({
// // //         //   pathname: "/checkout",
// // //         //   query: { data: JSON.stringify(checkoutPayload) },
// // //         // });
// // //     };

// // //     //delete handler
// // //     const handleDelete = async (cartItemId: string) => {
// // //         console.log("Deleting cart item ID:", cartItemId);
// // //         try {
// // //             await deleteCartItem(cartItemId).unwrap();
// // //             message.success("Item deleted from cart");
// // //         } catch (err: any) {
// // //             message.error(err?.data?.message || "Failed to delete cart item");
// // //         }
// // //     };

// // //     return (
// // //         <div className="container mx-auto py-16 px-3 md:px-0">
// // //             <Breadcrumb
// // //                 items={[
// // //                     {
// // //                         title: (
// // //                             <Link href={`/`}>
// // //                                 <p className="dark:text-white">Home</p>
// // //                             </Link>
// // //                         ),
// // //                     },
// // //                     {
// // //                         title: (
// // //                             <Link href={`/cart`}>
// // //                                 <p className="dark:text-white">Cart</p>
// // //                             </Link>
// // //                         ),
// // //                     },
// // //                 ]}
// // //             />

// // //             {!cartItems.length ? (
// // //                 <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// // //                     <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
// // //                         Your Cart is Empty
// // //                     </h1>
// // //                     <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// // //                         Looks like you haven&apos;t added anything yet.
// // //                     </p>
// // //                     <Link
// // //                         href={`/product`}
// // //                         className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// // //                     >
// // //                         Shop Now
// // //                     </Link>
// // //                 </div>
// // //             ) : (
// // //                 <>
// // //                     {/* Table Header */}
// // //                     <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
// // //                         <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
// // //                             <p className="w-[60px] md:w-[60px] text-start dark:text-white">Select</p>
// // //                             <p className="w-[200px] dark:text-white">Product</p>
// // //                             <p className="w-[100px] text-left dark:text-white">Price</p>
// // //                             <p className="w-[100px] text-left dark:text-white">Quantity</p>
// // //                             <p className="w-[100px] text-left dark:text-white">Subtotal</p>
// // //                         </div>

// // //                         {/* Table Body */}
// // //                         {cartItems.map((item: any) => {
// // //                             const checked = selectedIds.includes(item.id);
// // //                             return (
// // //                                 <div
// // //                                     key={item.id}
// // //                                     className={`w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4 ${checked
// // //                                         ? "bg-gray-100 dark:bg-gray-900"
// // //                                         : "bg-white dark:bg-transparent"
// // //                                         }`}
// // //                                 >
// // //                                     {/* Checkbox */}
// // //                                     <div className="w-[100px] md:w-full flex justify-start">
// // //                                         <Checkbox
// // //                                             checked={checked}
// // //                                             onChange={(e) =>
// // //                                                 handleSelect(item.id, e.target.checked)
// // //                                             }
// // //                                         />
// // //                                     </div>

// // //                                     {/* Product Info */}
// // //                                     <div className="flex items-center gap-5 w-[100px] md:w-full">
// // //                                         <Image
// // //                                             src={item.product.productImages?.[0] || "/no-image.jpg"}
// // //                                             alt="product"
// // //                                             width={60}
// // //                                             height={60}
// // //                                             className="rounded-md"
// // //                                         />
// // //                                         <h1 className="dark:text-white text-xl">{item.product.productName}</h1>
// // //                                     </div>

// // //                                     {/* Price */}
// // //                                     <div className="w-[100px] md:w-full flex justify-center">
// // //                                         <p className="dark:text-white">${item.product.price}</p>
// // //                                     </div>

// // //                                     {/* Quantity */}
// // //                                     <div className="w-[100px] md:w-full flex justify-center dark:text-white">
// // //                                         1
// // //                                     </div>

// // //                                     {/* Subtotal + Delete */}
// // //                                     <div className="flex items-center gap-5 w-[100px] md:w-full justify-end">
// // //                                         <p className="dark:text-white">${item.product.price}</p>
// // //                                         <RiDeleteBin6Line
// // //                                             onClick={() => handleDelete(item.productId)}
// // //                                             size={25}
// // //                                             className="cursor-pointer dark:text-white"
// // //                                         />
// // //                                     </div>
// // //                                 </div>
// // //                             );
// // //                         })}

// // //                     </div>

// // //                     {/* Footer (Total + Checkout) */}
// // //                     <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
// // //                         {/* Coupon */}
// // //                         <div className="flex items-start">
// // //                             <ConfigProvider
// // //                                 theme={{
// // //                                     components: {
// // //                                         Input: {
// // //                                             colorBorder: "rgb(67,67,67)",
// // //                                             activeBorderColor: "rgb(67,67,67)",
// // //                                             hoverBorderColor: "rgb(67,67,67)",
// // //                                             colorPrimary: "rgb(67,67,67)",
// // //                                             controlHeight: 46,
// // //                                         },
// // //                                     },
// // //                                 }}
// // //                             >
// // //                                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// // //                             </ConfigProvider>
// // //                             <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
// // //                                 Apply Coupon
// // //                             </button>
// // //                         </div>

// // //                         {/* Cart Total */}
// // //                         <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
// // //                             <div className="w-full sm:w-[450px]">
// // //                                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
// // //                                     <h2 className="text-xl font-medium mb-4 dark:text-white">
// // //                                         Selected Items Total
// // //                                     </h2>

// // //                                     <div className="space-y-4">
// // //                                         <div className="flex justify-between items-center">
// // //                                             <span className="text-gray-700 dark:text-white">Items Selected:</span>
// // //                                             <span className="font-medium dark:text-white">
// // //                                                 {selectedItems.length}
// // //                                             </span>
// // //                                         </div>

// // //                                         <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // //                                             <span className="text-gray-700 font-medium dark:text-white">
// // //                                                 Total:
// // //                                             </span>
// // //                                             <span className="font-medium dark:text-white">
// // //                                                 ${total.toFixed(2)}
// // //                                             </span>
// // //                                         </div>
// // //                                     </div>

// // //                                     <div className="mt-6">
// // //                                         <button
// // //                                             onClick={handleCheckout}
// // //                                             className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded"
// // //                                         >
// // //                                             Proceed with Selected
// // //                                         </button>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default Cart;



// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import { Breadcrumb, Checkbox, ConfigProvider, Input, message } from "antd";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { RiDeleteBin6Line } from "react-icons/ri";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";
// // import { useCreateCheckoutMutation } from "@/redux/features/checkout/checkoutApi";

// // const Cart = () => {
// //     const router = useRouter();
// //     const { data, isLoading } = useGetCartQuery();
// //     const [selectedIds, setSelectedIds] = useState<string[]>([]);
// //     const [deleteCartItem] = useDeleteCartItemMutation();
// //     const [createCheckout, { isLoading: isCheckingOut }] = useCreateCheckoutMutation();

// //     if (isLoading) {
// //         return (
// //             <div className="flex justify-center items-center h-[50vh]">
// //                 <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
// //             </div>
// //         );
// //     }

// //     const cartItems = data?.data || [];

// //     // ✅ Handle checkbox toggle
// //     const handleSelect = (id: string, checked: boolean) => {
// //         setSelectedIds((prev) =>
// //             checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
// //         );
// //     };

// //     // ✅ Filter only selected items
// //     const selectedItems = cartItems.filter((item) =>
// //         selectedIds.includes(item.id)
// //     );

// //     // ✅ Calculate total of selected items
// //     const total = selectedItems.reduce(
// //         (sum, item) => sum + item.product.price,
// //         0
// //     );

// //     // ✅ On checkout send only selected items
// //     const handleCheckout = async () => {
// //         if (selectedItems.length === 0) {
// //             message.warning("Please select at least one product to checkout!");
// //             return;
// //         }

// //         const checkoutPayload = {
// //             items: selectedItems.map((item) => ({
// //                 productId: item.product.id,
// //             })),
// //         };

// //         try {
// //             const response = await createCheckout(checkoutPayload).unwrap();
// //             message.success("Checkout created successfully!");

// //             // Navigate to checkout page and pass the checkout ID
// //             router.push(`/checkout/${response.data.id}`);
// //         } catch (err: any) {
// //             message.error(err?.data?.message || "Checkout failed");
// //         }
// //     };

// //     // ✅ Delete handler
// //     const handleDelete = async (cartItemId: string) => {
// //         try {
// //             await deleteCartItem(cartItemId).unwrap();
// //             message.success("Item deleted from cart");
// //         } catch (err: any) {
// //             message.error(err?.data?.message || "Failed to delete cart item");
// //         }
// //     };

// //     return (
// //         <div className="container mx-auto py-16 px-3 md:px-0">
// //             <Breadcrumb
// //                 items={[
// //                     { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
// //                     { title: <Link href="/cart"><p className="dark:text-white">Cart</p></Link> },
// //                 ]}
// //             />

// //             {!cartItems.length ? (
// //                 <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// //                     <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h1>
// //                     <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// //                         Looks like you haven&apos;t added anything yet.
// //                     </p>
// //                     <Link
// //                         href="/product"
// //                         className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// //                     >
// //                         Shop Now
// //                     </Link>
// //                 </div>
// //             ) : (
// //                 <>
// //                     {/* Table Header */}
// //                     <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
// //                         <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
// //                             <p className="w-[60px] md:w-[60px] text-start dark:text-white">Select</p>
// //                             <p className="w-[200px] dark:text-white">Product</p>
// //                             <p className="w-[100px] text-left dark:text-white">Price</p>
// //                             <p className="w-[100px] text-left dark:text-white">Quantity</p>
// //                             <p className="w-[100px] text-left dark:text-white">Subtotal</p>
// //                         </div>

// //                         {/* Table Body */}
// //                         {cartItems.map((item: any) => {
// //                             const checked = selectedIds.includes(item.id);
// //                             return (
// //                                 <div
// //                                     key={item.id}
// //                                     className={`w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4 ${checked ? "bg-gray-100 dark:bg-gray-900" : "bg-white dark:bg-transparent"}`}
// //                                 >
// //                                     <div className="w-[100px] md:w-full flex justify-start">
// //                                         <Checkbox
// //                                             checked={checked}
// //                                             onChange={(e) => handleSelect(item.id, e.target.checked)}
// //                                         />
// //                                     </div>

// //                                     <div className="flex items-center gap-5 w-[100px] md:w-full">
// //                                         <Image
// //                                             src={item.product.productImages?.[0] || "/no-image.jpg"}
// //                                             alt="product"
// //                                             width={60}
// //                                             height={60}
// //                                             className="rounded-md"
// //                                         />
// //                                         <h1 className="dark:text-white text-xl">{item.product.productName}</h1>
// //                                     </div>

// //                                     <div className="w-[100px] md:w-full flex justify-center">
// //                                         <p className="dark:text-white">${item.product.price}</p>
// //                                     </div>

// //                                     <div className="w-[100px] md:w-full flex justify-center dark:text-white">
// //                                         1
// //                                     </div>

// //                                     <div className="flex items-center gap-5 w-[100px] md:w-full justify-end">
// //                                         <p className="dark:text-white">${item.product.price}</p>
// //                                         <RiDeleteBin6Line
// //                                             onClick={() => handleDelete(item.id)}
// //                                             size={25}
// //                                             className="cursor-pointer dark:text-white"
// //                                         />
// //                                     </div>
// //                                 </div>
// //                             );
// //                         })}
// //                     </div>

// //                     {/* Footer (Total + Checkout) */}
// //                     <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
// //                         <div className="flex items-start">
// //                             <ConfigProvider
// //                                 theme={{
// //                                     components: {
// //                                         Input: {
// //                                             colorBorder: "rgb(67,67,67)",
// //                                             activeBorderColor: "rgb(67,67,67)",
// //                                             hoverBorderColor: "rgb(67,67,67)",
// //                                             colorPrimary: "rgb(67,67,67)",
// //                                             controlHeight: 46,
// //                                         },
// //                                     },
// //                                 }}
// //                             >
// //                                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// //                             </ConfigProvider>
// //                             <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
// //                                 Apply Coupon
// //                             </button>
// //                         </div>

// //                         <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
// //                             <div className="w-full sm:w-[450px]">
// //                                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
// //                                     <h2 className="text-xl font-medium mb-4 dark:text-white">
// //                                         Selected Items Total
// //                                     </h2>

// //                                     <div className="space-y-4">
// //                                         <div className="flex justify-between items-center">
// //                                             <span className="text-gray-700 dark:text-white">Items Selected:</span>
// //                                             <span className="font-medium dark:text-white">
// //                                                 {selectedItems.length}
// //                                             </span>
// //                                         </div>

// //                                         <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// //                                             <span className="text-gray-700 font-medium dark:text-white">Total:</span>
// //                                             <span className="font-medium dark:text-white">${total.toFixed(2)}</span>
// //                                         </div>
// //                                     </div>

// //                                     <div className="mt-6">
// //                                         <button
// //                                             onClick={handleCheckout}
// //                                             disabled={isCheckingOut}
// //                                             className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded disabled:opacity-50"
// //                                         >
// //                                             {isCheckingOut ? "Processing..." : "Proceed with Selected"}
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default Cart;




// // // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // "use client"
// // // // // import { Breadcrumb, ConfigProvider, Input } from "antd";
// // // // // import Link from "next/link";
// // // // // // import productImage from '../../../../public/products/monitor.png'
// // // // // import Image from "next/image";
// // // // // import { RiDeleteBin6Line } from "react-icons/ri";
// // // // // import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import { Imageurl } from "@/utils/Imageurl";
// // // // // import { addToCart, deleteProduct, removeOne } from "@/redux/features/cart/cartSlice";

// // // // // const Cart = () => {
// // // // //     const products = useSelector((state: any) => state.cart)
// // // // //     console.log(products.products);
// // // // //     const dispatch = useDispatch();
// // // // //     return (
// // // // //         <div className="container mx-auto py-16 px-3 md:px-0 ">
// // // // //             <Breadcrumb
// // // // //                 items={[
// // // // //                     {
// // // // //                         title: <Link href={`/`}><p className="dark:text-white">Home</p></Link>,
// // // // //                     },
// // // // //                     {
// // // // //                         title: <Link className="dark:text-white" href={`/cart`}><p className="dark:text-white">Cart</p></Link>,
// // // // //                     },
// // // // //                 ]}
// // // // //             />
// // // // //             {
// // // // //                 !products.products.length ?
// // // // //                     <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// // // // //                         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
// // // // //                             Your Cart is Empty
// // // // //                         </h1>
// // // // //                         <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// // // // //                             Looks like you haven&apos;t added anything to your cart yet. Explore our products and start shopping.
// // // // //                         </p>
// // // // //                         <Link
// // // // //                             href={`/product`}
// // // // //                             className=" px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// // // // //                         >
// // // // //                             Shop Now
// // // // //                         </Link>
// // // // //                     </div>

// // // // //                     :
// // // // //                     <>
// // // // //                         <div className=" mt-8 overflow-x-scroll md:overflow-x-visible">
// // // // //                             <div className=" w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center">
// // // // //                                 <p className=" w-[100px] md:w-full dark:text-white">Product</p>
// // // // //                                 <p className=" w-[100px] md:w-full text-center dark:text-white">Price</p>
// // // // //                                 <p className=" w-[100px] md:w-full text-center dark:text-white">Quantity</p>
// // // // //                                 <p className=" w-[100px] md:w-full text-end dark:text-white">Subtotal</p>
// // // // //                             </div>
// // // // //                             {/* table body🙀 While integrating api just run a map here🫡 */}
// // // // //                             {
// // // // //                                 products.products.map((product: any) => {
// // // // //                                     return (
// // // // //                                         <div key={product._id} className="  overflow-x-scroll  md:overflow-x-visible w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4">
// // // // //                                             <div className=" flex items-center gap-5 w-[100px] md:w-full">
// // // // //                                                 <Image src={`${Imageurl}/${product.images[0]}`} alt="img" width={200} height={200} className=" w-14" />
// // // // //                                                 <h1 className=" dark:text-white text-xl">{product?.name}</h1>
// // // // //                                             </div>
// // // // //                                             <div className="w-[100px] md:w-full flex justify-center">
// // // // //                                                 <p className=" dark:text-white">${product?.price}</p>
// // // // //                                             </div>

// // // // //                                             <div className="w-[100px] md:w-full flex justify-center">
// // // // //                                                 <div className=" w-[80px] h-[50px] border-[2px] border-[#999999] rounded-lg flex justify-between items-center px-3">
// // // // //                                                     <div>
// // // // //                                                         <h3 className=" text-lg font-semibold dark:text-white">{product.quantity}</h3>
// // // // //                                                     </div>
// // // // //                                                     <div className="">
// // // // //                                                         <IoIosArrowUp onClick={() => dispatch(addToCart(product))} size={20} className=" cursor-pointer dark:text-white" />
// // // // //                                                         <IoIosArrowDown onClick={() => dispatch(removeOne(product))} size={20} className=" cursor-pointer dark:text-white" />
// // // // //                                                     </div>

// // // // //                                                 </div>
// // // // //                                             </div>

// // // // //                                             <div className=" flex items-center gap-5 w-[100px] md:w-full justify-end">
// // // // //                                                 <p className=" dark:text-white">${product.price * product.quantity}</p>
// // // // //                                                 <RiDeleteBin6Line onClick={() => dispatch(deleteProduct(product))} size={25} className=" cursor-pointer dark:text-white" />
// // // // //                                             </div>
// // // // //                                         </div>
// // // // //                                     )
// // // // //                                 })
// // // // //                             }


// // // // //                         </div>
// // // // //                         <div className=" mt-10 flex flex-col lg:flex-row ">
// // // // //                             <div className=" flex items-start">
// // // // //                                 <ConfigProvider
// // // // //                                     theme={{
// // // // //                                         components: {
// // // // //                                             Input: {
// // // // //                                                 "colorBorder": "rgb(67,67,67)",
// // // // //                                                 "activeBorderColor": "rgb(67,67,67)",
// // // // //                                                 "hoverBorderColor": "rgb(67,67,67)",
// // // // //                                                 "colorPrimary": "rgb(67,67,67)",
// // // // //                                                 "controlHeight": 46
// // // // //                                             },
// // // // //                                         },
// // // // //                                     }}
// // // // //                                 >
// // // // //                                     <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// // // // //                                 </ConfigProvider>

// // // // //                                 <button className=" bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">Apply Coupon</button>
// // // // //                             </div>
// // // // //                             <div className=" w-full flex lg:justify-end mt-8 lg:mt-0">
// // // // //                                 <div className=" w-full sm:w-[450px] ">
// // // // //                                     <div className="border border-gray-600 dark:border-white rounded-md p-6">
// // // // //                                         <h2 className="text-xl font-medium mb-4 dark:text-white">Cart Total</h2>

// // // // //                                         <div className="space-y-4">
// // // // //                                             <div className="flex justify-between items-center">
// // // // //                                                 <span className="text-gray-700 dark:text-white">Subtotal:</span>
// // // // //                                                 <span className="font-medium dark:text-white">${products.total}</span>
// // // // //                                             </div>

// // // // //                                             <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // // // //                                                 <span className="text-gray-700 dark:text-white">Shipping:</span>
// // // // //                                                 <span className="text-gray-700 dark:text-white">Free</span>
// // // // //                                             </div>

// // // // //                                             <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // // // //                                                 <span className="text-gray-700 font-medium dark:text-white">Total:</span>
// // // // //                                                 <span className="font-medium dark:text-white">${products.total}</span>
// // // // //                                             </div>
// // // // //                                         </div>

// // // // //                                         <div className="mt-6">
// // // // //                                             <Link href={`/checkout`}>
// // // // //                                                 <button className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded">
// // // // //                                                     Proceed to checkout
// // // // //                                                 </button>
// // // // //                                             </Link>
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </>
// // // // //             }


// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default Cart;



// // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // "use client";

// // // // import { Breadcrumb, ConfigProvider, Input } from "antd";
// // // // import Link from "next/link";
// // // // import Image from "next/image";
// // // // import { RiDeleteBin6Line } from "react-icons/ri";
// // // // import { Imageurl } from "@/utils/Imageurl";
// // // // import { useGetCartQuery } from "@/redux/features/cart/cartApi"; // ✅ use API instead of slice

// // // // const Cart = () => {
// // // //   const { data, isLoading } = useGetCartQuery();

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-[50vh]">
// // // //         <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const cartItems = data?.data || [];
// // // //   const total = cartItems.reduce(
// // // //     (sum, item) => sum + item.product.price,
// // // //     0
// // // //   );

// // // //   return (
// // // //     <div className="container mx-auto py-16 px-3 md:px-0">
// // // //       <Breadcrumb
// // // //         items={[
// // // //           {
// // // //             title: (
// // // //               <Link href={`/`}>
// // // //                 <p className="dark:text-white">Home</p>
// // // //               </Link>
// // // //             ),
// // // //           },
// // // //           {
// // // //             title: (
// // // //               <Link className="dark:text-white" href={`/cart`}>
// // // //                 <p className="dark:text-white">Cart</p>
// // // //               </Link>
// // // //             ),
// // // //           },
// // // //         ]}
// // // //       />

// // // //       {!cartItems.length ? (
// // // //         <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// // // //           <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
// // // //             Your Cart is Empty
// // // //           </h1>
// // // //           <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// // // //             Looks like you haven&apos;t added anything yet.
// // // //           </p>
// // // //           <Link
// // // //             href={`/product`}
// // // //             className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// // // //           >
// // // //             Shop Now
// // // //           </Link>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
// // // //             <div className="w-[800px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
// // // //               <p className="w-[100px] md:w-full dark:text-white">Product</p>
// // // //               <p className="w-[100px] md:w-full text-center dark:text-white">Price</p>
// // // //               <p className="w-[100px] md:w-full text-center dark:text-white">Quantity</p>
// // // //               <p className="w-[100px] md:w-full text-end dark:text-white">Subtotal</p>
// // // //             </div>

// // // //             {cartItems.map((item: any) => (
// // // //               <div
// // // //                 key={item.id}
// // // //                 className="w-[800px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center mt-4"
// // // //               >
// // // //                 <div className="flex items-center gap-5 w-[100px] md:w-full">
// // // //                   <Image
// // // //                     src={
// // // //                       item.product.productImages?.[0] ||
// // // //                       `${Imageurl}/no-image.jpg`
// // // //                     }
// // // //                     alt="product"
// // // //                     width={60}
// // // //                     height={60}
// // // //                     className="rounded-md"
// // // //                   />
// // // //                   <h1 className="dark:text-white text-lg">
// // // //                     {item.product.productName}
// // // //                   </h1>
// // // //                 </div>
// // // //                 <div className="w-[100px] md:w-full text-center dark:text-white">
// // // //                   ${item.product.price}
// // // //                 </div>
// // // //                 <div className="w-[100px] md:w-full text-center dark:text-white">
// // // //                   1
// // // //                 </div>
// // // //                 <div className="flex justify-end items-center w-[100px] md:w-full gap-4">
// // // //                   <p className="dark:text-white">${item.product.price}</p>
// // // //                   <RiDeleteBin6Line
// // // //                     size={22}
// // // //                     className="cursor-pointer dark:text-white"
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           <div className="mt-10 flex flex-col lg:flex-row ">
// // // //             <div className="flex items-start">
// // // //               <ConfigProvider
// // // //                 theme={{
// // // //                   components: {
// // // //                     Input: {
// // // //                       colorBorder: "rgb(67,67,67)",
// // // //                       activeBorderColor: "rgb(67,67,67)",
// // // //                       hoverBorderColor: "rgb(67,67,67)",
// // // //                       colorPrimary: "rgb(67,67,67)",
// // // //                       controlHeight: 46,
// // // //                     },
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// // // //               </ConfigProvider>
// // // //               <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
// // // //                 Apply Coupon
// // // //               </button>
// // // //             </div>

// // // //             <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
// // // //               <div className="w-full sm:w-[450px]">
// // // //                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
// // // //                   <h2 className="text-xl font-medium mb-4 dark:text-white">
// // // //                     Cart Total
// // // //                   </h2>

// // // //                   <div className="space-y-4">
// // // //                     <div className="flex justify-between items-center">
// // // //                       <span className="text-gray-700 dark:text-white">Subtotal:</span>
// // // //                       <span className="font-medium dark:text-white">${total}</span>
// // // //                     </div>

// // // //                     <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // // //                       <span className="text-gray-700 dark:text-white">Shipping:</span>
// // // //                       <span className="text-gray-700 dark:text-white">Free</span>
// // // //                     </div>

// // // //                     <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // // //                       <span className="text-gray-700 font-medium dark:text-white">
// // // //                         Total:
// // // //                       </span>
// // // //                       <span className="font-medium dark:text-white">${total}</span>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="mt-6">
// // // //                     <Link href={`/checkout`}>
// // // //                       <button className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded">
// // // //                         Proceed to checkout
// // // //                       </button>
// // // //                     </Link>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Cart;




// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";

// // // import { Breadcrumb,Checkbox, ConfigProvider, Input, message } from "antd";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { RiDeleteBin6Line } from "react-icons/ri";
// // // import { useState } from "react";
// // // import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";

// // // const Cart = () => {
// // //     const { data, isLoading } = useGetCartQuery();
// // //     console.log(" useGetCartQuery data:", data?.data);
// // //     const [selectedIds, setSelectedIds] = useState<string[]>([]);
// // //     const [deleteCartItem, ] = useDeleteCartItemMutation();
// // //     if (isLoading) {
// // //         return (
// // //             <div className="flex justify-center items-center h-[50vh]">
// // //                 <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
// // //             </div>
// // //         );
// // //     }

// // //     const cartItems = data?.data || [];

// // //     // ✅ Handle checkbox toggle
// // //     const handleSelect = (id: string, checked: boolean) => {
// // //         setSelectedIds((prev) =>
// // //             checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
// // //         );
// // //     };

// // //     // ✅ Filter only selected items
// // //     const selectedItems = cartItems.filter((item) =>
// // //         selectedIds.includes(item.id)
// // //     );

// // //     // ✅ Calculate total of selected items
// // //     const total = selectedItems.reduce(
// // //         (sum, item) => sum + item.product.price,
// // //         0
// // //     );

// // //     // ✅ On checkout send only selected items
// // //     const handleCheckout = () => {
// // //         if (selectedItems.length === 0) {
// // //             alert("Please select at least one product to checkout!");
// // //             return;
// // //         }

// // //         const checkoutPayload = selectedItems.map((item) => ({
// // //             productId: item.product.id,
// // //             quantity: 1,
// // //             price: item.product.price,
// // //         }));

// // //         console.log("Selected items for checkout:", checkoutPayload);

// // //         // Example: Navigate to checkout page with selected items
// // //         // router.push({
// // //         //   pathname: "/checkout",
// // //         //   query: { data: JSON.stringify(checkoutPayload) },
// // //         // });
// // //     };

// // //     //delete handler
// // //     const handleDelete = async (cartItemId: string) => {
// // //         console.log("Deleting cart item ID:", cartItemId);
// // //         try {
// // //             await deleteCartItem(cartItemId).unwrap();
// // //             message.success("Item deleted from cart");
// // //         } catch (err: any) {
// // //             message.error(err?.data?.message || "Failed to delete cart item");
// // //         }
// // //     };

// // //     return (
// // //         <div className="container mx-auto py-16 px-3 md:px-0">
// // //             <Breadcrumb
// // //                 items={[
// // //                     {
// // //                         title: (
// // //                             <Link href={`/`}>
// // //                                 <p className="dark:text-white">Home</p>
// // //                             </Link>
// // //                         ),
// // //                     },
// // //                     {
// // //                         title: (
// // //                             <Link href={`/cart`}>
// // //                                 <p className="dark:text-white">Cart</p>
// // //                             </Link>
// // //                         ),
// // //                     },
// // //                 ]}
// // //             />

// // //             {!cartItems.length ? (
// // //                 <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// // //                     <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
// // //                         Your Cart is Empty
// // //                     </h1>
// // //                     <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// // //                         Looks like you haven&apos;t added anything yet.
// // //                     </p>
// // //                     <Link
// // //                         href={`/product`}
// // //                         className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// // //                     >
// // //                         Shop Now
// // //                     </Link>
// // //                 </div>
// // //             ) : (
// // //                 <>
// // //                     {/* Table Header */}
// // //                     <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
// // //                         <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
// // //                             <p className="w-[60px] md:w-[60px] text-start dark:text-white">Select</p>
// // //                             <p className="w-[200px] dark:text-white">Product</p>
// // //                             <p className="w-[100px] text-left dark:text-white">Price</p>
// // //                             <p className="w-[100px] text-left dark:text-white">Quantity</p>
// // //                             <p className="w-[100px] text-left dark:text-white">Subtotal</p>
// // //                         </div>

// // //                         {/* Table Body */}
// // //                         {cartItems.map((item: any) => {
// // //                             const checked = selectedIds.includes(item.id);
// // //                             return (
// // //                                 <div
// // //                                     key={item.id}
// // //                                     className={`w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4 ${checked
// // //                                         ? "bg-gray-100 dark:bg-gray-900"
// // //                                         : "bg-white dark:bg-transparent"
// // //                                         }`}
// // //                                 >
// // //                                     {/* Checkbox */}
// // //                                     <div className="w-[100px] md:w-full flex justify-start">
// // //                                         <Checkbox
// // //                                             checked={checked}
// // //                                             onChange={(e) =>
// // //                                                 handleSelect(item.id, e.target.checked)
// // //                                             }
// // //                                         />
// // //                                     </div>

// // //                                     {/* Product Info */}
// // //                                     <div className="flex items-center gap-5 w-[100px] md:w-full">
// // //                                         <Image
// // //                                             src={item.product.productImages?.[0] || "/no-image.jpg"}
// // //                                             alt="product"
// // //                                             width={60}
// // //                                             height={60}
// // //                                             className="rounded-md"
// // //                                         />
// // //                                         <h1 className="dark:text-white text-xl">{item.product.productName}</h1>
// // //                                     </div>

// // //                                     {/* Price */}
// // //                                     <div className="w-[100px] md:w-full flex justify-center">
// // //                                         <p className="dark:text-white">${item.product.price}</p>
// // //                                     </div>

// // //                                     {/* Quantity */}
// // //                                     <div className="w-[100px] md:w-full flex justify-center dark:text-white">
// // //                                         1
// // //                                     </div>

// // //                                     {/* Subtotal + Delete */}
// // //                                     <div className="flex items-center gap-5 w-[100px] md:w-full justify-end">
// // //                                         <p className="dark:text-white">${item.product.price}</p>
// // //                                         <RiDeleteBin6Line
// // //                                             onClick={() => handleDelete(item.productId)}
// // //                                             size={25}
// // //                                             className="cursor-pointer dark:text-white"
// // //                                         />
// // //                                     </div>
// // //                                 </div>
// // //                             );
// // //                         })}

// // //                     </div>

// // //                     {/* Footer (Total + Checkout) */}
// // //                     <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
// // //                         {/* Coupon */}
// // //                         <div className="flex items-start">
// // //                             <ConfigProvider
// // //                                 theme={{
// // //                                     components: {
// // //                                         Input: {
// // //                                             colorBorder: "rgb(67,67,67)",
// // //                                             activeBorderColor: "rgb(67,67,67)",
// // //                                             hoverBorderColor: "rgb(67,67,67)",
// // //                                             colorPrimary: "rgb(67,67,67)",
// // //                                             controlHeight: 46,
// // //                                         },
// // //                                     },
// // //                                 }}
// // //                             >
// // //                                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// // //                             </ConfigProvider>
// // //                             <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
// // //                                 Apply Coupon
// // //                             </button>
// // //                         </div>

// // //                         {/* Cart Total */}
// // //                         <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
// // //                             <div className="w-full sm:w-[450px]">
// // //                                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
// // //                                     <h2 className="text-xl font-medium mb-4 dark:text-white">
// // //                                         Selected Items Total
// // //                                     </h2>

// // //                                     <div className="space-y-4">
// // //                                         <div className="flex justify-between items-center">
// // //                                             <span className="text-gray-700 dark:text-white">Items Selected:</span>
// // //                                             <span className="font-medium dark:text-white">
// // //                                                 {selectedItems.length}
// // //                                             </span>
// // //                                         </div>

// // //                                         <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // //                                             <span className="text-gray-700 font-medium dark:text-white">
// // //                                                 Total:
// // //                                             </span>
// // //                                             <span className="font-medium dark:text-white">
// // //                                                 ${total.toFixed(2)}
// // //                                             </span>
// // //                                         </div>
// // //                                     </div>

// // //                                     <div className="mt-6">
// // //                                         <button
// // //                                             onClick={handleCheckout}
// // //                                             className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded"
// // //                                         >
// // //                                             Proceed with Selected
// // //                                         </button>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default Cart;


// // // // "use client";

// // // // import { useState } from "react";
// // // // import { useSelector } from "react-redux";
// // // // import { Breadcrumb, Checkbox, ConfigProvider, Input, message } from "antd";
// // // // import Link from "next/link";
// // // // import Image from "next/image";
// // // // import { RiDeleteBin6Line } from "react-icons/ri";
// // // // import { RootState } from "@/redux/store";
// // // // import {
// // // //   useDeleteCartItemMutation,
// // // //   useGetCartQuery,
// // // // } from "@/redux/features/cart/cartApi";

// // // // interface Product {
// // // //   id: string;
// // // //   productName: string;
// // // //   price: number;
// // // //   discount?: number;
// // // //   productImages?: string[];
// // // // }

// // // // interface CartItem {
// // // //   id: string;
// // // //   product: Product;
// // // // }


// // // // const Cart: React.FC = () => {
// // // //   // ✅ Get auth token from Redux
// // // //   const token = useSelector((state: RootState) => state.auth.token);

// // // //   // ✅ Skip fetching if user is logged out
// // // //   const { data, isLoading } = useGetCartQuery(undefined, { skip: !token });

// // // //   const [selectedIds, setSelectedIds] = useState<string[]>([]);
// // // //   const [deleteCartItem] = useDeleteCartItemMutation();

// // // //   // ✅ Loading state
// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-[50vh]">
// // // //         <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ✅ Logged-out state
// // // //   if (!token) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-[50vh]">
// // // //         <p className="text-gray-600 dark:text-gray-200">
// // // //           Please log in to view your cart.
// // // //         </p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const cartItems: CartItem[] = data?.data || [];

// // // //   // ✅ Handle checkbox toggle
// // // //   const handleSelect = (id: string, checked: boolean) => {
// // // //     setSelectedIds((prev) =>
// // // //       checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
// // // //     );
// // // //   };

// // // //   // ✅ Filter selected items
// // // //   const selectedItems = cartItems.filter((item) =>
// // // //     selectedIds.includes(item.id)
// // // //   );

// // // //   // ✅ Calculate total
// // // //   const total = selectedItems.reduce(
// // // //     (sum, item) => sum + item.product.price * 1,
// // // //     0
// // // //   );

// // // //   // ✅ Checkout handler
// // // //   const handleCheckout = () => {
// // // //     if (selectedItems.length === 0) {
// // // //       message.warning("Please select at least one product to checkout!");
// // // //       return;
// // // //     }

// // // //     const checkoutPayload = selectedItems.map((item) => ({
// // // //       productId: item.product.id,
// // // //       quantity:1,

// // // //     }));

// // // //     console.log("Selected items for checkout:", checkoutPayload);

// // // //     // Navigate to checkout page with selected items (example)
// // // //     // router.push({ pathname: "/checkout", query: { data: JSON.stringify(checkoutPayload) } });
// // // //   };

// // // //   // ✅ Delete cart item
// // // //   const handleDelete = async (cartItemId: string) => {
// // // //     try {
// // // //       await deleteCartItem(cartItemId).unwrap();
// // // //       message.success("Item deleted from cart");
// // // //       setSelectedIds((prev) => prev.filter((id) => id !== cartItemId));
// // // //     } catch (err: any) {
// // // //       message.error(err?.data?.message || "Failed to delete cart item");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="container mx-auto py-16 px-3 md:px-0">
// // // //       {/* Breadcrumb */}
// // // //       <Breadcrumb
// // // //         items={[
// // // //           {
// // // //             title: (
// // // //               <Link href={`/`}>
// // // //                 <p className="dark:text-white">Home</p>
// // // //               </Link>
// // // //             ),
// // // //           },
// // // //           {
// // // //             title: (
// // // //               <Link href={`/cart`}>
// // // //                 <p className="dark:text-white">Cart</p>
// // // //               </Link>
// // // //             ),
// // // //           },
// // // //         ]}
// // // //       />

// // // //       {/* Empty Cart */}
// // // //       {cartItems.length === 0 ? (
// // // //         <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// // // //           <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
// // // //             Your Cart is Empty
// // // //           </h1>
// // // //           <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// // // //             Looks like you haven&apos;t added anything yet.
// // // //           </p>
// // // //           <Link
// // // //             href={`/product`}
// // // //             className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// // // //           >
// // // //             Shop Now
// // // //           </Link>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           {/* Table Header */}
// // // //           <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
// // // //             <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
// // // //               <p className="w-[60px] md:w-[60px] text-start dark:text-white">
// // // //                 Select
// // // //               </p>
// // // //               <p className="w-[200px] dark:text-white">Product</p>
// // // //               <p className="w-[100px] text-left dark:text-white">Price</p>
// // // //               <p className="w-[100px] text-left dark:text-white">Quantity</p>
// // // //               <p className="w-[100px] text-left dark:text-white">Subtotal</p>
// // // //             </div>

// // // //             {/* Table Body */}
// // // //             {cartItems.map((item) => {
// // // //               const checked = selectedIds.includes(item.id);
// // // //               return (
// // // //                 <div
// // // //                   key={item.id}
// // // //                   className={`w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4 ${
// // // //                     checked
// // // //                       ? "bg-gray-100 dark:bg-gray-900"
// // // //                       : "bg-white dark:bg-transparent"
// // // //                   }`}
// // // //                 >
// // // //                   {/* Checkbox */}
// // // //                   <div className="w-[100px] md:w-full flex justify-start">
// // // //                     <Checkbox
// // // //                       checked={checked}
// // // //                       onChange={(e) =>
// // // //                         handleSelect(item.id, e.target.checked)
// // // //                       }
// // // //                     />
// // // //                   </div>

// // // //                   {/* Product Info */}
// // // //                   <div className="flex items-center gap-5 w-[100px] md:w-full">
// // // //                     <Image
// // // //                       src={item.product.productImages?.[0] || "/no-image.jpg"}
// // // //                       alt={item.product.productName}
// // // //                       width={60}
// // // //                       height={60}
// // // //                       className="rounded-md"
// // // //                     />
// // // //                     <h1 className="dark:text-white text-xl">
// // // //                       {item.product.productName}
// // // //                     </h1>
// // // //                   </div>

// // // //                   {/* Price */}
// // // //                   <div className="w-[100px] md:w-full flex justify-center">
// // // //                     <p className="dark:text-white">${item.product.price}</p>
// // // //                   </div>

// // // //                   {/* Quantity */}
// // // //                   <div className="w-[100px] md:w-full flex justify-center dark:text-white">
// // // //                     {1}
// // // //                   </div>

// // // //                   {/* Subtotal + Delete */}
// // // //                   <div className="flex items-center gap-5 w-[100px] md:w-full justify-end">
// // // //                     <p className="dark:text-white">
// // // //                       ${(item.product.price * item.quantity).toFixed(2)}
// // // //                     </p>
// // // //                     <RiDeleteBin6Line
// // // //                       onClick={() => handleDelete(item.id)}
// // // //                       size={25}
// // // //                       className="cursor-pointer dark:text-white"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>

// // // //           {/* Footer (Total + Checkout) */}
// // // //           <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
// // // //             {/* Coupon */}
// // // //             <div className="flex items-start">
// // // //               <ConfigProvider
// // // //                 theme={{
// // // //                   components: {
// // // //                     Input: {
// // // //                       colorBorder: "rgb(67,67,67)",
// // // //                       activeBorderColor: "rgb(67,67,67)",
// // // //                       hoverBorderColor: "rgb(67,67,67)",
// // // //                       colorPrimary: "rgb(67,67,67)",
// // // //                       controlHeight: 46,
// // // //                     },
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// // // //               </ConfigProvider>
// // // //               <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
// // // //                 Apply Coupon
// // // //               </button>
// // // //             </div>

// // // //             {/* Cart Total */}
// // // //             <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
// // // //               <div className="w-full sm:w-[450px]">
// // // //                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
// // // //                   <h2 className="text-xl font-medium mb-4 dark:text-white">
// // // //                     Selected Items Total
// // // //                   </h2>

// // // //                   <div className="space-y-4">
// // // //                     <div className="flex justify-between items-center">
// // // //                       <span className="text-gray-700 dark:text-white">
// // // //                         Items Selected:
// // // //                       </span>
// // // //                       <span className="font-medium dark:text-white">
// // // //                         {selectedItems.length}
// // // //                       </span>
// // // //                     </div>

// // // //                     <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // // //                       <span className="text-gray-700 font-medium dark:text-white">
// // // //                         Total:
// // // //                       </span>
// // // //                       <span className="font-medium dark:text-white">
// // // //                         ${total.toFixed(2)}
// // // //                       </span>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="mt-6">
// // // //                     <button
// // // //                       onClick={handleCheckout}
// // // //                       className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded"
// // // //                     >
// // // //                       Proceed with Selected
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Cart;



// // "use client";

// // import { useState } from "react";
// // import { useSelector } from "react-redux";
// // import { Breadcrumb, Checkbox, ConfigProvider, Input, message } from "antd";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { RiDeleteBin6Line } from "react-icons/ri";
// // import { RootState } from "@/redux/store";
// // import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";

// // interface Product {
// //   id: string;
// //   productName: string;
// //   price: number;
// //   productId: string;
// //   productImages?: string[];
// // }

// // interface CartItem {
// //   id: string;
// //   product: Product;
// // }

// // const Cart: React.FC = () => {
// //   const token = useSelector((state: RootState) => state.logInUser.accessToken);
// //   console.log("token from cart page:", token);

// //   // ✅ Skip API if not logged in
// //   const { data, isLoading } = useGetCartQuery(undefined, { skip: !token });
// //   console.log(" useGetCartQuery data:", data?.data);
// //   const [selectedIds, setSelectedIds] = useState<string[]>([]);
// //   const [deleteCartItem] = useDeleteCartItemMutation();

// //   if (!token) {
// //     return (
// //       <div className="flex justify-center items-center h-[50vh]">
// //         <p className="text-gray-600 dark:text-gray-200">
// //           Please log in to view your cart.
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-[50vh]">
// //         <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
// //       </div>
// //     );
// //   }

// //   const cartItems: CartItem[] = data?.data || [];

// //   const handleSelect = (id: string, checked: boolean) => {
// //     setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
// //   };

// //   const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
// //   const total = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

// //   const handleCheckout = () => {
// //     if (selectedItems.length === 0) {
// //       message.warning("Please select at least one product to checkout!");
// //       return;
// //     }

// //     const checkoutPayload = selectedItems.map(item => ({
// //       productId: item.product.id,
// //       quantity: 1,
// //       price: item.product.price,
// //     }));

// //     console.log("Selected items for checkout:", checkoutPayload);
// //     // Example: navigate to checkout page with checkoutPayload
// //   };

// //   const handleDelete = async (productId: string) => {
// //     console.log("Deleting cart item ID:", productId);
// //     try {
// //       await deleteCartItem(productId).unwrap();
// //       message.success("Item deleted from cart");
// //       setSelectedIds(prev => prev.filter(id => id !== productId));
// //     } catch (err: any) {
// //       message.error(err?.data?.message || "Failed to delete cart item");
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto py-16 px-3 md:px-0">
// //       {/* Breadcrumb */}
// //       <Breadcrumb
// //         items={[
// //           { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
// //           { title: <Link href="/cart"><p className="dark:text-white">Cart</p></Link> },
// //         ]}
// //       />

// //       {!cartItems.length ? (
// //         <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// //           <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h1>
// //           <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// //             Looks like you haven&apos;t added anything yet.
// //           </p>
// //           <Link
// //             href="/product"
// //             className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// //           >
// //             Shop Now
// //           </Link>
// //         </div>
// //       ) : (
// //         <>
// //           {/* Table Header */}
// //           <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
// //             <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
// //               <p className="w-[60px] text-start dark:text-white">Select</p>
// //               <p className="w-[200px] dark:text-white">Product</p>
// //               <p className="w-[100px] text-left dark:text-white">Price</p>
// //               <p className="w-[100px] text-left dark:text-white">Quantity</p>
// //               <p className="w-[100px] text-left dark:text-white">Subtotal</p>
// //             </div>

// //             {/* Table Body */}
// //             {cartItems.map(item => {
// //               const checked = selectedIds.includes(item.id);
// //               return (
// //                 <div
// //                   key={item.id}
// //                   className={`w-[800px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center mt-4 ${checked ? "bg-gray-100 dark:bg-gray-900" : "bg-white dark:bg-transparent"}`}
// //                 >
// //                   <div className="w-[100px] flex justify-start">
// //                     <Checkbox checked={checked} onChange={e => handleSelect(item.id, e.target.checked)} />
// //                   </div>

// //                   <div className="flex items-center gap-5 w-[100px] md:w-full">
// //                     <Image
// //                       src={item.product.productImages?.[0] || "/no-image.jpg"}
// //                       alt={item.product.productName}
// //                       width={60}
// //                       height={60}
// //                       className="rounded-md"
// //                     />
// //                     <h1 className="dark:text-white text-xl">{item.product.productName}</h1>
// //                   </div>

// //                   <div className="w-[100px] md:w-full flex justify-center">
// //                     <p className="dark:text-white">${item.product.price}</p>
// //                   </div>

// //                   <div className="w-[100px] md:w-full flex justify-center dark:text-white">{1}</div>

// //                   <div className="flex items-center gap-5 w-[100px] md:w-full justify-end">
// //                     <p className="dark:text-white">${(item.product.price * 1).toFixed(2)}</p>
// //                     <RiDeleteBin6Line onClick={() => handleDelete(item.product.productId)} size={25} className="cursor-pointer dark:text-white" />
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* Footer (Coupon + Total + Checkout) */}
// //           <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
// //             <div className="flex items-start">
// //               <ConfigProvider
// //                 theme={{
// //                   components: { Input: { colorBorder: "rgb(67,67,67)", activeBorderColor: "rgb(67,67,67)", hoverBorderColor: "rgb(67,67,67)", colorPrimary: "rgb(67,67,67)", controlHeight: 46 } },
// //                 }}
// //               >
// //                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// //               </ConfigProvider>
// //               <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">Apply Coupon</button>
// //             </div>

// //             <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
// //               <div className="w-full sm:w-[450px]">
// //                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
// //                   <h2 className="text-xl font-medium mb-4 dark:text-white">Selected Items Total</h2>

// //                   <div className="space-y-4">
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-gray-700 dark:text-white">Items Selected:</span>
// //                       <span className="font-medium dark:text-white">{selectedItems.length}</span>
// //                     </div>

// //                     <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// //                       <span className="text-gray-700 font-medium dark:text-white">Total:</span>
// //                       <span className="font-medium dark:text-white">${total.toFixed(2)}</span>
// //                     </div>
// //                   </div>

// //                   <div className="mt-6">
// //                     <button onClick={handleCheckout} className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded">
// //                       Proceed with Selected
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;


// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client"
// // // import { Breadcrumb, ConfigProvider, Input } from "antd";
// // // import Link from "next/link";
// // // // import productImage from '../../../../public/products/monitor.png'
// // // import Image from "next/image";
// // // import { RiDeleteBin6Line } from "react-icons/ri";
// // // import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Imageurl } from "@/utils/Imageurl";
// // // import { addToCart, deleteProduct, removeOne } from "@/redux/features/cart/cartSlice";

// // // const Cart = () => {
// // //     const products = useSelector((state: any) => state.cart)
// // //     console.log(products.products);
// // //     const dispatch = useDispatch();
// // //     return (
// // //         <div className="container mx-auto py-16 px-3 md:px-0 ">
// // //             <Breadcrumb
// // //                 items={[
// // //                     {
// // //                         title: <Link href={`/`}><p className="dark:text-white">Home</p></Link>,
// // //                     },
// // //                     {
// // //                         title: <Link className="dark:text-white" href={`/cart`}><p className="dark:text-white">Cart</p></Link>,
// // //                     },
// // //                 ]}
// // //             />
// // //             {
// // //                 !products.products.length ?
// // //                     <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// // //                         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
// // //                             Your Cart is Empty
// // //                         </h1>
// // //                         <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// // //                             Looks like you haven&apos;t added anything to your cart yet. Explore our products and start shopping.
// // //                         </p>
// // //                         <Link
// // //                             href={`/product`}
// // //                             className=" px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// // //                         >
// // //                             Shop Now
// // //                         </Link>
// // //                     </div>

// // //                     :
// // //                     <>
// // //                         <div className=" mt-8 overflow-x-scroll md:overflow-x-visible">
// // //                             <div className=" w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center">
// // //                                 <p className=" w-[100px] md:w-full dark:text-white">Product</p>
// // //                                 <p className=" w-[100px] md:w-full text-center dark:text-white">Price</p>
// // //                                 <p className=" w-[100px] md:w-full text-center dark:text-white">Quantity</p>
// // //                                 <p className=" w-[100px] md:w-full text-end dark:text-white">Subtotal</p>
// // //                             </div>
// // //                             {/* table body🙀 While integrating api just run a map here🫡 */}
// // //                             {
// // //                                 products.products.map((product: any) => {
// // //                                     return (
// // //                                         <div key={product._id} className="  overflow-x-scroll  md:overflow-x-visible w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4">
// // //                                             <div className=" flex items-center gap-5 w-[100px] md:w-full">
// // //                                                 <Image src={`${Imageurl}/${product.images[0]}`} alt="img" width={200} height={200} className=" w-14" />
// // //                                                 <h1 className=" dark:text-white text-xl">{product?.name}</h1>
// // //                                             </div>
// // //                                             <div className="w-[100px] md:w-full flex justify-center">
// // //                                                 <p className=" dark:text-white">${product?.price}</p>
// // //                                             </div>

// // //                                             <div className="w-[100px] md:w-full flex justify-center">
// // //                                                 <div className=" w-[80px] h-[50px] border-[2px] border-[#999999] rounded-lg flex justify-between items-center px-3">
// // //                                                     <div>
// // //                                                         <h3 className=" text-lg font-semibold dark:text-white">{product.quantity}</h3>
// // //                                                     </div>
// // //                                                     <div className="">
// // //                                                         <IoIosArrowUp onClick={() => dispatch(addToCart(product))} size={20} className=" cursor-pointer dark:text-white" />
// // //                                                         <IoIosArrowDown onClick={() => dispatch(removeOne(product))} size={20} className=" cursor-pointer dark:text-white" />
// // //                                                     </div>

// // //                                                 </div>
// // //                                             </div>

// // //                                             <div className=" flex items-center gap-5 w-[100px] md:w-full justify-end">
// // //                                                 <p className=" dark:text-white">${product.price * product.quantity}</p>
// // //                                                 <RiDeleteBin6Line onClick={() => dispatch(deleteProduct(product))} size={25} className=" cursor-pointer dark:text-white" />
// // //                                             </div>
// // //                                         </div>
// // //                                     )
// // //                                 })
// // //                             }


// // //                         </div>
// // //                         <div className=" mt-10 flex flex-col lg:flex-row ">
// // //                             <div className=" flex items-start">
// // //                                 <ConfigProvider
// // //                                     theme={{
// // //                                         components: {
// // //                                             Input: {
// // //                                                 "colorBorder": "rgb(67,67,67)",
// // //                                                 "activeBorderColor": "rgb(67,67,67)",
// // //                                                 "hoverBorderColor": "rgb(67,67,67)",
// // //                                                 "colorPrimary": "rgb(67,67,67)",
// // //                                                 "controlHeight": 46
// // //                                             },
// // //                                         },
// // //                                     }}
// // //                                 >
// // //                                     <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// // //                                 </ConfigProvider>

// // //                                 <button className=" bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">Apply Coupon</button>
// // //                             </div>
// // //                             <div className=" w-full flex lg:justify-end mt-8 lg:mt-0">
// // //                                 <div className=" w-full sm:w-[450px] ">
// // //                                     <div className="border border-gray-600 dark:border-white rounded-md p-6">
// // //                                         <h2 className="text-xl font-medium mb-4 dark:text-white">Cart Total</h2>

// // //                                         <div className="space-y-4">
// // //                                             <div className="flex justify-between items-center">
// // //                                                 <span className="text-gray-700 dark:text-white">Subtotal:</span>
// // //                                                 <span className="font-medium dark:text-white">${products.total}</span>
// // //                                             </div>

// // //                                             <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // //                                                 <span className="text-gray-700 dark:text-white">Shipping:</span>
// // //                                                 <span className="text-gray-700 dark:text-white">Free</span>
// // //                                             </div>

// // //                                             <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// // //                                                 <span className="text-gray-700 font-medium dark:text-white">Total:</span>
// // //                                                 <span className="font-medium dark:text-white">${products.total}</span>
// // //                                             </div>
// // //                                         </div>

// // //                                         <div className="mt-6">
// // //                                             <Link href={`/checkout`}>
// // //                                                 <button className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded">
// // //                                                     Proceed to checkout
// // //                                                 </button>
// // //                                             </Link>
// // //                                         </div>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </>
// // //             }


// // //         </div>
// // //     );
// // // };

// // // export default Cart;



// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import { Breadcrumb, ConfigProvider, Input } from "antd";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { RiDeleteBin6Line } from "react-icons/ri";
// // import { Imageurl } from "@/utils/Imageurl";
// // import { useGetCartQuery } from "@/redux/features/cart/cartApi"; // ✅ use API instead of slice

// // const Cart = () => {
// //   const { data, isLoading } = useGetCartQuery();

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-[50vh]">
// //         <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
// //       </div>
// //     );
// //   }

// //   const cartItems = data?.data || [];
// //   const total = cartItems.reduce(
// //     (sum, item) => sum + item.product.price,
// //     0
// //   );

// //   return (
// //     <div className="container mx-auto py-16 px-3 md:px-0">
// //       <Breadcrumb
// //         items={[
// //           {
// //             title: (
// //               <Link href={`/`}>
// //                 <p className="dark:text-white">Home</p>
// //               </Link>
// //             ),
// //           },
// //           {
// //             title: (
// //               <Link className="dark:text-white" href={`/cart`}>
// //                 <p className="dark:text-white">Cart</p>
// //               </Link>
// //             ),
// //           },
// //         ]}
// //       />

// //       {!cartItems.length ? (
// //         <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
// //           <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
// //             Your Cart is Empty
// //           </h1>
// //           <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
// //             Looks like you haven&apos;t added anything yet.
// //           </p>
// //           <Link
// //             href={`/product`}
// //             className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
// //           >
// //             Shop Now
// //           </Link>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
// //             <div className="w-[800px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
// //               <p className="w-[100px] md:w-full dark:text-white">Product</p>
// //               <p className="w-[100px] md:w-full text-center dark:text-white">Price</p>
// //               <p className="w-[100px] md:w-full text-center dark:text-white">Quantity</p>
// //               <p className="w-[100px] md:w-full text-end dark:text-white">Subtotal</p>
// //             </div>

// //             {cartItems.map((item: any) => (
// //               <div
// //                 key={item.id}
// //                 className="w-[800px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center mt-4"
// //               >
// //                 <div className="flex items-center gap-5 w-[100px] md:w-full">
// //                   <Image
// //                     src={
// //                       item.product.productImages?.[0] ||
// //                       `${Imageurl}/no-image.jpg`
// //                     }
// //                     alt="product"
// //                     width={60}
// //                     height={60}
// //                     className="rounded-md"
// //                   />
// //                   <h1 className="dark:text-white text-lg">
// //                     {item.product.productName}
// //                   </h1>
// //                 </div>
// //                 <div className="w-[100px] md:w-full text-center dark:text-white">
// //                   ${item.product.price}
// //                 </div>
// //                 <div className="w-[100px] md:w-full text-center dark:text-white">
// //                   1
// //                 </div>
// //                 <div className="flex justify-end items-center w-[100px] md:w-full gap-4">
// //                   <p className="dark:text-white">${item.product.price}</p>
// //                   <RiDeleteBin6Line
// //                     size={22}
// //                     className="cursor-pointer dark:text-white"
// //                   />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="mt-10 flex flex-col lg:flex-row ">
// //             <div className="flex items-start">
// //               <ConfigProvider
// //                 theme={{
// //                   components: {
// //                     Input: {
// //                       colorBorder: "rgb(67,67,67)",
// //                       activeBorderColor: "rgb(67,67,67)",
// //                       hoverBorderColor: "rgb(67,67,67)",
// //                       colorPrimary: "rgb(67,67,67)",
// //                       controlHeight: 46,
// //                     },
// //                   },
// //                 }}
// //               >
// //                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
// //               </ConfigProvider>
// //               <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
// //                 Apply Coupon
// //               </button>
// //             </div>

// //             <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
// //               <div className="w-full sm:w-[450px]">
// //                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
// //                   <h2 className="text-xl font-medium mb-4 dark:text-white">
// //                     Cart Total
// //                   </h2>

// //                   <div className="space-y-4">
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-gray-700 dark:text-white">Subtotal:</span>
// //                       <span className="font-medium dark:text-white">${total}</span>
// //                     </div>

// //                     <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// //                       <span className="text-gray-700 dark:text-white">Shipping:</span>
// //                       <span className="text-gray-700 dark:text-white">Free</span>
// //                     </div>

// //                     <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
// //                       <span className="text-gray-700 font-medium dark:text-white">
// //                         Total:
// //                       </span>
// //                       <span className="font-medium dark:text-white">${total}</span>
// //                     </div>
// //                   </div>

// //                   <div className="mt-6">
// //                     <Link href={`/checkout`}>
// //                       <button className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded">
// //                         Proceed to checkout
// //                       </button>
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;




// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Breadcrumb,Checkbox, ConfigProvider, Input, message } from "antd";
// import Link from "next/link";
// import Image from "next/image";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { useState } from "react";
// import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";

// const Cart = () => {
//     const { data, isLoading } = useGetCartQuery();
//     console.log(" useGetCartQuery data:", data?.data);
//     const [selectedIds, setSelectedIds] = useState<string[]>([]);
//     const [deleteCartItem, ] = useDeleteCartItemMutation();
//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-[50vh]">
//                 <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
//             </div>
//         );
//     }

//     const cartItems = data?.data || [];

//     // ✅ Handle checkbox toggle
//     const handleSelect = (id: string, checked: boolean) => {
//         setSelectedIds((prev) =>
//             checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
//         );
//     };

//     // ✅ Filter only selected items
//     const selectedItems = cartItems.filter((item) =>
//         selectedIds.includes(item.id)
//     );

//     // ✅ Calculate total of selected items
//     const total = selectedItems.reduce(
//         (sum, item) => sum + item.product.price,
//         0
//     );

//     // ✅ On checkout send only selected items
//     const handleCheckout = () => {
//         if (selectedItems.length === 0) {
//             alert("Please select at least one product to checkout!");
//             return;
//         }

//         const checkoutPayload = selectedItems.map((item) => ({
//             productId: item.product.id,
//             quantity: 1,
//             price: item.product.price,
//         }));

//         console.log("Selected items for checkout:", checkoutPayload);

//         // Example: Navigate to checkout page with selected items
//         // router.push({
//         //   pathname: "/checkout",
//         //   query: { data: JSON.stringify(checkoutPayload) },
//         // });
//     };

//     //delete handler
//     const handleDelete = async (cartItemId: string) => {
//         console.log("Deleting cart item ID:", cartItemId);
//         try {
//             await deleteCartItem(cartItemId).unwrap();
//             message.success("Item deleted from cart");
//         } catch (err: any) {
//             message.error(err?.data?.message || "Failed to delete cart item");
//         }
//     };

//     return (
//         <div className="container mx-auto py-16 px-3 md:px-0">
//             <Breadcrumb
//                 items={[
//                     {
//                         title: (
//                             <Link href={`/`}>
//                                 <p className="dark:text-white">Home</p>
//                             </Link>
//                         ),
//                     },
//                     {
//                         title: (
//                             <Link href={`/cart`}>
//                                 <p className="dark:text-white">Cart</p>
//                             </Link>
//                         ),
//                     },
//                 ]}
//             />

//             {!cartItems.length ? (
//                 <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
//                     <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
//                         Your Cart is Empty
//                     </h1>
//                     <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
//                         Looks like you haven&apos;t added anything yet.
//                     </p>
//                     <Link
//                         href={`/product`}
//                         className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
//                     >
//                         Shop Now
//                     </Link>
//                 </div>
//             ) : (
//                 <>
//                     {/* Table Header */}
//                     <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
//                         <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
//                             <p className="w-[60px] md:w-[60px] text-start dark:text-white">Select</p>
//                             <p className="w-[200px] dark:text-white">Product</p>
//                             <p className="w-[100px] text-left dark:text-white">Price</p>
//                             <p className="w-[100px] text-left dark:text-white">Quantity</p>
//                             <p className="w-[100px] text-left dark:text-white">Subtotal</p>
//                         </div>

//                         {/* Table Body */}
//                         {cartItems.map((item: any) => {
//                             const checked = selectedIds.includes(item.id);
//                             return (
//                                 <div
//                                     key={item.id}
//                                     className={`w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4 ${checked
//                                         ? "bg-gray-100 dark:bg-gray-900"
//                                         : "bg-white dark:bg-transparent"
//                                         }`}
//                                 >
//                                     {/* Checkbox */}
//                                     <div className="w-[100px] md:w-full flex justify-start">
//                                         <Checkbox
//                                             checked={checked}
//                                             onChange={(e) =>
//                                                 handleSelect(item.id, e.target.checked)
//                                             }
//                                         />
//                                     </div>

//                                     {/* Product Info */}
//                                     <div className="flex items-center gap-5 w-[100px] md:w-full">
//                                         <Image
//                                             src={item.product.productImages?.[0] || "/no-image.jpg"}
//                                             alt="product"
//                                             width={60}
//                                             height={60}
//                                             className="rounded-md"
//                                         />
//                                         <h1 className="dark:text-white text-xl">{item.product.productName}</h1>
//                                     </div>

//                                     {/* Price */}
//                                     <div className="w-[100px] md:w-full flex justify-center">
//                                         <p className="dark:text-white">${item.product.price}</p>
//                                     </div>

//                                     {/* Quantity */}
//                                     <div className="w-[100px] md:w-full flex justify-center dark:text-white">
//                                         1
//                                     </div>

//                                     {/* Subtotal + Delete */}
//                                     <div className="flex items-center gap-5 w-[100px] md:w-full justify-end">
//                                         <p className="dark:text-white">${item.product.price}</p>
//                                         <RiDeleteBin6Line
//                                             onClick={() => handleDelete(item.productId)}
//                                             size={25}
//                                             className="cursor-pointer dark:text-white"
//                                         />
//                                     </div>
//                                 </div>
//                             );
//                         })}

//                     </div>

//                     {/* Footer (Total + Checkout) */}
//                     <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
//                         {/* Coupon */}
//                         <div className="flex items-start">
//                             <ConfigProvider
//                                 theme={{
//                                     components: {
//                                         Input: {
//                                             colorBorder: "rgb(67,67,67)",
//                                             activeBorderColor: "rgb(67,67,67)",
//                                             hoverBorderColor: "rgb(67,67,67)",
//                                             colorPrimary: "rgb(67,67,67)",
//                                             controlHeight: 46,
//                                         },
//                                     },
//                                 }}
//                             >
//                                 <Input placeholder="Coupon Code" style={{ width: "300px" }} />
//                             </ConfigProvider>
//                             <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
//                                 Apply Coupon
//                             </button>
//                         </div>

//                         {/* Cart Total */}
//                         <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
//                             <div className="w-full sm:w-[450px]">
//                                 <div className="border border-gray-600 dark:border-white rounded-md p-6">
//                                     <h2 className="text-xl font-medium mb-4 dark:text-white">
//                                         Selected Items Total
//                                     </h2>

//                                     <div className="space-y-4">
//                                         <div className="flex justify-between items-center">
//                                             <span className="text-gray-700 dark:text-white">Items Selected:</span>
//                                             <span className="font-medium dark:text-white">
//                                                 {selectedItems.length}
//                                             </span>
//                                         </div>

//                                         <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
//                                             <span className="text-gray-700 font-medium dark:text-white">
//                                                 Total:
//                                             </span>
//                                             <span className="font-medium dark:text-white">
//                                                 ${total.toFixed(2)}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <div className="mt-6">
//                                         <button
//                                             onClick={handleCheckout}
//                                             className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded"
//                                         >
//                                             Proceed with Selected
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Cart;



"use client";

import { Breadcrumb, Checkbox, ConfigProvider, Input, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";
import { useCreateCheckoutMutation } from "@/redux/features/checkout/checkoutApi"; // ✅ make sure this exists

const Cart = () => {
    const router = useRouter();
    const { data, isLoading } = useGetCartQuery();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteCartItem] = useDeleteCartItemMutation();
    const [createCheckout] = useCreateCheckoutMutation(); // ✅ checkout mutation

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
            </div>
        );
    }

    const cartItems = data?.data || [];

    // ✅ Checkbox handler
    const handleSelect = (id: string, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        );
    };

    // ✅ Selected items
    const selectedItems = cartItems.filter((item) => selectedIds.includes(item.id));

    // ✅ Calculate total
    const total = selectedItems.reduce((sum, item) => sum + item.product.price, 0);

    // ✅ Checkout handler
    // ✅ Checkout handler (send data only, no redirection)
    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            message.warning("Please select at least one product to checkout!");
            return;
        }

        const checkoutPayload = {
            productIds: selectedItems.map((item) => item.productId),
        };

        console.log("🚀 Sending checkout payload:", checkoutPayload);

        try {
            const response = await createCheckout(checkoutPayload).unwrap();

            // ✅ Log response from backend
            console.log("✅ Checkout response:", response);

            message.success("Checkout request sent successfully!");
        } catch (err: any) {
            console.error("❌ Checkout error:", err);
            message.error(err?.data?.message || "Checkout failed");
        }
    };



    // ✅ Delete handler
    const handleDelete = async (cartItemId: string) => {
        console.log("Deleting cart item ID:", cartItemId);
        try {
            await deleteCartItem(cartItemId).unwrap();
            message.success("Item deleted from cart");
        } catch (err: any) {
            message.error(err?.data?.message || "Failed to delete cart item");
        }
    };

    return (
        <div className="container mx-auto py-16 px-3 md:px-0">
            <Breadcrumb
                items={[
                    {
                        title: (
                            <Link href={`/`}>
                                <p className="dark:text-white">Home</p>
                            </Link>
                        ),
                    },
                    {
                        title: (
                            <Link href={`/cart`}>
                                <p className="dark:text-white">Cart</p>
                            </Link>
                        ),
                    },
                ]}
            />

            {!cartItems.length ? (
                <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Looks like you haven&apos;t added anything yet.
                    </p>
                    <Link
                        href={`/product`}
                        className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <>
                    {/* Table Header */}
                    <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
                        <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center">
                            <p className="w-[60px] text-start dark:text-white">Select</p>
                            <p className="w-[200px] dark:text-white">Product</p>
                            <p className="w-[100px] text-left dark:text-white">Price</p>
                            <p className="w-[100px] text-left dark:text-white">Quantity</p>
                            <p className="w-[100px] text-left dark:text-white">Subtotal</p>
                        </div>

                        {/* Table Body */}
                        {cartItems.map((item: any) => {
                            const checked = selectedIds.includes(item.id);
                            return (
                                <div
                                    key={item.id}
                                    className={`w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4 ${checked
                                        ? "bg-gray-100 dark:bg-gray-900"
                                        : "bg-white dark:bg-transparent"
                                        }`}
                                >
                                    {/* Checkbox */}
                                    <div className="w-[100px] flex justify-start">
                                        <Checkbox
                                            checked={checked}
                                            onChange={(e) =>
                                                handleSelect(item.id, e.target.checked)
                                            }
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex items-center gap-5 w-[100px] md:w-full">
                                        <Image
                                            src={item.product.productImages?.[0] || "/no-image.jpg"}
                                            alt="product"
                                            width={60}
                                            height={60}
                                            className="rounded-md"
                                        />
                                        <h1 className="dark:text-white text-xl">
                                            {item.product.productName}
                                        </h1>
                                    </div>

                                    {/* Price */}
                                    <div className="w-[100px] flex justify-center">
                                        <p className="dark:text-white">${item.product.price}</p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="w-[100px] flex justify-center dark:text-white">
                                        1
                                    </div>

                                    {/* Subtotal + Delete */}
                                    <div className="flex items-center gap-5 w-[100px] justify-end">
                                        <p className="dark:text-white">${item.product.price}</p>
                                        <RiDeleteBin6Line
                                            onClick={() => handleDelete(item.productId)}
                                            size={25}
                                            className="cursor-pointer dark:text-white"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer (Total + Checkout) */}
                    <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
                        <div className="flex items-start">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Input: {
                                            colorBorder: "rgb(67,67,67)",
                                            activeBorderColor: "rgb(67,67,67)",
                                            hoverBorderColor: "rgb(67,67,67)",
                                            colorPrimary: "rgb(67,67,67)",
                                            controlHeight: 46,
                                        },
                                    },
                                }}
                            >
                                <Input placeholder="Coupon Code" style={{ width: "300px" }} />
                            </ConfigProvider>
                            <button className="bg-primary w-48 py-3 rounded text-white cursor-pointer ml-3">
                                Apply Coupon
                            </button>
                        </div>

                        {/* Total Section */}
                        <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
                            <div className="w-full sm:w-[450px]">
                                <div className="border border-gray-600 dark:border-white rounded-md p-6">
                                    <h2 className="text-xl font-medium mb-4 dark:text-white">
                                        Selected Items Total
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 dark:text-white">
                                                Items Selected:
                                            </span>
                                            <span className="font-medium dark:text-white">
                                                {selectedItems.length}
                                            </span>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                            <span className="text-gray-700 font-medium dark:text-white">
                                                Total:
                                            </span>
                                            <span className="font-medium dark:text-white">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full cursor-pointer bg-primary text-white font-medium py-2.5 rounded"
                                        >
                                            Proceed with Selected
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
