/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { JSX, useState } from "react"
import { ConfigProvider, Form, Input, notification } from "antd"
import { FaFacebook } from "react-icons/fa"
import type React from "react"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"

import { Button, Upload } from 'antd';
import { MdOutlineFileUpload } from "react-icons/md"
import { useSignUpMutation } from "@/redux/features/auth/authApi"
import { useRouter } from "next/navigation"

interface SignUpFormValues {
    fullName: string
    email: string
    phoneNumber: string
    password: string
}

export default function SellerSignUp(): JSX.Element {
    const [form] = Form.useForm<SignUpFormValues>()
    const [api, contextHolder] = notification.useNotification();
    const [SignUp, { isLoading }] = useSignUpMutation();
    const router = useRouter();
    const [businessCertificate, setBusinessCertificate] = useState(null);
    const [NISCopy, setNISCopy] = useState(null);


    const onFinish = (values: SignUpFormValues) => {
        const signData = {
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            role: "SELLER",
            password: values.password,
            isSocialLogin: false
        }
        const formData = new FormData();
        formData.append('data', JSON.stringify(signData))
        if (businessCertificate) {
            formData.append('businessCertificate', businessCertificate)
        }
        if (NISCopy) {
            formData.append('nisCopy', NISCopy)
        }

        SignUp(formData).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((data) => {
                // console.log(data);
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

    const handleBusinessCertificateUpload = (e: any) => {
        setBusinessCertificate(e.file.originFileObj);
    };

    const handleNISCopyUpload = (e: any) => {
        setNISCopy(e.file.originFileObj);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#24292e] p-4">
            {contextHolder}
            <div className="w-full max-w-lg shadow-md bg-white dark:bg-[#32373b] px-4 md:px-14  py-10 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-black dark:text-white">SIGN UP AS A SELLER</h1>
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

                    <Form.Item
                        label="Business Certificate"
                        name="businessCertificate"
                        rules={[{ required: true, message: "Please upload your business certificate!" }]}
                    >
                        <Upload
                            onChange={handleBusinessCertificateUpload}
                            className="w-full"
                        >
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            colorText: "#f56100",
                                            colorPrimary: "#f56100",
                                            "defaultActiveBorderColor": "rgb(245,97,0)",
                                            "defaultActiveColor": "rgb(245,97,0)",
                                            "defaultHoverBorderColor": "rgb(245,97,0)",
                                            "defaultHoverColor": "rgb(245,97,0)",
                                            "groupBorderColor": "rgb(245,97,0)",
                                            "colorBorder": "rgb(245,97,0)"
                                        },
                                    },
                                }}
                            >
                                <Button block icon={<MdOutlineFileUpload />}>Upload</Button>
                            </ConfigProvider>

                        </Upload>

                    </Form.Item>

                    <Form.Item
                        label="NIS Copy"
                        name="nisCopy"
                        rules={[{ required: true, message: "Please upload your nis copy!" }]}
                    >
                        <Upload
                            onChange={handleNISCopyUpload}
                            className="w-full"
                        >
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            colorText: "#f56100",
                                            colorPrimary: "#f56100",
                                            "defaultActiveBorderColor": "rgb(245,97,0)",
                                            "defaultActiveColor": "rgb(245,97,0)",
                                            "defaultHoverBorderColor": "rgb(245,97,0)",
                                            "defaultHoverColor": "rgb(245,97,0)",
                                            "groupBorderColor": "rgb(245,97,0)",
                                            "colorBorder": "rgb(245,97,0)"
                                        },
                                    },
                                }}
                            >
                                <Button block icon={<MdOutlineFileUpload />}>Upload</Button>
                            </ConfigProvider>

                        </Upload>

                    </Form.Item>

                    <Form.Item className="mt-6">
                        <button
                            className=" bg-primary  w-full py-2 rounded-md cursor-pointer text-black dark:text-white"
                        >
                            {isLoading ? "Loading..." : "SIGN UP"}
                        </button>
                    </Form.Item>
                </Form>

                <div className="mt-4">
                    <button
                        className=" w-full flex items-center justify-center border border-[#00000066] py-1 rounded-md mb-4 cursor-pointer"
                        // onClick={(): void => console.log("Google sign up clicked")}
                    >
                        <FcGoogle size={25} className="mr-2 text-black dark:text-white" /> Sign up with Google
                    </button>

                    <button
                        className=" w-full flex items-center justify-center border border-[#00000066] py-1 rounded-md cursor-pointer "
                        // onClick={(): void => console.log("Facebook sign up clicked")}
                    >
                        <FaFacebook size={25} className="mr-2 text-[#0689ff] " /> Sign up with Facebook
                    </button>
                </div>

                <div className="text-center mt-4">
                    <span className="text-sm text-black dark:text-white">
                        Already have an account?
                        <Link href="/auth/login" className="text-black dark:text-white ml-1">
                            Log in
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
