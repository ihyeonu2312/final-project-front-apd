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

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const memberId = localStorage.getItem("memberId");

  // ✅ 장바구니 데이터 불러오기
  const loadCart = async () => {
    if (!memberId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const data = await fetchCartItems();
      console.log("🛒 [DEBUG] 장바구니 데이터:", data); // ✅ 응답 데이터 확인
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

  const handleRemoveItem = async (productId) => {
    const memberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 memberId 가져오기
    // if (!memberId) {
    //     console.error("❌ 회원 ID 없음. 로그인 필요!");
    //     return;
    // }
    try {
        await deleteCartItem(memberId, productId);
        alert("상품이 장바구니에서 삭제되었습니다.");
        loadCart();
    } catch (error) {
        console.error("상품 삭제 실패:", error);
    }
};


  // ✅ 상품 수량 변경
  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItemQuantity(productId, quantity);
      loadCart();
    } catch (error) {
      console.error("수량 변경 실패:", error);
    }
  };

  // ✅ 구매 버튼 클릭 시
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
      // ✅ 1. 주문 생성 (prepareOrder)
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
      if (!response.data?.orderId) {
        throw new Error("주문 생성 실패: orderId 없음");
      }
  
      const orderId = response.data.orderId;
      console.log("✅ 주문 ID:", orderId);
      console.log("✅ 주문 생성 성공:", response.data);
  
      // ✅ 2. 주문 완료 처리 (completeOrder)
      await axios.patch(
        `http://localhost:8080/api/orders/${orderId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      console.log("✅ 주문 완료 처리 성공");
  
      // ✅ 3. 장바구니 다시 불러오기 (프론트 상태 초기화)
      await loadCart(); // 이미 선언된 장바구니 로딩 함수
  
      alert("주문이 성공적으로 완료되었습니다!");
      navigate("/user/my-orders");
  
    } catch (error) {
      console.error("❌ 주문 처리 중 오류:", error);
      alert("주문 처리 중 오류가 발생했습니다.");
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
      </div>
    </div>
  );
};

export default Cart;
