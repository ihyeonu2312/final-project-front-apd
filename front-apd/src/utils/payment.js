// utils/payment.js

export const callPay = (orderId, totalAmount) => {
    const payForm = document.createElement("form");
    payForm.method = "POST";
    payForm.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
  
    const inputs = [
      { name: "GoodsName", value: "테스트상품" },
      { name: "Amt", value: totalAmount },
      { name: "Moid", value: orderId },
      { name: "BuyerName", value: "테스트고객" },
      // 필요 시 추가로 NicePay가 요구하는 파라미터 입력
    ];
  
    inputs.forEach(({ name, value }) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      payForm.appendChild(input);
    });
  
    document.body.appendChild(payForm);
    payForm.submit();
  };
  