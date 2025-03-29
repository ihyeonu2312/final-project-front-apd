import { Routes, Route, Navigate } from "react-router-dom"; // ✅ 여기서 같이 가져와도 됨

import MainPage from "../pages/Main";
import UsedPage from "../pages/Used";
import UsedProductDetail from "../pages/UsedProductDetail";
// import SupportPage from "../pages/Support";
import KakaoCallback from "../pages/KakaoCallback";
import AdminInquiryList from "../pages/inquiry/AdminInquiryList";
import AdminInquiryAnswer from "../pages/inquiry/AdminInquiryAnswer";
import { useAuthStore } from "../store/authStore"; // 👈 추가
// 고객센터 페이지 (👈 추가)
import MyInquiries from "../pages/inquiry/MyInquiries";
import InquiryWrite from "../pages/inquiry/InquiryWrite";
import InquiryDetail from "../pages/inquiry/InquiryDetail";
console.log("✅ AppRoutes 컴포넌트 파일 로드됨!");



function MainRoutes() {
  const { user } = useAuthStore(); // ✅ 여기에 선언 필요

  console.log("✅ AppRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname); // 🔥 디버깅용 콘솔 로그 추가
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/used-products" element={<UsedPage />} />
      <Route path="/used-products/:id" element={<UsedProductDetail />} />
      {/* <Route path="/support" element={<SupportPage />} /> */}
      <Route path="/kakao/callback" element={<KakaoCallback />} /> 
            {/* 🧑‍💼 관리자용 라우트 (선택적으로 보호 필요) */}


    {/* 🆕 고객센터 라우트 */}
    <Route path="/inquiries" element={<MyInquiries />} />
      <Route path="/inquiries/write" element={<InquiryWrite />} />
      <Route path="/inquiries/:inquiryId" element={<InquiryDetail />} />


            <Route
  path="/admin/inquiries"
  element={
    user?.role === '관리자' ? (
      <AdminInquiryList />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
<Route
  path="/admin/inquiries/:inquiryId"
  element={
    user?.role === '관리자' ? (
      <AdminInquiryAnswer />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
    </Routes>
  );
}

export default MainRoutes;
