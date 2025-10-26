"use client";
import { JSX, useState, useEffect } from "react";
import { Form, Input, notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";

interface SetNewPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function SetNewPassword(): JSX.Element {
  const [form] = Form.useForm<SetNewPasswordFormValues>();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email"); // get email from query param
  const [otpToken, setOtpToken] = useState<string | null>(null);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  // Load otpToken from localStorage
  useEffect(() => {
    const token = localStorage.getItem("otpToken");
    if (token) setOtpToken(token);
  }, []);

  const onFinish = async (values: SetNewPasswordFormValues) => {
    if (!email) {
      api.error({
        message: "Missing Email",
        description: "Email parameter is missing from URL",
        placement: "topRight",
      });
      return;
    }

    if (!otpToken) {
      api.error({
        message: "Missing OTP Token",
        description: "Cannot update password without OTP verification",
        placement: "topRight",
      });
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      api.error({
        message: "Password Mismatch",
        description: "New password and confirm password do not match",
        placement: "topRight",
      });
      return;
    }

    try {
      const res = await updatePassword({
        email,
        password: values.newPassword,
        otpToken,
      }).unwrap();

      if (res.success) {
        api.success({
          message: "Password Updated",
          description: res.message || "Your password has been updated successfully",
          placement: "topRight",
        });

        localStorage.removeItem("otpToken"); // remove OTP token after success
        router.push("/auth/login"); // redirect to login page
      }
    } catch (error: unknown) {
      api.error({
        message:
          typeof error === "object" &&
            error !== null &&
            "data" in error &&
            typeof (error as { data: { message?: string } }).data.message === "string"
            ? (error as { data: { message: string } }).data.message
            : "Update Failed",
        description: "Could not update password. Please try again.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white px-6 md:px-14 py-10 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Set New Password</h1>
        </div>

        <Form<SetNewPasswordFormValues>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password placeholder="Enter new password" className="h-10" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your new password!" }]}
          >
            <Input.Password placeholder="Confirm new password" className="h-10" />
          </Form.Item>

          <Form.Item className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary w-full py-2 rounded-md text-white cursor-pointer hover:bg-primary/90 transition"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
