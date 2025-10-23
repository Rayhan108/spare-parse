// "use client"
// import { useState, useEffect, JSX } from "react"
// import OTPInput from "react-otp-input"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useOtpVerificationMutation } from "@/redux/features/auth/authApi"
// import { notification } from "antd"

// export default function OtpVerify(): JSX.Element {
//     const [api, contextHolder] = notification.useNotification()
//     const [otp, setOtp] = useState<string>("")
//     const [otpToken, setOtpToken] = useState<string | null>(null)
//     const router = useRouter()
//     const [otpVerification, { isLoading }] = useOtpVerificationMutation()
//     const searchParams = useSearchParams()
//     const email = searchParams.get('email')

//     // Get OTP token from localStorage
//     useEffect(() => {
//         const token = localStorage.getItem("otpToken")
//         setOtpToken(token)
//     }, [])

//     const onFinish = () => {
//         if (!otp) {
//             api.open({
//                 type: 'error',
//                 message: "OTP is required!",
//                 description: 'Please input OTP',
//                 placement: 'topRight',
//             })
//             return
//         }

//         if (!otpToken) {
//             api.open({
//                 type: 'error',
//                 message: "OTP token missing",
//                 description: 'Cannot verify OTP without token.',
//                 placement: 'topRight',
//             })
//             return
//         }

//         const otpNumber = Number(otp)

//         otpVerification({ email, otp: otpNumber, otpToken })
//             .unwrap()
//             .then(() => {
//                 api.open({
//                     type: 'success',
//                     message: 'OTP Verified',
//                     description: 'OTP Verified Successfully!',
//                     placement: 'topRight',
//                 })
//                 localStorage.removeItem("otpToken")
//                 router.push(`/auth/login`)
//             })
//             .catch((error) => {
//                 api.open({
//                     type: 'error',
//                     message: error?.data?.message || "Verification failed",
//                     description: 'Verification failed. Please try again.',
//                     placement: 'topRight',
//                 })
//             })
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
//             {contextHolder}
//             <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-14 rounded-lg">
//                 <div className="text-center mb-6">
//                     <h1 className="text-2xl font-semibold">Verification</h1>
//                     <p className="mt-2 text-gray-500">
//                         We sent a code to your email address. Please check your email for the 6-digit code.
//                     </p>
//                 </div>

//                 <div className="flex justify-center mb-8">
//                     <OTPInput
//                         value={otp}
//                         onChange={(value: string) => setOtp(value.replace(/\D/g, ''))}
//                         numInputs={6}
//                         inputType="number"   // ✅ fixed
//                         renderSeparator={<span className="w-4" />}
//                         renderInput={(props) => (
//                             <input
//                                 {...props}
//                                 style={{ width: "50px" }}
//                                 className="w-12 h-12 border-2 border-gray-300 rounded-md text-center text-lg focus:border-[#f56100] focus:outline-none"
//                             />
//                         )}
//                     />
//                 </div>

//                 <button
//                     disabled={isLoading}
//                     onClick={onFinish}
//                     className="bg-primary w-full py-2 rounded-md cursor-pointer text-white disabled:opacity-50"
//                 >
//                     {isLoading ? "Loading..." : "VERIFY"}
//                 </button>
//             </div>
//         </div>
//     )
// }


"use client";
import { useState, useEffect, JSX } from "react";
import OTPInput from "react-otp-input";
import { useRouter, useSearchParams } from "next/navigation";
import { useOtpVerificationMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";
import { notification } from "antd";

export default function OtpVerify(): JSX.Element {
    const [api, contextHolder] = notification.useNotification();
    const [otp, setOtp] = useState<string>("");
    const [otpToken, setOtpToken] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(30);
    const router = useRouter();
    const [otpVerification, { isLoading }] = useOtpVerificationMutation();
    const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    // Get OTP token from localStorage
    useEffect(() => {
        const token = localStorage.getItem("otpToken");
        setOtpToken(token);
    }, []);

    // Countdown timer for resend
    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [timer]);

    const onFinish = () => {
        if (!otp) {
            api.open({
                type: "error",
                message: "OTP is required!",
                description: "Please input OTP",
                placement: "topRight",
            });
            return;
        }

        if (!otpToken) {
            api.open({
                type: "error",
                message: "OTP token missing",
                description: "Cannot verify OTP without token.",
                placement: "topRight",
            });
            return;
        }

        const otpNumber = Number(otp);

        otpVerification({ email, otp: otpNumber, otpToken })
            .unwrap()
            .then(() => {
                api.open({
                    type: "success",
                    message: "OTP Verified",
                    description: "OTP Verified Successfully!",
                    placement: "topRight",
                });
                localStorage.removeItem("otpToken");
                router.push(`/auth/login`);
            })
            .catch((error) => {
                api.open({
                    type: "error",
                    message: error?.data?.message || "Verification failed",
                    description: "Verification failed. Please try again.",
                    placement: "topRight",
                });
            });
    };

    const handleResend = () => {
        if (!email) {
            api.open({
                type: "error",
                message: "Missing Email",
                description: "Email not found in URL.",
                placement: "topRight",
            });
            return;
        }

        resendOtp({ email })
            .unwrap()
            .then((response) => {
                api.open({
                    type: "success",
                    message: "OTP Resent",
                    description: "A new OTP has been sent to your email.",
                    placement: "topRight",
                });
                localStorage.setItem("otpToken", response?.otpToken);
                setTimer(30);
            })
            .catch((error) => {
                api.open({
                    type: "error",
                    message: error?.data?.message || "Failed to resend OTP",
                    description: "Please try again later.",
                    placement: "topRight",
                });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            {contextHolder}
            <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-14 rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Verification</h1>
                    <p className="mt-2 text-gray-500">
                        We sent a code to your email address. Please check your email for the 6-digit code.
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    <OTPInput
                        value={otp}
                        onChange={(value: string) => setOtp(value.replace(/\D/g, ""))}
                        numInputs={6}
                        inputType="number"
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
                    className="bg-primary w-full py-2 rounded-md cursor-pointer text-white disabled:opacity-50"
                >
                    {isLoading ? "Loading..." : "VERIFY"}
                </button>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Didn’t get the mail?{" "}
                        {timer > 0 ? (
                            <span className="text-gray-400">
                                Resend in <span className="font-semibold">{timer}s</span>
                            </span>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={resendLoading}
                                className="text-primary font-semibold hover:underline disabled:opacity-50"
                            >
                                {resendLoading ? "Sending..." : "Resend Code"}
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
