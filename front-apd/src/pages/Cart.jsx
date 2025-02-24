import React, { useState } from "react";
import "../styles/Cart.css"; // 기존 CSS 사용
import { v4 as uuidv4 } from "uuid";

const Cart = () => {
  const dummyUser = {
    _id: "user123",
    username: "testUser",
  };

  const dummyCarts = [
    {
      productId: uuidv4(),
      productTitle: "중고 맥북 프로 13인치",
      product_image: "https://via.placeholder.com/150",
      size: "13-inch",
      quantity: 1,
      price: 1200000,
    },
    {
      productId: uuidv4(),
      productTitle: "아이패드 프로 11인치",
      product_image: "https://via.placeholder.com/150",
      size: "11-inch",
      quantity: 2,
      price: 900000,
    },
  ];

  const [carts, setCarts] = useState(dummyCarts);

  const handleRemove = (userId, productId) => {
    console.log(`User ${userId} is removing product ${productId}`);
    setCarts(carts.filter((item) => item.productId !== productId));
  };

  let total = 0;
  carts.forEach((product) => {
    total += product.price * product.quantity;
  });

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <h1 className="cart-title">장바구니</h1>
        <div className="cart-top">
          <button className="cart-top-button">CONTINUE SHOPPING</button>
          <div className="cart-top-texts">
            <span className="cart-top-text">Shopping Bag</span>
            <span className="cart-top-text">Your Wishlist</span>
          </div>
          <button className="cart-top-button filled">CHECKOUT NOW</button>
        </div>
        <div className="cart-bottom">
          <div className="cart-info">
            {carts.map((item) => (
              <div key={item.productId} className="cart-product">
                <div className="cart-product-detail">
                  <img src={item.product_image} alt="이미지" className="cart-image" />
                  <div className="cart-details">
                    <span className="cart-product-name">{item.productTitle}</span>
                    <span className="cart-product-size">SIZE : {item.size}</span>
                  </div>
                </div>
                <div className="cart-price-detail">
                  <div className="cart-amount-container">
                    <span className="cart-product-amount">{item.quantity}</span>
                  </div>
                  <div className="cart-product-price">{item.price.toLocaleString()}원</div>
                </div>
                <button className="cart-remove-button" onClick={() => handleRemove(dummyUser._id, item.productId)}>
                  삭제
                </button>
              </div>
            ))}
            <hr className="cart-hr" />
          </div>
          <div className="cart-summary">
            <h1 className="cart-summary-title">주문 요약</h1>
            <div className="cart-summary-item">
              <span className="cart-summary-item-text">합 계</span>
              <span className="cart-summary-item-price">{total.toLocaleString()} 원</span>
            </div>
            <div className="cart-summary-item">
              <span className="cart-summary-item-text">배송비</span>
              <span className="cart-summary-item-price">3,000원</span>
            </div>
            <div className="cart-summary-item total">
              <span className="cart-summary-item-text">총 합계</span>
              <span className="cart-summary-item-price">{(total + 3000).toLocaleString()} 원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
