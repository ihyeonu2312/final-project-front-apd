// src/pages/PaymentForm.jsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PaymentForm = () => {
  const location = useLocation();
  const { redirectUrl, requestData } = location.state?.inicis || {};

  useEffect(() => {
    if (redirectUrl && requestData) {
      document.getElementById("inicisForm").submit();
    }
  }, [redirectUrl, requestData]);
  console.log("🧾 PaymentForm 진입");
  console.log("➡️ redirectUrl:", redirectUrl);
  console.log("📨 requestData:", requestData);

  if (!redirectUrl || !requestData) {
    return <p>❌ 결제 정보가 없습니다.</p>;
  }

  return (
    <form id="inicisForm" action={redirectUrl} method="POST">
      <input type="hidden" name="mid" value={requestData.mid} />
      <input type="hidden" name="orderId" value={requestData.orderId} />
      <input type="hidden" name="price" value={requestData.price} />
      <input type="hidden" name="buyerName" value={requestData.buyerName} />
      <input type="hidden" name="timestamp" value={requestData.timestamp} />
      <input type="hidden" name="hashData" value={requestData.hashData} />
      <input type="hidden" name="returnUrl" value={requestData.returnUrl} />
    </form>
  );
};

export default PaymentForm;
