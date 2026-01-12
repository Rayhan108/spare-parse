"use client";
import { useState, useEffect, JSX } from "react";
import OTPInput from "react-otp-input";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useOtpVerificationforgotpasswordMutation,
  useResendOtpForgotPasswordMutation,
} from "@/redux/features/auth/authApi";
import { notification } from "antd";

type ErrorWithData = {
  data?: {
    message?: string;
  };
};

export default function OtpVerify(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  const [otp, setOtp] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(30);
  const router = useRouter();
  const [otpVerification, { isLoading }] = useOtpVerificationforgotpasswordMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpForgotPasswordMutation();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");


  if (!email) {
    console.error("Missing email in URL params");
  }

  useEffect(() => {
    const token = localStorage.getItem("otpToken");
    setOtpToken(token);
  }, []);
  // console.log("OTP Token:", otpToken);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const getErrorMessage = (error: unknown): string => {
    if (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as ErrorWithData).data?.message === "string"
    ) {
      return (error as { data: { message: string } }).data.message;
    }
    return "Something went wrong";
  };

  const onFinish = () => {
    if (!otp) {
      api.error({
        message: "OTP required",
        description: "Please enter the 6-digit OTP",
        placement: "topRight",
      });
      return;
    }

    if (!otpToken) {
      api.error({
        message: "OTP token missing",
        description: "Cannot verify OTP without token",
        placement: "topRight",
      });
      return;
    }

    if (!email) {
      api.error({
        message: "Missing Email",
        description: "Email not found in URL",
        placement: "topRight",
      });
      return;
    }

    const otpNumber = Number(otp);

    otpVerification({ email, otp: otpNumber, otpToken })
      .unwrap()
      .then(() => {
        api.success({
          message: "OTP Verified",
          description: "OTP Verified Successfully!",
          placement: "topRight",
        });
        router.push(`/auth/set-new-password?email=${email}`);
      })
      .catch((error) => {
        api.error({
          message: getErrorMessage(error),
          description: "Please try again.",
          placement: "topRight",
        });
      });
  };

const handleResend = () => {
  if (!email) {
    api.error({
      message: "Missing Email",
      description: "Email not found in URL",
      placement: "topRight",
    });
    return;
  }

  resendOtp({ email })
    .unwrap()
    .then((response) => {
      api.success({
        message: "OTP Resent",
        description: "A new OTP has been sent to your email",
        placement: "topRight",
      });
      localStorage.removeItem("otpToken");

      if (response?.data?.otpToken) {
        localStorage.setItem("otpToken", response.data.otpToken);
        setOtpToken(response.data.otpToken); 
      }

      setTimer(30);
    })
    .catch((error) => {
      api.error({
        message: getErrorMessage(error),
        description: "Please try again later",
        placement: "topRight",
      });
    });
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#24292e] p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white dark:bg-[#32373b] px-4 md:px-14 py-14 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl text-black dark:text-white font-semibold">Verification</h1>
          <p className="mt-2 text-black dark:text-white">
            Enter the 6-digit code sent to your email
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
          className="bg-primary w-full py-2 rounded-md text-black dark:text-white disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "VERIFY"}
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Didn’t get the email?{" "}
            {timer > 0 ? (
              <span className="text-black dark:text-white">
                Resend in <span className="font-semibold">{timer}s</span>
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-black dark:text-white font-semibold hover:underline disabled:opacity-50"
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
