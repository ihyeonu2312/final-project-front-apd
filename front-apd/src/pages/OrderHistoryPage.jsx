import axios from "axios";
import { useEffect, useState } from "react";

// ✅ 상태 변환 맵 (영어 → 한글)
const orderStatusMap = {
  PROCESSING: "처리 중",
  COMPLETED: "완료",
  CANCELED: "취소됨",
};

const paymentStatusMap = {
  PENDING: "결제 대기",
  PAID: "결제 완료",
  FAILED: "결제 실패",
};

const shippingStatusMap = {
  PENDING: "배송 준비 중",
  SHIPPED: "배송 중",
  DELIVERED: "배송 완료",
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    if (!memberId) {
      alert("로그인이 필요합니다.");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/list/${memberId}`, {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("주문 내역 불러오기 실패:", error);
      alert("주문 내역을 불러오는 데 실패했습니다.");
    }
    setLoading(false);
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`, {
        withCredentials: true,
      });
      setSelectedOrder(response.data);
    } catch (error) {
      console.error("주문 상세 정보 불러오기 실패:", error);
      alert("주문 상세 정보를 불러오는 데 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>📦 주문 내역</h1>

      {loading && <p>로딩 중...</p>}
      {!loading && orders.length === 0 && <p>주문 내역이 없습니다.</p>}

      <ul>
        {orders.map((order) => (
          <li key={order.orderId} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
            <p>🆔 주문번호: {order.orderId}</p>
            <p>📅 주문 날짜: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>💰 총 금액: {order.totalAmount.toLocaleString()} 원</p>
            <p>📦 주문 상태: {orderStatusMap[order.orderStatus] || order.orderStatus}</p>
            <p>💳 결제 상태: {paymentStatusMap[order.paymentStatus] || order.paymentStatus}</p>
            <p>🚚 배송 상태: {shippingStatusMap[order.shippingStatus] || order.shippingStatus}</p>
            <button onClick={() => fetchOrderDetails(order.orderId)}>📜 상세 보기</button>
          </li>
        ))}
      </ul>

      {/* 주문 상세 정보 모달 */}
      {selectedOrder && (
        <div style={{ border: "2px solid black", padding: "20px", marginTop: "20px" }}>
          <h2>📝 주문 상세 정보</h2>
          <p>🆔 주문번호: {selectedOrder.orderId}</p>
          <p>📅 주문 날짜: {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
          <p>📦 주문 상태: {orderStatusMap[selectedOrder.orderStatus] || selectedOrder.orderStatus}</p>
          <p>💳 결제 상태: {paymentStatusMap[selectedOrder.paymentStatus] || selectedOrder.paymentStatus}</p>
          <p>🚚 배송 상태: {shippingStatusMap[selectedOrder.shippingStatus] || selectedOrder.shippingStatus}</p>

          <h3>📦 주문 상품 목록</h3>
          <ul>
            {selectedOrder.orderItems.map((item) => (
              <li key={item.orderItemId}>
                <p>🛍 상품명: {item.productName}</p>
                <p>🔢 수량: {item.quantity}개</p>
                <p>💰 가격: {item.price.toLocaleString()} 원</p>
              </li>
            ))}
          </ul>

          <button onClick={() => setSelectedOrder(null)}>❌ 닫기</button>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
