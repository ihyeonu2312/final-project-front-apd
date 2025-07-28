// src/pages/PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ [PaymentSuccess] 진입");
    const query = new URLSearchParams(window.location.search);

    const status = query.get("P_STATUS"); // 결제 상태
    const failMessage = query.get("P_RMESG1"); // 실패 메시지

    if (status === "00") {
      const memberId = localStorage.getItem("memberId");
      console.log("✅ 로컬 스토리지에서 가져온 memberId:", memberId);
      if (!memberId) {
        alert("❌ 로그인 정보가 없습니다. 다시 로그인해주세요.");
        navigate("/");
        return;
      }

      alert("✅ 결제가 완료되었습니다!");
      navigate("/user/my-orders");
    } else {
      alert(`❌ 결제 실패 또는 취소되었습니다.${failMessage ? `\n사유: ${failMessage}` : ""}`);
      navigate("/user/cart");
    }
  }, []);

  return <p>⏳ 결제 처리 중입니다...</p>;
};

export default PaymentSuccess;
