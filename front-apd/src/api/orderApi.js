import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/orders";

const orderApi = {

  // ✅ 주문 준비 (장바구니에서 "구매하기" 눌렀을 때)
  prepareOrder: async (memberId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/prepare`,
        { memberId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return response.data; // OrderResponseDto 반환
    } catch (error) {
      console.error("주문 준비 실패:", error);
      throw error;
    }
  },

  // ✅ 주문 완료 처리 (결제 후) 주문상태변경
  completeOrder: async (orderId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/${orderId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error("주문 완료 처리 실패:", error);
      throw error;
    }
  },

  // ✅ 주문 목록 가져오기(결제 완료 후)
  fetchOrders: async (memberId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list/${memberId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("주문 내역 불러오기 실패:", error);
      throw error;
    }
  },

  // ✅ 주문 상세 정보 가져오기
  fetchOrderDetails: async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("주문 상세 정보 불러오기 실패:", error);
      throw error;
    }
  },

  // ✅ 주문 삭제 (결제 대기 상태일 경우만 가능)
  deleteOrder: async (orderId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      return true;
    } catch (error) {
      console.error("주문 삭제 실패:", error);
      throw error;
    }
  },
};

export default orderApi;
