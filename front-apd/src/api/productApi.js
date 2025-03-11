import axios from "axios";

const API_URL = "http://localhost:8080/api";

/* 🔹 JWT 토큰 가져오기 */
const getToken = () => localStorage.getItem("token");

/* 🔹 Axios 인스턴스 생성 */
const api = axios.create({
  baseURL: API_URL,
});

/* 🔹 Axios 요청 인터셉터 */
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

// /* 🔹 카테고리별 상품 목록 가져오기 */
// export const fetchProductsByCategory = async (categoryKey) => {
//   try {
//     const response = await api.get(`/products/category/${encodeURIComponent(categoryKey)}`);
//     console.log("✅ API 응답 데이터 (productApi.js):", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ API 요청 실패 (productApi.js):", error);
//     throw error;
//   }
// };

// ✅ 특정 카테고리의 상품 가져오기
export const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/category/${categoryId}`);
      console.log("📌 [DEBUG] 특정 카테고리의 상품 데이터:", response.data);
      return response.data;
    } catch (error) {
      console.error(`카테고리 ${categoryId}의 상품 불러오기 실패:`, error);
      return [];
    }
  };

// 3. 상품 추가 (관리자 전용)
export const addProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("❌ 상품 추가 실패:", error);
    throw error;
  }
};

// 4. 상품 수정 (관리자 전용)
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("❌ 상품 수정 실패:", error);
    throw error;
  }
};

// 5. 상품 삭제 (관리자 전용)
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 상품 삭제 실패:", error);
    throw error;
  }
};
