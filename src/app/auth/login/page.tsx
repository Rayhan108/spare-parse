"use client"
import { JSX } from "react"
import { Form, Input } from "antd"
import { FaFacebook } from "react-icons/fa"
import type React from "react"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"


interface LogInFormValues {
    email: string
    password: string
}

export default function LogInForm(): JSX.Element {
    const [form] = Form.useForm<LogInFormValues>()

    const onFinish = (values: LogInFormValues): void => {
        console.log("Success:", values)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14  py-10 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">SIGN UP</h1>
                </div>

                <Form<LogInFormValues> form={form} name="signup" layout="vertical" onFinish={onFinish} autoComplete="off">

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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            className="h-10"
                        />
                    </Form.Item>

                    <div className=" flex justify-end -mt-2 mb-6 text-black">
                        <Link className=" text-black" href={"/auth/forget-password"}>Forgot Password?</Link>
                    </div>

                    <Form.Item className="mt-6">
                        <Link href={'/'}>
                            <button
                                className=" bg-primary  w-full py-2 rounded-md cursor-pointer text-white"
                            >
                                Log In
                            </button>
                        </Link>
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

                <div className="text-center mt-4">
                    <span className="text-sm">
                        Don’t have an account?{" "}
                        <Link href="/auth/sign-up" className="text-primary">
                            Sign Up
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
