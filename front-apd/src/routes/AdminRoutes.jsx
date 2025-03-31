import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";




console.log("✅ AppRoutes 컴포넌트 파일 로드됨!");

function UserRoutes() {
  console.log("✅ AppRoutes 컴포넌트 렌더링됨!");
  console.log("✅ 현재 URL 경로:", location.pathname); // 🔥 디버깅용 콘솔 로그 추가
  return (
    <Routes>
<Route
  path="/admin"
  element={
    user?.role === '관리자' ? (
      <Admin />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>

   

    </Routes>
  );
}

export default UserRoutes;
