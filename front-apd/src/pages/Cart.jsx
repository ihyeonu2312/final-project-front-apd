import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyPageSidebar from "../components/MyPageSidebar";
import "../styles/MyPage.css"; 
import "../styles/Cart.css"; 

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // ✅ 장바구니 데이터 불러오기 (JWT 토큰 포함)
  const fetchCart = () => {
    axios.get("http://localhost:8080/cart", { withCredentials: true })
      .then(res => {
        console.log(res.data); // 응답 데이터 확인
        setCartItems(res.data.items);
        setLoading(false);
      })
      .catch(err => {
        console.error("장바구니 조회 실패:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart(); // 페이지 로드 시 장바구니 데이터 가져오기
  }, []);

  // ✅ 장바구니에서 상품 삭제
  const handleRemoveItem = (productId) => {
    axios.delete(`http://localhost:8080/cart/remove/${productId}`, { withCredentials: true })
      .then(() => {
        alert("상품이 장바구니에서 삭제되었습니다.");
        fetchCart(); // ✅ 삭제 후 최신 데이터 불러오기
      })
      .catch(err => console.error("상품 삭제 실패:", err));
  };

  // ✅ 상품 수량 변경
  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    
    axios.patch(`http://localhost:8080/cart/update`, { productId, quantity }, { withCredentials: true })
      .then(() => fetchCart())  // ✅ 변경 후 최신 데이터 불러오기
      .catch(err => console.error("수량 변경 실패:", err));
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
