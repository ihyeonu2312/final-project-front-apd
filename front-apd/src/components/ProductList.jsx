import React from "react";

const ProductList = ({ products = [] }) => {  // ✅ 기본값 설정하여 undefined 방지
    if (products.length === 0) {
      return <p>상품이 없습니다.</p>;
    }
  
    return (
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    );
  };
  

export default ProductList;
