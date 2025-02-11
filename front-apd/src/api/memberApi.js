export const login = async (credentials) => {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("로그인 실패: " + response.statusText);
  }

  const data = await response.json();
  
  // 🔥 JWT 토큰을 로컬 스토리지에 저장 (또는 쿠키)
  localStorage.setItem("token", data.token); 

  return data;
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token"); // ✅ 저장된 JWT 토큰 가져오기

  const response = await fetch("http://localhost:8080/api/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // 🔥 JWT 포함
    },
  });

  if (!response.ok) {
    throw new Error("회원 정보 조회 실패");
  }

  return response.json();
};
