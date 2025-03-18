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

// ✅ 장바구니에 상품 추가 (새로운 API)
export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = localStorage.getItem("token"); // ✅ JWT 가져오기
        if (!token) {
            console.error("❌ JWT 토큰이 없습니다. 로그인 필요!");
            return;
        }

        const response = await axios.post(
            `${API_BASE_URL}/add`,
            { productId, quantity },
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        
        console.log("✅ 장바구니 추가 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 장바구니 추가 실패:", error);
        throw error;
    }
};
