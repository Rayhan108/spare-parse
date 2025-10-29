
// "use client";

// import { Breadcrumb, Checkbox, ConfigProvider, message, notification } from "antd";
// import Link from "next/link";
// import Image from "next/image";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { useState } from "react";
// import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";
// import { useCreateCheckoutMutation } from "@/redux/features/checkout/checkoutApi";
// import type { CartItem as ApiCartItem } from "@/redux/features/cart/cartApi";
// import { useRouter } from "next/navigation";
// // ✅ Extend API CartItem type to include quantity for safety
// interface CartItem extends ApiCartItem {
//     quantity: number; // required in component
// }

// const Cart = () => {
//     const { data, isLoading } = useGetCartQuery();
//     const [selectedIds, setSelectedIds] = useState<string[]>([]);
//     const [deleteCartItem] = useDeleteCartItemMutation();
//     const [createCheckout] = useCreateCheckoutMutation();
//     const [api, contextHolder] = notification.useNotification();
//     const router = useRouter();

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-[50vh]">
//                 <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
//             </div>
//         );
//     }

//     // ✅ Map API data to include quantity if missing
//     const cartItems: CartItem[] = (data?.data || []).map((item) => ({
//         ...item,
//         quantity: item.quantity ?? 1,
//     }));

//     const handleSelect = (id: string, checked: boolean) => {
//         setSelectedIds((prev) =>
//             checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
//         );
//     };

//     const selectedItems = cartItems.filter((item) => selectedIds.includes(item.id));
//     //   const total = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

//     const handleCheckout = async () => {
//         if (selectedItems.length === 0) {
//             if (selectedItems.length === 0) {
//                 api.open({
//                     type: "warning",
//                     message: "No product is selected",
//                     description: "Please select at least one product to checkout!",
//                     placement: "topRight",
//                 });
//                 return;
//             }
//         }

//         const checkoutPayload = {
//             productIds: selectedItems.map((item) => item.productId),
//         };

//         try {
//             const response = await createCheckout(checkoutPayload).unwrap();
//             console.log("✅ Checkout response:", response);
//             message.success("Checkout request sent successfully!");
//             router.push("/checkout");
//         }

//         catch (err: unknown) {
//             console.error("❌ Checkout error:", err);
//             if (err && typeof err === "object" && "data" in err) {
//                 const errorData = err as { data?: { message?: string } };
//                 message.error(errorData?.data?.message || "Checkout failed");
//             } else if (err instanceof Error) {
//                 message.error(err.message);
//             } else {
//                 message.error("Checkout failed");
//             }
//         }
//     };

//     const handleDelete = async (cartItemId: string) => {
//         try {
//             await deleteCartItem(cartItemId).unwrap();
//             api.open({
//                 type: "success",
//                 message: "Cart",
//                 description: `product has been removed from your cart`,
//                 placement: "topRight",
//             });
//         } catch (err: unknown) {
//             console.error("❌ Delete error:", err);
//             const errorMessage =
//                 (err as { data?: { message?: string } })?.data?.message || "Failed to delete cart item";
//             api.open({
//                 type: "error",
//                 message: "Cart Error",
//                 description: errorMessage,
//                 placement: "topRight",
//             });
//         }
//     };

//     return (
//         <div className="container mx-auto py-16 px-3 md:px-0">
//             <Breadcrumb
//                 items={[
//                     { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
//                     { title: <Link href="/cart"><p className="dark:text-white">Cart</p></Link> },
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
//                         href="/product"
//                         className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
//                     >
//                         Shop Now
//                     </Link>
//                 </div>
//             ) : (
//                 <>


//                     {/* Table Header */}
//                     <div className="mt-8 overflow-x-auto">
//                         <div className="w-full shadow px-4 py-3 rounded flex items-center bg-gray-100 dark:bg-gray-800">
//                             <div className="w-16 text-center dark:text-white">Select</div>
//                             <div className="flex-1 text-left dark:text-white">Product</div>
//                             <div className="w-24 text-center dark:text-white">Price</div>
//                             <div className="w-24 text-center dark:text-white">Quantity</div>
//                             <div className="w-28 text-center dark:text-white">Subtotal</div>
//                             <div className="w-16"></div> {/* For delete icon */}
//                         </div>

//                         {/* Table Body */}
//                         {cartItems.map((item: CartItem) => {
//                             const checked = selectedIds.includes(item.id);
//                             return (
//                                 <div
//                                     key={item.id}
//                                     className={`w-full shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-4 py-3 rounded flex items-center mt-2 ${checked ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-transparent"
//                                         }`}
//                                 >
//                                     <div className="w-16 text-center">
//                                         <ConfigProvider
//                                             theme={{
//                                                 token: {
//                                                     colorPrimary: "#ec5f00", // your primary color
//                                                 },
//                                                 components: {
//                                                     Checkbox: {
//                                                         colorPrimary: "#ec5f00", // primary color for checked state
//                                                     },
//                                                 },
//                                             }}
//                                         >
//                                             <Checkbox
//                                                 checked={checked}
//                                                 onChange={(e) => handleSelect(item.id, e.target.checked)}
//                                             />
//                                         </ConfigProvider>
//                                     </div>
//                                     <div className="flex-1 flex items-center gap-4">
//                                         <Image
//                                             src={item.product.productImages?.[0] || "/no-image.jpg"}
//                                             alt={item.product.productName}
//                                             width={60}
//                                             height={60}
//                                             className="rounded-md"
//                                         />
//                                         <span className="dark:text-white">{item.product.productName}</span>
//                                     </div>
//                                     <div className="w-24 text-center dark:text-white">${item.product.price}</div>
//                                     <div className="w-24 text-center dark:text-white">{item.quantity}</div>
//                                     <div className="w-28 text-center dark:text-white">
//                                         ${(item.product.price * item.quantity).toFixed(2)}
//                                     </div>
//                                     <div className="w-16 text-center">
//                                         {contextHolder}
//                                         <RiDeleteBin6Line
//                                             onClick={() => handleDelete(item.productId)}
//                                             size={22}
//                                             className="cursor-pointer dark:text-white"
//                                         />
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* Footer */}
//                     <div className="mt-6 flex justify-end">
//                         <button
//                             onClick={handleCheckout}
//                             className="w-48 bg-primary text-white py-3 rounded font-medium"
//                         >
//                             Proceed with Selected
//                         </button>
//                     </div>

//                 </>
//             )}
//         </div>
//     );
// };

// export default Cart;



"use client";

import { Breadcrumb, Checkbox, ConfigProvider, message, notification } from "antd";
import Link from "next/link";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useDeleteCartItemMutation, useGetCartQuery } from "@/redux/features/cart/cartApi";
import { useCreateCheckoutMutation } from "@/redux/features/checkout/checkoutApi";
import type { CartItem as ApiCartItem } from "@/redux/features/cart/cartApi";
import { useRouter } from "next/navigation";

// ✅ Extend API CartItem type to include quantity for safety
interface CartItem extends ApiCartItem {
    quantity: number;
}

// ✅ Backend error type
interface ApiError {
    data?: { message?: string };
    message?: string;
}

const Cart = () => {
    const { data, isLoading } = useGetCartQuery();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteCartItem] = useDeleteCartItemMutation();
    const [createCheckout] = useCreateCheckoutMutation();
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-gray-600 dark:text-gray-200">Loading cart...</p>
            </div>
        );
    }

    const cartItems: CartItem[] = (data?.data || []).map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
    }));

    const handleSelect = (id: string, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        );
    };

    const selectedItems = cartItems.filter((item) => selectedIds.includes(item.id));

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            api.open({
                type: "warning",
                message: "No product is selected",
                description: "Please select at least one product to checkout!",
                placement: "topRight",
            });
            return;
        }

        setIsProcessing(true);

        const checkoutPayload = {
            productIds: selectedItems.map((item) => item.productId),
        };

        try {
            const response = await createCheckout(checkoutPayload).unwrap();
            console.log("✅ Checkout response:", response);
            message.success("Checkout request sent successfully!");
            router.push("/checkout");
        } catch (err: unknown) {
            console.error("❌ Checkout error:", err);

            let errorMessage = "Checkout failed";
            const apiError = err as ApiError;

            if (apiError.data?.message) {
                errorMessage = apiError.data.message;
            } else if (apiError.message) {
                errorMessage = apiError.message;
            }

            api.open({
                type: "error",
                message: "Checkout Error",
                description: errorMessage,
                placement: "topRight",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (cartItemId: string) => {
        try {
            await deleteCartItem(cartItemId).unwrap();
            api.open({
                type: "success",
                message: "Cart",
                description: `Product has been removed from your cart`,
                placement: "topRight",
            });
        } catch (err: unknown) {
            console.error("❌ Delete error:", err);

            let errorMessage = "Failed to delete cart item";
            const apiError = err as ApiError;

            if (apiError.data?.message) {
                errorMessage = apiError.data.message;
            } else if (apiError.message) {
                errorMessage = apiError.message;
            }

            api.open({
                type: "error",
                message: "Cart Error",
                description: errorMessage,
                placement: "topRight",
            });
        }
    };

    return (
        <div className="container mx-auto py-16 px-3 md:px-0">
            <Breadcrumb
                items={[
                    { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
                    { title: <Link href="/cart"><p className="dark:text-white">Cart</p></Link> },
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
                        href="/product"
                        className="px-5 md:px-6 py-2 md:py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-[#ec5f00] transition-all duration-200"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <>
                    {/* Table Header */}
                    <div className="mt-8 overflow-x-auto">
                        <div className="w-full shadow px-4 py-3 rounded flex items-center bg-gray-100 dark:bg-gray-800">
                            <div className="w-16 text-center dark:text-white">Select</div>
                            <div className="flex-1 text-left dark:text-white">Product</div>
                            <div className="w-24 text-center dark:text-white">Price</div>
                            <div className="w-24 text-center dark:text-white">Quantity</div>
                            <div className="w-28 text-center dark:text-white">Subtotal</div>
                            <div className="w-16"></div>
                        </div>

                        {/* Table Body */}
                        {cartItems.map((item: CartItem) => {
                            const checked = selectedIds.includes(item.id);
                            return (
                                <div
                                    key={item.id}
                                    className={`w-full shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-4 py-3 rounded flex items-center mt-2 ${checked ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-transparent"
                                        }`}
                                >
                                    <div className="w-16 text-center">
                                        <ConfigProvider
                                            theme={{
                                                token: { colorPrimary: "#ec5f00" },
                                                components: { Checkbox: { colorPrimary: "#ec5f00" } },
                                            }}
                                        >
                                            <Checkbox
                                                checked={checked}
                                                onChange={(e) => handleSelect(item.id, e.target.checked)}
                                            />
                                        </ConfigProvider>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <Image
                                            src={item.product.productImages?.[0] || "/no-image.jpg"}
                                            alt={item.product.productName}
                                            width={60}
                                            height={60}
                                            className="rounded-md"
                                        />
                                        <span className="dark:text-white">{item.product.productName}</span>
                                    </div>
                                    <div className="w-24 text-center dark:text-white">${item.product.price}</div>
                                    <div className="w-24 text-center dark:text-white">{item.quantity}</div>
                                    <div className="w-28 text-center dark:text-white">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="w-16 text-center">
                                        {contextHolder}
                                        <RiDeleteBin6Line
                                            onClick={() => handleDelete(item.productId)}
                                            size={22}
                                            className="cursor-pointer dark:text-white"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`w-48 py-3 rounded font-medium text-white ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
                        >
                            {isProcessing ? "Processing..." : "Proceed with Selected"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
