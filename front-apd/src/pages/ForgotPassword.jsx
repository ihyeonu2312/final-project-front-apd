import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, verifyEmail } from "../api/memberApi"; // ✅ auth.js에서 가져오기
import "../styles/Auth.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isSending, setIsSending] = useState(false); // 이메일 전송 중 여부

  // 📌 이메일 인증 요청 (API에서 가져오기)
  const handleEmailVerification = async () => {
    if (!email.includes("@")) {
      setError("올바른 이메일 주소를 입력하세요.");
      return;
    }

    setIsSending(true); // ✅ 전송 중 버튼 비활성화

    try {
      await sendEmailVerification(email);
      setEmailSent(true);
      setError("");
      alert("이메일로 인증 코드가 전송되었습니다.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSending(false); // ✅ 전송 완료 후 버튼 활성화
    }
  };

  // 📌 인증 코드 검증 (API에서 가져오기)
  const handleVerifyCode = async () => {
    try {
      await verifyEmail(authCode);
      setIsCodeVerified(true);
      setError(""); // ✅ 인증 성공 시 기존 에러 메시지 초기화
      alert("이메일 인증이 완료되었습니다.");

      // ✅ 인증 완료 후 비밀번호 재설정 페이지로 이동
      navigate(`/reset-password?email=${email}&token=${authCode}`);
    } catch (error) {
      setError("인증 코드가 올바르지 않습니다.");
    }
  };

  return (
    <div className="auth-container">
      <h2>비밀번호 찾기</h2>
      {error && <p className="error-message">{error}</p>}

      {/* 📌 이메일 입력 + 인증 요청 버튼 */}
      <div className="input-group">
        <label>이메일</label>
        <div className="email-auth">
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSending || isCodeVerified}
          />
          <button
            type="button"
            className="black-button"
            onClick={handleEmailVerification}
            disabled={isSending || isCodeVerified}
          >
            {isSending
              ? "전송 중..."
              : isCodeVerified
              ? "✅ 인증 완료"
              : emailSent
              ? "재전송"
              : "인증 요청"}
          </button>
        </div>
      </div>

      {/* 📌 인증 코드 입력 */}
      {emailSent && !isCodeVerified && (
        <div className="input-group">
          <label>인증 코드 입력</label>
          <div className="email-auth">
            <input
              type="text"
              placeholder="이메일로 받은 인증 코드 입력"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              required
            />
            <button type="button" className="black-button" onClick={handleVerifyCode}>
              확인
            </button>
          </div>
        </div>
      )}

      <button className="black-button" onClick={() => navigate("/login")}>
        로그인으로 돌아가기
      </button>
    </div>
  );
};

export default ForgotPassword;
