import axios from "axios";

export const initiateInicisPay = async (orderId, totalAmount) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/payment/inicis/request`,
      null,
      {
        params: {
          amount: totalAmount,
          orderId: orderId,
          buyerName: "테스트구매자", // 구매자 이름 필요
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    const {
      mid,
      orderId: respOrderId,
      price,
      timestamp,
      hashData,
      apiUrl,
    } = response.data;

    // 이니시스는 form POST 방식으로 결제창 이동
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = apiUrl;

    const addInput = (name, value) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addInput('P_MID', mid);
    addInput('P_OID', respOrderId);
    addInput('P_AMT', price);
    addInput('P_UNAME', '테스트구매자');
    addInput('P_TIMESTAMP', timestamp);
    addInput('P_HASHDATA', hashData);
    addInput('P_GOODS', '테스트 상품');
    addInput('P_RETURN_URL', 'https://unoeyhi.site/payment/success'); // 결제 완료 후 이동 URL

    document.body.appendChild(form);
    form.submit();

  } catch (err) {
    console.error("❌ 이니시스 결제 요청 실패:", err);
    alert("결제를 시작할 수 없습니다.");
  }
};
