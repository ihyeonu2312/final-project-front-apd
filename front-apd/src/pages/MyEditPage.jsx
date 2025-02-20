import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";

const MyEditPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
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
      navigate("/mypage");
    } catch (error) {
      console.error("개인정보 수정 실패:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>개인정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>비밀번호 변경</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <label>휴대폰 번호</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

        <label>주소</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />

        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default MyEditPage;
