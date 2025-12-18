/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { JSX, useEffect } from "react";
import { Form, Input, notification } from "antd";
// import { GoogleLogin} from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLogInMutation, useSocialLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";

import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";


interface LogInFormValues {
  email: string;
  password: string;
}

// interface GoogleUser {
//   email: string;
//   name: string;
//   picture: string;
// }

interface AuthResponseData {
  data?: {
    _id?: string;
    id?: string;
    fullName?: string;
    name?: string;
    email?: string;
    role?: string;
    roles?: string[];
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  };
}


export default function LogInForm(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<LogInFormValues>();
  const [logIn, { isLoading }] = useLogInMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  // Google Auth

  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socialLogin, { isLoading: socialLoading }] = useSocialLoginMutation();
  useEffect(() => {
    const token = Cookies.get("hatem-ecommerce-token");
    const user = localStorage.getItem("hatem-ecommerce-user");
    if (token && user) router.push("/");
  }, [router]);

  const handleAuthSuccess = (data: AuthResponseData): void => {
    // console.log("data from auth success------>",data);
    if (!data?.data) return;

    const userData = {
      _id: data.data._id || data.data.id || "",
      fullName: data.data.fullName || data.data.name || "",
      email: data.data.email || "",
      role: data.data.role || data.data.roles?.[0] || "",
      image: data.data.image || "",
      
    };
    const accessToken = data.data.accessToken || "";
    const refreshToken = data.data.refreshToken || "";
    // console.log("access token from login page--->",accessToken);
    // console.log("refresh token from login page--->",refreshToken);

    dispatch(setUser({ user: userData, accessToken, refreshToken }));
    Cookies.set("hatem-ecommerce-token", accessToken, { expires: 7 });
    localStorage.setItem("hatem-ecommerce-refreshToken", refreshToken);
    localStorage.setItem("hatem-ecommerce-user", JSON.stringify(userData));
  };


  const onFinish = async (values: LogInFormValues): Promise<void> => {
    try {
      const data = await logIn(values).unwrap();
      // console.log("data---------->",data);
      
      handleAuthSuccess(data);

      api.success({
        message: "Login Successful",
        description: "You are logged in successfully!",
        placement: "topRight",
      });

      setTimeout(() => router.push("/"), 800);
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      api.error({
        message: "Login Failed",
        description: err.data?.message || err.message || "Something went wrong.",
      });
    }
  };





   // Google Login Handler
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const user = await signInWithGoogle();
// console.log("google user--->",user);
      if (!user) {
        api.warning({
          message: "Cancelled",
          description: "Google sign in was cancelled.",
        });
        return;
      }

      // Send to backend
      const data = await socialLogin({
        email: user.email ?? "",
        plateForm: "GOOGLE",
        image: user.photoURL ?? "",
        fullName: user.displayName ?? "",
        phoneNumber: "",
        address: "",
      }).unwrap();
// console.log("data---------->",data);
      handleAuthSuccess(data);

      api.success({
        message: "Google Login Successful",
        description: "You are logged in successfully!",
        placement: "topRight",
      });

      setTimeout(() => router.push("/"), 200);

    } catch (error: any) {
      console.error("Google Login Error:", error);
      api.error({
        message: "Google Login Failed",
        description: error?.data?.message || error?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-10 rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Log In</h1>

        {/* Email/Password Login field */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" className="h-10"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" className="h-10" />
          </Form.Item>

          <div className="flex justify-end mb-6">
            <Link href="/auth/forget-password" className="text-black">
              Forgot Password?
            </Link>
          </div>

          <Form.Item>
            <button
              disabled={isLoading}
              className="bg-primary w-full py-2 rounded-md text-white"
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </Form.Item>
        </Form>

        {/* Social Login */}
        {/* <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google login failed")}
            theme="outline"
            width="100%"
            text="signin_with"
            shape="rectangular"
          /> */}
        <div className="w-full max-w-sm">
  
             <button
      onClick={handleGoogleLogin}
      disabled={googleLoading}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
    >
      {googleLoading ? (
        <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
      ) : (
        <FcGoogle className="w-5 h-5" />
      )}
      <span>{googleLoading ? "Signing in..." : "Continue with Google"}</span>
    </button>
        </div>



        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

