"use client";

import { useEffect } from "react";
import { Form, Input, notification } from "antd";
import { useEditUserProfileMutation, useGetUserProfileQuery } from "@/redux/features/auth/authApi";

interface EditFormValues {
  fullName: string;
  phoneNumber: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

const EditAccount = () => {
  const [form] = Form.useForm<EditFormValues>();
  const [api, contextHolder] = notification.useNotification();

  const { data: userData, isLoading: isLoadingProfile, isError } = useGetUserProfileQuery(undefined);
  const [editProfile, { isLoading: isUpdating }] = useEditUserProfileMutation();

  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      form.setFieldsValue({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zip: user.address?.zip || "",
      });
    }
  }, [userData, form]);

  const onFinish = async (values: EditFormValues) => {
    try {
      await editProfile({ fullName: values.fullName, phoneNumber: values.phoneNumber }).unwrap();
      api.open({
        type: "success",
        message: "Profile Updated",
        description: "Your profile is updated successfully!",
        placement: "topRight",
      });
      window.location.reload();
    } catch{
      api.open({
        type: "error",
        message: "Update Failed",
        description: "Failed to update profile. Please try again.",
        placement: "topRight",
      });
    }
  };





  if (isLoadingProfile) return <p className="text-white">Loading...</p>;
  if (isError || !userData?.data) return <p className="text-white">Failed to load user data.</p>;

  const user = userData.data;

  return (
    <div className="space-y-8 bg-white  dark:bg-black p-6 rounded-md">
      {contextHolder}
      <h2 className="text-xl font-medium dark:text-white">Edit Account</h2>

      <Form<EditFormValues>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="space-y-4"
      >
        {/* Full Name */}
        <Form.Item
          label={<span className="dark:text-white">Full Name</span>}
          name="fullName"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            className="h-12 bg-white text-black dark:bg-white dark:text-black !//disabled:bg-white !//disabled:text-black"
            placeholder="Enter your full name"
          />
        </Form.Item>

        {/* Email */}
        <Form.Item label={<span className="dark:text-white">Email</span>}>
          <Input
            value={user.email}
            // //disabled
            className="h-12 bg-white text-black dark:bg-white dark:text-black cursor-not-allowed !//disabled:bg-white !//disabled:text-black"
          />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          label={<span className="dark:text-white">Phone Number</span>}
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { pattern: /^\+?\d{10,15}$/, message: "Please enter a valid phone number!" },
          ]}
        >
          <Input
            className="h-12 bg-white text-black dark:bg-white dark:text-black !//disabled:bg-white !//disabled:text-black"
            placeholder="Enter your phone number"
          />
        </Form.Item>

        {/* Address (optional, //disabled) */}
 

        {/* Submit Button */}
        <Form.Item className="mt-6">
          <button
            type="submit"
            //disabled={isUpdating}
            className="bg-primary w-full py-3 rounded-md cursor-pointer text-white //disabled:text-white //disabled:bg-gray-500 //disabled:opacity-80"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAccount;
