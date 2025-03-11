import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cart';

// ✅ 장바구니 항목 불러오기
export const fetchCartItems = async () => {
    const response = await axios.get(`${API_BASE_URL}/items`);
    return response.data;
};

// ✅ 장바구니 아이템 삭제
export const deleteCartItem = async (cartItemId) => {
    await axios.delete(`${API_BASE_URL}/item/${cartItemId}`);
};

// ✅ 장바구니 아이템 수량 변경
export const updateCartItemQuantity = async (cartItemId, quantity) => {
    await axios.put(`${API_BASE_URL}/item/${cartItemId}`, { quantity });
};
