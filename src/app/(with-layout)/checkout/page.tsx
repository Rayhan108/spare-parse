/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Breadcrumb, Checkbox, ConfigProvider } from 'antd';
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
// import productImage from '../../../../public/products/monitor.png'
import { useSelector } from 'react-redux';
import { Imageurl } from '@/utils/Imageurl';

const Checkout = () => {
    const products = useSelector((state: any) => state.cart)
    console.log(products.products);
    type FieldType = {
        name?: string;
        street?: string;
        apartment?: string;
        city?: string;
        phone?: string;
        email?: string;
        save?: boolean;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className=' container px-3 md:px-0 mx-auto py-16'>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={`/`}><p className="dark:text-white">Home</p></Link>,
                    },
                    {
                        title: <Link className="dark:text-white" href={`/cart`}><p className="dark:text-white">Cart</p></Link>,
                    },
                    {
                        title: <Link className="dark:text-white" href={`/checkout`}><p className="dark:text-white">Checkout</p></Link>,
                    },
                ]}
            />
            <div className=' flex flex-col lg:flex-row items-center justify-between gap-20'>
                <div className=' w-full sm:w-[450px] mt-8'>
                    <h1 className=' text-3xl md:text-4xl font-semibold mb-5 dark:text-white'>Billing Details</h1>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    "borderRadius": 2,
                                    "colorBorder": "rgb(245,245,245)",
                                    "activeBg": "rgb(245,245,245)",
                                    "activeBorderColor": "rgb(245,245,245)",
                                    "hoverBorderColor": "rgb(245,245,245)",
                                    "colorPrimaryActive": "rgb(245,245,245)",
                                    "colorPrimaryHover": "rgb(245,245,245)",
                                    "colorBgContainer": "rgb(245,245,245)",
                                    "controlHeight": 40,
                                },
                                "Checkbox": {
                                    "colorPrimary": "rgb(223,88,0)",
                                    "colorPrimaryBorder": "rgb(223,88,0)",
                                    "colorPrimaryHover": "rgb(223,88,0)"
                                }
                            },
                        }}
                    >
                        <Form
                            name="checkout"
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label={<p className="dark:text-white">Name</p>}
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label={<p className="dark:text-white">Street Address</p>}
                                name="street"
                                rules={[{ required: true, message: 'Please input your street address!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label={<p className="dark:text-white">Apartment, floor, etc. (optional)</p>}
                                name="apartment"
                                rules={[{ required: true, message: 'Please input your apartment, floor, etc!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label={<p className="dark:text-white">Town/City</p>}
                                name="city"
                                rules={[{ required: true, message: 'Please input your town/city!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label={<p className="dark:text-white">Phone Number</p>}
                                name="phone"
                                rules={[{ required: true, message: 'Please input your number!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label={<p className="dark:text-white">Email Address</p>}
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType> name="save" valuePropName="checked" >
                                <Checkbox>
                                    <span className="dark:text-white">
                                        Save this information for faster check-out next time
                                    </span>
                                </Checkbox>
                            </Form.Item>

                        </Form>
                    </ConfigProvider>
                </div>

                <div className="w-full sm:w-[440px] mx-auto p-6">
                    <div className="space-y-6">
                        {/* Cart Items */}
                        <div className="space-y-4">
                            {
                                products.products.map((product:any) => {
                                    return (
                                        <div key={product._id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Image src={`${Imageurl}/${product.images[0]}`} alt="LCD Monitor" width={48} height={48} className="object-contain" />
                                                <span className="font-medium dark:text-white">{product.name}</span>
                                            </div>
                                            <span className="font-medium dark:text-white">${product.price} X {product.quantity}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* Summary */}
                        <div className="space-y-3">
                            <div className="flex justify-between py-3">
                                <span className="font-medium dark:text-white">Subtotal:</span>
                                <span className="font-medium dark:text-white">${products?.total}</span>
                            </div>

                            <div className="flex justify-between py-3 border-t border-gray-500">
                                <span className="font-medium dark:text-white">Shipping:</span>
                                <span className="font-medium dark:text-white">Free</span>
                            </div>

                            <div className="flex justify-between py-3 border-t border-gray-500">
                                <span className="font-medium dark:text-white">Total:</span>
                                <span className="font-medium dark:text-white">${products?.total}</span>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        id="onlinePayment"
                                        value="onlinePayment"
                                        className="w-4 h-4 accent-black dark:accent-white border-black dark:border-white focus:ring-0"
                                    />
                                    <label htmlFor="onlinePayment" className="cursor-pointer dark:text-white">
                                        Online Payment
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="cash"
                                    value="cash"
                                    defaultChecked
                                    className="w-4 h-4 accent-black dark:accent-white border-black dark:border-white focus:ring-0 dark:text-white"
                                />
                                <label htmlFor="cash" className="cursor-pointer dark:text-white">
                                    Cash on delivery
                                </label>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            type="button"
                            className="w-full bg-primary cursor-pointer text-white py-3 rounded font-medium transition-colors"
                        >
                            Place Order
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;