import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h2>개인정보 처리방침</h2>

      <h3>1. 개인정보의 처리 목적</h3>
      <p>‘알팡당’은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
      <ul>
        <li>고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별 및 인증, 회원자격 유지 및 관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급 및 배송 등</li>
      </ul>

      <h3>2. 개인정보의 처리 및 보유 기간</h3>
      <p>‘알팡당’은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유 및 이용 기간 또는 법령에 따른 개인정보 보유 및 이용 기간 내에서 개인정보를 처리 및 보유합니다.</p>
      <p>구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
      <ul>
        <li>고객 가입 및 관리: 회원 가입 및 관리</li>
        <li>보유 기간: 회원 탈퇴 시 즉시 삭제</li>
      </ul>
     
      <h3>3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h3>
      <p>이용자는 개인정보 주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
      <p>정보주체는 ‘알팡당’에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
      <ul>
        <li>개인정보 열람 요구</li>
        <li>오류 등이 있을 경우 정정 요구</li>
        <li>삭제 요구</li>
        <li>처리 정지 요구</li>
      </ul>

      {/* 나머지 개인정보 처리방침 내용은 여기에 계속 작성 */}

    </div>
  );
};

export default PrivacyPolicy;
