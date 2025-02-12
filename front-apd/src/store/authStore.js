import { create } from "zustand";
import { loginRequest, signupRequest, fetchUserProfile, logoutRequest } from "/src/api/memberApi.js"

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  loginUser: async (credentials) => {
    try {
      const data = await loginRequest(credentials); // 백엔드 로그인 요청
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token); // JWT 토큰 저장
      return data;
    } catch (error) {
      console.error("로그인 오류:", error);
      throw error;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },

  signup: async (newUser) => {
    try {
      const data = await signupRequest(newUser);
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("회원가입 오류:", error);
      throw error;
    }
  },

}));