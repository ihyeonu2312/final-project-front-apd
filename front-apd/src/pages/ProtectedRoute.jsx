import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkConsent } from "../api/memberApi"; // ✅ 서버에서 동의 여부 확인 API 추가

const ProtectedRoute = () => {
  const [isAllowed, setIsAllowed] = useState(null); // ✅ 초기 상태 (null)
  
  useEffect(() => {
    const verifyConsent = async () => {
      try {
        const consent = await checkConsent(); // 🔥 서버에 개인정보 동의 여부 확인 요청
        setIsAllowed(consent); // ✅ 동의 여부 반영
      } catch (error) {
        console.error("🚨 개인정보 동의 확인 실패:", error);
        setIsAllowed(false);
      }
    };

    verifyConsent();
  }, []);

  // 🚨 로딩 중일 때 (API 응답 대기)
  if (isAllowed === null) return <div>로딩 중...</div>;

  // ❌ 개인정보 동의를 하지 않았다면 `/signup/consent`로 리다이렉트
  if (!isAllowed) {
    alert("회원가입을 진행하려면 개인정보 동의가 필요합니다.");
    return <Navigate to="/signup/consent" replace />;
  }

  // ✅ 동의 완료된 경우 정상 접근 허용
  return <Outlet />;
};

export default ProtectedRoute;
