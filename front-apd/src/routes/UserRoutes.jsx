import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import MyInfo from "../pages/MyInfo";
import MyEdit from "../pages/MyEdit";
import MyOrders from "../pages/MyOrders";
import MyReviewsPage from "../pages/MyReviews";
import CartPage from "../pages/Cart";
import DeleteAccount from "../pages/DeleteAccount";

console.log("✅ UserRoutes 컴포넌트 파일 로드됨!");

function UserRoutes() {
  const { user } = useAuthStore();

  // 🔒 비로그인 or 관리자일 경우 차단
  if (!user || user.role === '관리자') {
    return <Navigate to="/" replace />;
  }

  console.log("✅ UserRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname);

  return (
    <Routes>
      <Route path="/my-info" element={<MyInfo />} />
      <Route path="/my-info/edit" element={<MyEdit />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/my-reviews" element={<MyReviewsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/delete-account" element={<DeleteAccount />} />
    </Routes>
  );
}

export default UserRoutes;
