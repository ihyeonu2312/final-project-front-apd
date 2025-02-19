// App.js 또는 App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/index"; // ✅ 라우트 분리

console.log("✅ App 컴포넌트 파일 로드됨!");

function App() {
  console.log("✅ App 컴포넌트 렌더링 시작!");
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          {/* 기존의 라우트 설정을 분리한 AppRoutes 적용 */}
          <Route path="/*" element={<AppRoutes />} />

          {/* 동적 카테고리 라우트 추가 */}

          {/* 404 페이지 처리 */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
