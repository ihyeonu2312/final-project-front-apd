// src/api/adminApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// 🔒 JWT 토큰 포함된 axios 인스턴스
const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ✅ 전체 회원 목록 조회 */
export const getAllMembers = async () => {
  const res = await authAxios.get(`${API_URL}/admin/members`);
  return res.data;
};

/* ✅ 회원 권한 변경 (관리자/일반) */
export const updateMemberRole = async (memberId, role) => {
  const res = await authAxios.patch(`${API_URL}/admin/members/${memberId}/role`, { role });
  return res.data;
};

/* ✅ 회원 상태 변경 (정지/활성화 등) */
export const updateMemberStatus = async (memberId, status) => {
  const res = await authAxios.patch(`${API_URL}/admin/members/${memberId}/status`, { status });
  return res.data;
};
