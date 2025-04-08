import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

// const API_BASE_URL = "http://localhost:8080/api/products"; //로컬 백엔드 서버 주소

// ✅ 특정 상품의 이미지 목록 가져오기
export const getProductImages = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${productId}/images`);
    return response.data; // JSON 데이터 반환
  } catch (error) {
    console.error("🚨 상품 이미지 데이터를 불러오는 데 실패했습니다:", error);
    return [];
  }
};

// ✅ 특정 상품의 상세 이미지 목록 가져오기
export const getProductDetailImages = async (productId) => {
  try {
    // 🔧 'images' 제거! (백엔드와 맞게)
    const response = await axios.get(`${API_BASE_URL}/${productId}/detail-images`);
    return response.data;
  } catch (error) {
    console.error("🚨 상품 상세 이미지 데이터를 불러오는 데 실패했습니다:", error);
    return [];
  }
};
