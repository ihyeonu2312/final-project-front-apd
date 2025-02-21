import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import MyPageSidebar from "../components/MyPageSidebar";
import "../styles/MyPage.css";
import "../styles/MyOrders.css";

const MyOrders = () => {
  const { user } = useAuthStore();
    const [orders, setOrders] = useState([
        {
          id: 1,
          productName: "Apple iPhone 15 Pro",
          date: "2024-02-21",
          price: "1,499,000원",
          status: "배송 중",
          image: "https://placehold.co/300x300", // ✅ 샘플 이미지
        },
        {
          id: 2,
          productName: "삼성 Galaxy S23 Ultra",
          date: "2024-02-19",
          price: "1,299,000원",
          status: "배송 완료",
          image: "https://placehold.co/300x300",
        },
        {
          id: 3,
          productName: "Sony WH-1000XM5 헤드폰",
          date: "2024-02-15",
          price: "399,000원",
          status: "결제 완료",
          image: "https://placehold.co/300x300",
        }
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("주문 내역 불러오기 실패:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>주문내역</h2>
        {orders.length === 0 ? (
          <p>주문 내역이 없습니다.</p>
        ) : (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <img src={order.image} alt={order.productName} className="order-image" />
                <div className="order-details">
                  <h3>{order.productName}</h3>
                  <p><strong>주문일:</strong> {order.date}</p>
                  <p><strong>가격:</strong> {order.price}</p>
                  <p><strong>상태:</strong> <span className={`status ${order.status === "배송 중" ? "shipping" : "completed"}`}>{order.status}</span></p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
