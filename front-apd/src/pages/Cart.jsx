import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageSidebar from "../components/MyPageSidebar"; // ✅ 기존 사이드바 사용
import "../styles/MyPage.css"; // ✅ 기존 마이페이지 스타일 유지
import "../styles/Cart.css"; 

const Cart = () => {
  const navigate = useNavigate();

  // ✅ 더미 장바구니 데이터
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Apple iPhone 15 Pro", price: 1499000, quantity: 1, imageUrl: "https://placehold.co/100x100" },
    { id: 2, name: "Samsung Galaxy S23 Ultra", price: 1299000, quantity: 2, imageUrl: "https://placehold.co/100x100" },
    { id: 3, name: "Sony WH-1000XM5 헤드폰", price: 399000, quantity: 1, imageUrl: "https://placehold.co/100x100" },
  ]);

  // ✅ 수량 변경 (로컬 상태 업데이트)
  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  // ✅ 장바구니에서 상품 삭제
  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // ✅ 구매 버튼 클릭 시
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="mypage-container">
      <MyPageSidebar /> {/* ✅ 공통 사이드바 사용 */}
      <div className="content">
        <h2>장바구니</h2>
        
        {cartItems.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
<ul className="cart-list">
  {cartItems.map((item) => (
    <li key={item.id} className="cart-item">
      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>{item.price.toLocaleString()}원</p>
      </div>
      <div className="cart-actions"> {/* ✅ 수량 버튼 & 삭제 버튼을 묶어서 오른쪽으로 이동 */}
        <div className="quantity-control">
          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
        </div>
        <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>삭제</button>
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
