import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, verifyEmail, resetPassword, checkEmailExists } from "../api/memberApi";
import useEmailTimer from "../hooks/useEmailTimer"; // ✅ 공통 타이머 훅 적용
import "../styles/Auth.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ 타이머 훅 사용 (3분 타이머)
  const { timeLeft, startTimer, resetTimer, isActive } = useEmailTimer(180);

  // 📌 이메일 인증 요청
  const handleEmailVerification = async () => {
    if (!email.includes("@")) {
      setError("올바른 이메일 주소를 입력하세요.");
      return;
    }

    setIsSending(true);

    try {
      // 🔹 이메일 가입 여부 확인
      const emailExists = await checkEmailExists(email);
      if (emailExists !== "EXISTS") {
        setError("가입되지 않은 이메일입니다.");
        return;
      }

      // 이메일이 존재하면 인증 코드 발송
      await sendEmailVerification(email);
      setEmailSent(true);
      setError("");
      alert("이메일로 인증 코드가 전송되었습니다.");
      startTimer(); // ✅ 타이머 시작
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSending(false);
    }
  };

  // 📌 인증 코드 검증
  const handleVerifyCode = async () => {
    if (timeLeft <= 0) {
      setError("인증 코드가 만료되었습니다. 다시 요청해주세요.");
      return;
    }

    try {
      await verifyEmail(authCode);
      setIsCodeVerified(true);
      setError("");
      alert("이메일 인증이 완료되었습니다.");
      setShowResetPassword(true);
      resetTimer(); // ✅ 타이머 초기화
    } catch (error) {
      setError("인증 코드가 올바르지 않습니다.");
    }
  };

  // 📌 비밀번호 재설정 요청
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await resetPassword(email, password);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.status === 403 
        ? "이메일 인증이 완료되지 않았습니다. 이메일 인증 후 다시 시도해주세요." 
        : "비밀번호 변경 실패: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="auth-container">
      {!showResetPassword && <h2>비밀번호 찾기</h2>}
      {error && <p className="error-message">{error}</p>}

      {!showResetPassword ? (
        <>
          {/* 📌 이메일 입력 + 인증 요청 */}
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
                <button type="button" className="black-button" onClick={handleVerifyCode}>확인</button>
              </div>
            </div>
          )}

          {/* 📌 타이머 표시 */}
          {emailSent && !isCodeVerified && isActive && (
            <p className="timer">인증 코드 만료까지 남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초</p>
          )}

          {/* 📌 인증 코드 만료 안내 */}
          {timeLeft <= 0 && emailSent && !isCodeVerified && (
            <p className="error-message">인증 코드가 만료되었습니다. 다시 요청해주세요.</p>
          )}
        </>
      ) : (
        <>
          {/* 📌 비밀번호 재설정 UI (인증 완료 후 표시) */}
          <h2>새 비밀번호 설정</h2>
          <div className="input-group">
            <label>새 비밀번호</label>
            <input
              type="password"
              placeholder="새 비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="black-button" onClick={handleResetPassword}>비밀번호 변경</button>
        </>
      )}

      {!showResetPassword && (
        <span className="auth-link" onClick={() => navigate("/login")}>
          로그인으로 돌아가기
        </span>
      )}
    </div>
  );
};

export default ForgotPassword;
