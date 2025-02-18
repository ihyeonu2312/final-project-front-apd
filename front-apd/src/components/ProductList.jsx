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
// useEffect(() => {
//   axios.get("http://localhost:8080/api/aliexpress/categories")
//       .then(response => setCategories(response.data))
//       .catch(error => console.error("Error fetching categories", error));
// }, []);
export default ProductList;
