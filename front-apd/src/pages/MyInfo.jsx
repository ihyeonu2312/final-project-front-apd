import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MyPageSidebar from "../components/MyPageSidebar";
import "../styles/MyPage.css";

const MyInfo = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 네비게이트 추가

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>{user?.nickname} 님, 안녕하세요!</h2>

        <form>
          {/* 📌 이름 */}
          <div className="input-group">
            <label>이름</label>
            <input type="text" name="name" value={user?.name || ""} disabled />
          </div>

          {/* 📌 이메일 */}
          <div className="input-group">
            <label>이메일</label>
            <input type="email" name="email" value={user?.email || ""} disabled />
          </div>

          {/* 📌 닉네임 */}
          <div className="input-group">
            <label>닉네임</label>
            <input type="text" name="nickname" value={user?.nickname || ""} disabled />
          </div>

          {/* 📌 휴대폰 번호 */}
          <div className="input-group">
            <label>휴대폰 번호</label>
            <input type="tel" name="phoneNumber" value={user?.phoneNumber || ""} disabled />
          </div>

          {/* 📌 주소 */}
          <div className="input-group">
            <label>주소</label>
            <input type="text" name="address" value={user?.address || ""} disabled />
          </div>

          {/* 📌 상세주소 */}
          <div className="input-group">
            <label>상세주소</label>
            <input type="text" name="detailAddress" value={user?.detailAddress || ""} disabled />
          </div>

          {/* 📌 내 정보 수정 버튼 → MyEdit.jsx 이동 */}
          <button
            type="button"
            className="black-button"
            onClick={() => navigate("/user/my-info/edit")} // ✅ 내 정보 수정 페이지 이동
          >
            내 정보 수정
          </button>

          {/* 📌 비밀번호 재설정 버튼 유지 */}
          <button
            type="button"
            className="black-button"
            onClick={() => navigate("/reset-password")} // ✅ 비밀번호 재설정 페이지 이동
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
