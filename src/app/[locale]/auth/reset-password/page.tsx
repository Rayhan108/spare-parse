"use client"
import { useRouter } from "next/navigation"
import { JSX, FC } from "react"
import { Form, Input, notification } from "antd"
import { useChangePasswordMutation } from "@/redux/features/auth/authApi"

interface ResetPasswordFormValues {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

interface ChangePasswordResponse {
    success: boolean
    statusCode: number
    message: string
}

interface ChangePasswordError {
    data?: {
        message?: string
    }
}

const ResetPassword: FC = (): JSX.Element => {
    const router = useRouter()
    const [form] = Form.useForm<ResetPasswordFormValues>()
    const [api, contextHolder] = notification.useNotification()
    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const onFinish = async (values: ResetPasswordFormValues) => {
        if (values.newPassword !== values.confirmPassword) {
            api.error({
                message: "Password Mismatch",
                description: "New password and confirm password do not match",
                placement: "topRight",
            })
            return
        }

        try {
            const response: ChangePasswordResponse = await changePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            }).unwrap()

            if (response.success) {
                api.success({
                    message: "Password Changed",
                    description: response.message,
                    placement: "topRight",
                    duration: 2, 
                })
     
                setTimeout(() => {
                    router.push("/auth/otp-verify-forgotpassword") 
                }, 2000)
            } else {
                api.error({
                    message: "Failed",
                    description: response.message || "Could not reset password",
                    placement: "topRight",
                })
            }

            form.resetFields()
        } catch (error: unknown) {
            const typedError = error as ChangePasswordError
            api.error({
                message: "Failed",
                description: typedError.data?.message || "Could not reset password",
                placement: "topRight",
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            {contextHolder}
            <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-10 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Reset Password</h1>
                    <p className="mt-2 text-gray-500">
                        Create a new password. Ensure it differs from previous ones for security
                    </p>
                </div>

                <Form<ResetPasswordFormValues>
                    form={form}
                    name="resetPassword"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Old Password"
                        name="oldPassword"
                        rules={[{ required: true, message: "Please enter your old password" }]}
                    >
                        <Input.Password placeholder="Enter old password" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[{ required: true, message: "Please enter your new password" }]}
                    >
                        <Input.Password placeholder="Enter new password" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: "Please confirm your password" }]}
                    >
                        <Input.Password placeholder="Confirm new password" className="h-10" />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary w-full py-2 rounded-md cursor-pointer text-white mt-3"
                        >
                            {isLoading ? "Processing..." : "RESET PASSWORD"}
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ResetPassword