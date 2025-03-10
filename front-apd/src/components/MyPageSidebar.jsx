import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/MyPage.css";
import myQrImage from "../assets/myQr.png";
import { useAuthStore } from "../store/authStore";

const MyPageSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const location = useLocation();

  // 현재 페이지 활성화 여부
  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <ul>
        <li className={isActive("/user/my-info")} onClick={() => navigate("/user/my-info")}>내정보</li>
        <li className={isActive("/user/my-orders")} onClick={() => navigate("/user/my-orders")}>주문내역</li>
        <li className={isActive("/user/my-reviews")} onClick={() => navigate("/user/my-reviews")}>리뷰관리</li>
        <li className={isActive("/user/cart")} onClick={() => navigate("/user/cart")}>장바구니</li>
        <li onClick={handleLogout}>로그아웃</li>
        <li className={isActive("/user/delete-account")} onClick={() => navigate("/user/delete-account")}>회원탈퇴</li>
        <li className="my-qr">
          <span className="qr-text">AlPangDang Mobile App</span>
          <span className="qr-text2">Search Anywhere, Anytime!</span>
          <img src={myQrImage} alt="my-qr" />
          <a className="qr-text3" href="www.appdownlink.com">앱 다운로드 클릭</a>
        </li>
      </ul>
    </div>
  );
};

export default MyPageSidebar;
