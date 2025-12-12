/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  message,
  Select,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetCheckoutQuery,
  CheckoutItem,
} from "@/redux/features/checkout/checkoutApi";
import {
  useCreatePaymentSessionMutation,
  usePurchaseWithCODMutation,
} from "@/redux/features/payment/paymentApi";
import {
  useAddAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
  Address,
} from "@/redux/features/address/addressApi";
import { FiPrinter } from "react-icons/fi";

type FieldType = {
  name?: string;
  street?: string;
  apartment?: string;
  city?: string;
  phone?: string;
  email?: string;
  save?: boolean;
};

interface ShippingOption {
  id: string;
  cost: number;
  countryCode: string;
  countryName: string;
  carrier: string;
  deliveryMin: number;
  deliveryMax: number;
}

// Selected shipping per CHECKOUT (not per item)
interface SelectedShipping {
  [checkoutId: string]: ShippingOption | null;
}

const CheckoutPage = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // State for selected shipping per CHECKOUT
  const [selectedShipping, setSelectedShipping] = useState<SelectedShipping>({});
  const [shippingId, setShippingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetCheckoutQuery();
  const [
    createPaymentSession,
    { data: sessionData, isLoading: paymentLoading },
  ] = useCreatePaymentSessionMutation();
  const [placeOrder, { isLoading: orderLoading }] = usePurchaseWithCODMutation();
  const { data: addressesData } = useGetAddressesQuery();
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  const checkouts = Array.isArray(data?.data)
    ? data.data
    : data?.data
    ? [data.data]
    : [];

  // Get all unique shipping options for a checkout (combining from all items)
  const getShippingOptionsForCheckout = (checkout: any): ShippingOption[] => {
    const allShippings: ShippingOption[] = [];
    const seenIds = new Set<string>();

    checkout.items?.forEach((item: any) => {
      item.product?.shippings?.forEach((shipping: ShippingOption) => {
        if (!seenIds.has(shipping.id)) {
          seenIds.add(shipping.id);
          allShippings.push(shipping);
        }
      });
    });

    return allShippings;
  };

  // Handle shipping change at CHECKOUT level
  const handleShippingChange = (
    checkoutId: string,
    selectedShippingId: string,
    shippingOptions: ShippingOption[]
  ) => {
    const shipping = shippingOptions.find((s) => s.id === selectedShippingId);
    setShippingId(selectedShippingId);
    setSelectedShipping((prev) => ({
      ...prev,
      [checkoutId]: shipping || null,
    }));
  };

  // Calculate shipping cost for checkout
  const calculateShippingCost = (checkoutId: string): number => {
    const shipping = selectedShipping[checkoutId];
    return shipping?.cost || 0;
  };

  // Calculate grand total (subtotal + shipping)
  const calculateGrandTotal = (checkout: any): number => {
    const shippingCost = calculateShippingCost(checkout.id);
    return checkout.totalAmount + shippingCost;
  };

  useEffect(() => {
    if (addressesData?.data?.length) {
      const billing = addressesData.data.find(
        (addr) => addr.type === "BILLING"
      );
      if (billing) setBillingAddress(billing);
    }
  }, [addressesData]);

  useEffect(() => {
    if (sessionData?.data?.redirectUrl) {
      window.location.href = sessionData.data.redirectUrl;
    }
  }, [sessionData]);

  // Initialize with first shipping option when data loads
  useEffect(() => {
    if (checkouts.length > 0) {
      const initialShipping: SelectedShipping = {};
      checkouts.forEach((checkout) => {
        const shippingOptions = getShippingOptionsForCheckout(checkout);
        if (shippingOptions.length > 0) {
          initialShipping[checkout.id] = shippingOptions[0];
          setShippingId(shippingOptions[0].id);
        }
      });
      setSelectedShipping(initialShipping);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        const res = await updateAddress({
          id: billingAddress.id,
          data: billingData,
        }).unwrap();
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

  // Print receipt functionality
  const handlePrint = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const checkout = checkouts[0];
    const shippingCost = calculateShippingCost(checkout?.id);
    const grandTotal = calculateGrandTotal(checkout);
    const selectedShip = selectedShipping[checkout?.id];

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 600px;
              margin: 0 auto;
            }
            .receipt-header {
              text-align: center;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .receipt-item {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .receipt-total {
              font-weight: bold;
              font-size: 18px;
              margin-top: 20px;
              padding-top: 10px;
              border-top: 2px solid #000;
            }
            .shipping-info {
              background: #f5f5f5;
              padding: 10px;
              margin: 10px 0;
              border-radius: 4px;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .item-info {
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .item-image {
              width: 48px;
              height: 48px;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <h2>Order Receipt</h2>
            <p>Order ID: ${checkout?.id}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div>
            ${checkout?.items
              .map(
                (item: CheckoutItem) => `
              <div class="item-row">
                <div class="item-info">
                  <img src="${item.product.productImages[0]}" class="item-image" />
                  <div>
                    <div><strong>${item.product.productName}</strong></div>
                    <div>Qty: ${item.quantity}</div>
                  </div>
                </div>
                <div>$${item.product.price * item.quantity}</div>
              </div>
            `
              )
              .join("")}
          </div>

          ${
            selectedShip
              ? `
            <div class="shipping-info">
              <strong>Shipping:</strong> ${selectedShip.carrier} to ${selectedShip.countryName}<br/>
              <strong>Delivery:</strong> ${selectedShip.deliveryMin}-${selectedShip.deliveryMax} days
            </div>
          `
              : ""
          }

          <div class="receipt-total">
            <div class="receipt-item">
              <span>Subtotal:</span>
              <span>$${checkout?.totalAmount}</span>
            </div>
            <div class="receipt-item">
              <span>Shipping:</span>
              <span>${shippingCost > 0 ? `$${shippingCost}` : "Free"}</span>
            </div>
            <div class="receipt-item" style="font-size: 20px;">
              <span>Total:</span>
              <span>$${grandTotal}</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const onFinish = async (values: FieldType) => {
    console.log("Form Values Submitted:", values);

    const { name, street, apartment, city, phone, email, save } = values;

    if (!name || !street || !city || !phone || !email) {
      return message.error("Please fill in all required fields.");
    }

    // Validate shipping is selected
    const checkoutId = checkouts[0]?.id;
    if (!checkoutId) {
      message.error("Checkout ID not found. Please refresh and try again.");
      return;
    }

    if (!shippingId) {
      return message.error("Please select a shipping option.");
    }

    const paymentInput = document.querySelector(
      'input[name="payment"]:checked'
    ) as HTMLInputElement;
    const paymentMethod = paymentInput?.value || "cash";
    console.log("Selected Payment Method:", paymentMethod);

    const productIds: string[] = checkouts.flatMap((checkout) =>
      checkout.items.map((item: CheckoutItem) => item.product.id)
    );

    const orderData = {
      checkoutId,
      productIds,
      shippingId, // Single shipping ID for the entire checkout
      name,
      street,
      apartment,
      city,
      phone,
      email,
      saveForNextTime: save,
    };

    console.log("Order Data to send:", orderData);

    const paymentData = {
      checkoutId,
      shippingId,
    };

    try {
      setLoading(true);

      await handleBillingAddressSave(values);

      if (paymentMethod === "online") {
        const sessionRes = await createPaymentSession(paymentData).unwrap();
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

  if (isLoading)
    return <p className="text-center py-16">Loading checkout data...</p>;
  if (isError)
    return (
      <p className="text-center py-16 text-red-500">
        Failed to load checkout data
      </p>
    );
  if (checkouts.length === 0)
    return (
      <p className="text-center py-16 text-gray-500 dark:text-gray-300">
        No checkouts found
      </p>
    );

  return (
    <div className="container mx-auto px-3 md:px-0 py-16">
      <Breadcrumb
        items={[
          {
            title: (
              <Link href="/">
                <p className="dark:text-white">Home</p>
              </Link>
            ),
          },
          {
            title: (
              <Link href="/cart">
                <p className="dark:text-white">Cart</p>
              </Link>
            ),
          },
          { title: <p className="dark:text-white">Checkout</p> },
        ]}
      />

      <div className="flex flex-col lg:flex-row items-start justify-between gap-20 mt-8">
        {/* Billing Form */}
        <div className="w-full sm:w-[450px]">
          <h1 className="text-3xl md:text-4xl font-semibold mb-5 dark:text-white">
            Billing Details
          </h1>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  controlHeight: 40,
                  borderRadius: 2,
                  colorBgContainer: "rgb(245,245,245)",
                },
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
                rules={[
                  {
                    required: true,
                    message: "Please input your street address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={
                  <span className="dark:text-white">
                    Apartment, floor, etc.
                  </span>
                }
                name="apartment"
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="dark:text-white">Town/City</span>}
                name="city"
                rules={[
                  { required: true, message: "Please input your town/city!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="dark:text-white">Phone Number</span>}
                name="phone"
                rules={[
                  { required: true, message: "Please input your number!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="dark:text-white">Email Address</span>}
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType> name="save" valuePropName="checked">
                <Checkbox>
                  <span className="dark:text-white">
                    Save this information for faster check-out next time
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded font-medium mt-2"
                  disabled={loading || paymentLoading || orderLoading}
                >
                  {loading || paymentLoading || orderLoading
                    ? "Processing..."
                    : "Place Order"}
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>

        {/* Order Summary */}
        <div className="w-full sm:w-[480px] p-6 space-y-6">
          {/* Print Button */}
          <div className="flex justify-end">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiPrinter className="w-5 h-5 dark:text-white" />
              <span className="dark:text-white">Print Receipt</span>
            </button>
          </div>

          {/* Receipt Content - Printable */}
          <div ref={receiptRef}>
            {checkouts.map((checkout) => {
              const shippingOptions = getShippingOptionsForCheckout(checkout);
              const currentShipping = selectedShipping[checkout.id];

              return (
                <div
                  key={checkout.id}
                  className="border p-4 rounded-lg dark:border-gray-600 space-y-4"
                >
                  {/* Receipt Header for Print */}
                  <div className="receipt-header hidden print:block text-center pb-4 border-b-2 border-black">
                    <h2 className="text-xl font-bold">Order Receipt</h2>
                    <p className="text-sm text-gray-500">
                      Order ID: {checkout.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date().toLocaleDateString()}
                    </p>
                  </div>

                  {/* Products List */}
                  <div className="space-y-3">
                    <h3 className="font-medium dark:text-white text-lg">
                      Order Items ({checkout.items?.length || 0})
                    </h3>
                    {checkout?.items?.map((item: CheckoutItem) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2 border-b dark:border-gray-600"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.product.productImages[0]}
                            alt={item.product.productName}
                            width={48}
                            height={48}
                            className="object-contain rounded"
                          />
                          <div>
                            <span className="font-medium dark:text-white block">
                              {item.product.productName}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-medium dark:text-white">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* SINGLE Shipping Dropdown for the entire checkout */}
                  {shippingOptions.length > 0 && (
                    <div className="pt-4 border-t dark:border-gray-600">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                        🚚 Select Shipping Option:
                      </label>
                      <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              controlHeight: 44,
                              borderRadius: 8,
                            },
                          },
                        }}
                      >
                        <Select
                          className="w-full"
                          placeholder="Select shipping"
                          value={currentShipping?.id}
                          onChange={(value) =>
                            handleShippingChange(
                              checkout.id,
                              value,
                              shippingOptions
                            )
                          }
                          options={shippingOptions.map(
                            (shipping: ShippingOption) => ({
                              value: shipping.id,
                              label: (
                                <div className="flex justify-between items-center w-full py-1">
                                  <span className="font-medium">
                                    {shipping.countryName} - {shipping.carrier}
                                  </span>
                                  <span className="text-primary font-bold">
                                    ${shipping.cost} •{" "}
                                    {shipping.deliveryMin === shipping.deliveryMax
                                      ? `${shipping.deliveryMin} days`
                                      : `${shipping.deliveryMin}-${shipping.deliveryMax} days`}
                                  </span>
                                </div>
                              ),
                            })
                          )}
                        />
                      </ConfigProvider>

                      {/* Selected Shipping Info */}
                      {currentShipping && (
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-green-700 dark:text-green-400 font-medium">
                                ✓ {currentShipping.carrier} to{" "}
                                {currentShipping.countryName}
                              </span>
                              <p className="text-green-600 dark:text-green-500 text-sm mt-1">
                                Estimated delivery:{" "}
                                {currentShipping.deliveryMin ===
                                currentShipping.deliveryMax
                                  ? `${currentShipping.deliveryMin} days`
                                  : `${currentShipping.deliveryMin}-${currentShipping.deliveryMax} days`}
                              </p>
                            </div>
                            <span className="text-lg font-bold text-green-700 dark:text-green-400">
                              +${currentShipping.cost}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  <div className="pt-4 space-y-2 border-t dark:border-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Subtotal:
                      </span>
                      <span className="font-medium dark:text-white">
                        ${checkout.totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Shipping:
                      </span>
                      <span className="font-medium dark:text-white">
                        {calculateShippingCost(checkout.id) > 0
                          ? `$${calculateShippingCost(checkout.id)}`
                          : "Select shipping"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t dark:border-gray-600 pt-3">
                      <span className="text-xl font-bold dark:text-white">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-primary">
                        ${calculateGrandTotal(checkout)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-3 mt-4 pt-4 border-t dark:border-gray-600">
                    <h3 className="font-medium dark:text-white">
                      Payment Method
                    </h3>
                    <div className="flex items-center space-x-3 p-3 border dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        id="online"
                        value="online"
                        className="w-4 h-4 accent-primary"
                      />
                      <label
                        htmlFor="online"
                        className="dark:text-white cursor-pointer flex-1"
                      >
                        <span className="font-medium">Online Payment</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Pay securely with card
                        </p>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        id="cash"
                        value="cash"
                        defaultChecked
                        className="w-4 h-4 accent-primary"
                      />
                      <label
                        htmlFor="cash"
                        className="dark:text-white cursor-pointer flex-1"
                      >
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Pay when you receive
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;