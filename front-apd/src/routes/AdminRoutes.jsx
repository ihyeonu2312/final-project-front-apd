import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// 관리자 전용 페이지 import
import AdminInquiryList from "../pages/inquiry/AdminInquiryList";
import AdminInquiryAnswer from "../pages/inquiry/AdminInquiryAnswer";
import Admin from "../pages/Admin"; // 관리자 대시보드 (선택사항)

function AdminRoutes() {
  const { user } = useAuthStore();

  // 🔒 관리자 권한이 아니면 메인 페이지로 리다이렉트
  if (!user || user.role !== '관리자') {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="inquiries" element={<AdminInquiryList />} />
      <Route path="inquiries/:inquiryId" element={<AdminInquiryAnswer />} />
    </Routes>
  );
}

export default AdminRoutes;