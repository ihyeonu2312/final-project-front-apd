import { create } from "zustand";
import { loginRequest, signupRequest, fetchUserProfile, logoutRequest } from "/src/api/memberApi.js";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, // ✅ 초기 상태를 localStorage에서 불러옴
  token: localStorage.getItem("token") || null,

  // ✅ 로그인 기능 (닉네임 포함)
  loginUser: async (credentials) => {
    try {
      const data = await loginRequest(credentials);
      
      // ✅ 토큰 & 유저 정보 저장
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      
      // ✅ 로그인 후 프로필 정보 가져오기
      const userProfile = await fetchUserProfile();
      localStorage.setItem("user", JSON.stringify(userProfile)); // ✅ 유저 정보 저장
      set({ user: userProfile, token: data.token });

      return data;
    } catch (error) {
      console.error("로그인 오류:", error);
      throw error;
    }
  },

  // ✅ 회원가입 기능
  signup: async (newUser) => {
    try {
      const data = await signupRequest(newUser);
      
      // ✅ 토큰 & 유저 정보 저장
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      
      // ✅ 회원가입 후 프로필 정보 가져오기
      const userProfile = await fetchUserProfile();
      localStorage.setItem("user", JSON.stringify(userProfile)); // ✅ 유저 정보 저장
      set({ user: userProfile, token: data.token });

      return data;
    } catch (error) {
      console.error("회원가입 오류:", error);
      throw error;
    }
  },

  // ✅ 카카오 로그인 시 사용자 정보 저장 (카카오 전용)
  setUser: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    set({ user, token });
  },

  // ✅ 로그아웃 기능
  logout: async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
    
    // ✅ localStorage에서 정보 삭제
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = null; // ✅ 헤더 초기화
    set({ user: null, token: null });
  },

  // ✅ 앱 시작 시 사용자 프로필 불러오기
  loadUserProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token) return;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      if (storedUser) {
        set({ user: JSON.parse(storedUser), token });
      } else {
        const userProfile = await fetchUserProfile();
        localStorage.setItem("user", JSON.stringify(userProfile)); // ✅ 유저 정보 저장
        set({ user: userProfile, token });
      }
    } catch (error) {
      console.error("프로필 불러오기 실패:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null, token: null });
    }
  }
}));

// ✅ 앱 시작 시 사용자 프로필 자동 로드
useAuthStore.getState().loadUserProfile();
