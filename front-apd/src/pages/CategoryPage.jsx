import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProductList from "../components/ProductList";  // ✅ 상품 리스트 컴포넌트
import { CATEGORIES } from "../constants/categories";  // ✅ 카테고리 매핑 객체

// ✅ 카테고리 설명 추가
const categoryDescriptions = {
  APPLIANCES: "전자제품을 만나보세요!",
  BAGS: "다양한 가방 컬렉션을 둘러보세요!",
  BEAUTY: "뷰티 제품을 구매하세요!",
  FASHION: "최신 패션 트렌드를 확인하세요!",
  HOME_INTERIOR: "인테리어 소품을 확인하세요!",
  JEWELRY: "아름다운 주얼리를 만나보세요!",
  SPORTS: "스포츠 용품을 확인하세요!",
};

const CategoryPage = () => {
  const { category } = useParams();  // ✅ URL에서 category 파라미터 가져오기
  const [products, setProducts] = useState([]);  // ✅ 상품 리스트 상태
  const [loading, setLoading] = useState(true);  // ✅ 로딩 상태
  const [error, setError] = useState(null);  // ✅ 에러 상태

  // ✅ URL에서 받은 category를 변환 (소문자로 변환하고 '-'을 공백으로 변경)
  const normalizeCategory = (category) => category.replace(/-/g, " ").toLowerCase();

  // ✅ CATEGORIES 객체에서 해당하는 키 찾기
  const categoryKey = Object.entries(CATEGORIES).find(
    ([key, value]) => value.toLowerCase() === normalizeCategory(category)
  )?.[0];

  // ✅ 존재하지 않는 카테고리라면 404 페이지로 이동
  if (!categoryKey) {
    return <Navigate to="/not-found" />;
  }

  // ✅ 상품 데이터 가져오기 (API 호출)
  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/category/${categoryKey}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err);
        setLoading(false);
      });
  }, [categoryKey]);

  return (
    <div>
      <h1>{CATEGORIES[categoryKey]}</h1>
      <p>{categoryDescriptions[categoryKey]}</p>

      {loading ? (
        <p>상품을 불러오는 중...</p>
      ) : error ? (
        <p>상품을 불러오는 중 오류가 발생했습니다.</p>
      ) : (
        <ProductList products={products} category={category} />
      )}
    </div>
  );
};

export default CategoryPage;
