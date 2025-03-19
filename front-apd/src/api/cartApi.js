import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cart'; // ✅ 수정

// ✅ 장바구니 항목 불러오기
export const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    }).then(res => res.data);
};

// ✅ 장바구니 아이템 삭제
export const deleteCartItem = async (memberId, productId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/${memberId}/remove/${productId}`, {  
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });
};


// ✅ 장바구니 아이템 수량 변경
export const updateCartItemQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    const memberId = localStorage.getItem("memberId");

    if (!memberId) {
        console.error("❌ 회원 ID가 없습니다. 로그인 필요!");
        return;
    }

    await axios.patch(`${API_BASE_URL}/update`, { memberId, productId, quantity }, { // ✅ URL 변경
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        withCredentials: true, // ✅ CORS 문제 방지
    });
};

// ✅ 장바구니에 상품 추가
export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = localStorage.getItem("token");
        const memberId = parseInt(localStorage.getItem("memberId"), 10); // ✅ 숫자로 변환

        if (!token) {
            console.error("❌ JWT 토큰이 없습니다. 로그인 필요!");
            return;
        }

        if (!memberId) {
            console.error("❌ 회원 ID가 없습니다. 로그인 필요!");
            return;
        }

        console.log("🛒 장바구니 추가 요청:", { memberId, productId, quantity });

        const response = await axios.post(
            `${API_BASE_URL}/add`, // ✅ API_BASE_URL 사용
            { memberId, productId, quantity }, 
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        
        console.log("✅ 장바구니 추가 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 장바구니 추가 실패:", error.response ? error.response.data : error);
        throw error;
    }
};
