import React from "react";
import ProductList from "../components/ProductList"; 

const MainPage = () => {
  return (
    <div className="main-container">
      <h1>메인 페이지</h1>
      <p>알팡당 쇼핑몰에 오신 것을 환영합니다!</p>

        {<ProductList/>}

    </div>
  );
};

export default MainPage;
