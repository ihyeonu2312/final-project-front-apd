import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    console.log("✅ [PaymentSuccess] 컴포넌트 진입");
    console.log("🌐 현재 URL:", window.location.href);
    console.log("🔍 쿼리스트링:", window.location.search);
    const query = new URLSearchParams(window.location.search);

    const status = query.get("P_STATUS"); // ✅ 이니시스 결제 결과 코드
    const rawOrderId = query.get("P_OID") || ""; // ✅ 주문번호
    const orderId = rawOrderId.startsWith("ORDER-") ? rawOrderId.split("-")[1] : rawOrderId;
    const failMessage = query.get("P_RMESG1"); // 실패시 에러 메시지

    console.log("🧾 P_STATUS:", status);
    console.log("🧾 P_OID:", rawOrderId);
    console.log("🧾 추출된 orderId:", orderId);
    console.log("🧾 실패 메시지:", failMessage);

    if (status === "00" && orderId) {
      // 결제 성공
      axios.patch(`${API_URL}/orders/${orderId}/complete`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      })
      .then(() => {
        alert("✅ 결제가 완료되었습니다!");
        navigate("/user/my-orders");
      })
      .catch(() => {
        alert("❌ 주문 확정 중 오류가 발생했습니다.");
        navigate("/user/cart");
      });
    } else {
      // 결제 실패
      alert(`❌ 결제 실패 또는 취소되었습니다. ${failMessage ? `\n사유: ${failMessage}` : ""}`);
      navigate("/user/cart");
    }
  }, []);

  return <p>⏳ 결제 처리 중입니다...</p>;
};

export default PaymentSuccess;
