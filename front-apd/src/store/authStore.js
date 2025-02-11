import { create } from "zustand";
import { login } from "../api/memberApi";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  login: async (credentials) => {
    try {
      const data = await login(credentials); // 🔥 백엔드 로그인 요청
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token); // JWT 저장
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

  // 회원가입 기능
  register: (newUser) =>
    set((state) => ({
      users: [...state.users, newUser], // 유저 추가
      user: newUser, // 가입 후 자동 로그인
    })),
}));