import axios from "axios";
import { useEffect, useState } from "react";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ 주문 내역 조회 (GET)
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("주문 내역 불러오기 실패:", error);
    }
    setLoading(false);
  };

  // ✅ 주문 상세 조회 (GET)
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`, {
        withCredentials: true,
      });
      setSelectedOrder(response.data);
    } catch (error) {
      console.error("주문 상세 정보 불러오기 실패:", error);
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
            <p>💰 총 금액: {order.totalAmount} 원</p>
            <p>📦 주문 상태: {order.orderStatus}</p>
            <p>💳 결제 상태: {order.paymentStatus}</p>
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
          <p>📦 주문 상태: {selectedOrder.orderStatus}</p>
          <p>💳 결제 상태: {selectedOrder.paymentStatus}</p>

          <h3>📦 주문 상품 목록</h3>
          <ul>
            {selectedOrder.orderItems.map((item) => (
              <li key={item.orderItemId}>
                <p>🛍 상품명: {item.productName}</p>
                <p>🔢 수량: {item.quantity}개</p>
                <p>💰 가격: {item.price} 원</p>
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
