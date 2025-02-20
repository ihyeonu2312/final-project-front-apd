import { create } from "zustand";
import { loginRequest, signupRequest, fetchUserProfile, logoutRequest } from "/src/api/memberApi.js"
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  // ✅ 로그인 기능 (닉네임 포함)
  loginUser: async (credentials) => {
    try {
      const data = await loginRequest(credentials);
      localStorage.setItem("token", data.token);
      set({ token: data.token });

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; // ✅ 기본 헤더 설정 추가

      // 로그인 후 프로필 정보 가져오기
      const userProfile = await fetchUserProfile();
      set({ user: userProfile });

      return data;
    } catch (error) {
      console.error("로그인 오류:", error);
      throw error;
    }
  },

  // ✅ 회원가입 기능 (닉네임 포함)
  signup: async (newUser) => {
    try {

      const data = await signupRequest(newUser);
      localStorage.setItem("token", data.token);
      set({ token: data.token });

      // 회원가입 후 프로필 정보 가져오기
      const userProfile = await fetchUserProfile();
      set({ user: userProfile });

      return data;
    } catch (error) {
      console.error("회원가입 오류:", error);
      throw error;
    }
  },

  // ✅ 로그아웃 기능 (토큰 & 사용자 정보 제거)
  logout: async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },

  // ✅ 자동으로 사용자 프로필 정보 불러오기 (앱 로드 시 실행)
  loadUserProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userProfile = await fetchUserProfile();
      set({ user: userProfile });
    } catch (error) {
      console.error("프로필 불러오기 실패:", error);
      set({ user: null, token: null });
      localStorage.removeItem("token");
    }
  }
}));

// ✅ 앱 시작 시 사용자 프로필 자동 로드
useAuthStore.getState().loadUserProfile();
