import React, { useEffect, useState } from "react";
import { fetchUsedProducts } from "../api/usedProductApi";
import UsedProductCard from "../components/UsedProductCard"; // 중고 전용 카드

const Used = () => {
  const [products, setProducts] = useState([]); // ✅ 초기값: 빈 배열
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchUsedProducts();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("⚠️ 응답이 배열이 아님:", data);
          setProducts([]);
          setError("상품 목록을 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("❌ 중고상품 불러오기 실패:", error);
        setError("상품 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="p-4">불러오는 중...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2x1 font-bold mb-4">중고상품 목록</h1>

      {products.length === 0 ? (
        <p>등록된 중고상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <UsedProductCard key={product.usedProductId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Used;
