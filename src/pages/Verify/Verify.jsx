import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Verify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(url + "/api/order/verify", {
          orderId,
          success,
        });

        if (response.data.success) {
          setVerificationMessage("Payment verified successfully!");
        } else {
          setVerificationMessage("Payment verification failed!");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setVerificationMessage("Error verifying payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId && success !== null) {
      verifyPayment();
    }
  }, [orderId, success, url]);

  return (
    <div className="verify">
      {loading ? (
        <div>
          <div className="spinner"></div>
          <p>Verifying Payment...</p>
        </div>
      ) : (
        <p>{verificationMessage}</p>
      )}
    </div>
  );
};

export default Verify;
