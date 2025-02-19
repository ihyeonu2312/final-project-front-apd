import React, { useEffect, useState } from "react";
import axios from "axios";
import { CATEGORIES } from "../constants/categories";

const ElectronicsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 📌 가전 제품만 가져오기
    axios.get(`http://localhost:8080/api/products/category/${encodeURIComponent(CATEGORIES.APPLIANCES.toLowerCase())}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error("제품 로딩 오류:", err));
  }, []);

  return (
    <div className="container">
      <h1>가전 제품 목록</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}원</p>
            </div>
          ))
        ) : (
          <p>가전 제품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ElectronicsPage;
