import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import UsedPage from "../pages/UsedPage";
import SupportPage from "../pages/SupportPage";
import CategoryPage from "../pages/CategoryPage";
import NotFound from "../pages/NotFoundPage";

console.log("✅ AppRoutes 컴포넌트 파일 로드됨!");

function MainRoutes() {
  console.log("✅ AppRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname); // 🔥 디버깅용 콘솔 로그 추가
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/used" element={<UsedPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
