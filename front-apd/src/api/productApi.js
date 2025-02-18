import axios from "axios";

const API_URL = "http://localhost:8080/api";

/* 🔹 JWT 토큰 저장 함수 */
const saveToken = (token) => {
  if (token) {
    localStorage.setItem("token", token); // ✅ JWT 토큰을 로컬 스토리지에 저장
  }
};
