import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categoryApi = axios.create({
  baseURL: `${API_BASE_URL}/categories`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 모든 카테고리 가져오기 (상품 목록 제외)
export const fetchCategories = async () => {
  try {
    const response = await categoryApi.get("");
    console.log("📌 [DEBUG] 카테고리 API 응답:", response.data); // ✅ 응답 확인
    return response.data.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      url: category.url || `/category/${category.categoryId}` // ✅ URL 없으면 기본값 설정
    }));
  } catch (error) {
    console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};

// ✅ 특정 카테고리 가져오기 (ID 기반, 상품 목록 제외)
export const fetchCategoryById = async (categoryId) => {
  try {
    const response = await categoryApi.get(`/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`카테고리 ${categoryId} 가져오기 오류:`, error);
    throw error;
  }
};

// ✅ 특정 카테고리 가져오기 (상품 포함)
export const fetchCategoryWithProducts = async (categoryId) => {
  try {
    const response = await categoryApi.get(`/${categoryId}/products`);
    return response.data;
  } catch (error) {
    console.error(`카테고리 ${categoryId} (상품 포함) 가져오기 오류:`, error);
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
