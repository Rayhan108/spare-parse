import React from "react";
import { Button } from "antd";
import { useRouter } from "next/router";

const PaymentCancel = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Redirect to home or any other page
  };

  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment has been canceled. Would you like to try again?</p>
      <Button type="primary" onClick={handleGoBack}>Back to Shopping</Button>
    </div>
  );
};

export default PaymentCancel;
