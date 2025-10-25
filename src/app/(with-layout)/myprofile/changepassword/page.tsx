// "use client";
// import Link from "next/link";
// import { Form, Input } from "antd";

// const ChangePassword = () => {
//     interface ChangePasswordFormValues {
//         currentPassword: string;
//         newPassword: string;
//         confirmNewPassword: string;
//     }

//     const [form] = Form.useForm<ChangePasswordFormValues>();

//     const onFinish = (values: ChangePasswordFormValues): void => {
//         console.log("Success:", values);
//     };

//     return (
//         <div className="space-y-8">
//             <h2 className="text-xl font-medium">Change Password</h2>

//             <Form<ChangePasswordFormValues>
//                 form={form}
//                 name="changePassword"
//                 layout="vertical"
//                 onFinish={onFinish}
//                 autoComplete="off"
//             >
//                 <Form.Item
//                     label={<p className="dark:text-white">Current Password</p>}
//                     name="currentPassword"
//                     rules={[{ required: true, message: "Please enter your current password!" }]}
//                 >
//                     <Input.Password placeholder="Enter current password" className="h-12" />
//                 </Form.Item>

//                 <Form.Item
//                     label={<p className="dark:text-white">New Password</p>}
//                     name="newPassword"
//                     rules={[{ required: true, message: "Please enter your new password!" }]}
//                 >
//                     <Input.Password placeholder="Enter new password" className="h-12" />
//                 </Form.Item>

//                 <Form.Item
//                     label={<p className="dark:text-white">Confirm New Password</p>}
//                     name="confirmNewPassword"
//                     dependencies={['newPassword']}
//                     rules={[
//                         { required: true, message: "Please confirm your new password!" },
//                         ({ getFieldValue }) => ({
//                             validator(_, value) {
//                                 if (!value || getFieldValue('newPassword') === value) {
//                                     return Promise.resolve();
//                                 }
//                                 return Promise.reject(new Error("Passwords do not match!"));
//                             },
//                         }),
//                     ]}
//                 >
//                     <Input.Password placeholder="Confirm new password" className="h-12" />
//                 </Form.Item>

//                 <Form.Item className="mt-6">
//                     <Link href="/">
//                         <button className="bg-primary w-full py-3 rounded-md cursor-pointer text-white">
//                             Change Password
//                         </button>
//                     </Link>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default ChangePassword;



"use client";
import { FC } from "react";
import { Form, Input, notification } from "antd";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

interface ChangePasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface ChangePasswordResponse {
    success: boolean;
    statusCode: number;
    message: string;
}

interface ChangePasswordError {
    data?: {
        message?: string;
    };
}

const ChangePassword: FC = () => {
    const [form] = Form.useForm<ChangePasswordFormValues>();
    const [api, contextHolder] = notification.useNotification();
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onFinish = async (values: ChangePasswordFormValues) => {
        if (values.newPassword !== values.confirmNewPassword) {
            api.error({
                message: "Password Mismatch",
                description: "New password and confirm password do not match",
                placement: "topRight",
            });
            return;
        }

        try {
            const response: ChangePasswordResponse = await changePassword({
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
            }).unwrap();

            if (response.success) {
                api.success({
                    message: "Password Changed",
                    description: response.message,
                    placement: "topRight",
                });
                form.resetFields();
            } else {
                api.error({
                    message: "Failed",
                    description: response.message || "Could not change password",
                    placement: "topRight",
                });
            }
        } catch (error: unknown) {
            const typedError = error as ChangePasswordError;
            api.error({
                message: "Error",
                description: typedError.data?.message || "Failed to change password",
                placement: "topRight",
            });
        }
    };

    return (
        <div className="space-y-8">
            {contextHolder}
            <h2 className="text-xl font-medium">Change Password</h2>

            <Form<ChangePasswordFormValues>
                form={form}
                name="changePassword"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label={<p className="dark:text-white">Current Password</p>}
                    name="currentPassword"
                    rules={[{ required: true, message: "Please enter your current password!" }]}
                >
                    <Input.Password placeholder="Enter current password" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">New Password</p>}
                    name="newPassword"
                    rules={[{ required: true, message: "Please enter your new password!" }]}
                >
                    <Input.Password placeholder="Enter new password" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">Confirm New Password</p>}
                    name="confirmNewPassword"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: "Please confirm your new password!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match!"));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm new password" className="h-12" />
                </Form.Item>

                <Form.Item className="mt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary w-full py-3 rounded-md cursor-pointer text-white"
                    >
                        {isLoading ? "Processing..." : "Change Password"}
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
