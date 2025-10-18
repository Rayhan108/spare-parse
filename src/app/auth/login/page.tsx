"use client";
import { JSX, useEffect } from "react";
import { Form, Input, notification } from "antd";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";

interface LogInFormValues {
  email: string;
  password: string;
}

export default function LogInForm(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<LogInFormValues>();
  const [logIn, { isLoading }] = useLogInMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Redirect if user already logged in
  useEffect(() => {
    const token = Cookies.get("hatem-ecommerce-token");
    const user = localStorage.getItem("hatem-ecommerce-user");

    if (token && user) {
      router.push("/"); // or your dashboard route if needed
    }
  }, [router]);

  const onFinish = (values: LogInFormValues) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    logIn(loginData)
      .unwrap()
      .then((data) => {
        const userData = {
          _id: data?.data?._id,
          fullName: data?.data?.fullName,
          email: data?.data?.email,
          role: data?.data?.role,
        };
        const accessToken = data?.data?.accessToken;
        const refreshToken = data?.data?.refreshToken;

        dispatch(setUser({ user: userData, accessToken, refreshToken }));
        Cookies.set("hatem-ecommerce-token", accessToken, { expires: 7 });
        localStorage.setItem("hatem-ecommerce-refreshToken", refreshToken);
        localStorage.setItem("hatem-ecommerce-user", JSON.stringify(userData));

        api.open({
          type: "success",
          message: "Log In",
          description: "Log In successfully!",
          placement: "topRight",
        });

        // ✅ Redirect based on role
        if (data?.data?.role === "BUYER" || data?.data?.role === "SELLER") {
          router.push("/");
        }
      })
      .catch((error) => {
        api.open({
          type: "error",
          message: error?.data?.message,
          description: "Log In failed. Please try again.",
          placement: "topRight",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      {contextHolder}
      <div className="w-full max-w-lg shadow-md bg-white px-4 md:px-14 py-10 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Log In</h1>
        </div>

        <Form<LogInFormValues>
          form={form}
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
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
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="h-10"
            />
          </Form.Item>

          <div className="flex justify-end -mt-2 mb-6 text-black">
            <Link href={"/auth/forget-password"} className="text-black">
              Forgot Password?
            </Link>
          </div>

          <Form.Item className="mt-6">
            <button
              disabled={isLoading}
              className="bg-primary w-full py-2 rounded-md cursor-pointer text-white"
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </Form.Item>
        </Form>

        <div className="mt-4">
          <button
            className="w-full flex items-center justify-center border border-[#00000066] py-1 rounded-md mb-4 cursor-pointer"
            onClick={() => console.log("Google Log In clicked")}
          >
            <FcGoogle size={25} className="mr-2" /> Log In with Google
          </button>

          <button
            className="w-full flex items-center justify-center border border-[#00000066] py-1 rounded-md cursor-pointer"
            onClick={() => console.log("Facebook Log In clicked")}
          >
            <FaFacebook size={25} className="mr-2 text-[#0689ff]" /> Log In with
            Facebook
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm">
            Don’t have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
