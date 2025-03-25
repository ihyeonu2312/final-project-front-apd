import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsedProductById } from "../api/usedProductApi";

const UsedProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsedProductById(id);
        setProduct(data);
      } catch (e) {
        console.error("상세 정보 불러오기 실패", e);
        setError("상품 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>상품이 없습니다.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      <div className="mb-4">
        <strong>가격:</strong> ₩{product.price.toLocaleString()}
      </div>
      <div className="mb-2">상태: {product.condition}</div>
      <div className="mb-4">거래 상태: {product.status}</div>

      {/* 이미지 출력 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {product.images?.map((img, idx) => (
          <img key={idx} src={img.imageUrl} alt={`img-${idx}`} className="rounded shadow" />
        ))}
      </div>

      <div className="text-sm text-gray-400">
        등록일: {new Date(product.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default UsedProductDetail;
