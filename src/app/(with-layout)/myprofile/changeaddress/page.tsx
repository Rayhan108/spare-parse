"use client";
import { useEffect } from "react";
import { Form, Input, Spin, notification } from "antd";
import {
  useAddAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
} from "@/redux/features/address/addressApi";



interface AddressFormValues {
  street: string;
  city: string;
  state: string;
  zip: string;
}

const ChangeAddress = () => {
  const [form] = Form.useForm<AddressFormValues>();
  const [api, contextHolder] = notification.useNotification();
  const { data: addressData, isLoading: loadingAddresses } = useGetAddressesQuery();
  const [addAddress, { isLoading: adding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
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
    };

    let res;
    if (shippingAddress) {
      res = await updateAddress({ id: shippingAddress.id, data: payload }).unwrap();
    } else {
      res = await addAddress(payload).unwrap();
    }


    setTimeout(() => {
      api.open({
        type: "success",
        message: shippingAddress ? "Address Updated" : "Address Added",
        description: res.message,
        placement: "topRight",
      });
    }, 0);

  } catch (error: unknown) {
    setTimeout(() => {
      api.open({
        type: "error",
        message: "Update Failed",
        description: `Failed to update address. Please try again ${error}`,
        placement: "topRight",
      });
    }, 0);
  }
};


  if (loadingAddresses) {
    return <Spin tip="Loading address..." className="mt-10" />;
  }

  return (
    <div className="space-y-8 bg-white dark:bg-black p-6 rounded-md">
      {contextHolder}
      <h2 className="text-xl font-medium dark:text-white">Change Address</h2>

      <Form<AddressFormValues>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="space-y-4"
      >
        <Form.Item
          label={<span className="dark:text-white">Street Address</span>}
          name="street"
          rules={[{ required: true, message: "Please enter your street address!" }]}
        >
          <Input placeholder="123 Main St" className="h-12" />
        </Form.Item>

        <Form.Item
          label={<span className="dark:text-white">City</span>}
          name="city"
          rules={[{ required: true, message: "Please enter your city!" }]}
        >
          <Input placeholder="Enter city" className="h-12" />
        </Form.Item>

        <Form.Item
          label={<span className="dark:text-white">State</span>}
          name="state"
          rules={[{ required: true, message: "Please enter your state!" }]}
        >
          <Input placeholder="Enter state" className="h-12" />
        </Form.Item>

        <Form.Item
          label={<span className="dark:text-white">Zip Code</span>}
          name="zip"
          rules={[
            { required: true, message: "Please enter your zip code!" },
            { pattern: /^\d{5}$/, message: "Please enter a valid 5-digit zip code!" },
          ]}
        >
          <Input placeholder="12345" className="h-12" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="mt-6">
          <button
            type="submit"
            disabled={adding || updating}
            className={`bg-primary w-full py-3 rounded-md cursor-pointer text-white ${
              adding || updating ? " cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {adding || updating
              ? shippingAddress
                ? "Updating..."
                : "Adding..."
              : shippingAddress
              ? "Update Address"
              : "Add Address"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeAddress;
