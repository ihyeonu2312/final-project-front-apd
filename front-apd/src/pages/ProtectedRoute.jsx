import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const consentAgreed = localStorage.getItem("consentAgreed");

  if (!consentAgreed) {
    alert("회원가입을 진행하려면 개인정보 수집 및 이용 동의가 필요합니다.");
    return <Navigate to="/signup/consent" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
