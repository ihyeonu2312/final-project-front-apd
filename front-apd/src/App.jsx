// App.js 또는 App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainRoutes from "./routes/MainRoutes";
import UserRoutes from "./routes/UserRoutes";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFoundPage";


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
        
        <Route path="/*" element={<MainRoutes />} />

          <Route path="/user/*" element={<UserRoutes />} />

          <Route path="/category/:category" element={<CategoryPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
