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

    // 📌 주문 내역 불러오기
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">마이페이지</h2>

      {/* ✅ 회원 정보 카드 */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">회원 정보</h5>
          <p className="card-text"><strong>닉네임:</strong> {user.nickname}</p>
          <p className="card-text"><strong>이메일:</strong> {user.email}</p>
          <button className="btn btn-primary" onClick={() => navigate("/user/mypage/edit")}>
            개인정보 수정
          </button>
        </div>
      </div>

      {/* ✅ 주문 내역 */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">주문 내역</h5>
          {orders.length === 0 ? (
            <p className="text-muted">주문 내역이 없습니다.</p>
          ) : (
            <>
              <ul className="list-group">
                {orders.slice(0, visibleOrders).map((order, index) => (
                  <li key={index} className="list-group-item">
                    {order.productName} - {order.date}
                  </li>
                ))}
              </ul>
              {visibleOrders < orders.length && (
                <button className="btn btn-secondary mt-3" onClick={() => setVisibleOrders((prev) => prev + 5)}>
                  더보기
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* ✅ 리뷰 관리 */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">리뷰 관리</h5>
          <Link to="/user/mypage/reviews" className="btn btn-info">
            내가 작성한 리뷰 보기
          </Link>
        </div>
      </div>

      {/* ✅ 로그아웃 버튼 */}
      <button className="btn btn-danger w-100" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
