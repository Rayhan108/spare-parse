"use client"
import { JSX } from "react"
import { Form, Input, notification } from "antd"
import { FaFacebook } from "react-icons/fa"
import type React from "react"
import { FcGoogle } from "react-icons/fc"
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
    const [api, contextHolder] = notification.useNotification();

    const [SignUp, { isLoading }] = useSignUpMutation();
    const router = useRouter();
    const [form] = Form.useForm<SignUpFormValues>()

    const onFinish = (values: SignUpFormValues) => {
        const signData = {
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            role: "BUYER",
            password: values.password,
            isSocialLogin: false
        }
        const formData = new FormData();
        formData.append('data', JSON.stringify(signData))

        SignUp(formData).unwrap()
            .then((data) => {
                console.log(data);
                api.open({
                    type: 'success',
                    message: 'Sign Up',
                    description: 'Sign Up successfully!',
                    placement: 'topRight',
                });

                router.push(`/auth/opt-verify?email=${values.email}`)

            })

            .catch((error) => {
                api.open({
                    type: 'error',
                    message: error?.data?.message,
                    description: 'Sign Up failed. Please try again.',
                    placement: 'topRight',
                });
            })
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            {contextHolder}
            <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14  py-10 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">SIGN UP</h1>
                </div>

                <Form<SignUpFormValues> form={form} name="signup" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: "Please input your full name!" }]}
                    >
                        <Input placeholder="Enter your full name" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: "Please input your phone number!" }]}
                    >
                        <Input placeholder="Enter your mobile number" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            className="h-10"
                        />
                    </Form.Item>

                    <Form.Item className="mt-6">
                        <button
                            disabled={isLoading}
                            className=" bg-primary  w-full py-2 rounded-md cursor-pointer text-white"
                        >
                            {isLoading ? "Loading..." : "SIGN UP"}
                        </button>
                    </Form.Item>
                </Form>

                <div className="mt-4">
                    <button
                        className=" w-full flex items-center justify-center border border-[#00000066] py-1 rounded-md mb-4 cursor-pointer"
                        onClick={(): void => console.log("Google sign up clicked")}
                    >
                        <FcGoogle size={25} className="mr-2" /> Sign up with Google
                    </button>

                    <button
                        className=" w-full flex items-center justify-center border border-[#00000066] py-1 rounded-md cursor-pointer "
                        onClick={(): void => console.log("Facebook sign up clicked")}
                    >
                        <FaFacebook size={25} className="mr-2 text-[#0689ff]" /> Sign up with Facebook
                    </button>
                </div>

                <div className="text-center mt-4 flex flex-col gap-1.5">
                    <span className="text-sm">
                        Already have an account?
                        <Link href="/auth/login" className="text-primary ml-1">
                            Log in
                        </Link>
                    </span>
                    <span className="text-sm">
                        Want to become a seller?
                        <Link href="/auth/sign-up/seller" className="text-primary ml-1">
                            Seller Sign Up
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
