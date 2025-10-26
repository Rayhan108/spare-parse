// "use client";
// import { JSX } from "react";
// import { Form, Input, notification } from "antd";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";

// interface UpdatePasswordFormValues {
//   newPassword: string;
//   confirmPassword: string;
// }

// export default function UpdatePasswordForm(): JSX.Element {
//   const [form] = Form.useForm<UpdatePasswordFormValues>();
//   const [api, contextHolder] = notification.useNotification();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email: string | null = searchParams.get("email"); // from query param

//   const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

//   const onFinish = async (values: UpdatePasswordFormValues) => {
//     if (!email) {
//       api.open({
//         type: "error",
//         message: "Missing Email",
//         description: "Email parameter is missing from the URL.",
//         placement: "topRight",
//       });
//       return;
//     }

//     if (values.newPassword !== values.confirmPassword) {
//       api.open({
//         type: "error",
//         message: "Password Mismatch",
//         description: "New password and confirm password do not match.",
//         placement: "topRight",
//       });
//       return;
//     }

//     try {
//       const res = await updatePassword({ email, password: values.newPassword }).unwrap();

//       if (res.success) {
//         api.open({
//           type: "success",
//           message: "Password Updated",
//           description: res.message || "Your password has been updated successfully.",
//           placement: "topRight",
//         });
//         router.push("/auth/login"); // redirect to login
//       }
//     } catch (error: any) {
//       api.open({
//         type: "error",
//         message: error?.data?.message || "Update Failed",
//         description: "Could not update password. Please try again.",
//         placement: "topRight",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
//       {contextHolder}
//       <div className="w-full max-w-lg shadow-md bg-white px-6 md:px-14 py-10 rounded-lg">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-semibold">Update Password</h1>
//         </div>

//         <Form<UpdatePasswordFormValues>
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="New Password"
//             name="newPassword"
//             rules={[{ required: true, message: "Please enter your new password!" }]}
//           >
//             <Input.Password placeholder="Enter new password" className="h-10" />
//           </Form.Item>

//           <Form.Item
//             label="Confirm Password"
//             name="confirmPassword"
//             rules={[{ required: true, message: "Please confirm your new password!" }]}
//           >
//             <Input.Password placeholder="Confirm new password" className="h-10" />
//           </Form.Item>

//           <Form.Item className="mt-6">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-primary w-full py-2 rounded-md text-white cursor-pointer hover:bg-primary/90 transition"
//             >
//               {isLoading ? "Updating..." : "Update Password"}
//             </button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }




"use client";
import { JSX, useEffect, useState } from "react";
import { Form, Input, notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";

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

  // Get OTP token from localStorage
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

        // Remove OTP token after successful update
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white px-6 md:px-14 py-10 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Update Password</h1>
        </div>

        <Form<UpdatePasswordFormValues>
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
