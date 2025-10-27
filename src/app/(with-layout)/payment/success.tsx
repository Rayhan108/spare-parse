import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { notification } from "antd";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (!session_id) return;

    const verifyPayment = async () => {
      try {
        // Verify the payment status with the backend
        const response = await axios.post("/api/verify-payment", { session_id });
        if (response.data.success) {
          notification.success({
            message: "Payment Successful",
            description: "Your payment was successful! Thank you for your purchase.",
          });
        } else {
          notification.error({
            message: "Payment Verification Failed",
            description: "There was an issue verifying your payment.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "An error occurred while verifying your payment.",
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [session_id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Payment Success</h1>
      <p>Your payment was completed successfully.</p>
    </div>
  );
};

export default PaymentSuccess;
