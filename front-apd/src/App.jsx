import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import "./App.css";
import './index.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import MainRoutes from "./routes/MainRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import CategoryPage from "./pages/Category";
import TestCategory1 from "./pages/TestCategory1";
import SearchResult from "./pages/SearchResult"; // 🔍 검색 결과 페이지 추가
import ProductDetail from "./pages/ProductDetail";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import PaymentForm from "./pages/PaymentForm";

console.log("✅ 현재 API URL:", import.meta.env.VITE_API_BASE_URL);

console.log("✅ App 컴포넌트 파일 로드됨!");

function App() {
  const { user } = useAuthStore();
  console.log("✅ App 컴포넌트 렌더링 시작!");
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={user ? <Navigate replace to="/" /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate replace to="/" /> : <SignupPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={<MainRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/category/test" element={<TestCategory1 />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/product/:productId" element={<ProductDetail />} /> 
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/payment-form" element={<PaymentForm />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
