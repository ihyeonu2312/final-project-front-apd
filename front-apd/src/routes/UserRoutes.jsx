// AppRoutes.jsx 또는 index.js (라우트 파일)
import { Routes, Route } from "react-router-dom";
import MyPage from "../pages/MyPage";
import CartPage from "../pages/CartPage";
import MyReviewsPage from "../pages/MyReviewsPage";
import MyEditPage from "../pages/MyEditPage";


console.log("✅ AppRoutes 컴포넌트 파일 로드됨!");

function UserRoutes() {
  console.log("✅ AppRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname); // 🔥 디버깅용 콘솔 로그 추가
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/mypage/reviews" element={<MyReviewsPage />} />
      <Route path="/mypage/edit" element={<MyEditPage />} />
    </Routes>
  );
}

export default UserRoutes;
