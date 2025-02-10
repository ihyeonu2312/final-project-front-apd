import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/index"; // ✅ 라우트 분리

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <AppRoutes /> {/* ✅ 라우트 컴포넌트 추가 */}
      </main>
      <Footer />
    </Router>
  );
}

export default App;
