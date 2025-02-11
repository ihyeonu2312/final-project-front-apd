import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phone: "",
    address: "",
    detailAdd: "",
    authCode: "", // 사용자가 입력한 인증 코드
  });

  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false); // 이메일 인증 요청 상태
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 인증 코드 검증 여부
  const [authCodeFromServer, setAuthCodeFromServer] = useState(""); // 서버에서 받은 인증 코드

  // 전화번호 입력 시 자동 하이픈(-) 추가
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = rawValue
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");

    setFormData({ ...formData, phone: formattedValue });
  };

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 이메일 인증 요청 (인증 코드 발송)
  const handleEmailVerification = async () => {
    if (!formData.email.includes("@")) {
      setError("올바른 이메일 주소를 입력하세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthCodeFromServer(data.authCode); // 서버에서 받은 인증 코드 저장
        setEmailSent(true); // 인증 코드 입력창 활성화
        setError("");
        alert("이메일로 인증 코드가 전송되었습니다.");
      } else {
        setError("이메일 전송에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  // 📌 인증 코드 검증
  const handleVerifyCode = () => {
    if (formData.authCode === authCodeFromServer) {
      setIsCodeVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      setError("인증 코드가 올바르지 않습니다.");
    }
  };

  // 회원가입 폼 제출 핸들러
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

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      phone: formData.phone,
      address: formData.address,
      detailAdd: formData.detailAdd,
    };

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
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
          <input type="tel" name="phone" placeholder="전화번호 입력" value={formData.phone} onChange={handlePhoneChange} maxLength="13" required />
        </div>

        <div className="input-group">
          <label>주소</label>
          <input type="text" name="address" placeholder="주소 입력" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>상세주소</label>
          <input type="text" name="detailAdd" placeholder="상세주소 입력" value={formData.detailAdd} onChange={handleChange} required />
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

export default Signup;