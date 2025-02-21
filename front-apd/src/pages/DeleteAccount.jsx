import React from "react";
import { useNavigate } from "react-router-dom";
import MyPageSidebar from "../components/MyPageSidebar";
import { useAuthStore } from "../store/authStore";
import "../styles/MyPage.css";

const DeleteAccount = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
      logout();
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>회원탈퇴</h2>
        <p>회원탈퇴를 하면 모든 데이터가 삭제됩니다.</p>
        <button className="black-button" onClick={handleDelete}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default DeleteAccount;
