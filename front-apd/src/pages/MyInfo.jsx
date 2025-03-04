import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MyPageSidebar from "../components/MyPageSidebar";
import axios from "axios";
import "../styles/MyPage.css";

const MyInfo = () => {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    detailAddress: "",
  });

  const [error, setError] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(null);
  const [phoneAvailable, setPhoneAvailable] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        phoneNumber: user.phoneNumber,
        address: user.address,
        detailAddress: user.detailAddress,
      });
    }
  }, [user]);

  const API_URL = "http://localhost:8080/api/user";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "nickname") setNicknameAvailable(null);
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = rawValue
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");

    setFormData((prev) => ({ ...prev, phoneNumber: formattedValue }));
    setPhoneAvailable(null);
  };

  const handleAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 API를 로드할 수 없습니다.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") extraAddress += data.bname;
          if (data.buildingName !== "")
            extraAddress += (extraAddress !== "" ? ", " : "") + data.buildingName;
          fullAddress += extraAddress ? ` (${extraAddress})` : "";
        }

        setFormData((prev) => ({
          ...prev,
          address: fullAddress,
          detailAddress: "",
        }));
      },
    }).open();
  };

  const handleNicknameCheck = async () => {
    if (!formData.nickname) {
      setError("닉네임을 입력하세요.");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/check-nickname`, {
        params: { nickname: formData.nickname },
      });
      setNicknameAvailable(response.data === "AVAILABLE");
    } catch (error) {
      setError("닉네임 중복 확인 실패");
    }
  };

  const handlePhoneCheck = async () => {
    const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setPhoneAvailable(null);
      setError("올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/check-phone`, {
        params: { phoneNumber: formData.phoneNumber },
      });
      setPhoneAvailable(response.data === "AVAILABLE");
    } catch (error) {
      setError("휴대폰 번호 중복 확인 실패");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nicknameAvailable === false || phoneAvailable === false) {
      setError("닉네임과 휴대폰 번호 중복 확인을 완료하세요.");
      return;
    }
    setError("");
    try {
      await axios.put(`${API_URL}/update`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      updateUser(formData);
      alert("회원 정보가 수정되었습니다.");
      navigate("/");
    } catch (error) {
      setError(
        "회원 정보 수정 실패: " + (error.response?.data?.message || "서버 오류")
      );
    }
  };

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>{user?.nickname} 님, 안녕하세요!</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이름</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
          </div>
          <div className="input-group">
            <label>이메일</label>
            <input type="email" name="email" value={formData.email} disabled />
          </div>
          <div className="input-group">
            <label>닉네임</label>
            <div className="nickname-auth">
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
              <button type="button" className="black-button" onClick={handleNicknameCheck}>
                중복 확인
              </button>
            </div>
          </div>
          <div className="input-group">
            <label>휴대폰 번호</label>
            <div className="phone-auth">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                required
              />
              <button type="button" className="black-button" onClick={handlePhoneCheck}>
                중복 확인
              </button>
            </div>
          </div>
          <div className="input-group">
            <label>주소</label>
            <div className="address-auth">
              <input type="text" name="address" value={formData.address} readOnly />
              <button type="button" className="black-button" onClick={handleAddressSearch}>
                주소 찾기
              </button>
            </div>
          </div>
          <div className="input-group">
            <label>상세주소</label>
            <input
              type="text"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="black-button">정보 수정</button>
          <button
            type="button"
            className="black-button"
            onClick={() => navigate("/reset-password")}
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
