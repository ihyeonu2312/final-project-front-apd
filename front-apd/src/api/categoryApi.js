import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/categories"; // 카테고리 API 기본 URL

// ✅ Axios 인스턴스 생성
const categoryApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 모든 카테고리 가져오기
export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("카테고리 응답:", response.data); // ✅ 응답 확인용 로그 추가
    return response.data;
  } catch (error) {
    console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};

// ✅ 특정 카테고리 가져오기 (ID 기반)
export const fetchCategoryById = async (categoryId) => {
  try {
    const response = await categoryApi.get(`/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`카테고리 ${categoryId} 가져오기 오류:`, error);
    throw error;
  }
};

// ✅ 새로운 카테고리 추가
export const createCategory = async (categoryData) => {
  try {
    const response = await categoryApi.post("/", categoryData);
    return response.data;
  } catch (error) {
    console.error("카테고리 추가 중 오류 발생:", error);
    throw error;
  }
};

// ✅ 카테고리 수정
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await categoryApi.put(`/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`카테고리 ${categoryId} 수정 오류:`, error);
    throw error;
  }
};

// ✅ 카테고리 삭제
export const deleteCategory = async (categoryId) => {
  try {
    const response = await categoryApi.delete(`/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`카테고리 ${categoryId} 삭제 오류:`, error);
    throw error;
  }
};

export default categoryApi;
