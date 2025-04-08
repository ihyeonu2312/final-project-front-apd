// src/api/inquiryApi.js
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/inquiries`;
const ADMIN_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/admin/inquiries`;

// const BASE_URL = 'http://localhost:8080/api/inquiries';
// const ADMIN_BASE_URL = 'http://localhost:8080/api/admin/inquiries';

// ✅ Axios 인스턴스 생성 (JWT 자동 포함)
const api = axios.create();

// 수정된 코드
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ✅ 'token'으로 변경
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ✅ 문의 작성 (고객)
export const createInquiry = async (data) => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};

// ✅ 내 문의 목록 조회 (고객)
export const getMyInquiries = async () => {
  const res = await api.get(BASE_URL);
  return res.data;
};

// ✅ 문의 상세 조회
export const getInquiryDetail = async (inquiryId) => {
  const res = await api.get(`${BASE_URL}/${inquiryId}`);
  return res.data;
};

// ✅ 관리자 답변 등록
export const createInquiryResponse = async (data) => {
  const res = await api.post(`${ADMIN_BASE_URL}/response`, data);
  return res.data;
};

// 관리자 전체 문의 목록 조회
export const getAllInquiriesForAdmin = async () => {
  const res = await api.get(`${ADMIN_BASE_URL}`);
  return res.data;
};

