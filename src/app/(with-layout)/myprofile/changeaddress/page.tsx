"use client";

import { useEffect } from "react";
import { Form, Input, message, Spin, Button } from "antd";
import { useAddAddressMutation, useGetAddressesQuery, useUpdateAddressMutation } from "@/redux/features/address/addressApi";

interface AddressFormValues {
    street: string;
    city: string;
    state: string;
    zip: string;
}

const ChangeAddress = () => {
    const [form] = Form.useForm<AddressFormValues>();

    // Get existing addresses
    const { data: addressData, isLoading: loadingAddresses } = useGetAddressesQuery();
    const [addAddress, { isLoading: adding }] = useAddAddressMutation();
    const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();

    // Prefill form with existing SHIPPING address
    const shippingAddress = addressData?.data?.find((addr) => addr.type === "SHIPPING");

    useEffect(() => {
        if (shippingAddress) {
            form.setFieldsValue({
                street: shippingAddress.addressLine,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zip: shippingAddress.postalCode,
            });
        }
    }, [shippingAddress, form]);
    

    const onFinish = async (values: AddressFormValues) => {

        type AddressType = "SHIPPING" | "BILLING";
        try {
            const payload = {
                addressLine: values.street,
                city: values.city,
                state: values.state,
                postalCode: values.zip,
                country: "USA",
                 type: "SHIPPING" as AddressType,
                // type: "SHIPPING",
            };

            if (shippingAddress) {
                // PATCH existing shipping address
                const res = await updateAddress({ id: shippingAddress.id, data: payload }).unwrap();
                message.success(res.message || "Shipping address updated successfully!");
            } else {
                // POST new shipping address
                const res = await addAddress(payload).unwrap();
                message.success(res.message || "Shipping address added successfully!");
            }
        } catch (error: unknown) {
            if (
                typeof error === "object" &&
                error !== null &&
                "data" in error &&
                typeof (error as { data: { message?: string } }).data.message === "string"
            ) {
                message.error((error as { data: { message: string } }).data.message);
            } else {
                message.error("Failed to update profile.");
            }
        }
    };










    if (loadingAddresses) {
        return <Spin tip="Loading address..." className="mt-10" />;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-medium dark:text-white">Change Address</h2>

            <Form<AddressFormValues>
                form={form}
                name="changeAddress"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label={<p className="dark:text-white">Street Address</p>}
                    name="street"
                    rules={[{ required: true, message: "Please enter your street address!" }]}
                >
                    <Input placeholder="123 Main St" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">City</p>}
                    name="city"
                    rules={[{ required: true, message: "Please enter your city!" }]}
                >
                    <Input placeholder="Enter city" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">State</p>}
                    name="state"
                    rules={[{ required: true, message: "Please enter your state!" }]}
                >
                    <Input placeholder="Enter state" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">Zip Code</p>}
                    name="zip"
                    rules={[
                        { required: true, message: "Please enter your zip code!" },
                        { pattern: /^\d{5}$/, message: "Please enter a valid 5-digit zip code!" },
                    ]}
                >
                    <Input placeholder="12345" className="h-12" />
                </Form.Item>

                <Form.Item className="mt-6">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full py-3"
                        loading={adding || updating}
                    >
                        {shippingAddress ? "Update Address" : "Add Address"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangeAddress;
