"use client";
import { JSX, useState, useEffect } from "react";
import { Form, Input, notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";
import { useTranslations } from "next-intl";

interface SetNewPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function SetNewPassword(): JSX.Element {
  const [form] = Form.useForm<SetNewPasswordFormValues>();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); 
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();


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

        localStorage.removeItem("otpToken"); 
        router.push("/auth/login");
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


  const criteria = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "Contains uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "Contains lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
    { label: "Contains number", test: (pw: string) => /[0-9]/.test(pw) },
    { label: "Contains special character (!@#$%^&*)", test: (pw: string) => /[!@#$%^&*]/.test(pw) },
    { label: "No spaces", test: (pw: string) => !/\s/.test(pw) }
  ];
  const t = useTranslations('setNewPassword')
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#24292e] p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white dark:bg-[#32373b] px-6 md:px-14 py-10 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-black dark:text-white">   {t('setNewPassword')}</h1>
        </div>

        <Form<SetNewPasswordFormValues>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={t('newPassword')}
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
                message:
                  "Password must be at least 8 characters, include uppercase, lowercase, number, and special character, no spaces."
              }
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter new password"
              className="h-10"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <div className="mb-4 ml-2">
            {criteria.map((c, idx) => {
              const passed = c.test(password);
              return (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                      passed ? "bg-green-500 text-black dark:text-white" : "border-gray-400 text-black dark:text-white"
                    }`}
                  >
                    {passed ? "✓" : ""}
                  </span>
                  <span className={`${passed ? "text-green-600" : "text-gray-600"}`}>
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>

          <Form.Item
            label={t('confirmPassword')}
            name="confirmPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                }
              })
            ]}
          >
            <Input.Password placeholder="Confirm new password" className="h-10" />
          </Form.Item>

          <Form.Item className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary w-full py-2 rounded-md text-black dark:text-white cursor-pointer hover:bg-primary/90 transition"
            >
              {isLoading ? "Updating..." : `${t('updateButton')}`}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
