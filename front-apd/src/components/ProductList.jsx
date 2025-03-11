import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products") // 백엔드 API 호출
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>상품을 불러오는 중...</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          id={product.productId}
          image={product.thumbnailImageUrl}
          title={product.name}
          price={product.price}
          rating={product.rating}  // ✅ 별점 표시할 수 있도록 추가
        />
      ))}
    </div>
  );
}
