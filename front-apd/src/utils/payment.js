import SHA256 from "crypto-js/sha256";

export const callPay = (orderId, totalAmount) => {
  const payForm = document.createElement("form");
  payForm.method = "POST";
  payForm.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";

  const mid = "nicepay00m"; // ✅ 테스트 MID
  const ediDate = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14); // yyyyMMddHHmmss
  const signKey = "YOUR_TEST_SIGN_KEY"; // ✅ NICE 대시보드에서 확인 가능
  const signData = SHA256(ediDate + mid + totalAmount + signKey).toString();

  const inputs = [
    { name: "GoodsName", value: "테스트상품" },
    { name: "Amt", value: totalAmount },
    { name: "Moid", value: orderId },
    { name: "BuyerName", value: "테스트고객" },
    { name: "MID", value: mid },
    { name: "EdiDate", value: ediDate },
    { name: "SignData", value: signData },
    { name: "ReturnURL", value: "https://3c36-210-126-18-81.ngrok-free.app/api/payment/result" },
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
