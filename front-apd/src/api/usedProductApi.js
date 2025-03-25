import axios from "axios";


const API_BASE_URL = "http://localhost:8080/api/used-products"; // 백엔드 API 주소
// ✅ 중고상품 등록
export const createUsedProduct = async (productData) => {
  const response = await axios.post("/api/used-products", productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// ✅ 전체 중고상품 목록 가져오기
export const fetchUsedProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // 응답이 배열일 경우 바로 반환
  } catch (error) {
    console.error("🚨 중고상품 목록을 불러오는 데 실패했습니다:", error);
    return [];
  }
};


// ✅ 특정 중고상품 단건 조회
export const fetchUsedProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data; // 상세 데이터 반환
  } catch (error) {
    console.error("🚨 중고상품 상세 정보를 불러오는 데 실패했습니다:", error);
    return null;
  }
};

// ✅ 상품 삭제
export const deleteUsedProduct = async (id) => {
  const response = await axios.delete(`/api/used-products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
