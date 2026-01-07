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
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";

type FieldType = {
  name?: string;
  street?: string;
  apartment?: string;
  city?: string;
  phone?: string;
  email?: string;
  save?: boolean;
};

type ShippingAddressFieldType = {
  shippingName?: string;
  shippingStreet?: string;
  shippingApartment?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  shippingPhone?: string;
  saveShipping?: boolean;
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

interface SelectedShipping {
  [checkoutId: string]: ShippingOption | null;
}

const CheckoutPage = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [billingForm] = Form.useForm();
  const [shippingForm] = Form.useForm();

  const [selectedShipping, setSelectedShipping] = useState<SelectedShipping>(
    {}
  );
  const [shippingId, setShippingId] = useState<string | null>(null);
  const [isShippingFormOpen, setIsShippingFormOpen] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const { data, isLoading, isError } = useGetCheckoutQuery();
  const [
    createPaymentSession,
    { data: sessionData, isLoading: paymentLoading },
  ] = useCreatePaymentSessionMutation();
  const [placeOrder, { isLoading: orderLoading }] =
    usePurchaseWithCODMutation();
  const { data: addressesData } = useGetAddressesQuery();

  // Same API - will be called twice
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [shippingAddressData, setShippingAddressData] =
    useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [savingStatus, setSavingStatus] = useState<string>("");

  const checkouts = Array.isArray(data?.data)
    ? data.data
    : data?.data
    ? [data.data]
    : [];

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

  const calculateShippingCost = (checkoutId: string): number => {
    const shipping = selectedShipping[checkoutId];
    return shipping?.cost || 0;
  };

  const calculateGrandTotal = (checkout: any): number => {
    const shippingCost = calculateShippingCost(checkout.id);
    return checkout.totalAmount + shippingCost;
  };

  useEffect(() => {
    if (addressesData?.data?.length) {
      const billing = addressesData.data.find(
        (addr) => addr.type === "BILLING"
      );
      const shipping = addressesData.data.find(
        (addr) => addr.type === "SHIPPING"
      );

      if (billing) {
        setBillingAddress(billing);
        billingForm.setFieldsValue({
          street: billing.addressLine,
          city: billing.city,
        });
      }

      if (shipping) {
        setShippingAddressData(shipping);
        shippingForm.setFieldsValue({
          shippingStreet: shipping.addressLine,
          shippingCity: shipping.city,
          shippingState: shipping.state,
          shippingPostalCode: shipping.postalCode,
          shippingCountry: shipping.country,
        });
      }
    }
  }, [addressesData, billingForm, shippingForm]);

  useEffect(() => {
    if (sessionData?.data?.redirectUrl) {
      window.location.href = sessionData.data.redirectUrl;
    }
  }, [sessionData]);

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

  const handleSameAsBilling = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) {
      const billingValues = billingForm.getFieldsValue();
      shippingForm.setFieldsValue({
        shippingName: billingValues.name,
        shippingStreet: billingValues.street,
        shippingApartment: billingValues.apartment,
        shippingCity: billingValues.city,
        shippingPhone: billingValues.phone,
      });
    } else {
      if (shippingAddressData) {
        shippingForm.setFieldsValue({
          shippingStreet: shippingAddressData.addressLine,
          shippingCity: shippingAddressData.city,
          shippingState: shippingAddressData.state,
          shippingPostalCode: shippingAddressData.postalCode,
          shippingCountry: shippingAddressData.country,
        });
      } else {
        shippingForm.resetFields();
      }
    }
  };

  // Print receipt functionality
  const handlePrint = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const checkout = checkouts[0];
    const shippingCost = calculateShippingCost(checkout?.id);
    const grandTotal = calculateGrandTotal(checkout);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedShip = selectedShipping[checkout?.id];

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
            .receipt-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .receipt-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .receipt-total { font-weight: bold; font-size: 18px; margin-top: 20px; padding-top: 10px; border-top: 2px solid #000; }
            .item-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <h2>Order Receipt</h2>
            <p>Order ID: dz${checkout?.id}</p>
            <p>Date: dz${new Date().toLocaleDateString()}</p>
          </div>
          <div>
            ${checkout?.items
              .map(
                (item: CheckoutItem) => `
              <div class="item-row">
                <div>dz{item.product.productName} x dz{item.quantity}</div>
                <div>dz${item.product.price * item.quantity}</div>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="receipt-total">
            <div class="receipt-item"><span>Subtotal:</span><span>dz${checkout?.totalAmount}</span></div>
            <div class="receipt-item"><span>Shipping:</span><span>${
              shippingCost > 0 ? `dz ${shippingCost}` : "Free"
            }</span></div>
            <div class="receipt-item" style="font-size: 20px;"><span>Total:</span><span>dz ${grandTotal}</span></div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  // ============ MAIN FORM SUBMIT ============
  const onFinish = async (values: FieldType) => {
    // console.log("=".repeat(50));
    // console.log(" CHECKOUT FORM SUBMITTED");
    // console.log("=".repeat(50));

    const { name, street, apartment, city, phone, email, save } = values;

    if (!name || !street || !city || !phone || !email) {
      return message.error("Please fill in all required fields.");
    }

    const checkoutId = checkouts[0]?.id;
    if (!checkoutId) {
      message.error("Checkout ID not found.");
      return;
    }

    if (!shippingId) {
      return message.error("Please select a shipping option.");
    }

    const shippingValues = shippingForm.getFieldsValue();
    const paymentInput = document.querySelector(
      'input[name="payment"]:checked'
    ) as HTMLInputElement;
    const paymentMethod = paymentInput?.value || "cash";

    const productIds: string[] = checkouts.flatMap((checkout) =>
      checkout.items.map((item: CheckoutItem) => item.product.id)
    );

    const shippingAddressForOrder = sameAsBilling
      ? { name, street, apartment, city, phone }
      : {
          name: shippingValues.shippingName || name,
          street: shippingValues.shippingStreet,
          apartment: shippingValues.shippingApartment,
          city: shippingValues.shippingCity,
          state: shippingValues.shippingState,
          postalCode: shippingValues.shippingPostalCode,
          country: shippingValues.shippingCountry,
          phone: shippingValues.shippingPhone || phone,
        };

    const orderData = {
      checkoutId,
      productIds,
      shippingId,
      name,
      street,
      apartment,
      city,
      phone,
      email,
      saveForNextTime: save,
      shippingAddress: shippingAddressForOrder,
    };

    const paymentData = { checkoutId, shippingId };

    try {
      setLoading(true);

      // ========================================
      //  SAME API CALLED TWICE - START
      // ========================================

      // ---------- 1st API Call: BILLING ----------
      if (save) {
        setSavingStatus("Saving billing address...");
        // console.log(" ========== BILLING ADDRESS API CALL ==========");

        const billingData = {
          addressLine: street!,
          city: city!,
          state: "",
          postalCode: "",
          country: "",
          type: "BILLING" as const,
        };

        // console.log(" BILLING Data:", billingData);

        if (billingAddress?.id) {
          const res = await updateAddress({
            id: billingAddress.id,
            data: billingData,
          }).unwrap();
          console.log(" BILLING Updated:", res);
          message.success("Billing address updated!");
        } else {
          const res = await addAddress(billingData).unwrap();
          console.log(" BILLING Added///////////////----------->:", res);
          message.success("Billing address saved!");
        }
      }

      // ---------- 2nd API Call: SHIPPING ----------
      if (shippingValues.saveShipping) {
        setSavingStatus("Saving shipping address...");
        // console.log("\n2️ ========== SHIPPING ADDRESS API CALL ==========");

        let shippingData;

        if (sameAsBilling) {
          shippingData = {
            addressLine: street!,
            city: city!,
            state: "",
            postalCode: "",
            country: "",
            type: "SHIPPING" as const,
          };
        } else {
          shippingData = {
            addressLine: shippingValues.shippingStreet || "",
            city: shippingValues.shippingCity || "",
            state: shippingValues.shippingState || "",
            postalCode: shippingValues.shippingPostalCode || "",
            country: shippingValues.shippingCountry || "",
            type: "SHIPPING" as const,
          };
        }

        // console.log(" SHIPPING Data:", shippingData);

        if (shippingAddressData?.id) {
          const res = await updateAddress({
            id: shippingAddressData.id,
            data: shippingData,
          }).unwrap();
          console.log(" SHIPPING Updated:", res);
          message.success("Shipping address updated!");
        } else {
          const res = await addAddress(shippingData).unwrap();
          console.log(" SHIPPING Added:", res);
          message.success("Shipping address saved!");
        }
      }

      // console.log("========== BOTH API CALLS COMPLETED ==========\n");

      // ========================================
      //  SAME API CALLED TWICE - END
      // ========================================

      // ---------- Process Payment ----------

      setSavingStatus("Processing order...");

      if (paymentMethod === "online") {
        const sessionRes = await createPaymentSession(paymentData).unwrap();
        if (sessionRes?.data?.redirectUrl) {
          await placeOrder(orderData).unwrap();
          window.location.href = sessionRes.data.redirectUrl;
        } else {
          message.error("Failed to create payment session.");
        }
      } else {
        await placeOrder(orderData).unwrap();
        message.success("Order placed successfully!");
        router.push("/order-success");
      }
    } catch (error) {
      console.error(" Checkout Error:", error);
      message.error("Failed to process the order.");
    } finally {
      setLoading(false);
      setSavingStatus("");
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
        {/* Billing & Shipping Forms */}
        <div className="w-full sm:w-[500px]">
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
              form={billingForm}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{
                name: "",
                street: "",
                apartment: "",
                city: "",
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
                  { required: true, message: "Please input street address!" },
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
                rules={[{ required: true, message: "Please input town/city!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="dark:text-white">Phone Number</span>}
                name="phone"
                rules={[{ required: true, message: "Please input phone!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="dark:text-white">Email Address</span>}
                name="email"
                rules={[{ required: true, message: "Please input email!" }]}
              >
                <Input />
              </Form.Item>

              {/* <Form.Item<FieldType> name="save" valuePropName="checked">
                <Checkbox>
                  <span className="dark:text-white">
                    Save billing address for next time
                  </span>
                </Checkbox>
              </Form.Item> */}

              {/* Collapsible Shipping Address */}
              <div className="mt-6 mb-6 border dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsShippingFormOpen(!isShippingFormOpen)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaTruck className="text-primary text-xl" />
                    <div className="text-left">
                      <h3 className="font-semibold dark:text-white text-lg">
                        Shipping Address
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {sameAsBilling
                          ? "Same as billing address"
                          : "Add different shipping address"}
                      </p>
                    </div>
                  </div>
                  {isShippingFormOpen ? (
                    <IoChevronUp className="text-xl dark:text-white" />
                  ) : (
                    <IoChevronDown className="text-xl dark:text-white" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isShippingFormOpen
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 border-t dark:border-gray-600">
                    <div className="mb-4">
                      <Checkbox
                        checked={sameAsBilling}
                        onChange={(e) => handleSameAsBilling(e.target.checked)}
                      >
                        <span className="dark:text-white font-medium">
                          Ship to billing address
                        </span>
                      </Checkbox>
                    </div>

                    <Form
                      form={shippingForm}
                      layout="vertical"
                      autoComplete="off"
                      className="mt-4"
                      initialValues={{
                        shippingName: "",
                        shippingStreet: "",
                        shippingApartment: "",
                        shippingCity: "",
                        shippingState: "",
                        shippingPostalCode: "",
                        shippingCountry: "",
                        shippingPhone: "",
                        saveShipping: true,
                      }}
                    >
                      {!sameAsBilling && (
                        <>
                          <Form.Item<ShippingAddressFieldType>
                            label={
                              <span className="dark:text-white">
                                Recipient Name
                              </span>
                            }
                            name="shippingName"
                          >
                            <Input placeholder="Full name" />
                          </Form.Item>

                          <Form.Item<ShippingAddressFieldType>
                            label={
                              <span className="dark:text-white">
                                Street Address
                              </span>
                            }
                            name="shippingStreet"
                            rules={[
                              {
                                required: true,
                                message: "Please input street!",
                              },
                            ]}
                          >
                            <Input placeholder="Street address" />
                          </Form.Item>

                          <Form.Item<ShippingAddressFieldType>
                            label={
                              <span className="dark:text-white">
                                Apartment, Suite
                              </span>
                            }
                            name="shippingApartment"
                          >
                            <Input placeholder="Apartment (optional)" />
                          </Form.Item>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item<ShippingAddressFieldType>
                              label={
                                <span className="dark:text-white">City</span>
                              }
                              name="shippingCity"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input city!",
                                },
                              ]}
                            >
                              <Input placeholder="City" />
                            </Form.Item>

                            <Form.Item<ShippingAddressFieldType>
                              label={
                                <span className="dark:text-white">State</span>
                              }
                              name="shippingState"
                            >
                              <Input placeholder="State" />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item<ShippingAddressFieldType>
                              label={
                                <span className="dark:text-white">
                                  Postal Code
                                </span>
                              }
                              name="shippingPostalCode"
                            >
                              <Input placeholder="Postal code" />
                            </Form.Item>

                            <Form.Item<ShippingAddressFieldType>
                              label={
                                <span className="dark:text-white">Country</span>
                              }
                              name="shippingCountry"
                            >
                              <Input placeholder="Country" />
                            </Form.Item>
                          </div>

                          <Form.Item<ShippingAddressFieldType>
                            label={
                              <span className="dark:text-white">Phone</span>
                            }
                            name="shippingPhone"
                          >
                            <Input placeholder="Phone for delivery" />
                          </Form.Item>
                        </>
                      )}

                      <Form.Item<ShippingAddressFieldType>
                        name="saveShipping"
                        valuePropName="checked"
                      >
                        <Checkbox>
                          <span className="dark:text-white">
                            Save shipping address for future orders
                          </span>
                        </Checkbox>
                      </Form.Item>

                      {sameAsBilling && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-green-700 dark:text-green-400 font-medium">
                            ✓ Using billing address for shipping
                          </p>
                        </div>
                      )}
                    </Form>
                  </div>
                </div>
              </div>

              {/* Status Display */}
              {savingStatus && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-700 dark:text-blue-400 text-sm flex items-center gap-2">
                    <span className="animate-spin">⏳</span> {savingStatus}
                  </p>
                </div>
              )}

              <Form.Item>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded font-medium mt-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                  disabled={loading || paymentLoading || orderLoading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>

        {/* Order Summary */}
        <div className="w-full sm:w-[480px] p-6 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiPrinter className="w-5 h-5 dark:text-white" />
              <span className="dark:text-white">Print Receipt</span>
            </button>
          </div>

          <div ref={receiptRef}>
            {checkouts.map((checkout) => {
              const shippingOptions = getShippingOptionsForCheckout(checkout);
              const currentShipping = selectedShipping[checkout.id];

              return (
                <div
                  key={checkout.id}
                  className="border p-4 rounded-lg dark:border-gray-600 space-y-4"
                >
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
                          dz {item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {shippingOptions.length > 0 && (
                    <div className="pt-4 border-t dark:border-gray-600">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                        🚚 Select Shipping:
                      </label>
                      <ConfigProvider
                        theme={{
                          components: {
                            Select: { controlHeight: 44, borderRadius: 8 },
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
                          options={shippingOptions.map((s) => ({
                            value: s.id,
                            label: (
                              <div className="flex justify-between items-center w-full">
                                <span>
                                  {s.countryName} - {s.carrier}
                                </span>
                                <span className="text-primary font-bold">
                                  dz {s.cost}
                                </span>
                              </div>
                            ),
                          }))}
                        />
                      </ConfigProvider>

                      {currentShipping && (
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-green-700 dark:text-green-400 font-medium">
                              ✓ {currentShipping.carrier} to{" "}
                              {currentShipping.countryName}
                            </span>
                            <span className="text-lg font-bold text-green-700 dark:text-green-400">
                              +dz {currentShipping.cost}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-4 space-y-2 border-t dark:border-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Subtotal:
                      </span>
                      <span className="font-medium dark:text-white">
                        dz {checkout.totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Shipping:
                      </span>
                      <span className="font-medium dark:text-white">
                        {calculateShippingCost(checkout.id) > 0
                          ? `dz${calculateShippingCost(checkout.id)}`
                          : "Select shipping"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t dark:border-gray-600 pt-3">
                      <span className="text-xl font-bold dark:text-white">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-primary">
                        dz {calculateGrandTotal(checkout)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4 pt-4 border-t dark:border-gray-600">
                    <h3 className="font-medium dark:text-white">Payment</h3>
                    <div className="flex items-center space-x-3 p-3 border dark:border-gray-600 rounded-lg hover:border-primary cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        id="online"
                        value="online"
                        className="w-4 h-4 accent-primary"
                      />
                      <label
                        htmlFor="online"
                        className="dark:text-white flex-1 cursor-pointer"
                      >
                        <span className="font-medium">Online Payment</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border dark:border-gray-600 rounded-lg hover:border-primary cursor-pointer">
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
                        className="dark:text-white flex-1 cursor-pointer"
                      >
                        <span className="font-medium">Cash on Delivery</span>
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
