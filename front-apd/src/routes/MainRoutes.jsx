import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/Main";
import UsedPage from "../pages/Used";
import UsedProductDetail from "../pages/UsedProductDetail";
import SupportPage from "../pages/Support";
import KakaoCallback from "../pages/KakaoCallback";

console.log("✅ AppRoutes 컴포넌트 파일 로드됨!");

function MainRoutes() {
  console.log("✅ AppRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname); // 🔥 디버깅용 콘솔 로그 추가
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/used-products" element={<UsedPage />} />
      <Route path="/used-products/:id" element={<UsedProductDetail />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/kakao/callback" element={<KakaoCallback />} /> 
    </Routes>
  );
}

export default MainRoutes;
