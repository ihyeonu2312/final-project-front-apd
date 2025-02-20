import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import "../styles/MyPage.css";

const MyPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // 주문 내역
  const [visibleOrders, setVisibleOrders] = useState(3); // 기본 3개 표시

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // 📌 주문 내역 불러오기 (API 요청)
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
  }, [user, navigate]);

  // 🔹 더보기 버튼 클릭 시 5개씩 추가
  const loadMoreOrders = () => {
    setVisibleOrders((prev) => prev + 5);
  };

  // 🔹 회원 탈퇴 핸들러
  const handleDeleteAccount = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까? (3개월 동안 재가입 불가)")) {
      try {
        await axios.delete("http://localhost:8080/api/user/delete", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        logout();
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
      }
    }
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>

      <div className="mypage-section">
        <h3>회원 정보</h3>
        <p>닉네임: {user.nickname}</p>
        <p>이메일: {user.email}</p>
        <button onClick={() => navigate("/mypage/edit")}>개인정보 수정</button>
      </div>

      <div className="mypage-section">
        <h3>주문 내역</h3>
        {orders.length === 0 ? (
          <p>주문 내역이 없습니다.</p>
        ) : (
          <>
            <ul>
              {orders.slice(0, visibleOrders).map((order, index) => (
                <li key={index}>{order.productName} - {order.date}</li>
              ))}
            </ul>
            {visibleOrders < orders.length && (
              <button onClick={loadMoreOrders}>더보기</button>
            )}
          </>
        )}
      </div>

      <div className="mypage-section">
        <h3>리뷰 관리</h3>
        <Link to="/mypage/reviews">내가 작성한 리뷰 보기</Link>
      </div>

      <button className="delete-button" onClick={handleDeleteAccount}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default MyPage;
