import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MyPageSidebar from "../components/MyPageSidebar";
import { checkNicknameExists, checkPhoneNumberExists, sendEmailVerification, verifyEmail, checkEmailExists, updateUserInfo } from "../api/memberApi";
import axios from "axios";
import "../styles/MyPage.css";
import useEmailTimer from "../hooks/useEmailTimer"; // ✅ 타이머 훅 사용

// 인풋창 데이터가 해당 유저의 정보와 같을 시 기본값 적용하기
const MyEdit = () => {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    detailAddress: "",
  });

  const [error, setError] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(null);
  const [phoneAvailable, setPhoneAvailable] = useState(null);

    const [emailSent, setEmailSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [isSending, setIsSending] = useState(false); // 📌 이메일 인증 요청 (auth.js의 함수 사용)

    const { timeLeft, startTimer, resetTimer, isActive } = useEmailTimer(180);

    
    
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        phoneNumber: user.phoneNumber,
        address: user.address,
        detailAddress: user.detailAddress,
      });
    }
  }, [user]);

  const API_URL = "http://localhost:8080/api/user";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "nickname") setNicknameAvailable(null);
  };

    const handleEmailVerification = async () => {
    if (!formData.email.includes("@")) {
      setError("올바른 이메일 주소를 입력하세요.");
      return;
    }
  
    setIsSending(true);
  
    try {
      await sendEmailVerification(formData.email);
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

    // 📌 인증 코드 검증 (auth.js의 함수 사용)
    const handleVerifyCode = async () => {
      if (timeLeft <= 0) {
        setError("인증 코드가 만료되었습니다. 다시 요청해주세요.");
        return;
      }
    
      try {
        await verifyEmail(formData.authCode);
        setIsCodeVerified(true);
        setError("");
        alert("이메일 인증이 완료되었습니다.");
    
        resetTimer(); // ✅ 인증 성공 시 타이머 초기화
      } catch (error) {
        setError("인증 코드가 올바르지 않습니다.");
      }
    };



  const handleAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 API를 로드할 수 없습니다.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") extraAddress += data.bname;
          if (data.buildingName !== "")
            extraAddress += (extraAddress !== "" ? ", " : "") + data.buildingName;
          fullAddress += extraAddress ? ` (${extraAddress})` : "";
        }

        setFormData((prev) => ({
          ...prev,
          address: fullAddress,
          detailAddress: "",
        }));
      },
    }).open();
  };

  const handleNicknameCheck = async () => {
    if (!formData.nickname) {
      setError("닉네임을 입력하세요.");
      return;
    }
    try {
      const isAvailable = await checkNicknameExists(formData.nickname);
      setNicknameAvailable(isAvailable);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePhoneCheck = async () => {
    const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setPhoneAvailable(null);
      setError("올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)");
      return;
    }
    try {
      const isAvailable = await checkPhoneNumberExists(formData.phoneNumber);
      setPhoneAvailable(isAvailable);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = rawValue
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
  
    setFormData((prev) => ({
      ...prev,
      phoneNumber: formattedValue,
    }));
  
    // ✅ 전화번호 입력 값이 변경되면 중복 확인 상태 초기화
    setPhoneAvailable(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nicknameAvailable === false || phoneAvailable === false) {
      setError("닉네임과 휴대폰 번호 중복 확인을 완료하세요.");
      return;
    }
    setError("");
    try {
      await axios.put(`${API_URL}/update`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      updateUser(formData);
      alert("회원 정보가 수정되었습니다.");
      navigate("/");
    } catch (error) {
      setError(
        "회원 정보 수정 실패: " + (error.response?.data?.message || "서버 오류")
      );
    }
  };

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>{user?.nickname} 님, 안녕하세요!</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이름</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
          </div>
          <div className="input-group">
  <label>이메일</label>
  <div className="email-auth">
    <input
      type="email"
      name="email"
      placeholder="이메일 입력"
      value={formData.email}
      onChange={handleChange}
      required
      disabled={isSending || isCodeVerified} // ✅ 전송 중이거나 인증 완료되면 비활성화
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
        name="authCode"
        placeholder="인증 코드 입력"
        value={formData.authCode}
        onChange={handleChange}
        required
      />
      <button type="button" className="black-button" onClick={handleVerifyCode}>
        확인
      </button>
    </div>
  </div>
)}

{/* 📌 타이머 표시 */}
{emailSent && !isCodeVerified && isActive && (
  <p className="timer">
    인증 코드 만료까지 남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
  </p>
)}

{/* 📌 인증 코드 만료 안내 */}
{timeLeft <= 0 && emailSent && !isCodeVerified && (
  <p className="error-message">인증 코드가 만료되었습니다. 다시 요청해주세요.</p>
)}
          <div className="input-group">
            <label>닉네임</label>
            <div className="nickname-auth">
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
              <button type="button" className="black-button" onClick={handleNicknameCheck}>
                중복 확인
              </button>
            </div>
          </div>
      {/* 📌 휴대폰 번호 입력 + 중복 확인 버튼 */}
      <div className="input-group">
          <label>휴대폰 번호<span> *숫자만 입력 가능</span></label>
          <div className="phone-auth">
            <input 
              type="tel" 
              name="phoneNumber" 
              placeholder="휴대폰 번호 입력" 
              value={formData.phoneNumber} 
              onChange={handlePhoneChange} 
              maxLength="13" 
              required 
            />
            <button type="button" className="black-button" onClick={handlePhoneCheck}>
              중복 확인
            </button>
          </div>
          {phoneAvailable !== null && (
            <p className={phoneAvailable ? "success-message" : "error-message"}>
              {phoneAvailable ? "✅ 사용 가능한 휴대폰 번호입니다." : "❌ 이미 사용 중인 휴대폰 번호입니다."}
            </p>
          )}
        </div>
          <div className="input-group">
            <label>주소</label>
            <div className="address-auth">
              <input type="text" name="address" value={formData.address} readOnly />
              <button type="button" className="black-button" onClick={handleAddressSearch}>
                주소 찾기
              </button>
            </div>
          </div>
          <div className="input-group">
            <label>상세주소</label>
            <input
              type="text"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
              required
            />
          </div>
          <br/>
          <br/>
          <button type="submit" className="black-button">수정 완료</button>
        </form>
      </div>
    </div>
  );
};

export default MyEdit;
