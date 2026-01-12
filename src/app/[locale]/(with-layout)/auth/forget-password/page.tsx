"use client";
import { JSX } from "react";
import { Form, Input, notification } from "antd";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

interface ForgetPasswordFormValues {
  email: string;
}

export default function ForgetPassword(): JSX.Element {
  const [form] = Form.useForm<ForgetPasswordFormValues>();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const onFinish = async (values: ForgetPasswordFormValues) => {
    try {
      const response = await forgetPassword({ email: values.email }).unwrap();

      if (response.success && response.data?.otpToken) {
        localStorage.setItem("otpToken", response.data.otpToken);

        api.success({
          message: "OTP Sent",
          description: "Check your email for the verification code.",
          placement: "topRight",
        });

        router.push(`/auth/otp-verify-forgotpassword?email=${values.email}`);
      } else {
        api.error({
          message: "Failed",
          description: response.message || "Unable to send OTP",
          placement: "topRight",
        });
      }
    } catch (error: unknown) {
      api.error({
        message: "Error",
        description:
          typeof error === "object" &&
            error !== null &&
            "data" in error &&
            typeof (error as { data?: { message?: string } }).data?.message === "string"
            ? (error as { data: { message: string } }).data.message
            : "Something went wrong",

        placement: "topRight",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#24292e] p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white dark:bg-[#32373b] px-4 md:px-14 py-10 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl  text-black dark:text-white font-semibold">Forget Password?</h1>
          <p className="mt-2  text-black dark:text-white">
            Enter your email to receive a verification code
          </p>
        </div>

        <Form<ForgetPasswordFormValues>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" className="h-10" />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary w-full py-2 rounded-md text-white"
            >
              {isLoading ? "Processing..." : "CONTINUE"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

