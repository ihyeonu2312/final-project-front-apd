import axios from "axios";

/**
 * NICEPAY REST API 방식 결제 요청
 */
export const initiateNicePay = async (orderId, totalAmount) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/payment/${orderId}/pay`,
      {
        paymentMethod: "CARD",
        amount: totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    const redirectUrl =
      response.data.nextRedirectPcUrl ||
      response.data.paymentUrl ||
      response.data.nextRedirectUrl;

    if (!redirectUrl) {
      alert("❌ 결제창 URL을 받아오지 못했습니다.");
      return;
    }

    // ✅ NICEPAY 결제창으로 이동
    window.location.href = redirectUrl;
  } catch (err) {
    console.error("❌ 결제 요청 실패:", err);
    alert("결제를 시작할 수 없습니다.");
  }
};
