import React from "react";

const MainPage = () => {
  console.log("🔍 저장된 memberId:", localStorage.getItem("memberId"));

  return (
    <div className="main-container">
      <h1>메인 페이지</h1>
      <p>알팡당 쇼핑몰에 오신 것을 환영합니다!</p>


    </div>
  );
};

export default MainPage;
