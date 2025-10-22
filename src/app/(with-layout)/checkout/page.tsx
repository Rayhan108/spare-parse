"use client";

import { Breadcrumb, Checkbox, ConfigProvider, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useGetCheckoutQuery, CheckoutData, CheckoutItem } from "@/redux/features/checkout/checkoutApi";

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

  // ✅ Use the imported CheckoutData type
const checkouts: CheckoutData[] = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];


  const onFinish = (values: FieldType) => {
    message.success("Billing info submitted!");
    console.log("Billing Info:", values);
  };

  if (isLoading) return <p className="text-center py-16">Loading checkout data...</p>;
  if (isError) return <p className="text-center py-16 text-red-500">Failed to load checkout data</p>;
  if (checkouts.length === 0) return <p className="text-center py-16 text-gray-500 dark:text-gray-300">No checkouts found</p>;

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
              <Form.Item<FieldType> label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}><Input /></Form.Item>
              <Form.Item<FieldType> label="Street Address" name="street" rules={[{ required: true, message: "Please input your street address!" }]}><Input /></Form.Item>
              <Form.Item<FieldType> label="Apartment, floor, etc." name="apartment"><Input /></Form.Item>
              <Form.Item<FieldType> label="Town/City" name="city" rules={[{ required: true, message: "Please input your town/city!" }]}><Input /></Form.Item>
              <Form.Item<FieldType> label="Phone Number" name="phone" rules={[{ required: true, message: "Please input your number!" }]}><Input /></Form.Item>
              <Form.Item<FieldType> label="Email Address" name="email" rules={[{ required: true, message: "Please input your email!" }]}><Input /></Form.Item>
              <Form.Item<FieldType> name="save" valuePropName="checked"><Checkbox>Save this information for faster check-out next time</Checkbox></Form.Item>
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
                    <span className="font-medium dark:text-white">{item.product.productName}</span>
                  </div>
                  <span className="font-medium dark:text-white">${item.product.price} × {item.quantity}</span>
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
                  <input type="radio" name={`payment-${checkout.id}`} id={`online-${checkout.id}`} value="online" className="w-4 h-4 accent-black dark:accent-white" />
                  <label htmlFor={`online-${checkout.id}`} className="dark:text-white cursor-pointer">Online Payment</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name={`payment-${checkout.id}`} id={`cash-${checkout.id}`} value="cash" defaultChecked className="w-4 h-4 accent-black dark:accent-white" />
                  <label htmlFor={`cash-${checkout.id}`} className="dark:text-white cursor-pointer">Cash on delivery</label>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded font-medium mt-2">Place Order</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
