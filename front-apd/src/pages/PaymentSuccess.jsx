import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();


  const API_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const resultCode = query.get("resultCode"); // 3001 = 결제 성공
    const rawOrderId = query.get("orderId") || "";
    const orderId = rawOrderId.startsWith("ORDER-") ? rawOrderId.split("-")[1] : rawOrderId;


    if (resultCode === "3001" && orderId) {
      // 로컬 axios.patch(`http://localhost:8080/api/orders/${orderId}/complete`, {}, {
        axios.patch(`${API_URL}/orders/${orderId}/complete`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      })
      .then(() => {
        alert("결제가 완료되었습니다!");
        navigate("/user/my-orders");
      })
      .catch(() => {
        alert("주문 확정 중 오류가 발생했습니다.");
        navigate("/user/cart");
      });
    } else {
      alert("❌ 결제가 실패했거나 취소되었습니다.");
      navigate("/user/cart");
    }
  }, []);

  return <p>⏳ 결제 처리 중입니다...</p>;
};

export default PaymentSuccess;