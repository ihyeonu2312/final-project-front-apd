import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // ✅ Zustand 상태 가져오기
import PrivacyPolicy from "../components/PrivacyPolicy"; // 개인정보 처리방침 컴포넌트
import { sendEmailVerification, verifyEmail } from "../api/memberApi";
import axios from "axios"; // ✅ axios 사용
import useEmailTimer from "../hooks/useEmailTimer"; // ✅ 타이머 훅 사용
import "../styles/Auth.css";

const Signup = () => {
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
  const [privacyAgreement, setPrivacyAgreement] = useState(false); // 개인정보 동의 상태

  const API_URL = "http://localhost:8080/api/user";
  const [nicknameAvailable, setNicknameAvailable] = useState(null); // 닉네임 사용 가능 여부
  const [phoneAvailable, setPhoneAvailable] = useState(null); // 휴대폰 번호 사용 가능 여부

  const { timeLeft, startTimer, resetTimer, isActive } = useEmailTimer(180);

  // 개인정보 동의 체크박스 핸들러
  const handlePrivacyAgreementChange = (e) => {
    setPrivacyAgreement(e.target.checked);
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

  // 📌 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    // ✅ 닉네임 입력 값이 변경되면 중복 확인 상태 초기화
    if (name === "nickname") {
      setNicknameAvailable(null);
    }
  };


 // 📌 이메일 인증 요청 (auth.js의 함수 사용)
  const [isSending, setIsSending] = useState(false);

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
  
    const width = 400; // 팝업 창 너비
    const height = 500; // 팝업 창 높이
    const screenWidth = window.screen.width; // 화면 너비
    const screenHeight = window.screen.height; // 화면 높이
  
    const left = (screenWidth - width) / 2; // 가운데 정렬 (가로)
    const top = (screenHeight - height) / 2; // 가운데 정렬 (세로)
  
    new window.daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
  
        if (data.addressType === "R") {
          if (data.bname !== "") extraAddress += data.bname;
          if (data.buildingName !== "") extraAddress += (extraAddress !== "" ? ", " : "") + data.buildingName;
          fullAddress += (extraAddress !== "" ? ` (${extraAddress})` : "");
        }
  
        setFormData((prev) => ({
          ...prev,
          address: fullAddress,
          detailAddress: "",
        }));
      },
      width,
      height,
      left,
      top,
    }).open();
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

    if (nicknameAvailable !== true || phoneAvailable !== true) {
      setError("닉네임과 휴대폰 번호 중복 확인을 먼저 진행해주세요.");
      return;
    }

    const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)");
      return;
    }

    if (!formData.address || formData.address.trim() === "") {
      setError("주소를 입력하세요.");
      return;
    }

    if (!privacyAgreement) {  // 개인정보 동의 체크 여부 확인
      setError("개인정보 동의가 필요합니다.");
      return;
    }

    setError("");

    try {
      await signup(formData);
      
      alert("회원가입 성공! 메인 페이지로 이동합니다.");
      navigate("/");
    } catch (error) {
      console.error("❌ 회원가입 요청 실패:", error);

      // 서버 응답이 있는 경우
      if (error.response) {
        if (error.response.status === 409) {
          setError("이미 가입된 이메일입니다.");
        } else {
          setError("회원가입 실패: " + (error.response.data?.message || "서버 오류가 발생했습니다."));
        }
      } else {
        setError("회원가입 실패: 네트워크 오류 또는 서버 오류입니다.");
      }
    }
  };


 // 📌 닉네임 중복 확인
 const handleNicknameCheck = async () => {
  if (!formData.nickname) {
    setError("닉네임을 입력하세요.");
    return;
  }

  try {
    console.log("📡 닉네임 중복 확인 요청:", formData.nickname);
    const response = await axios.get(`${API_URL}/check-nickname`, {
      params: { nickname: formData.nickname }
    });

    console.log("🔍 닉네임 중복 확인 응답:", response.data);
    setNicknameAvailable(response.data === "AVAILABLE");
  } catch (error) {
    console.error("❌ 닉네임 중복 확인 실패:", error);
    setError("닉네임 중복 확인 실패");
  }
};

const handlePhoneCheck = async () => {
  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
  
  // ✅ 올바른 형식이 아니면 중복 확인 요청을 보내지 않고 에러 메시지 표시
  if (!phoneRegex.test(formData.phoneNumber)) {
    setPhoneAvailable(null); // ✅ 상태 초기화
    setError("올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)");
    return;
  }

  try {
    console.log("📡 휴대폰 번호 중복 확인 요청:", formData.phoneNumber);
    const response = await axios.get(`${API_URL}/check-phone`, {
      params: { phoneNumber: formData.phoneNumber }
    });

    console.log("🔍 휴대폰 번호 중복 확인 응답:", response.data);
    setPhoneAvailable(response.data === "AVAILABLE");
    setError(""); // ✅ 성공 시 기존 에러 메시지 초기화
  } catch (error) {
    console.error("❌ 휴대폰 번호 중복 확인 실패:", error);
    setError("휴대폰 번호 중복 확인 실패");
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
            <input type="email" name="email" placeholder="이메일 입력" value={formData.email} onChange={handleChange} required disabled={isSending || isCodeVerified}/>
            <button type="button" className="black-button" onClick={handleEmailVerification} disabled={isSending || isCodeVerified}>
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
              <input type="text" name="authCode" placeholder="인증 코드 입력" value={formData.authCode} onChange={handleChange} required />
              <button type="button" className="black-button" onClick={handleVerifyCode}>확인</button>
            </div>
          </div>
        )}

        {emailSent && !isCodeVerified && isActive && (
          <p className="timer">인증 코드 만료까지 남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초</p>
        )}

        {timeLeft <= 0 && emailSent && !isCodeVerified && (
          <p className="error-message">인증 코드가 만료되었습니다. 다시 요청해주세요.</p>
        )}

        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" name="password" placeholder="비밀번호 입력" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>비밀번호 확인</label>
          <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

         {/* 📌 닉네임 입력 + 중복 확인 버튼 */}
         <div className="input-group">
          <label>닉네임</label>
          <div className="nickname-auth">
            <input 
              type="text" 
              name="nickname" 
              placeholder="닉네임 입력" 
              value={formData.nickname} 
              onChange={handleChange} 
              required 
            />
            <button type="button" className="black-button" onClick={handleNicknameCheck}>
              중복 확인
            </button>
          </div>
          {nicknameAvailable !== null && (
            <p className={nicknameAvailable ? "success-message" : "error-message"}>
              {nicknameAvailable ? "✅ 사용 가능한 닉네임입니다." : "❌ 이미 사용 중인 닉네임입니다."}
            </p>
          )}
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
         {/* 📌 주소 입력 필드 + 검색 버튼 */}
         <div className="input-group">
          <label>주소</label>
          <div className="address-auth">
            <input type="text" name="address" placeholder="주소 검색" value={formData.address} readOnly />
            <button type="button" className="black-button" onClick={handleAddressSearch}>
              주소 찾기
            </button>
          </div>
        </div>

        {/* 📌 상세 주소 입력 필드 */}
        <div className="input-group">
          <label>상세주소</label>
          <input 
            type="text" 
            name="detailAddress" 
            placeholder="상세 주소 입력" 
            value={formData.detailAddress} 
            onChange={handleChange} 
            required 
          />
        </div>

         {/* 📌 개인정보 처리방침 동의 체크박스 */}
         <div className="privacy-policy">
          <div className="input-group">
            <label>
            개인정보 처리방침에 동의합니다.
              <input 
                type="checkbox" 
                checked={privacyAgreement} 
                onChange={handlePrivacyAgreementChange} 
                required // 체크박스 필수 동의
                />
            </label>
          </div>

          {/* 개인정보 처리방침 내용 */}
          <div className="privacy-policy-content">
            <PrivacyPolicy />  {/* PrivacyPolicy 컴포넌트 포함 */}
          </div>
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
