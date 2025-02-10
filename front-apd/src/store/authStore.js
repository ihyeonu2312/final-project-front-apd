import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // 로그인한 사용자 정보
  users: [], // 가입한 사용자 목록

  // 로그인 기능
  login: (userData) => set({ user: userData }),

  // 로그아웃 기능
  logout: () => set({ user: null }),

  // 회원가입 기능
  register: (newUser) =>
    set((state) => ({
      users: [...state.users, newUser], // 유저 추가
      user: newUser, // 가입 후 자동 로그인
    })),
}));