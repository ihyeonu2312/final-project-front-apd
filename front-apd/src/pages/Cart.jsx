import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCartItems,
  deleteCartItem,
  updateCartItemQuantity,
} from "../api/cartApi";
import MyPageSidebar from "../components/MyPageSidebar";
import "../styles/MyPage.css";
import "../styles/Cart.css";
import OrderConfirmModal from "../components/OrderConfirmModal"; // ✅ 모달 임포트
import { initiateNicePay } from "../utils/payment"; // ✅ REST API 방식

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // ✅ 추가
  const [preparedOrderId, setPreparedOrderId] = useState(null);    // ✅ 추가
  const memberId = localStorage.getItem("memberId");

  // ✅ 장바구니 불러오기
  const loadCart = async () => {
    if (!memberId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const data = await fetchCartItems();
      console.log("🛒 [DEBUG] 장바구니 데이터:", data);
      setCartItems(
        (data.items || data.cartItems || data || []).map((item) => ({
          productId: item.productId || 0,
          productName: item.productName || "이름 없음",
          price: item.price ?? 0,
          quantity: item.quantity ?? 1,
          imageUrl: item.imageUrl || "https://via.placeholder.com/150",
        }))
      );
    } catch (error) {
      console.error("장바구니 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ✅ 상품 삭제
  const handleRemoveItem = async (productId) => {
    try {
      await deleteCartItem(memberId, productId);
      alert("상품이 장바구니에서 삭제되었습니다.");
      loadCart();
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    }
  };

  // ✅ 수량 변경
  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItemQuantity(productId, quantity);
      loadCart();
    } catch (error) {
      console.error("수량 변경 실패:", error);
    }
  };

  // ✅ 1단계: 주문 생성만
  const handleCheckout = async () => {
    if (!memberId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    console.log("✅ 주문 생성 요청 시작");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/prepare",
        { memberId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const orderId = response.data?.orderId;
      if (!orderId) throw new Error("주문 생성 실패: orderId 없음");

      console.log("✅ 주문 ID:", orderId);
      setPreparedOrderId(orderId);
      setShowConfirmPopup(true); // ✅ 모달 열기
    } catch (error) {
      console.error("❌ 주문 생성 실패:", error);
      alert("주문 생성 중 오류가 발생했습니다.");
    }
  };

  const handlePaymentConfirm = async () => {
    if (!memberId || cartItems.length === 0) return;
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/prepare`,
        { memberId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
  
      const orderId = response.data.orderId;
      const totalAmount = response.data.totalAmount;
  
      // ✅ 웹표준 방식 제거하고 REST API 방식으로 결제창 요청
      await initiateNicePay(orderId, totalAmount);
  
      setShowConfirmPopup(false); // 모달 닫기
    } catch (error) {
      console.error("❌ 결제 시작 오류:", error);
      alert("결제를 시작할 수 없습니다.");
    }
  };
  
  
  
  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>장바구니</h2>
        {loading ? (
          <p>로딩 중...</p>
        ) : cartItems.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.productId} className="cart-item">
                <img src={item.imageUrl} alt={item.productName} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.productName}</h3>
                  <p>{item.price.toLocaleString()}원</p>
                </div>
                <div className="cart-actions">
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => handleRemoveItem(item.productId)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button className="checkout-button" onClick={handleCheckout}>구매하기</button>

        {/* ✅ 주문 확인 모달 */}
        {showConfirmPopup && (
          <OrderConfirmModal
            onConfirm={handlePaymentConfirm}
            onCancel={() => setShowConfirmPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
