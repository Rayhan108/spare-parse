// // "use client"
// // import { JSX } from "react"
// // import { Form, Input, notification } from "antd"
// // import { useForgetPasswordMutation } from "@/redux/features/auth/authApi"
// // import { useRouter } from "next/navigation"

// // interface ForgetPasswordFormValues {
// //     email: string
// // }

// // export default function ForgetPassword(): JSX.Element {
// //     const [form] = Form.useForm<ForgetPasswordFormValues>()
// //     const [api, contextHolder] = notification.useNotification()
// //     const router = useRouter()
// //     const [forgetPassword, { isLoading }] = useForgetPasswordMutation()

// //     const onFinish = async (values: ForgetPasswordFormValues): Promise<void> => {
// //         try {
// //             const response = await forgetPassword({ email: values.email }).unwrap()

// //             // Store OTP token in sessionStorage for later verification
// //             if (response.data?.otpToken) {
// //                 sessionStorage.setItem("otpToken", response.data.otpToken)
// //             }

// //             api.success({
// //                 message: "OTP Sent",
// //                 description: `OTP has been sent to your email. Please check your inbox.`,
// //                 placement: "topRight",
// //             })

// //             // Redirect to OTP verification page
// //             router.push(`/auth/otp-verify?email=${values.email}`)
// //         } catch (error: unknown) {
// //             const typedError = error as { data?: { message?: string } }
// //             api.error({
// //                 message: "Failed",
// //                 description: typedError.data?.message || "Could not send OTP",
// //                 placement: "topRight",
// //             })
// //         }
// //     }

// //     return (
// //         <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
// //             {contextHolder}
// //             <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-10 rounded-lg">
// //                 <div className="text-center mb-6">
// //                     <h1 className="text-2xl font-semibold">Forget Password?</h1>
// //                     <p className="mt-2 text-gray-500">Please enter your email to get verification code</p>
// //                 </div>

// //                 <Form<ForgetPasswordFormValues>
// //                     form={form}
// //                     name="forgetPassword"
// //                     layout="vertical"
// //                     onFinish={onFinish}
// //                     autoComplete="off"
// //                 >
// //                     <Form.Item
// //                         label="Email"
// //                         name="email"
// //                         rules={[
// //                             { required: true, message: "Please input your email!" },
// //                             { type: "email", message: "Please enter a valid email!" },
// //                         ]}
// //                     >
// //                         <Input placeholder="Enter your email" className="h-10" />
// //                     </Form.Item>

// //                     <Form.Item className="mt-6">
// //                         <button
// //                             type="submit"
// //                             disabled={isLoading}
// //                             className="bg-primary w-full py-2 rounded-md cursor-pointer text-white"
// //                         >
// //                             {isLoading ? "Sending..." : "CONTINUE"}
// //                         </button>
// //                     </Form.Item>
// //                 </Form>
// //             </div>
// //         </div>
// //     )
// // }



// "use client";
// import { JSX } from "react";
// import { Form, Input, notification } from "antd";
// import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
// import { useRouter } from "next/navigation";

// interface ForgetPasswordFormValues {
//   email: string;
// }

// export default function ForgetPassword(): JSX.Element {
//   const [form] = Form.useForm<ForgetPasswordFormValues>();
//   const [api, contextHolder] = notification.useNotification();
//   const router = useRouter();
//   const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

//   const onFinish = async (values: ForgetPasswordFormValues) => {
//     try {
//       const response = await forgetPassword({ email: values.email }).unwrap();

//       if (response.success && response.data?.otpToken) {
//         // Save OTP token
//         localStorage.setItem("otpToken", response.data.otpToken);

//         api.success({
//           message: "OTP Sent",
//           description: "Check your email for the verification code.",
//           placement: "topRight",
//         });

//         // Redirect to OTP verification page
//         router.push(`/auth/otp-verify-forgotpassword?email=${values.email}`);
//       } else {
//         api.error({
//           message: "Failed",
//           description: response.message || "Unable to send OTP",
//           placement: "topRight",
//         });
//       }
//     } catch (error: unknown) {
//       api.error({
//         message: "Error",
//         description: (error as any)?.data?.message || "Something went wrong",
//         placement: "topRight",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
//       {contextHolder}
//       <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-10 rounded-lg">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-semibold">Forget Password?</h1>
//           <p className="mt-2 text-gray-500">
//             Enter your email to receive a verification code
//           </p>
//         </div>

//         <Form<ForgetPasswordFormValues>
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please enter your email!" },
//               { type: "email", message: "Please enter a valid email!" },
//             ]}
//           >
//             <Input placeholder="Enter your email" className="h-10" />
//           </Form.Item>

//           <Form.Item>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-primary w-full py-2 rounded-md text-white"
//             >
//               {isLoading ? "Processing..." : "CONTINUE"}
//             </button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }

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
        // ✅ Save OTP token in localStorage
        localStorage.setItem("otpToken", response.data.otpToken);

        api.success({
          message: "OTP Sent",
          description: "Check your email for the verification code.",
          placement: "topRight",
        });

        // Redirect to OTP verification page
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
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-10 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Forget Password?</h1>
          <p className="mt-2 text-gray-500">
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

