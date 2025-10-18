"use client";

import { useEffect } from "react";
import { Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEditAdminProfileMutation } from "@/redux/features/auth/authApi";

const EditAccount = () => {
  interface EditFormValues {
    userName: string;
    email: string;
    phone: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  }

  const [form] = Form.useForm<EditFormValues>();
  const user = useSelector((state: RootState) => state.logInUser.user);

  const [editProfile, { isLoading }] = useEditAdminProfileMutation();

  // Prefill form with existing user data
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userName: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zip: user.address?.zip || "",
      });
    }
  }, [user, form]);

  const onFinish = async (values: EditFormValues) => {
    try {
      await editProfile(values).unwrap();
      message.success("Profile updated successfully!");
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to update profile.");
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-red-600">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-medium">Edit Account</h2>

      <Form<EditFormValues>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Full Name */}
        <Form.Item
          label="Full Name"
          name="userName"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your full name" className="h-12" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" className="h-12" />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^\+?\d{10,15}$/,
              message: "Please enter a valid phone number!",
            },
          ]}
        >
          <Input placeholder="Enter your phone number" className="h-12" />
        </Form.Item>

        {/* Address */}
        <h3 className="text-lg font-medium mt-4">Address</h3>

        <Form.Item label="Street" name="street">
          <Input placeholder="Street" className="h-12" />
        </Form.Item>

        <Form.Item label="City" name="city">
          <Input placeholder="City" className="h-12" />
        </Form.Item>

        <Form.Item label="State" name="state">
          <Input placeholder="State" className="h-12" />
        </Form.Item>

        <Form.Item label="ZIP Code" name="zip">
          <Input placeholder="ZIP Code" className="h-12" />
        </Form.Item>

        <Form.Item className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary w-full py-3 rounded-md cursor-pointer text-white disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAccount;
