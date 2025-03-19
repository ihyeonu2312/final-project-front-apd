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
    const response = await axios.post(`${API_URL}/auth/login`, credentials);

    console.log("🔍 로그인 API 응답:", response.data); // ✅ 응답 확인

    // ✅ JWT 토큰 저장
    saveToken(response.data.token);

    // ✅ memberId 저장
    if (response.data.memberId) {
      localStorage.setItem("memberId", response.data.memberId);
    } else {
      console.warn("⚠️ memberId가 로그인 응답에 없습니다.");
    }

    return response.data;
  } catch (error) {
    throw new Error(
      "로그인 실패: " + (error.response?.data?.message || error.message)
    );
  }
};


/* 🔹 카카오 로그인 요청 */
export const kakaoLogin = async (code) => {
  try {
    console.log("🚀 카카오 로그인 요청 시작, 코드:", code);

    const response = await axios.get(`${API_URL}/auth/kakao/callback?code=${code}`);

    console.log("🔥 백엔드 응답:", response.data); // ✅ 응답 로그 추가
    console.log("🔥 받은 JWT 토큰:", response.data?.token); // ✅ 토큰 확인

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      console.error("❌ JWT 토큰이 응답에 없습니다.");
      throw new Error("JWT 토큰이 응답에 없습니다.");
    }
  } catch (error) {
    console.error("🔥 카카오 로그인 API 요청 실패:", error);
    throw new Error("카카오 로그인 실패: " + (error.response?.data?.message || error.message));
  }
};
/* 🔹 회원가입 요청 */
export const signupRequest = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);

    // ✅ 회원가입 후 자동 로그인 요청
    const loginResponse = await loginRequest({
      email: userData.email,
      password: userData.password,
    });

    return loginResponse; // 자동 로그인 후 받은 데이터 반환
  } catch (error) {
    throw new Error(
      "회원가입 실패: " + (error.response?.data?.message || error.message)
    );
  }
};

/* 🔹 사용자 프로필 조회 */
export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ 저장된 JWT 토큰 가져오기
    if (!token) throw new Error("토큰이 존재하지 않습니다.");

    console.log("🔍 프로필 요청 - Authorization 헤더:", `Bearer ${token}`); // ✅ 디버깅용 로그 추가

    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ JWT 포함
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ 회원 정보 조회 실패:", error);
    throw new Error(
      "회원 정보 조회 실패: " + (error.response?.data?.message || error.message)
    );
  }
};

/* 🔹 로그아웃 요청 */
export const logoutRequest = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ 저장된 JWT 토큰 가져오기
    await axios.post(
      `${API_URL}/auth/logout`,
      {}, // ✅ 빈 바디 (POST 요청이기 때문에 필요)
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ 변수명 통일!
        },
      }
    );
    localStorage.removeItem("token"); // ✅ 삭제 시에도 동일한 키 사용
  } catch (error) {
    console.error("❌ 로그아웃 실패:", error.response?.data || error.message);
  }
};

/* 🔹 이메일 인증 요청 (인증 코드 발송) */
export const sendEmailVerification = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/send-email`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("✅ 이메일 전송 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 이메일 전송 실패:", error.response?.data || error.message);
    throw new Error("이메일 전송에 실패했습니다.");
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
    console.error("❌ 이메일 인증 실패:", error.response?.data || error.message);
    throw new Error("이메일 인증에 실패했습니다.");
  }
};


// 비번 재설정
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/reset-password`,
      { email, newPassword }, // ✅ 이메일도 함께 전송
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("비밀번호 변경 실패:", error.response?.data || error.message);
    throw error;
  }
};
/* 🔹 회원 정보 수정 요청 */
export const updateUserInfo = async (userData) => {
  try {
    const token = localStorage.getItem("token"); // ✅ JWT 토큰 가져오기
    if (!token) throw new Error("토큰이 존재하지 않습니다.");
    
    const response = await axios.put(`${API_URL}/user/update`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ 인증 토큰 포함
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("❌ 회원 정보 수정 실패:", error.response?.data || error.message);
    throw new Error("회원 정보 수정 실패: " + (error.response?.data?.message || error.message));
  }
};

/* 🔹 이메일 중복 확인 API */
export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/user/check-email`, {
      params: { email },
    });
    return response.data === "EXISTS"; // ✅ 존재하면 true, 없으면 false 반환
  } catch (error) {
    console.error("❌ 이메일 중복 확인 실패:", error.response?.data || error.message);
    throw new Error("이메일 중복 확인 실패");
  }
};


/* 🔹 닉네임 중복 확인 (API 요청) */
export const checkNicknameExists = async (nickname) => {
  try {
    const response = await axios.get(`${API_URL}/user/check-nickname`, {
      params: { nickname },
    });
    return response.data === "AVAILABLE"; // true or false 반환
  } catch (error) {
    throw new Error("닉네임 중복 확인 실패: " + (error.response?.data?.message || error.message));
  }
};

/* 🔹 휴대폰 번호 중복 확인 (API 요청) */
// export const checkPhoneNumberExists = async (phoneNumber) => {
//   try {
//     const response = await axios.get(`${API_URL}/user/check-phone`, {
//       params: { phoneNumber },
//     });
//     return response.data === "AVAILABLE"; // true or false 반환
//   } catch (error) {
//     throw new Error("휴대폰 번호 중복 확인 실패: " + (error.response?.data?.message || error.message));
//   }
// };