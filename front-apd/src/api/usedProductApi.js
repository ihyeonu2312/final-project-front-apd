import axios from "axios";

// ✅ 중고상품 등록
export const createUsedProduct = async (productData) => {
  const response = await axios.post("/api/used-products", productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// ✅ 전체 상품 조회
export const fetchUsedProducts = async () => {
  const response = await axios.get("/api/used-products");
  return response.data;
};

// ✅ 상품 단건 조회
export const fetchUsedProductById = async (id) => {
  const response = await axios.get(`/api/used-products/${id}`);
  return response.data;
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
