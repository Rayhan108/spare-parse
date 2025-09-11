/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import Image from "next/image"
import { Rate, Input, Button, Select, Form, ConfigProvider } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useGetReviewOfProductsQuery } from "@/redux/features/products/productsApi"
import { Imageurl } from "@/utils/Imageurl"

const { TextArea } = Input
const { Option } = Select


export default function Reviews({ avgReview, id }: any) {
    const [selectedRating, setSelectedRating] = useState<number | undefined | string>(0);
    const [form] = Form.useForm()
    const { data } = useGetReviewOfProductsQuery({ id, params: { rating: selectedRating } });
    const totalPages = data?.data?.meta?.total
    const [currentPage, setCurrentPage] = useState(data?.data?.meta?.page)

    console.log(data?.data?.isBought);
    const handleSubmit = (values: any) => {
        console.log("Submitted values:", values)
        // Here you would typically send the data to your backend
        alert("Review submitted successfully!")
        form.resetFields()
    }

    const handleRatingChange = (value: number) => {
        setSelectedRating(value);
    };

    return (
        <div>
            <div className=" bg-[#f2fcf6] dark:bg-black p-8 ">
                <div className=" bg-white rounded-lg py-10 mb-8">
                    <div className="flex flex-col items-center">
                        <div className=" font-semibold flex items-center gap-3">
                            <p className="text-4xl">{avgReview}</p>

                            <ConfigProvider
                                theme={{
                                    components: {
                                        "Rate": {
                                            "starColor": "rgb(0,0,0)"
                                        }
                                    },
                                }}
                            >
                                <Rate className="" disabled defaultValue={avgReview} allowHalf />
                            </ConfigProvider>
                        </div>

                        <div className=" mt-4 text-xl dark:text-white">Overall Rating</div>
                    </div>
                </div>

                <div className="">
                    <div className="font-medium text-gray-700 mb-3 text-lg dark:text-white">Rating</div>
                    <ConfigProvider
                        theme={{
                            components: {
                                "Select": {
                                    "activeBorderColor": "rgb(100,100,100)",
                                    "hoverBorderColor": "rgb(100,100,100)",
                                    "activeOutlineColor": "rgb(100,100,100)",
                                    "colorBorder": "rgb(100,100,100)",
                                    "borderRadius": 2,
                                    "colorPrimary": "#565656"
                                }
                            },
                        }}
                    >
                        <Select
                            defaultValue={0}
                            onChange={handleRatingChange}
                            style={{ width: "100%", maxWidth: "300px" }}
                            className="border border-gray-200 rounded"
                        >
                            <Option value={0}>All Rating</Option>
                            <Option value={5}>5 Stars</Option>
                            <Option value={4}>4 Stars</Option>
                            <Option value={3}>3 Stars</Option>
                            <Option value={2}>2 Stars</Option>
                            <Option value={1}>1 Star</Option>
                        </Select>
                    </ConfigProvider>

                </div>

                <div className="space-y-6 mt-8">
                    {data?.data?.data?.map((review: any) => (
                        <div key={review._id} className=" bg-white mb-5 px-5 py-10 rounded">
                            <div className="flex items-center ">
                                <div className=" flex items-center gap-4  w-[300px]">
                                    <Image className="w-12 h-12 rounded-full " src={`${Imageurl}/${review?.userId?.image}`} alt={review?.userId?.fullName} width={200} height={200} />
                                    <div>
                                        <h3 className="font-medium text-lg">{review?.userId?.fullName}</h3>
                                        <span className="text-gray-500 text-sm">  {new Date(review?.createdAt).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}</span>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="mb-2">
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    "Rate": {
                                                        "starColor": "rgb(0,0,0)"
                                                    }
                                                },
                                            }}
                                        >
                                            <Rate className="" disabled allowHalf defaultValue={review?.rating} />
                                        </ConfigProvider>

                                    </div>
                                    <p className="text-gray-700">{review?.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center mt-8 space-x-2">
                    <Button
                        icon={<LeftOutlined />}
                        className="flex items-center justify-center border rounded"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    />
                    <span className="text-sm text-gray-600">
                        {currentPage} of {totalPages}
                    </span>
                    <Button
                        icon={<RightOutlined />}
                        className="flex items-center justify-center border rounded"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    />
                </div>
            </div>
            {
                data?.data?.isBought &&
                <div className=" my-10">
                    <ConfigProvider
                        theme={{
                            components: {
                                "Input": {
                                    "activeBorderColor": "rgb(0,0,0)",
                                    "hoverBorderColor": "rgb(0,0,0)",
                                    "colorPrimaryActive": "rgb(0,0,0)",
                                    "colorPrimaryHover": "rgb(0,0,0)",
                                    "borderRadius": 1,
                                    "colorPrimary": "rgb(0,0,0)",
                                    "controlHeight": 40
                                },
                            },
                        }}
                    >

                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <h2 className="text-2xl font-semibold mb-6  dark:text-white">Add a Review</h2>
                            <Form.Item name="rating" label="Your Rating" className="mb-4">
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            "Rate": {
                                                "starColor": "rgb(0,0,0)"
                                            }
                                        },
                                    }}
                                >
                                    <Rate className="" />
                                </ConfigProvider>
                            </Form.Item>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <Form.Item name="name" label="Your Name" rules={[{ required: true, message: "Please enter your name" }]}>
                                    <Input placeholder="Robert Smith" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Your Email"
                                    rules={[
                                        { required: true, message: "Please enter your email" },
                                        { type: "email", message: "Please enter a valid email" },
                                    ]}
                                >
                                    <Input placeholder="robert@gmail.com" />
                                </Form.Item>
                            </div>

                            <Form.Item name="review" label="Review" rules={[{ required: true, message: "Please write your review" }]}>
                                <TextArea rows={6} placeholder="Write your review here..." />
                            </Form.Item>

                            <div className=" flex justify-center">
                                <button className=" bg-primary px-8 py-2 text-white cursor-pointer ">Submit</button>
                            </div>
                        </Form>
                    </ConfigProvider>
                </div>
            }

        </div>
    )
}
