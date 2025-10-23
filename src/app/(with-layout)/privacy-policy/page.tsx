// app/privacy-policy/page.tsx
"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-16 px-3 md:px-0">
      {/* Breadcrumb */}
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
        Privacy Policy
      </h1>

      {/* Privacy Content */}
      <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg">
        <p>
          At YourCompany, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
        </p>

        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p>
          We may collect information such as your name, email address, phone number, and browsing data when you interact with our website or services.
        </p>

        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <p>
          The information we collect is used to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
        </p>

        <h2 className="text-2xl font-semibold">Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share information with trusted service providers or as required by law.
        </p>

        <h2 className="text-2xl font-semibold">Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience on our website.
        </p>

        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. Please contact us to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with the effective date.
        </p>

        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, you can contact us at:
        </p>
        <ul className="list-disc list-inside">
          <li>Email: support@yourcompany.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Address: 123 Main Street, City, Country</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
