"use client"
import { Breadcrumb, ConfigProvider, Form, FormProps, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {

    type FieldType = {
        name?: string;
        email?: string;
        phone?: string;
        message?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className=" relative px-3 md:px-0">
            <div className=" container mx-auto py-16 ">
                <div>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link href="/">Home</Link>,
                            },
                            {
                                title: <Link href="/contact">Contact</Link>,
                            }
                        ]}
                    />
                </div>
                <div className=" flex flex-col lg:flex-row gap-10 mt-10">
                    <div className=" w-full lg:w-[33%] xl:w-[27%] shadow-lg px-10 py-10 rounded-md">
                        <div className="border-b">
                            <div className=" flex gap-4 items-center">
                                <FiPhone className=" bg-primary text-white p-2 rounded-full " size={40} />
                                <p className=" font-semibold text-xl">Call To Us</p>
                            </div>
                            <p className=" text-lg py-5">We are available From Saturday to Thursday
                                From 8 am to 4 pm </p>
                            <p className=" text-lg pt-0 pb-7 ">Phone: +8801611112222</p>
                        </div>
                        <div className=" mt-8">
                            <div className=" flex gap-4 items-center">
                                <MdOutlineEmail className=" bg-primary text-white p-2 rounded-full " size={40} />
                                <p className=" font-semibold text-xl">Write To US</p>
                            </div>
                            <p className=" text-lg py-6">Fill out our form and we will contact you within 24 hours.</p>
                            <p className=" text-lg pt-0 pb-6">Emails: customer@exclusive.com</p>
                            <p className=" text-lg pt-0 pb-7">Emails: support@exclusive.com</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-[67%] xl:w-[70%] shadow-lg px-8 py-5 rounded-md">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        colorBgContainer: "#f2fcf6",
                                        "controlHeight": 44,
                                        "colorBorder": "rgba(217,217,217,0)",
                                        "activeBorderColor": "rgba(22,119,255,0)",
                                        "hoverBorderColor": "rgba(64,150,255,0)",
                                    },
                                },
                            }}
                        >
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <div className=" flex gap-5 justify-between items-center">
                                    <Form.Item<FieldType>
                                        // label="name"
                                        name="name"
                                        className=" w-full"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input placeholder="Your Name" className=" w-full" />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        // label="email"
                                        name="email"
                                        className=" w-full"
                                        rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input placeholder="Your Email" className=" w-full" />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        // label="phone"
                                        name="phone"
                                        className=" w-full"
                                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                                    >
                                        <Input placeholder="Your Phone" className=" w-full" />
                                    </Form.Item>
                                </div>

                                <Form.Item<FieldType>
                                    // label="phone"
                                    name="message"
                                    className=" w-full"
                                    rules={[{ required: true, message: 'Please input your message!' }]}
                                >
                                    <TextArea rows={8} placeholder="Your Massage" className=" w-full" />
                                </Form.Item>

                                <div className=" flex justify-end mt-10">
                                    <button className=" bg-primary text-white px-10 md:px-14 py-2 md:py-4 cursor-pointer rounded">
                                        Send Massage
                                    </button>
                                </div>
                            </Form>
                        </ConfigProvider>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;