// App.js 또는 App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";

console.log("✅ App 컴포넌트 파일 로드됨!");

function App() {
  console.log("✅ App 컴포넌트 렌더링 시작!");
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
         {/* ✅ 메인 페이지 관련 라우트 모든 유저가 접근 가능한 페이지들을 포함 예) 메인 페이지, 중고거래 페이지, 고객센터 등*/}
         <Route path="/*" element={<MainRoutes />} />
          
          {/* ✅ 로그인 & 회원가입 관련 라우트   예) 로그인, 회원가입, 비밀번호 찾기 */}
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* ✅ 로그인한 사용자 전용 라우트 예) 마이페이지, 장바구니, 주문 내역, 회원 정보 수정*/}
          <Route path="/user/*" element={<UserRoutes />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
