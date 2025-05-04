"use client"
import { JSX } from "react"
import { Form, Input } from "antd"
import type React from "react"
import Link from "next/link"


interface LogInFormValues {
    email: string
}

export default function ForgetPassword(): JSX.Element {
    const [form] = Form.useForm<LogInFormValues>()

    const onFinish = (values: LogInFormValues): void => {
        console.log("Success:", values)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14  py-10 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Forget Password?</h1>
                    <p className=" mt-2 text-gray-500">Please enter your email to get verification code</p>
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
                    <Form.Item className="mt-6">
                        <Link href={'/auth/opt-verify'}>
                            <button
                                className=" bg-primary  w-full py-2 rounded-md cursor-pointer text-white"
                            >
                                CONTINUE
                            </button>
                        </Link>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}
