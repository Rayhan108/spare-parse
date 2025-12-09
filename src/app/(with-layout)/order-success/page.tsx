"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


const OrderSuccess = () => {
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
     <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg w-full max-w-md  mb-44">
        <h1 className="text-3xl font-bold text-green-600 mb-5">
          Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {paymentStatus && (
          <div className="text-gray-500 text-sm mb-6">{paymentStatus}</div>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-primary text-white px-6 py-2 rounded-md text-base font-medium transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
    );
};

export default OrderSuccess;