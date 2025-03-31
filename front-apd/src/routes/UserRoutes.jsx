// AppRoutes.jsx 또는 index.js (라우트 파일)
import { Routes, Route } from "react-router-dom";
import MyInfo from "../pages/MyInfo";
import MyEdit from "../pages/MyEdit";
import MyOrders from "../pages/MyOrders";
import MyReviewsPage from "../pages/MyReviews";
import CartPage from "../pages/Cart";
import DeleteAccount from "../pages/DeleteAccount";




console.log("✅ AppRoutes 컴포넌트 파일 로드됨!");

function UserRoutes() {
  console.log("✅ AppRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname); // 🔥 디버깅용 콘솔 로그 추가
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
