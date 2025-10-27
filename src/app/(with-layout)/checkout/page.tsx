// // "use client";

// // import { Breadcrumb, Checkbox, ConfigProvider, Form, Input, message } from "antd";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useGetCheckoutQuery, CheckoutData, CheckoutItem } from "@/redux/features/checkout/checkoutApi";

// // type FieldType = {
// //   name?: string;
// //   street?: string;
// //   apartment?: string;
// //   city?: string;
// //   phone?: string;
// //   email?: string;
// //   save?: boolean;
// // };

// // const CheckoutPage = () => {
// //   const { data, isLoading, isError } = useGetCheckoutQuery();

// //   // ✅ Use the imported CheckoutData type
// // const checkouts: CheckoutData[] = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];


// //   const onFinish = (values: FieldType) => {
// //     message.success("Billing info submitted!");
// //     console.log("Billing Info:", values);
// //   };

// //   if (isLoading) return <p className="text-center py-16">Loading checkout data...</p>;
// //   if (isError) return <p className="text-center py-16 text-red-500">Failed to load checkout data</p>;
// //   if (checkouts.length === 0) return <p className="text-center py-16 text-gray-500 dark:text-gray-300">No checkouts found</p>;

// //   return (
// //     <div className="container mx-auto px-3 md:px-0 py-16">
// //       <Breadcrumb
// //         items={[
// //           { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
// //           { title: <Link href="/cart"><p className="dark:text-white">Cart</p></Link> },
// //           { title: <p className="dark:text-white">Checkout</p> },
// //         ]}
// //       />

// //       <div className="flex flex-col lg:flex-row items-start justify-between gap-20 mt-8">
// //         {/* Billing Form */}
// //         <div className="w-full sm:w-[450px]">
// //           <h1 className="text-3xl md:text-4xl font-semibold mb-5 dark:text-white">Billing Details</h1>
// //           <ConfigProvider
// //             theme={{
// //               components: {
// //                 Input: { controlHeight: 40, borderRadius: 2, colorBgContainer: "rgb(245,245,245)" },
// //                 Checkbox: { colorPrimary: "rgb(223,88,0)" },
// //               },
// //             }}
// //           >
// //             <Form layout="vertical" onFinish={onFinish} autoComplete="off">
// //               <Form.Item<FieldType> label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}><Input /></Form.Item>
// //               <Form.Item<FieldType> label="Street Address" name="street" rules={[{ required: true, message: "Please input your street address!" }]}><Input /></Form.Item>
// //               <Form.Item<FieldType> label="Apartment, floor, etc." name="apartment"><Input /></Form.Item>
// //               <Form.Item<FieldType> label="Town/City" name="city" rules={[{ required: true, message: "Please input your town/city!" }]}><Input /></Form.Item>
// //               <Form.Item<FieldType> label="Phone Number" name="phone" rules={[{ required: true, message: "Please input your number!" }]}><Input /></Form.Item>
// //               <Form.Item<FieldType> label="Email Address" name="email" rules={[{ required: true, message: "Please input your email!" }]}><Input /></Form.Item>
// //               <Form.Item<FieldType> name="save" valuePropName="checked"><Checkbox>Save this information for faster check-out next time</Checkbox></Form.Item>
// //             </Form>
// //           </ConfigProvider>
// //         </div>

// //         {/* Order Summary */}
// //         <div className="w-full sm:w-[440px] p-6 space-y-6">
// //           {checkouts.map((checkout) => (
// //             <div key={checkout.id} className="border p-4 rounded-lg dark:border-gray-600 space-y-4">
// //               {checkout.items.map((item: CheckoutItem) => (
// //                 <div key={item.id} className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <Image
// //                       src={item.product.productImages[0]}
// //                       alt={item.product.productName}
// //                       width={48}
// //                       height={48}
// //                       className="object-contain"
// //                     />
// //                     <span className="font-medium dark:text-white">{item.product.productName}</span>
// //                   </div>
// //                   <span className="font-medium dark:text-white">${item.product.price} × {item.quantity}</span>
// //                 </div>
// //               ))}

// //               {/* Summary */}
// //               <div className="border-t pt-3 space-y-2">
// //                 <div className="flex justify-between">
// //                   <span className="font-medium dark:text-white">Subtotal:</span>
// //                   <span className="font-medium dark:text-white">${checkout.totalAmount}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="font-medium dark:text-white">Shipping:</span>
// //                   <span className="font-medium dark:text-white">Free</span>
// //                 </div>
// //                 <div className="flex justify-between border-t pt-2">
// //                   <span className="font-medium dark:text-white">Total:</span>
// //                   <span className="font-medium dark:text-white">${checkout.totalAmount}</span>
// //                 </div>
// //               </div>

// //               {/* Payment */}
// //               <div className="space-y-2 mt-2">
// //                 <div className="flex items-center space-x-2">
// //                   <input type="radio" name={`payment-${checkout.id}`} id={`online-${checkout.id}`} value="online" className="w-4 h-4 accent-black dark:accent-white" />
// //                   <label htmlFor={`online-${checkout.id}`} className="dark:text-white cursor-pointer">Online Payment</label>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <input type="radio" name={`payment-${checkout.id}`} id={`cash-${checkout.id}`} value="cash" defaultChecked className="w-4 h-4 accent-black dark:accent-white" />
// //                   <label htmlFor={`cash-${checkout.id}`} className="dark:text-white cursor-pointer">Cash on delivery</label>
// //                 </div>
// //               </div>

// //               <button className="w-full bg-primary text-white py-3 rounded font-medium mt-2">Place Order</button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutPage;





// "use client";

// import { useState, useEffect } from "react";
// import { Breadcrumb, Checkbox, ConfigProvider, Form, Input, message } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { useGetCheckoutQuery, CheckoutData, CheckoutItem } from "@/redux/features/checkout/checkoutApi";
// import { useCreatePaymentSessionMutation, usePlaceOrderMutation } from "@/redux/features/payment/paymentApi";

// type FieldType = {
//   name?: string;
//   street?: string;
//   apartment?: string;
//   city?: string;
//   phone?: string;
//   email?: string;
//   save?: boolean;
// };

// const CheckoutPage = () => {
//   const { data, isLoading, isError } = useGetCheckoutQuery();
//   const [createPaymentSession, { data: sessionData, isLoading: paymentLoading, error: paymentError }] = useCreatePaymentSessionMutation();
//   const [placeOrder, { isLoading: orderLoading, error: orderError }] = usePlaceOrderMutation();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const checkouts: CheckoutData[] = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];

//   // Redirect to Stripe Checkout page after creating payment session
//   useEffect(() => {
//     if (sessionData?.data?.redirectUrl) {
//       window.location.href = sessionData.data.redirectUrl;
//     }
//   }, [sessionData]);

//   const onFinish = async (values: FieldType) => {
//     // 1. Log the values to see if the form data is being captured correctly
//     console.log("Form Values:", values);

//     const { name, street, apartment, city, phone, email, save } = values;

//     // 2. Check if all required fields are filled out
//     if (!name || !street || !city || !phone || !email) {
//       return message.error("Please fill in all required fields.");
//     }

//     // 3. Check which payment method is selected
//     const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
//     console.log("Selected Payment Method:", paymentMethod); // Log selected payment method

//     // 4. Prepare the order data (cartItems, totalAmount, etc.)
//     const cartItems = checkouts.flatMap((checkout) =>
//       checkout.items.map((item: CheckoutItem) => ({
//         productId: item.product.id,
//         quantity: item.quantity,
//         price: item.product.price,
//       }))
//     );

//     const totalAmount = checkouts.reduce((sum, checkout) => sum + checkout.totalAmount, 0);

//     const orderData = {
//       name,
//       street,
//       apartment,
//       city,
//       phone,
//       email,
//       paymentMethod,
//       cartItems,
//       totalAmount,
//       saveForNextTime: save,
//     };

//     console.log("Order Data:", orderData); // Log the order data before submitting

//     if (paymentMethod === "online") {
//       // 5. Log when the order submission starts
//       console.log("Submitting order...");

//       setLoading(true);

//       try {
//         // Call the placeOrder API to create the order
//         const result = await placeOrder(orderData).unwrap();
//         console.log("Order created successfully:", result); // Log success response

//         // If order is created, proceed with payment session creation
//         const paymentData = { amount: totalAmount, currency: "usd" };
//         const sessionResponse = await createPaymentSession(paymentData).unwrap();
//         console.log("Payment session created:", sessionResponse); // Log the payment session response

//         // Redirect to Stripe Checkout page
//         if (sessionResponse?.data?.redirectUrl) {
//           window.location.href = sessionResponse.data.redirectUrl;
//         }
//       } catch (error) {
//         console.error("Error placing order or creating payment session:", error);
//         message.error("Failed to place the order or create the payment session.");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       // Handle Cash on Delivery
//       message.success("Order placed with cash on delivery.");
//     }
//   };


//   if (isLoading) return <p className="text-center py-16">Loading checkout data...</p>;
//   if (isError) return <p className="text-center py-16 text-red-500">Failed to load checkout data</p>;
//   if (checkouts.length === 0) return <p className="text-center py-16 text-gray-500 dark:text-gray-300">No checkouts found</p>;

//   return (
//     <div className="container mx-auto px-3 md:px-0 py-16">
//       <Breadcrumb
//         items={[
//           { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
//           { title: <Link href="/cart"><p className="dark:text-white">Cart</p></Link> },
//           { title: <p className="dark:text-white">Checkout</p> },
//         ]}
//       />

//       <div className="flex flex-col lg:flex-row items-start justify-between gap-20 mt-8">
//         {/* Billing Form */}
//         <div className="w-full sm:w-[450px]">
//           <h1 className="text-3xl md:text-4xl font-semibold mb-5 dark:text-white">Billing Details</h1>
//           <ConfigProvider
//             theme={{
//               components: {
//                 Input: { controlHeight: 40, borderRadius: 2, colorBgContainer: "rgb(245,245,245)" },
//                 Checkbox: { colorPrimary: "rgb(223,88,0)" },
//               },
//             }}
//           >
//             <Form layout="vertical" onFinish={onFinish} autoComplete="off">
//               <Form.Item<FieldType> label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}><Input /></Form.Item>
//               <Form.Item<FieldType> label="Street Address" name="street" rules={[{ required: true, message: "Please input your street address!" }]}><Input /></Form.Item>
//               <Form.Item<FieldType> label="Apartment, floor, etc." name="apartment"><Input /></Form.Item>
//               <Form.Item<FieldType> label="Town/City" name="city" rules={[{ required: true, message: "Please input your town/city!" }]}><Input /></Form.Item>
//               <Form.Item<FieldType> label="Phone Number" name="phone" rules={[{ required: true, message: "Please input your number!" }]}><Input /></Form.Item>
//               <Form.Item<FieldType> label="Email Address" name="email" rules={[{ required: true, message: "Please input your email!" }]}><Input /></Form.Item>
//               <Form.Item<FieldType> name="save" valuePropName="checked"><Checkbox>Save this information for faster check-out next time</Checkbox></Form.Item>
//             </Form>
//           </ConfigProvider>
//         </div>

//         {/* Order Summary */}
//         <div className="w-full sm:w-[440px] p-6 space-y-6">
//           {checkouts.map((checkout) => (
//             <div key={checkout.id} className="border p-4 rounded-lg dark:border-gray-600 space-y-4">
//               {checkout.items.map((item: CheckoutItem) => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Image
//                       src={item.product.productImages[0]}
//                       alt={item.product.productName}
//                       width={48}
//                       height={48}
//                       className="object-contain"
//                     />
//                     <span className="font-medium dark:text-white">{item.product.productName}</span>
//                   </div>
//                   <span className="font-medium dark:text-white">${item.product.price} × {item.quantity}</span>
//                 </div>
//               ))}

//               {/* Summary */}
//               <div className="border-t pt-3 space-y-2">
//                 <div className="flex justify-between">
//                   <span className="font-medium dark:text-white">Subtotal:</span>
//                   <span className="font-medium dark:text-white">${checkout.totalAmount}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-medium dark:text-white">Shipping:</span>
//                   <span className="font-medium dark:text-white">Free</span>
//                 </div>
//                 <div className="flex justify-between border-t pt-2">
//                   <span className="font-medium dark:text-white">Total:</span>
//                   <span className="font-medium dark:text-white">${checkout.totalAmount}</span>
//                 </div>
//               </div>

//               {/* Payment */}
//               <div className="space-y-2 mt-2">
//                 <div className="flex items-center space-x-2">
//                   <input type="radio" name={`payment-${checkout.id}`} id={`online-${checkout.id}`} value="online" className="w-4 h-4 accent-black dark:accent-white" />
//                   <label htmlFor={`online-${checkout.id}`} className="dark:text-white cursor-pointer">Online Payment</label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <input type="radio" name={`payment-${checkout.id}`} id={`cash-${checkout.id}`} value="cash" defaultChecked className="w-4 h-4 accent-black dark:accent-white" />
//                   <label htmlFor={`cash-${checkout.id}`} className="dark:text-white cursor-pointer">Cash on delivery</label>
//                 </div>
//               </div>

//               <button className="w-full bg-primary text-white py-3 rounded font-medium mt-2" disabled={loading || paymentLoading}>
//                 {loading || paymentLoading ? "Processing..." : "Place Order"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;




"use client";

import { useState, useEffect } from "react";
import { Breadcrumb, Checkbox, ConfigProvider, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetCheckoutQuery, CheckoutData, CheckoutItem } from "@/redux/features/checkout/checkoutApi";
import { useCreatePaymentSessionMutation, usePlaceOrderMutation } from "@/redux/features/payment/paymentApi";

type FieldType = {
  name?: string;
  street?: string;
  apartment?: string;
  city?: string;
  phone?: string;
  email?: string;
  save?: boolean;
};

const CheckoutPage = () => {
  const { data, isLoading, isError } = useGetCheckoutQuery();
  const [createPaymentSession, { data: sessionData, isLoading: paymentLoading }] =
    useCreatePaymentSessionMutation();
  const [placeOrder, { isLoading: orderLoading }] = usePlaceOrderMutation();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const checkouts: CheckoutData[] = Array.isArray(data?.data)
    ? data.data
    : data?.data
    ? [data.data]
    : [];

  // ✅ Redirect to Stripe Checkout page after payment session is created
  useEffect(() => {
    if (sessionData?.data?.redirectUrl) {
      window.location.href = sessionData.data.redirectUrl;
    }
  }, [sessionData]);

  const onFinish = async (values: FieldType) => {
    console.log("Form Values:", values);

    const { name, street, apartment, city, phone, email, save } = values;
    if (!name || !street || !city || !phone || !email) {
      return message.error("Please fill in all required fields.");
    }

    // ✅ Check which payment method is selected
    const paymentInput = document.querySelector('input[name="payment"]:checked') as HTMLInputElement;
    const paymentMethod = paymentInput?.value || "cash";

    console.log("Selected Payment Method:", paymentMethod);

    const cartItems = checkouts.flatMap((checkout) =>
      checkout.items.map((item: CheckoutItem) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }))
    );

    const totalAmount = checkouts.reduce((sum, checkout) => sum + checkout.totalAmount, 0);
    const checkoutId = checkouts[0]?.id; // ✅ needed for payment session

    if (!checkoutId) {
      message.error("Checkout ID not found. Please refresh and try again.");
      return;
    }

    const orderData = {
      name,
      street,
      apartment,
      city,
      phone,
      email,
      paymentMethod,
      cartItems,
      totalAmount,
      saveForNextTime: save,
    };

    console.log("Order Data:", orderData);

    try {
      setLoading(true);

      if (paymentMethod === "online") {
        // ✅ Step 1: Create Stripe session first
        const sessionRes = await createPaymentSession({ checkoutId }).unwrap();
        console.log("Payment session created:", sessionRes);

        if (sessionRes?.data?.redirectUrl) {
          // ✅ Step 2: Optionally create order (depends on backend logic)
          await placeOrder(orderData).unwrap();
          // ✅ Step 3: Redirect to Stripe checkout
          window.location.href = sessionRes.data.redirectUrl;
        } else {
          message.error("Failed to create payment session.");
        }
      } else {
        // ✅ Cash on Delivery flow
        await placeOrder(orderData).unwrap();
        message.success("Order placed successfully with Cash on Delivery!");
        router.push("/order-success");
      }
    } catch (error) {
      console.error("Error placing order or creating payment session:", error);
      message.error("Failed to process the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p className="text-center py-16">Loading checkout data...</p>;
  if (isError) return <p className="text-center py-16 text-red-500">Failed to load checkout data</p>;
  if (checkouts.length === 0)
    return <p className="text-center py-16 text-gray-500 dark:text-gray-300">No checkouts found</p>;

  return (
    <div className="container mx-auto px-3 md:px-0 py-16">
      <Breadcrumb
        items={[
          { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
          { title: <Link href="/cart"><p className="dark:text-white">Cart</p></Link> },
          { title: <p className="dark:text-white">Checkout</p> },
        ]}
      />

      <div className="flex flex-col lg:flex-row items-start justify-between gap-20 mt-8">
        {/* Billing Form */}
        <div className="w-full sm:w-[450px]">
          <h1 className="text-3xl md:text-4xl font-semibold mb-5 dark:text-white">Billing Details</h1>
          <ConfigProvider
            theme={{
              components: {
                Input: { controlHeight: 40, borderRadius: 2, colorBgContainer: "rgb(245,245,245)" },
                Checkbox: { colorPrimary: "rgb(223,88,0)" },
              },
            }}
          >
            <Form layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Street Address"
                name="street"
                rules={[{ required: true, message: "Please input your street address!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType> label="Apartment, floor, etc." name="apartment">
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Town/City"
                name="city"
                rules={[{ required: true, message: "Please input your town/city!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Please input your number!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Email Address"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType> name="save" valuePropName="checked">
                <Checkbox>Save this information for faster check-out next time</Checkbox>
              </Form.Item>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded font-medium mt-2"
                  disabled={loading || paymentLoading || orderLoading}
                >
                  {loading || paymentLoading || orderLoading ? "Processing..." : "Place Order"}
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>

        {/* Order Summary */}
        <div className="w-full sm:w-[440px] p-6 space-y-6">
          {checkouts.map((checkout) => (
            <div key={checkout.id} className="border p-4 rounded-lg dark:border-gray-600 space-y-4">
              {checkout.items.map((item: CheckoutItem) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.product.productImages[0]}
                      alt={item.product.productName}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                    <span className="font-medium dark:text-white">
                      {item.product.productName}
                    </span>
                  </div>
                  <span className="font-medium dark:text-white">
                    ${item.product.price} × {item.quantity}
                  </span>
                </div>
              ))}

              {/* Summary */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium dark:text-white">Subtotal:</span>
                  <span className="font-medium dark:text-white">${checkout.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium dark:text-white">Shipping:</span>
                  <span className="font-medium dark:text-white">Free</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium dark:text-white">Total:</span>
                  <span className="font-medium dark:text-white">${checkout.totalAmount}</span>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    id="online"
                    value="online"
                    className="w-4 h-4 accent-black dark:accent-white"
                  />
                  <label htmlFor="online" className="dark:text-white cursor-pointer">
                    Online Payment
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    id="cash"
                    value="cash"
                    defaultChecked
                    className="w-4 h-4 accent-black dark:accent-white"
                  />
                  <label htmlFor="cash" className="dark:text-white cursor-pointer">
                    Cash on delivery
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
