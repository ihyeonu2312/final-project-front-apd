import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MyPageSidebar from "../components/MyPageSidebar";
import "../styles/MyPage.css";

const MyInfo = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>내정보</h2>
        <p><strong>닉네임:</strong> {user?.nickname}</p>
        <p><strong>이메일:</strong> {user?.email}</p>
        <p><strong>휴대폰 번호:</strong> {user?.phoneNumber}</p>
        <p><strong>주소:</strong> {user?.address}</p>
        <button className="black-button" onClick={() => navigate("/user/my-info/edit")}>개인정보 수정</button>
      </div>
    </div>
  );
};

export default MyInfo;
