import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agreeToConsent } from "../api/memberApi"; // ✅ 동의 토큰 발급 API 추가
import Cookies from "js-cookie";
import "../styles/Consent.css";

const ConsentPage = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  // ✅ 체크박스 상태 변경
  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

   // "다음" 버튼 클릭 시 동의 쿠키 설정
   const handleNextClick = () => {
    if (isAgreed) {
      // 동의 쿠키 저장
      Cookies.set("consent", "true", { expires: 365 });  // 365일 동안 유효
      console.log("✅ 동의 쿠키 저장 완료");

      // 회원가입 페이지로 이동
      navigate("/signup");
    } else {
      alert("개인정보 동의에 체크해주세요.");
    }
  };

  return (
    <div className="consent-container">
      <h2>개인정보 수집 및 이용 동의</h2>
      <p>서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>

      <ul>
        <li>이름, 이메일, 비밀번호</li>
        <li>서비스 이용 기록 및 접속 로그</li>
        <li>문의 및 상담 기록</li>
      </ul>

      <label className="checkbox-label">
        <input type="checkbox" checked={isAgreed} onChange={handleCheckboxChange} />
        개인정보 수집 및 이용에 동의합니다. (필수)
      </label>

      <div className="buttons">
        <button
          onClick={handleNextClick}
          disabled={!isAgreed}
          className={isAgreed ? "enabled" : "disabled"}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ConsentPage;