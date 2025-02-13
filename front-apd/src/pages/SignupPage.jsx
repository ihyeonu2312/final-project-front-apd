import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // ✅ Zustand 상태 가져오기
import axios from "axios"; // ✅ axios 사용 (fetch 제거)
import "../styles/Auth.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup); // ✅ Zustand 회원가입 함수 가져오기
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    detailAddress: "",
    authCode: "",
  });

  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  // 📌 전화번호 자동 하이픈 추가
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = rawValue
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");

    setFormData({ ...formData, phoneNumber: formattedValue });
  };

  // 📌 입력 필드 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 이메일 인증 요청
  const handleEmailVerification = async () => {
    if (!formData.email.includes("@")) {
      setError("올바른 이메일 주소를 입력하세요.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/send-email",
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // CORS 문제 해결
          },
          withCredentials: true, // ✅ CORS 관련 설정 추가
        }
      );
  
      console.log("✅ 이메일 전송 성공:", response.data);
      setEmailSent(true);
      setError("");
      alert("이메일로 인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error("❌ 이메일 전송 실패:", error.response?.data || error.message);
      setError("이메일 전송에 실패했습니다.");
    }
  };
  

  // 📌 인증 코드 검증
  const handleVerifyCode = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/verify-email", {
        params: { token: formData.authCode }, // 서버에서 토큰 기반 검증
      });

      if (response.data === "이메일 인증이 완료되었습니다.") {
        setIsCodeVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        setError("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      setError("이메일 인증에 실패했습니다.");
    }
  };

  // 📌 회원가입 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCodeVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");

    try {
      await signup(formData); // ✅ Zustand의 signup() 호출 (memberApi.js 통해 백엔드 연동)
      alert("회원가입 성공! 메인 페이지로 이동합니다.");
      navigate("/"); // 자동 로그인 후 메인 페이지 이동
    } catch (error) {
      setError("회원가입 실패: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="auth-container">
      <h2>회원가입</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>이름</label>
          <input type="text" name="name" placeholder="이름 입력" value={formData.name} onChange={handleChange} required />
        </div>

        {/* 📌 이메일 입력 + 인증 요청 버튼 */}
        <div className="input-group">
          <label>이메일</label>
          <div className="email-auth">
            <input type="email" name="email" placeholder="이메일 입력" value={formData.email} onChange={handleChange} required />
            <button type="button" className="black-button" onClick={handleEmailVerification} disabled={emailSent || isCodeVerified}>
              {isCodeVerified ? "✅ 인증 완료" : "인증 요청"}
            </button>
          </div>
        </div>

        {/* 📌 인증 코드 입력 */}
        {emailSent && !isCodeVerified && (
          <div className="input-group">
            <label>인증 코드 입력</label>
            <div className="email-auth">
              <input type="text" name="authCode" placeholder="인증 코드 입력" value={formData.authCode} onChange={handleChange} required />
              <button type="button" onClick={handleVerifyCode}>확인</button>
            </div>
          </div>
        )}

        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" name="password" placeholder="비밀번호 입력" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>비밀번호 확인</label>
          <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>닉네임</label>
          <input type="text" name="nickname" placeholder="닉네임 입력" value={formData.nickname} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>전화번호<span> *숫자만 입력 가능</span></label>
          <input type="tel" name="phoneNumber" placeholder="전화번호 입력" value={formData.phoneNumber} onChange={handlePhoneChange} maxLength="13" required />
        </div>

        <div className="input-group">
          <label>주소</label>
          <input type="text" name="address" placeholder="주소 입력" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>상세주소</label>
          <input type="text" name="detailAddress" placeholder="상세주소 입력" value={formData.detailAddress} onChange={handleChange} required />
        </div>

        <button type="submit" className="black-button">회원가입</button>
      </form>

      <p className="auth-text">
        이미 계정이 있으신가요?{" "}
        <button className="black-button" onClick={() => navigate("/login")}>로그인</button>
      </p>
    </div>
  );
};

export default SignupPage;
