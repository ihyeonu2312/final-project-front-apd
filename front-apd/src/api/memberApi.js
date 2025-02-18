import axios from "axios";

const API_URL = "http://localhost:8080/api";

/* 🔹 JWT 토큰 저장 함수 */
const saveToken = (token) => {
  if (token) {
    localStorage.setItem("token", token); // ✅ JWT 토큰을 로컬 스토리지에 저장
  }
};

/* 🔹 로그인 요청 */
export const loginRequest = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true, // ✅ 쿠키 포함 (세션 관리)
    });

    saveToken(response.data.token); // ✅ JWT 저장
    return response.data;
  } catch (error) {
    throw new Error(
      "로그인 실패: " + (error.response?.data?.message || error.message)
    );
  }
};

/* 🔹 회원가입 요청 */
export const signupRequest = async (userData) => {
  try {
    const consentToken = localStorage.getItem("consentToken"); // ✅ 저장된 동의 토큰 가져오기
    if (!consentToken) throw new Error("개인정보 동의가 필요합니다."); // ❌ 동의 토큰이 없을 경우 에러 발생

    const response = await axios.post(`${API_URL}/auth/signup`, userData, {
      headers: {
        Authorization: `Bearer ${consentToken}`, // 🔥 동의 토큰 포함
      },
      withCredentials: true,
    });

    saveToken(response.data.token); // ✅ JWT 저장
    return response.data;
  } catch (error) {
    throw new Error(
      "회원가입 실패: " + (error.response?.data?.message || error.message)
    );
  }
};


export const agreeToConsent = async () => {
  try {
    // 로그인 여부와 관계없이 동의만 받기
    const response = await axios.post(`${API_URL}/auth/consent`, 
      { consentAgreed: true }, // 동의 여부
    );

    // 동의 토큰을 로컬 스토리지에 저장
    localStorage.setItem("consentToken", response.data); // 동의 토큰 저장
    return response.data;  // 동의 토큰 반환
  } catch (error) {
    throw new Error("개인정보 동의 요청 실패: " + (error.response?.data?.message || error.message));
  }
};

/* 🔹 개인정보 동의 확인 (JWT 기반) */
export const checkConsent = async () => {
  try {
    // ✅ 로그인된 사용자의 JWT 토큰 가져오기
    let token = localStorage.getItem("token");

    // ✅ 만약 JWT가 없다면, 회원가입 과정일 가능성이 있음 → consentToken 사용
    if (!token) {
      token = localStorage.getItem("consentToken"); // ✅ 동의 토큰 사용
      if (!token) return false; // 둘 다 없으면 false 반환
    }

    const response = await axios.get(`${API_URL}/auth/check-consent`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ 적절한 토큰을 헤더에 추가
      },
    });

    return response.data === "CONSENT_GRANTED";
  } catch (error) {
    return false;
  }
};


/* 🔹 사용자 프로필 조회 */
export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ 저장된 JWT 토큰 가져오기
    if (!token) throw new Error("토큰이 존재하지 않습니다.");

    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 JWT 포함
      },
      withCredentials: true, // ✅ 쿠키 포함
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "회원 정보 조회 실패: " + (error.response?.data?.message || error.message)
    );
  }
};

/* 🔹 로그아웃 요청 */
export const logoutRequest = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("token"); // ✅ JWT 삭제
  } catch (error) {
    throw new Error(
      "로그아웃 실패: " + (error.response?.data?.message || error.message)
    );
  }
};
/* 🔹 이메일 인증 요청 (인증 코드 발송) */
export const sendEmailVerification = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/send-email`, { email });
    return response.data;
  } catch (error) {
    throw new Error(
      "이메일 인증 요청 실패: " + (error.response?.data?.message || error.message)
    );
  }
};

/* 🔹 이메일 인증 코드 확인 */
export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify-email`, {
      params: { token },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "이메일 인증 실패: " + (error.response?.data?.message || error.message)
    );
  }
};



// membercontroller
/* 🔹 닉네임 중복 확인 */
export const checkNicknameExists = async (nickname) => {
  try {
    const response = await axios.get(`${API_URL}/user/check-nickname`, {
      params: { nickname },
    });
    return response.data; // "EXISTS" 또는 "AVAILABLE"
  } catch (error) {
    throw new Error(
      "닉네임 중복 확인 실패: " + (error.response?.data?.message || error.message)
    );
  }
};

/* 🔹 전화번호 중복 확인 */
export const checkPhoneNumberExists = async (phoneNumber) => {
  try {
    const response = await axios.get(`${API_URL}/user/check-phone`, {
      params: { phoneNumber },
    });
    return response.data; // "EXISTS" 또는 "AVAILABLE"
  } catch (error) {
    throw new Error(
      "전화번호 중복 확인 실패: " + (error.response?.data?.message || error.message)
    );
  }
};