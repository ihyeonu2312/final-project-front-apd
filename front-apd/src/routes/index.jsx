import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CartPage from "../pages/CartPage";
import UsedPage from "../pages/UsedPage";
import SupportPage from "../pages/SupportPage";
import CategoryPage from "../pages/CategoryPage"
import NotFound from "../pages/NotFoundPage";


function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<MainPage />} />

      {/* 주요 페이지 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/used" element={<UsedPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* 카테고리 페이지 */}
      <Route path="/:category" element={<CategoryPage />} />

      {/* 404 페이지 (항상 맨 마지막에 위치) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;