"use client";

import { useState, useEffect } from "react";
import { Breadcrumb, Checkbox, ConfigProvider, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetCheckoutQuery, CheckoutData, CheckoutItem } from "@/redux/features/checkout/checkoutApi";
import {
  useCreatePaymentSessionMutation,
  usePurchaseWithCODMutation
} from "@/redux/features/payment/paymentApi";
import {
  useAddAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
  Address
} from "@/redux/features/address/addressApi";

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

  const router = useRouter();
  const { data, isLoading, isError } = useGetCheckoutQuery();
  const [createPaymentSession, { data: sessionData, isLoading: paymentLoading }] = useCreatePaymentSessionMutation();
  const [placeOrder, { isLoading: orderLoading }] = usePurchaseWithCODMutation();
  const { data: addressesData } = useGetAddressesQuery();
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const checkouts: CheckoutData[] = Array.isArray(data?.data)
    ? data.data
    : data?.data
      ? [data.data]
      : [];
console.log("checkouts------->",checkouts);

  useEffect(() => {
    if (addressesData?.data?.length) {
      const billing = addressesData.data.find(addr => addr.type === "BILLING");
      if (billing) setBillingAddress(billing);
    }
  }, [addressesData]);

  useEffect(() => {
    if (sessionData?.data?.redirectUrl) {
      window.location.href = sessionData.data.redirectUrl;
    }
  }, [sessionData]);


  const handleBillingAddressSave = async (values: FieldType) => {
    if (!values.save) return;
    const billingData = {
      addressLine: values.street!,
      city: values.city!,
      state: "",
      postalCode: "",
      country: "",
      type: "BILLING", 
    } as const; 


    try {
      if (billingAddress) {
        const res = await updateAddress({ id: billingAddress.id, data: billingData }).unwrap();
        console.log("Update Address Response:", res);
        message.success("Billing address updated successfully!");
      } else {
        const res = await addAddress(billingData).unwrap();
        console.log("Add Address Response:", res);
        message.success("Billing address saved successfully!");
      }
    } catch (err) {
      console.error("Billing Address Error:", err);
      message.error("Failed to save billing address.");
    }
  };


  const onFinish = async (values: FieldType) => {
    console.log("Form Values Submitted:", values);

    const { name, street, apartment, city, phone, email, save } = values;


    if (!name || !street || !city || !phone || !email) {
      return message.error("Please fill in all required fields.");
    }

 
    const paymentInput = document.querySelector(
      'input[name="payment"]:checked'
    ) as HTMLInputElement;
    const paymentMethod = paymentInput?.value || "cash";
    console.log("Selected Payment Method:", paymentMethod);

    const checkoutId = checkouts[0]?.id;
    if (!checkoutId) {
      message.error("Checkout ID not found. Please refresh and try again.");
      return;
    }


    const productIds: string[] = checkouts.flatMap((checkout) =>
      checkout.items.map((item: CheckoutItem) => item.product.id)
    );

    const orderData = {
      checkoutId,
      productIds,
      name,
      street,
      apartment,
      city,
      phone,
      email,
      saveForNextTime: save,
    };

    console.log("Order Data to send:", orderData, "Checkout ID:", checkoutId);

    try {
      setLoading(true);

      await handleBillingAddressSave(values);

      if (paymentMethod === "online") {

        const sessionRes = await createPaymentSession({ checkoutId }).unwrap();
        console.log("Stripe Session Response:", sessionRes);

        if (sessionRes?.data?.redirectUrl) {
          await placeOrder(orderData).unwrap();
          console.log("Order placed successfully before redirect to Stripe.");
          window.location.href = sessionRes.data.redirectUrl;
        } else {
          message.error("Failed to create payment session.");
        }
      } else {
        const codRes = await placeOrder(orderData).unwrap();
        console.log("Cash on Delivery Order Response:", codRes);
        message.success("Order placed successfully with Cash on Delivery!");
        router.push("/order-success");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
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
            <Form
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{
                name: "",
                street: billingAddress?.addressLine || "",
                apartment: "",
                city: billingAddress?.city || "",
                phone: "",
                email: "",
                save: true,
              }}
            >
  <Form.Item<FieldType>
  label={<span className="dark:text-white">Name</span>}
  name="name"
  rules={[{ required: true, message: "Please input your name!" }]}
>
  <Input />
</Form.Item>

              <Form.Item<FieldType>
               label={<span className="dark:text-white">Street Address</span>}
                name="street"
                className="dark:text-white"
                rules={[{ required: true, message: "Please input your street address!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>  label={<span className="dark:text-white">Apartment, floor, etc.</span>} name="apartment">
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
              
                  label={<span className="dark:text-white">Town/City</span>}
                name="city"
                className="dark:text-white"
                rules={[{ required: true, message: "Please input your town/city!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="dark:text-white">Phone Number</span>}
                name="phone"
                className="dark:text-white"
                rules={[{ required: true, message: "Please input your number!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="dark:text-white">Email Address</span>}
                name="email"
                className="dark:text-white"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType> name="save" valuePropName="checked" >
                <Checkbox > <span className="dark:text-white">
      Save this information for faster check-out next time
    </span></Checkbox>
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
              {checkout?.items?.map((item: CheckoutItem) => (
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
                  <span className="font-medium dark:text-white">${checkout?.shippingCost||"Free"}</span>
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
