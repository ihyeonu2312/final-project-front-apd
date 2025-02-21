import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyPageSidebar from "../components/MyPageSidebar";
import "../styles/MyPage.css";

const MyEdit = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8080/api/user/update", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("개인정보가 수정되었습니다.");
      navigate("/mypage/info");  // ✅ 수정 후 "내정보" 페이지로 이동
    } catch (error) {
      console.error("개인정보 수정 실패:", error);
    }
  };

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>개인정보 수정</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>비밀번호 변경</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="새 비밀번호 입력" 
            />
          </div>

          <div className="input-group">
            <label>휴대폰 번호</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              placeholder="휴대폰 번호 입력"
            />
          </div>

          <div className="input-group">
            <label>주소</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              placeholder="주소 입력"
            />
          </div>

          <button type="submit" className="black-button">수정하기</button>
        </form>
      </div>
    </div>
  );
};

export default MyEdit;
