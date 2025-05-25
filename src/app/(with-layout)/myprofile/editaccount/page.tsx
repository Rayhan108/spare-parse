"use client";
import Link from "next/link";
import { Form, Input } from "antd"

const EditAccount = () => {

    interface LogInFormValues {
        name: string
        email: string
        number: string
    }
    const [form] = Form.useForm<LogInFormValues>()

    const onFinish = (values: LogInFormValues): void => {
        console.log("Success:", values)
    }

    return (
        <div className="space-y-8" >
            <h2 className="text-xl font-medium">Edit Account</h2>

            <Form<LogInFormValues> form={form} name="signup" layout="vertical" onFinish={onFinish} autoComplete="off">

                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please input your name!" }]}
                >
                    <Input.Password
                        placeholder="Enter your name"
                        className="h-12"
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                        { type: "email", message: "Please enter a valid email!" },
                    ]}
                >
                    <Input placeholder="Enter your email" className="h-12" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="number"
                    rules={[
                        { required: true, message: "Please input your phone number!" },
                        { type: "email", message: "Please enter a valid phone number!" },
                    ]}
                >
                    <Input placeholder="Enter your phone number" className="h-12" />
                </Form.Item>

                <Form.Item className="mt-6">
                    <Link href={'/'}>
                        <button
                            className=" bg-primary  w-full py-3 rounded-md cursor-pointer text-white"
                        >
                            Update
                        </button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditAccount;