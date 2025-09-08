"use client"
import { JSX, useState } from "react"
import type React from "react"
import OTPInput from "react-otp-input"
import { useRouter, useSearchParams } from "next/navigation"
import { useOtpVerificationMutation } from "@/redux/features/auth/authApi"
import { notification } from "antd"


export default function OtpVerify(): JSX.Element {
    const [api, contextHolder] = notification.useNotification();
    const [otp, setOtp] = useState<string>("");
    const router = useRouter();
    const [otpVerification, { isLoading }] = useOtpVerificationMutation();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const onFinish = () => {
        const otpData = {
            email: email,
            otp: otp
        }
        if (!otp) {
            api.open({
                type: 'error',
                message: "Please input OTP",
                description: 'OTP is required!',
                placement: 'topRight',
            });
            return;
        }
        otpVerification(otpData).unwrap()
            .then((data) => {
                console.log(data);
                api.open({
                    type: 'success',
                    message: 'OTP Verified',
                    description: 'OTP Verified Successfully!',
                    placement: 'topRight',
                });
                router.push(`/auth/login`)
            })
            .catch((error) => {
                api.open({
                    type: 'error',
                    message: error?.data?.message,
                    description: 'Verification failed. Please try again.',
                    placement: 'topRight',
                });
            })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            {contextHolder}
            <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14  py-14 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Verification</h1>
                    <p className=" mt-2 text-gray-500">We sent a code to your email address @. Please check your email for the 6 digit code.</p>
                </div>

                <div className=" flex justify-center mb-8">
                    <OTPInput
                        value={otp}
                        onChange={(value: string) => setOtp(value)}
                        numInputs={6}
                        renderSeparator={<span className="w-4" />}
                        renderInput={(props) => (
                            <input
                                {...props}
                                style={{ width: "50px" }}
                                className="w-12 h-12 border-2 border-gray-300 rounded-md text-center text-lg focus:border-[#f56100] focus:outline-none"
                            />
                        )}
                    />
                </div>
                <button
                    disabled={isLoading}
                    onClick={onFinish}
                    className=" bg-primary  w-full py-2 rounded-md cursor-pointer text-white"
                >
                    {isLoading ? "Loading..." : "VERIFYs"}
                </button>
            </div>
        </div>
    )
}
