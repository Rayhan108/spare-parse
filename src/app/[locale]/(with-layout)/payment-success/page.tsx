"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      setPaymentStatus(`Payment successful!`);
    } else {
      setPaymentStatus("Session ID not found. Please try again.");
    }
  }, [sessionId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black font-sans px-4">
      <div className="text-center bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg dark:shadow-gray-800/50 w-full max-w-md mb-44 border border-gray-200 dark:border-gray-700">
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-5">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {/* Payment Status */}
        {paymentStatus && (
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-6 bg-gray-50 dark:bg-gray-800 py-2 px-4 rounded-md">
            {paymentStatus}
          </div>
        )}

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white px-6 py-2 rounded-md text-base font-medium transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;