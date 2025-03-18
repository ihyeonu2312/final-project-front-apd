import axios from "axios";

const API_URL = "http://localhost:8080/api";

/* 🔹 JWT 토큰 가져오기 */
const getToken = () => localStorage.getItem("token");

/* 🔹 Axios 인스턴스 생성 */
const api = axios.create({
  baseURL: API_URL,
});

/* 🔹 Axios 요청 인터셉터: 모든 요청에 JWT 토큰 추가 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ✅ 특정 카테고리의 상품 가져오기 (JWT 포함) */
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/products/category/${categoryId}`);
    console.log("📌 [DEBUG] 특정 카테고리의 상품 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ 카테고리 ${categoryId}의 상품 불러오기 실패:`, error);
    return [];
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products"); // ✅ 모든 상품 가져오기
    return response.data;
  } catch (error) {
    console.error("❌ 상품 불러오기 실패:", error);
    return [];
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    console.log("📌 [DEBUG] 상품 상세 데이터:", response.data); // 🔹 디버깅 로그
    return response.data;
  } catch (error) {
    console.error(`❌ 상품 ${productId} 불러오기 실패:`, error);
    return null;
  }
};



/* ✅ 상품 추가 (관리자 전용) */
export const addProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("❌ 상품 추가 실패:", error);
    throw error;
  }
};

/* ✅ 상품 수정 (관리자 전용) */
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("❌ 상품 수정 실패:", error);
    throw error;
  }
};

/* ✅ 상품 삭제 (관리자 전용) */
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 상품 삭제 실패:", error);
    throw error;
  }
};

export default api;
