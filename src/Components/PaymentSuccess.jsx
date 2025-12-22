import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        if (!sessionId) return;

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/confirm-payment`,
          { sessionId }
        );

        console.log("Payment confirmed:", response.data);
      } catch (err) {
        console.error("Payment confirmation failed:", err);
      }
    };

    confirmPayment();
  }, [sessionId]);

  return (
    <div className="text-center">
      <h2>Payment Successful</h2>
      <p>Your booking is confirmed.</p>
    </div>
  );
};

export default PaymentSuccess;
