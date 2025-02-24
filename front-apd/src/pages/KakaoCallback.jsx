import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api/memberApi";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (!code) return;

      try {
        const response = await kakaoLogin(code);
        localStorage.setItem("token", response.token); // ✅ JWT 저장
        alert("카카오 로그인 성공!");
        navigate("/"); // 메인 페이지 이동
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        alert("카카오 로그인 실패!");
      }
    };

    handleKakaoCallback();
  }, [navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoCallback;
