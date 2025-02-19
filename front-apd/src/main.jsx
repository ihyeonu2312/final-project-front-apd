// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import "./index.css"; // CSS 파일이 있다면

console.log("✅ React 애플리케이션 시작됨!");

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        // <React.StrictMode>
            // <BrowserRouter>
                <App />
            // </BrowserRouter>
        // </React.StrictMode>
    );
} else {
    console.error("❌ 'root' 엘리먼트를 찾을 수 없습니다.");
}
