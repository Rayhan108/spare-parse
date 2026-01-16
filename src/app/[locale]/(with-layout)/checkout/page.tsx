/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
   useUpdateCheckoutShippingMutation,
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

interface ItemShippingSelection {
   [checkoutItemId: string]: string;
}

const CheckoutPage = () => {
   const receiptRef = useRef<HTMLDivElement>(null);
   const router = useRouter();
   const [billingForm] = Form.useForm();
   const [shippingForm] = Form.useForm();

   const [itemShippingSelections, setItemShippingSelections] =
      useState<ItemShippingSelection>({});
   const [isShippingFormOpen, setIsShippingFormOpen] = useState(false);
   const [sameAsBilling, setSameAsBilling] = useState(false);
   const [isInitialized, setIsInitialized] = useState(false);

   const { data, isLoading, isError, refetch } = useGetCheckoutQuery();
   const [updateCheckoutShipping, { isLoading: isUpdatingShipping }] =
      useUpdateCheckoutShippingMutation();
   const [
      createPaymentSession,
      { data: sessionData, isLoading: paymentLoading },
   ] = useCreatePaymentSessionMutation();
   const [placeOrder, { isLoading: orderLoading }] =
      usePurchaseWithCODMutation();
   const { data: addressesData } = useGetAddressesQuery();

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

   // Initialize state with existing shipping selections from backend (PERSISTENCE FIX)
   useEffect(() => {
      if (checkouts.length > 0 && !isInitialized) {
         const existingSelections: ItemShippingSelection = {};
         let hasExistingSelections = false;

         checkouts.forEach((checkout) => {
            checkout.items?.forEach((item: CheckoutItem) => {
               // Check if this item already has a shippingOptionId saved from backend
               if (item.shippingOptionId) {
                  existingSelections[item.id] = item.shippingOptionId;
                  hasExistingSelections = true;
               }
            });
         });

         // Update state with existing selections
         if (hasExistingSelections) {
            setItemShippingSelections(existingSelections);
         }

         setIsInitialized(true);
      }
   }, [checkouts, isInitialized]);

   // Get shipping options for a specific item
   const getShippingOptionsForItem = (item: CheckoutItem): ShippingOption[] => {
      return item.product?.shippings || [];
   };

   // Check if all items have shipping selected
   const allItemsHaveShipping = useCallback((): boolean => {
      if (checkouts.length === 0) return false;

      for (const checkout of checkouts) {
         for (const item of checkout.items) {
            if (!itemShippingSelections[item.id]) {
               return false;
            }
         }
      }
      return true;
   }, [checkouts, itemShippingSelections]);

   // Update shipping selections on backend
   const updateShippingOnBackend = useCallback(
      async (checkoutId: string) => {
         try {
            const shippingSelections = Object.entries(
               itemShippingSelections
            ).map(([checkoutItemId, shippingOptionId]) => ({
               checkoutItemId,
               shippingOptionId,
            }));

            await updateCheckoutShipping({
               checkoutId,
               shippingSelections,
            }).unwrap();

            await refetch();
            message.success("All shipping options saved successfully!");
         } catch (error: any) {
            console.error("Failed to update shipping:", error);
            const errorMessage =
               error?.data?.message || "Failed to update shipping options";
            message.error(errorMessage);
            throw error;
         }
      },
      [itemShippingSelections, updateCheckoutShipping, refetch]
   );

   // Handle individual item shipping selection
   const handleItemShippingChange = useCallback(
      async (
         checkoutItemId: string,
         shippingOptionId: string,
         checkoutId: string
      ) => {
         // Check if this is actually a change
         const isActualChange =
            itemShippingSelections[checkoutItemId] !== shippingOptionId;

         if (!isActualChange) return;

         // Update local state
         const newSelections = {
            ...itemShippingSelections,
            [checkoutItemId]: shippingOptionId,
         };

         setItemShippingSelections(newSelections);

         // Check if all items now have shipping selected
         const allItemsSelected = checkouts[0]?.items?.every(
            (item: CheckoutItem) => newSelections[item.id]
         );

         if (allItemsSelected) {
            // All items have shipping, now update backend
            try {
               const shippingSelections = Object.entries(newSelections).map(
                  ([itemId, shippingId]) => ({
                     checkoutItemId: itemId,
                     shippingOptionId: shippingId,
                  })
               );

               await updateCheckoutShipping({
                  checkoutId,
                  shippingSelections,
               }).unwrap();

               await refetch();
               message.success("All shipping options have been saved!");
            } catch (error: any) {
               console.error("Failed to update shipping:", error);
               const errorMessage =
                  error?.data?.message || "Failed to update shipping";
               message.error(errorMessage);

               // Revert the selection on error
               setItemShippingSelections((prev) => {
                  const revertedSelections = { ...prev };
                  delete revertedSelections[checkoutItemId];
                  return revertedSelections;
               });
            }
         } else {
            // Not all items have shipping yet, show remaining count
            const remainingItems = checkouts[0]?.items?.filter(
               (item: CheckoutItem) => !newSelections[item.id]
            ).length;

            if (remainingItems > 0) {
               message.info(
                  `Please select shipping for ${remainingItems} more item(s)`
               );
            }
         }
      },
      [itemShippingSelections, checkouts, updateCheckoutShipping, refetch]
   );

   // Calculate total shipping cost
   const calculateTotalShippingCost = (): number => {
      let totalShipping = 0;

      checkouts.forEach((checkout) => {
         checkout.items?.forEach((item: CheckoutItem) => {
            const selectedShippingId = itemShippingSelections[item.id];
            if (selectedShippingId) {
               const shippingOptions = getShippingOptionsForItem(item);
               const selectedShipping = shippingOptions.find(
                  (s) => s.id === selectedShippingId
               );
               if (selectedShipping) {
                  totalShipping += selectedShipping.cost * item.quantity;
               }
            }
         });
      });

      return totalShipping;
   };

   // calculate sub totla for products :
   const calculateSubTotal = (): number => {
      const subTotal = checkouts?.[0]?.items?.reduce((acc: any, item: any) => {
         return (acc += item.product.price * item.quantity);
      }, 0);
      return subTotal || 0;
   };

   // Calculate grand total
   const calculateGrandTotal = (checkout: any): number => {
      let itemShippingCost = 0;

      checkout.items?.forEach((item: CheckoutItem) => {
         const selectedShippingId = itemShippingSelections[item.id];
         if (selectedShippingId) {
            const shippingOptions = getShippingOptionsForItem(item);
            const selectedShipping = shippingOptions.find(
               (s) => s.id === selectedShippingId
            );
            if (selectedShipping) {
               itemShippingCost += selectedShipping.cost * item.quantity;
            }
         }
      });

      return checkout.totalAmount + itemShippingCost;
   };

   // Initialize addresses
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

   // Handle payment redirect
   useEffect(() => {
      if (sessionData?.data?.redirectUrl) {
         window.location.href = sessionData.data.redirectUrl;
      }
   }, [sessionData]);

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

   // Print receipt
   const handlePrint = () => {
      const printContent = receiptRef.current;
      if (!printContent) return;

      const checkout = checkouts[0];

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
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div>
            ${checkout?.items
               .map((item: CheckoutItem) => {
                  const selectedShippingId = itemShippingSelections[item.id];
                  const shippingOptions = getShippingOptionsForItem(item);
                  const selectedShipping = shippingOptions.find(
                     (s) => s.id === selectedShippingId
                  );
                  const shippingCost = selectedShipping
                     ? selectedShipping.cost * item.quantity
                     : 0;

                  return `
                  <div class="item-row">
                    <div>${item.product.productName} x ${item.quantity}</div>
                    <div>DZD ${item.product.afterDiscount * item.quantity}</div>
                  </div>
                  ${
                     selectedShipping
                        ? `
                    <div style="padding-left: 20px; font-size: 14px; color: #666;">
                      Shipping: ${selectedShipping.carrier} - DZD ${shippingCost}
                    </div>
                  `
                        : ""
                  }
                `;
               })
               .join("")}
          </div>
          <div class="receipt-total">
            <div class="receipt-item"><span>Subtotal:</span><span>DZD ${
               calculateSubTotal()
            }</span></div>
            <div class="receipt-item"><span>Total Shipping:</span><span>DZD ${calculateTotalShippingCost()}</span></div>
            <div class="receipt-item" style="font-size: 20px;"><span>Total:</span><span>DZD ${
               checkout?.totalAmount
            }</span></div>
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
   };

   // Main form submit
   const onFinish = async (values: FieldType) => {
      const { name, street, apartment, city, phone, email, save } = values;

      // Validate required fields
      if (!name || !street || !city || !phone || !email) {
         return message.error("Please fill in all required fields.");
      }

      // Validate all items have shipping selected
      if (!allItemsHaveShipping()) {
         return message.error(
            "Please select shipping for all items before placing order."
         );
      }

      const checkoutId = checkouts[0]?.id;
      if (!checkoutId) {
         message.error("Checkout ID not found.");
         return;
      }

      const shippingValues = shippingForm.getFieldsValue();
      const paymentInput = document.querySelector(
         'input[name="payment"]:checked'
      ) as HTMLInputElement;
      const paymentMethod = paymentInput?.value || "cash";

      const productIds: string[] = checkouts.flatMap((checkout) =>
         checkout.items.map((item: CheckoutItem) => item.product.id)
      );

      try {
         setLoading(true);

         // Make sure shipping is saved before proceeding
         setSavingStatus("Confirming shipping selections...");

         // Final update to ensure all shipping is saved
         try {
            await updateShippingOnBackend(checkoutId);
         } catch (error) {
            return;
         }

         // Save billing address if requested
         if (save) {
            setSavingStatus("Saving billing address...");
            const billingData = {
               addressLine: street!,
               city: city!,
               state: "",
               postalCode: "",
               country: "",
               type: "BILLING" as const,
            };

            if (billingAddress?.id) {
               await updateAddress({
                  id: billingAddress.id,
                  data: billingData,
               }).unwrap();
            } else {
               await addAddress(billingData).unwrap();
            }
         }

         // Save shipping address if requested
         if (shippingValues.saveShipping) {
            setSavingStatus("Saving shipping address...");
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

            if (shippingAddressData?.id) {
               await updateAddress({
                  id: shippingAddressData.id,
                  data: shippingData,
               }).unwrap();
            } else {
               await addAddress(shippingData).unwrap();
            }
         }

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
            name,
            street,
            apartment,
            city,
            phone,
            email,
            saveForNextTime: save,
            shippingAddress: shippingAddressForOrder,
         };

         const paymentData = {
            checkoutId,
         };

         // Process payment
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
            router.push("/payment-success");
         }
      } catch (error: any) {
         console.error("Checkout Error:", error);
         const errorMessage =
            error?.data?.message || "Failed to process the order.";
         message.error(errorMessage);
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
         {/* Show global loading indicator when updating shipping */}
         {isUpdatingShipping && (
            <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
               <span className="animate-spin">⏳</span>
               Saving all shipping selections...
            </div>
         )}

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

         <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8 lg:gap-12 mt-8">
            {/* Billing & Shipping Forms */}
            <div className="w-full lg:flex-1">
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
                        rules={[
                           {
                              required: true,
                              message: "Please input your name!",
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>

                     <Form.Item<FieldType>
                        label={
                           <span className="dark:text-white">
                              Street Address
                           </span>
                        }
                        name="street"
                        rules={[
                           {
                              required: true,
                              message: "Please input street address!",
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
                        label={
                           <span className="dark:text-white">Town/City</span>
                        }
                        name="city"
                        rules={[
                           {
                              required: true,
                              message: "Please input town/city!",
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>

                     <Form.Item<FieldType>
                        label={
                           <span className="dark:text-white">Phone Number</span>
                        }
                        name="phone"
                        rules={[
                           { required: true, message: "Please input phone!" },
                        ]}
                     >
                        <Input />
                     </Form.Item>

                     <Form.Item<FieldType>
                        label={
                           <span className="dark:text-white">
                              Email Address
                           </span>
                        }
                        name="email"
                        rules={[
                           { required: true, message: "Please input email!" },
                        ]}
                     >
                        <Input />
                     </Form.Item>

                     <Form.Item<FieldType> name="save" valuePropName="checked">
                        <Checkbox>
                           <span className="dark:text-white">
                              Save billing address for next time
                           </span>
                        </Checkbox>
                     </Form.Item>

                     {/* Collapsible Shipping Address */}
                     <div className="mt-6 mb-6 border dark:border-gray-600 rounded-lg overflow-hidden">
                        <button
                           type="button"
                           onClick={() =>
                              setIsShippingFormOpen(!isShippingFormOpen)
                           }
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
                                    onChange={(e) =>
                                       handleSameAsBilling(e.target.checked)
                                    }
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
                                                <span className="dark:text-white">
                                                   City
                                                </span>
                                             }
                                             name="shippingCity"
                                             rules={[
                                                {
                                                   required: true,
                                                   message:
                                                      "Please input city!",
                                                },
                                             ]}
                                          >
                                             <Input placeholder="City" />
                                          </Form.Item>

                                          <Form.Item<ShippingAddressFieldType>
                                             label={
                                                <span className="dark:text-white">
                                                   State
                                                </span>
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
                                                <span className="dark:text-white">
                                                   Country
                                                </span>
                                             }
                                             name="shippingCountry"
                                          >
                                             <Input placeholder="Country" />
                                          </Form.Item>
                                       </div>

                                       <Form.Item<ShippingAddressFieldType>
                                          label={
                                             <span className="dark:text-white">
                                                Phone
                                             </span>
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
                                          Save shipping address for future
                                          orders
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
                              <span className="animate-spin">⏳</span>{" "}
                              {savingStatus}
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

            {/* Order Summary with Per-Item Shipping */}
            <div className="w-full lg:flex-1 p-6 space-y-6">
               <div className="flex justify-between items-center">
                  <div>
                     {!allItemsHaveShipping() && (
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                           ⚠️ Select shipping for all items to continue
                        </p>
                     )}
                     {allItemsHaveShipping() && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                           ✓ All shipping options selected
                        </p>
                     )}
                  </div>
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
                     const allSelected = checkout.items?.every(
                        (item: CheckoutItem) => itemShippingSelections[item.id]
                     );

                     return (
                        <div
                           key={checkout.id}
                           className="border p-4 rounded-lg dark:border-gray-600 space-y-4"
                        >
                           <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                 <h3 className="font-medium dark:text-white text-lg">
                                    Order Items ({checkout.items?.length || 0})
                                 </h3>
                                 {allSelected && (
                                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                                       ✓ All shipping selected
                                    </span>
                                 )}
                              </div>

                              {/* Items with individual shipping selection */}
                              {checkout?.items?.map(
                                 (item: CheckoutItem, index: number) => {
                                    const shippingOptions =
                                       getShippingOptionsForItem(item);
                                    const selectedShippingId =
                                       itemShippingSelections[item.id];
                                    const selectedShipping =
                                       shippingOptions.find(
                                          (s) => s.id === selectedShippingId
                                       );

                                    return (
                                       <div
                                          key={item.id}
                                          className="border dark:border-gray-700 rounded-lg p-4 space-y-3"
                                       >
                                          {/* Item number badge */}
                                          <div className="flex justify-between items-start">
                                             <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                                Item {index + 1} of{" "}
                                                {checkout.items.length}
                                             </span>
                                             {selectedShippingId ? (
                                                <span className="text-xs text-green-600 dark:text-green-400">
                                                   ✓ Shipping selected
                                                </span>
                                             ) : (
                                                <span className="text-xs text-red-600 dark:text-red-400">
                                                   Shipping required
                                                </span>
                                             )}
                                          </div>

                                          {/* Item details */}
                                          <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                <Image
                                                   src={
                                                      item.product
                                                         .productImages[0]
                                                   }
                                                   alt={
                                                      item.product.productName
                                                   }
                                                   width={60}
                                                   height={60}
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
                                                dzd{" "}
                                                {item?.product?.afterDiscount *
                                                   item.quantity}
                                             </span>
                                          </div>

                                          {/* Shipping selection for this item */}
                                          {shippingOptions.length > 0 && (
                                             <div className="pt-3 border-t dark:border-gray-700">
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                                   🚚 Select Shipping Option:
                                                </label>
                                                <ConfigProvider
                                                   theme={{
                                                      components: {
                                                         Select: {
                                                            controlHeight: 40,
                                                            borderRadius: 6,
                                                         },
                                                      },
                                                   }}
                                                >
                                                   <Select
                                                      className="w-full"
                                                      placeholder="Choose shipping method"
                                                      value={
                                                         selectedShippingId ||
                                                         undefined
                                                      }
                                                      onChange={(
                                                         shippingOptionId
                                                      ) =>
                                                         handleItemShippingChange(
                                                            item.id,
                                                            shippingOptionId,
                                                            checkout.id
                                                         )
                                                      }
                                                      disabled={
                                                         isUpdatingShipping
                                                      }
                                                      options={shippingOptions.map(
                                                         (shipping) => ({
                                                            value: shipping.id,
                                                            label: (
                                                               <div className="flex justify-between items-center w-full">
                                                                  <span>
                                                                     {
                                                                        shipping.carrier
                                                                     }{" "}
                                                                     -{" "}
                                                                     {
                                                                        shipping.countryName
                                                                     }
                                                                  </span>
                                                                  <span className="text-primary font-bold">
                                                                     dzd{" "}
                                                                     {shipping.cost *
                                                                        item.quantity}
                                                                  </span>
                                                               </div>
                                                            ),
                                                         })
                                                      )}
                                                   />
                                                </ConfigProvider>

                                                {selectedShipping && (
                                                   <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-sm">
                                                      <div className="flex justify-between items-center">
                                                         <span className="text-green-700 dark:text-green-400">
                                                            ✓{" "}
                                                            {
                                                               selectedShipping.carrier
                                                            }{" "}
                                                            to{" "}
                                                            {
                                                               selectedShipping.countryName
                                                            }
                                                         </span>
                                                         <span className="font-bold text-green-700 dark:text-green-400">
                                                            +dzd{" "}
                                                            {selectedShipping.cost *
                                                               item.quantity}
                                                         </span>
                                                      </div>
                                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                                         Delivery:{" "}
                                                         {
                                                            selectedShipping.deliveryMin
                                                         }
                                                         -
                                                         {
                                                            selectedShipping.deliveryMax
                                                         }{" "}
                                                         days
                                                      </span>
                                                   </div>
                                                )}

                                                {!selectedShippingId && (
                                                   <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
                                                      <span className="text-yellow-600 dark:text-yellow-400">
                                                         ⚠️ Please select a
                                                         shipping option for
                                                         this item
                                                      </span>
                                                   </div>
                                                )}
                                             </div>
                                          )}
                                       </div>
                                    );
                                 }
                              )}
                           </div>

                           {/* Order totals */}
                           <div className="pt-4 space-y-2 border-t dark:border-gray-600">
                              <div className="flex justify-between">
                                 <span className="text-gray-600 dark:text-gray-300">
                                    Subtotal:
                                 </span>
                                 <span className="font-medium dark:text-white">
                                    {/* DZD {checkout.totalAmount}
                                     */}
                                    DZD {calculateSubTotal()}
                                 </span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-gray-600 dark:text-gray-300">
                                    Total Shipping:
                                 </span>
                                 <span className="font-medium dark:text-white">
                                    {allItemsHaveShipping()
                                       ? `DZD ${calculateTotalShippingCost()}`
                                       : "Select all shipping options"}
                                 </span>
                              </div>
                              <div className="flex justify-between border-t dark:border-gray-600 pt-3">
                                 <span className="text-xl font-bold dark:text-white">
                                    Total:
                                 </span>
                                 <span className="text-xl font-bold text-primary">
                                    {/* {allItemsHaveShipping()
                          ? `DZD ${calculateGrandTotal(checkout)}`
                          : "---"} */}
                                    {allItemsHaveShipping()
                                       ? `DZD ${checkout.totalAmount}`
                                       : "---"}
                                 </span>
                              </div>
                           </div>

                           {/* Payment options */}
                           <div className="space-y-3 mt-4 pt-4 border-t dark:border-gray-600">
                              <h3 className="font-medium dark:text-white">
                                 Payment
                              </h3>
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
                                    <span className="font-medium">
                                       Online Payment
                                    </span>
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
                                    <span className="font-medium">
                                       Cash on Delivery
                                    </span>
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
