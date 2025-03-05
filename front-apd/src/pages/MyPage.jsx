import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import "../styles/MyPage.css";
import myQrImage from "../assets/myQr.png";
import useEmailTimer from "../hooks/useEmailTimer"; // ✅ 타이머 훅 사용

const MyPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("내정보");
  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: "Apple iPhone 15 Pro",
      date: "2024-02-21",
      price: "1,499,000원",
      status: "배송 중",
      image: "https://via.placeholder.com/80", // ✅ 샘플 이미지
    },
    {
      id: 2,
      productName: "삼성 Galaxy S23 Ultra",
      date: "2024-02-19",
      price: "1,299,000원",
      status: "배송 완료",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      productName: "Sony WH-1000XM5 헤드폰",
      date: "2024-02-15",
      price: "399,000원",
      status: "결제 완료",
      image: "https://via.placeholder.com/80",
    }
  ]);


  useEffect(() => {


    if (user === null) {
      alert("로그인이 필요합니다.");
      console.log("🔄 사용자 정보가 없음, 로그인 페이지로 이동");
      navigate("/login");
      return;
    }

  //  주문 내역 불러오기
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

  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <div className="mypage-container">
      {/* ✅ 사이드바 메뉴 */}
      <div className="sidebar">
        <ul>
          <li className={selectedMenu === "내정보" ? "active" : ""} onClick={() => setSelectedMenu("내정보")}>내정보</li>
          <li className={selectedMenu === "주문내역" ? "active" : ""} onClick={() => setSelectedMenu("주문내역")}>주문내역</li>
          <li className={selectedMenu === "리뷰관리" ? "active" : ""} onClick={() => setSelectedMenu("리뷰관리")}>리뷰관리</li>
          <li><Link to="/user/cart">장바구니</Link></li>
          <li onClick={handleLogout}>로그아웃</li>
          <li>회원탈퇴</li>
          <li className="my-qr">
            <span className="qr-text">AlPangDang Mobile App</span>
            <span className="qr-text2">Search Anywhere, Anytime!</span>
            <img src={myQrImage} alt="my-qr" />
            <a className="qr-text3" href="www.appdownlink.com">앱 다운로드 클릭</a>
          </li>
        </ul>

      </div>

      {/* ✅ 오른쪽 콘텐츠 영역 */}
      <div className="content">
        {selectedMenu === "내정보" && (
          <div>
            <h2>내정보</h2>
            <p><strong>닉네임:</strong> {user?.nickname}</p>
            <p><strong>이메일:</strong> {user?.email}</p>
            <p><strong>휴대폰 번호:</strong> {user?.phoneNumber}</p>
            <p><strong>주소:</strong> {user?.address}</p>
            <button onClick={() => navigate("/user/mypage/edit")}>개인정보 수정</button>
          </div>
        )}

{selectedMenu === "주문내역" && (
  <div className="order-history">
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
)}

        {selectedMenu === "리뷰관리" && (
          <div>
            <h2>리뷰관리</h2>
            <Link to="/user/mypage/reviews">내가 작성한 리뷰 보기</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
