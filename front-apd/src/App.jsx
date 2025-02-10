import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ React Router 추가
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> {/* ✅ React Router 적용 */}
      <Header />
      <main className="main-content">
        <Routes> {/* ✅ 페이지 라우팅 */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/used" element={<Used />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

// ✅ 임시 컴포넌트 추가
const Home = () => <h1>홈 페이지</h1>;
const Shop = () => <h1>쇼핑 페이지</h1>;
const Used = () => <h1>중고거래 페이지</h1>;
const Cart = () => <h1>장바구니 페이지</h1>;
const Login = () => <h1>로그인 페이지</h1>;

export default App;
