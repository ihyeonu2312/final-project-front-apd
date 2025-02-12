import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // ✅ Zustand 상태관리 추가
import "../styles/Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuthStore(); // Zustand 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginUser({ email, password }); // ✅ 백엔드 로그인 호출
      console.log("로그인 성공! JWT:", response.token);
      alert("로그인 성공!");
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      alert("로그인 실패: " + error.message);
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

export default LoginPage;
