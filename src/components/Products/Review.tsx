"use client";

import { useState } from "react";
import Image from "next/image";
import { Rate, Input, Select, Form, ConfigProvider, notification, Button } from "antd";
import { useGetProductReviewsQuery, usePostReviewMutation } from "@/redux/features/services/reviewApi";
import { Review } from "@/types/review";

const { TextArea } = Input;
const { Option } = Select;

interface ReviewsProps {
    avgReview: number;
    id: string;
}

interface AddReviewFormValues {
    rating: number;
    name: string;
    email: string;
    review: string;
}

export default function Reviews({ avgReview, id }: ReviewsProps) {
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [form] = Form.useForm<AddReviewFormValues>();
    const [api, contextHolder] = notification.useNotification();

    // Fetch reviews
    const { data, isLoading, isError, refetch } = useGetProductReviewsQuery({
        productId: id,
        rating: selectedRating,
    });

    // POST review mutation
    const [postReview, { isLoading: isPosting }] = usePostReviewMutation();

    const handleSubmit = async (values: AddReviewFormValues) => {
        try {
            await postReview({
                productId: id,
                rating: values.rating,
                comment: values.review,
            }).unwrap();

            api.success({
                message: "Review submitted",
                description: "Your review has been submitted successfully!",
                placement: "topRight",
            });

            form.resetFields();
            refetch(); // refresh reviews
        } catch (err: unknown) {
            let description = "Failed to submit your review.";

            if (typeof err === "object" && err !== null && "data" in err) {
                const e = err as { data?: { message?: string } };
                if (e.data?.message) {
                    description = e.data.message;
                }
            }

            api.error({
                message: "Submission failed",
                description,
                placement: "topRight",
            });
        }
    };

    if (isLoading) return <p>Loading reviews...</p>;
    if (isError) return <p>Failed to load reviews.</p>;

    return (
        <div className="bg-[#f2fcf6] dark:bg-black p-8">
            {contextHolder}

            {/* Overall Rating */}
            <div className="bg-white rounded-lg py-10 mb-8 flex flex-col items-center">
                <div className="font-semibold flex items-center gap-3">
                    <p className="text-4xl">{data?.data.averageRating ?? avgReview}</p>
                    <ConfigProvider theme={{ components: { Rate: { starColor: "rgb(0,0,0)" } } }}>
                        <Rate disabled defaultValue={data?.data.averageRating ?? avgReview} allowHalf />
                    </ConfigProvider>
                </div>
                <div className="mt-4 text-xl dark:text-white">Overall Rating</div>
            </div>

            {/* Filter by Rating */}
            <div className="mb-6">
                <div className="font-medium text-gray-700 mb-3 text-lg dark:text-white">Rating</div>
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                activeBorderColor: "rgb(100,100,100)",
                                hoverBorderColor: "rgb(100,100,100)",
                                colorBorder: "rgb(100,100,100)",
                                borderRadius: 2,
                                colorPrimary: "#565656",
                            },
                        },
                    }}
                >
                    <Select
                        defaultValue={0}
                        onChange={(value) => setSelectedRating(value)}
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

            {/* Reviews List */}
            <div className="space-y-6 mt-8">
                {data?.data.reviews?.map((review: Review) => (
                    <div
                        key={review.id}
                        className="bg-white mb-5 px-5 py-6 rounded flex flex-col md:flex-row gap-6"
                    >
                        {/* User Info */}
                        <div className="flex items-start gap-4 md:gap-6 w-full md:w-auto">
                            <Image
                                src={review.user?.image || "/placeholder.png"}
                                alt={review.user?.fullName ?? "User"}
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                            />
                            <div className="flex flex-col min-w-48 max-w-auto">
                                <h3 className="font-medium text-lg truncate max-w-[150px]">
                                    {review.user?.fullName ?? "Anonymous User"}
                                </h3>
                                <span className="text-gray-500 text-sm">
                                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Rating & Comment */}
                        <div className="flex-1">
                            <ConfigProvider theme={{ components: { Rate: { starColor: "rgb(0,0,0)" } } }}>
                                <Rate disabled allowHalf defaultValue={review.rating} />
                            </ConfigProvider>
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Review Form */}
            <div className="my-10">
                <Form<AddReviewFormValues> form={form} layout="vertical" onFinish={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add a Review</h2>

                    <Form.Item
                        name="rating"
                        label="Your Rating"
                        rules={[{ required: true, message: "Please select a rating" }]}
                        className="mb-4"
                    >
                        <ConfigProvider theme={{ components: { Rate: { starColor: "rgb(0,0,0)" } } }}>
                            <Rate
                                onChange={(value) => form.setFieldValue("rating", value)} // update form value
                            />
                        </ConfigProvider>
                    </Form.Item>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Form.Item
                            name="name"
                            label="Your Name"
                            rules={[{ required: true, message: "Please enter your name" }]}
                        >
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

                    <Form.Item
                        name="review"
                        label="Review"
                        rules={[{ required: true, message: "Please write your review" }]}
                    >
                        <TextArea rows={6} placeholder="Write your review here..." />
                    </Form.Item>

                    <div className="flex justify-center">
                        <Button type="primary" htmlType="submit" loading={isPosting}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
