import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import orderApi from "../api/orderApi"; // ✅ API 가져오기
import MyPageSidebar from "../components/MyPageSidebar";
import "../styles/MyPage.css";
import "../styles/MyOrders.css";

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

const MyOrders = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    loadOrders();
  }, [user]);

  // ✅ 주문 목록 불러오기
  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await orderApi.fetchOrders(user.memberId); // ✅ 주문 내역 조회 API
      setOrders(data);
    } catch (error) {
      alert("주문 내역을 불러오는 데 실패했습니다.");
    }
    setLoading(false);
  };

  // ✅ 주문 상세 정보 불러오기
  const loadOrderDetails = async (orderId) => {
    try {
      const data = await orderApi.fetchOrderDetails(orderId);
      setSelectedOrder(data);
    } catch (error) {
      alert("주문 상세 정보를 불러오는 데 실패했습니다.");
    }
  };

  // ✅ 주문 삭제 함수 (결제 대기 상태일 경우만 가능)
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("정말로 이 주문을 삭제하시겠습니까?")) return;

    try {
      await orderApi.deleteOrder(orderId);
      alert("주문이 삭제되었습니다.");
      loadOrders(); // 주문 목록 새로고침
    } catch (error) {
      alert("주문을 삭제하는 데 실패했습니다.");
    }
  };

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>📦 주문 내역</h2>

        {loading && <p>로딩 중...</p>}
        {!loading && orders.length === 0 && <p>주문 내역이 없습니다.</p>}

        <ul className="order-list">
  {orders.map((order) => (
    <li key={order.orderId} className="order-item">
      <div className="order-details">
        <h3>🛍 주문번호: {order.orderId}</h3>
        <p>📅 주문 날짜: {new Date(order.orderDate).toLocaleDateString()}</p>
        <p>💰 총 금액: {order.totalAmount.toLocaleString()} 원</p>
        <p>📦 주문 상태: <span className="status">{orderStatusMap[order.orderStatus] || order.orderStatus}</span></p>
        <p>💳 결제 상태: <span className="status">{paymentStatusMap[order.paymentStatus] || order.paymentStatus}</span></p>
        <p>🚚 배송 상태: <span className="status">{shippingStatusMap[order.shippingStatus] || order.shippingStatus}</span></p>
      </div>
      <div className="order-actions">
        <button className="detail-button" onClick={() => loadOrderDetails(order.orderId)}>📜 상세 보기</button>
        {order.paymentStatus === "PENDING" && (
          <button className="delete-button" onClick={() => handleDeleteOrder(order.orderId)}>🗑 주문 취소</button>
        )}
      </div>
    </li>
  ))}
</ul>


        {/* 주문 상세 정보 모달 */}
        {selectedOrder && (
          <div className="order-modal">
            <div className="modal-content">
              <h2>📝 주문 상세 정보</h2>
              <p>🛍 주문번호: {selectedOrder.orderId}</p>
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

              <button className="close-button" onClick={() => setSelectedOrder(null)}>❌ 닫기</button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
