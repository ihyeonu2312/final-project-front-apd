import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

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
  });

  const [error, setError] = useState("");

  // 전화번호 입력 시 자동 하이픈(-) 추가
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력 가능
    const formattedValue = rawValue
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3") // 3자리-4자리-4자리 포맷
      .replace(/(-{1,2})$/g, ""); // 불필요한 하이픈 제거

    setFormData({ ...formData, phone: formattedValue });
  };

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // 회원가입 API 요청 (백엔드 연동)
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        const data = await response.json();
        setError(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>이름</label>
          <input
            type="text"
            name="name"
            placeholder="이름 입력"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>닉네임</label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임 입력"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>전화번호 <span> *숫자만 입력 가능</span></label>
          <input
            type="tel"
            name="phone"
            placeholder="전화번호 입력"
            value={formData.phone}
            onChange={handlePhoneChange}
            maxLength="13"
            required
          />
        </div>
        <div className="input-group">
          <label>주소</label>
          <input
            type="text"
            name="address"
            placeholder="주소 입력"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>상세주소</label>
          <input
            type="text"
            name="detailAdd"
            placeholder="상세주소 입력"
            value={formData.detailAdd}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="black-button">
          회원가입
        </button>
      </form>
      <p className="login-text">
        이미 계정이 있으신가요?{" "}
        <button className="black-button" onClick={() => navigate("/login")}>
          로그인
        </button>
      </p>
    </div>
  );
};

export default Signup;
