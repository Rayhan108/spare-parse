"use client";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import { useGetPrivacyPolicyQuery } from "@/redux/features/privacyPolicy/privacyPolicyApi";

const PrivacyPolicyPage = () => {
  const { data, isLoading, isError } = useGetPrivacyPolicyQuery();
  const policy = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">Failed to load Privacy Policy.</p>
      </div>
    );

  return (
    <div className="container mx-auto py-16 px-3 md:px-0">
      {/* Breadcrumbb */}
      <Breadcrumb
        items={[
          {
            title: (
              <Link href="/">
                <p className="dark:text-white">Home</p>
              </Link>
            ),
          },
          {
            title: (
              <Link href="/privacy-policy">
                <p className="dark:text-white">Privacy Policy</p>
              </Link>
            ),
          },
        ]}
      />

      {/* Page Heading */}
      <h1 className="text-4xl md:text-5xl font-bold my-8 dark:text-white">
        {policy?.heading || "Privacy Policy"}
      </h1>

      {/* Privacy Content */}
      <div
        className="space-y-6 text-gray-700 dark:text-gray-300 text-lg"
        dangerouslySetInnerHTML={{ __html: policy?.content || "" }}
      />
    </div>
  );
};

export default PrivacyPolicyPage;
