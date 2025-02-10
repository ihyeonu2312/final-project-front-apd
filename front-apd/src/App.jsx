import { useState } from "react";
import "./App.css";
import Header from "./components/Header";  // ✅ 헤더 추가
import Footer from "./components/Footer";  // ✅ 푸터 추가

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header /> {/* ✅ 헤더 추가 */}
      <main className="main-content">
        <h1>알팡당 쇼핑몰에 오신 것을 환영합니다!</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </main>
      <Footer /> {/* ✅ 푸터 추가 */}
    </>
  );
}

export default App;
