import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore(); // ✅ Zustand 상태 업데이트 함수 가져오기

  useEffect(() => {
    console.log("🔥 KakaoCallback 페이지 로드됨!");

    const token = new URL(window.location.href).searchParams.get("token");
    console.log("🔍 받은 JWT 토큰:", token);

    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // ✅ 서버에서 사용자 정보 가져오기
      fetch("http://localhost:8080/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((userProfile) => {
          console.log("✅ 카카오 사용자 정보:", userProfile);
          setUser(userProfile, token); // ✅ Zustand에 사용자 정보 저장
          alert(`카카오 로그인 성공! ${userProfile.nickname}`);
          navigate("/");
        })
        .catch((err) => {
          console.error("❌ 사용자 정보 가져오기 실패:", err);
          alert("로그인 실패!");
          navigate("/login");
        });
    } else {
      console.error("❌ JWT 토큰이 없음!");
      alert("로그인 실패! (토큰 없음)");
      navigate("/login");
    }
  }, [navigate, setUser]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoCallback;
