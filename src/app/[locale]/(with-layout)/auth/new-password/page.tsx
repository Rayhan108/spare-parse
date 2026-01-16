"use client";
import { JSX, useEffect, useState } from "react";
import { Form, Input, notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";
import { useTranslations } from "next-intl";

interface UpdatePasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

type ApiError = {
  data?: {
    message?: string;
  };
};

export default function UpdatePasswordForm(): JSX.Element {
  const [form] = Form.useForm<UpdatePasswordFormValues>();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email: string | null = searchParams.get("email");
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();


  useEffect(() => {
    const token = localStorage.getItem("otpToken");
    setOtpToken(token);
  }, []);

  const getErrorMessage = (error: unknown): string => {
    if (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as ApiError).data?.message === "string"
    ) {
      return (error as ApiError).data!.message!;
    }
    return "Something went wrong";
  };

  const onFinish = async (values: UpdatePasswordFormValues) => {
    if (!email) {
      api.error({
        message: "Missing Email",
        description: "Email parameter is missing from the URL.",
        placement: "topRight",
      });
      return;
    }

    if (!otpToken) {
      api.error({
        message: "OTP Token Missing",
        description: "Cannot update password without OTP verification.",
        placement: "topRight",
      });
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      api.error({
        message: "Password Mismatch",
        description: "New password and confirm password do not match.",
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
          description: res.message || "Your password has been updated successfully.",
          placement: "topRight",
        });

        localStorage.removeItem("otpToken");

        router.push("/auth/login");
      }
    } catch (error: unknown) {
      api.error({
        message: getErrorMessage(error),
        description: "Could not update password. Please try again.",
        placement: "topRight",
      });
    }
  };
  const t = useTranslations('updatePassword')
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#24292e] p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white dark:bg-[#32373b] px-6 md:px-14 py-10 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl text-black dark:text-white font-semibold">{t('updatePassword')}</h1>
        </div>

        <Form<UpdatePasswordFormValues>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={t('newPassword')}
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password placeholder="Enter new password" className="h-10" />
          </Form.Item>

          <Form.Item
            label={t('confirmPassword')}
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your new password!" }]}
          >
            <Input.Password placeholder="Confirm new password" className="h-10" />
          </Form.Item>

          <Form.Item className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary w-full py-2 rounded-md text-black dark:text-white cursor-pointer hover:bg-primary/90 transition"
            >
              {isLoading ? `${t('updatingButton')}` : `${t('updateButton')}`}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
