// AppRoutes.jsx 또는 index.js (라우트 파일)
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

console.log("✅ AppRoutes 컴포넌트 파일 로드됨!");

function AuthRoutes() {
  console.log("✅ AppRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname); // 🔥 디버깅용 콘솔 로그 추가
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default AuthRoutes;
