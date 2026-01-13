"use client"
import { JSX } from "react"
import { Form, Input, notification } from "antd"
import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignUpMutation } from "@/redux/features/auth/authApi"

interface SignUpFormValues {
    fullName: string
    email: string
    phoneNumber: string
    password: string
}

export default function SignUpForm(): JSX.Element {
    const [api, contextHolder] = notification.useNotification()
    const [SignUp, { isLoading }] = useSignUpMutation()
    const router = useRouter()
    const [form] = Form.useForm<SignUpFormValues>()

    const onFinish = (values: SignUpFormValues) => {
        const signData = {
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            role: "BUYER",
            password: values.password,
            isSocialLogin: false,
        }

        SignUp(signData)
            .unwrap()
            .then((data) => {
                // console.log("SignUp Response:", data)

                // ✅ Save OTP token to localStorage
                if (data?.data) {
                    localStorage.setItem("otpToken", data.data)
                }

                api.open({
                    type: 'success',
                    message: 'Sign Up Successful',
                    description: 'OTP sent to your email successfully!',
                    placement: 'topRight',
                })

                // Redirect to OTP verification page
                router.push(`/auth/otp-verify?email=${values.email}`)
            })
            .catch((error) => {
                console.error("SignUp Error:", error)
                api.open({
                    type: 'error',
                    message: error?.data?.message || "Sign Up Failed",
                    description: 'Please try again.',
                    placement: 'topRight',
                })
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#24292e] p-4">
            {contextHolder}
            <div className="w-full max-w-lg shadow-md bg-white dark:bg-[#32373b] px-4 md:px-14 py-10 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">SIGN UP</h1>
                </div>

                {/* <Form<SignUpFormValues>
                    form={form}
                    name="signup"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: "Name is required!" }]}
                    >
                        <Input placeholder="Enter your full name" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Email is required!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: "Phone number is required!" }]}
                    >
                        <Input placeholder="Enter your mobile number" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Password is required!" }]}
                    >
                        <Input.Password placeholder="Enter your password" className="h-10" />
                    </Form.Item>

                    <Form.Item className="mt-6">
                        <button
                            disabled={isLoading}
                            className="bg-primary w-full py-2 rounded-md cursor-pointer text-white"
                        >
                            {isLoading ? "Loading..." : "SIGN UP"}
                        </button>
                    </Form.Item>
                </Form> */}


                <Form<SignUpFormValues>
                    form={form}
                    name="signup"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            { required: true, message: "Full name is required!" },
                            { min: 3, message: "Full name must be at least 3 characters." },
                            { max: 50, message: "Full name cannot exceed 50 characters." },
                            {
                                pattern: /^[A-Za-z\s]+$/,
                                message: "Full name can only contain letters and spaces."
                            }
                        ]}
                    >
                        <Input placeholder="Enter your full name" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Email is required!" },
                            { type: "email", message: "Please enter a valid email!" }
                        ]}
                    >
                        <Input placeholder="Enter your email" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            { required: true, message: "Phone number is required!" },
                            {
                                pattern: /^[0-9]{10,15}$/,
                                message: "Enter a valid phone number."
                            }
                        ]}
                    >
                        <Input placeholder="Enter your mobile number" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Password is required!" },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
                                message:
                                    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character, no spaces."
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Enter your password" className="h-10" />
                    </Form.Item>

                    <Form.Item className="mt-6">
                        <button
                            disabled={isLoading}
                            className="bg-primary w-full py-2 rounded-md cursor-pointer text-black dark:text-white"
                        >
                            {isLoading ? "Loading..." : "SIGN UP"}
                        </button>
                    </Form.Item>
                </Form>


        

                <div className="text-center mt-4 flex flex-col gap-1.5">
                    <span className="text-sm">
                        Already have an account?
                        <Link href="/auth/login" className="text-primary ml-1">
                            Log in
                        </Link>
                    </span>
                    {/* <span className="text-sm">
                        Want to become a seller?
                        <Link href="/auth/sign-up/seller" className="text-primary ml-1">
                            Seller Sign Up
                        </Link>
                    </span> */}
                </div>
            </div>
        </div>
    )
}
