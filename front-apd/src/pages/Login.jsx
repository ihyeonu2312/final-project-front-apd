import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore(); // Zustand 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ 로그인 API 호출 (현재는 가짜 데이터 사용)
    if (email === "test@example.com" && password === "password123") {
      login({ email, name: "테스트 유저" }); // Zustand에 사용자 정보 저장
      alert("로그인 성공!");
      navigate("/"); // 메인 페이지로 이동
    } else {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="auth-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="black-button">
          로그인
        </button>
      </form>

      <p className="auth-text">
        계정이 없으신가요?{" "}
        <button className="black-button" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </p>
    </div>
  );
};

export default Login;
