import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import { CATEGORIES } from "../constants/categories";
import axios from "axios";

console.log("✅ CategoryPage 모듈 로드됨!");

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
  console.log("✅ CategoryPage 컴포넌트 렌더링 시작!");

  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isValidCategory, setIsValidCategory] = useState(true); // ✅ 유효한 카테고리 여부

  console.log("✅ 현재 URL의 category 값:", category);

  // ✅ category가 존재하지 않거나 잘못된 경우 처리
  if (category === undefined || category === "undefined") {
    console.warn("❌ category 값이 잘못됨. NotFoundPage로 이동합니다.");
    return <Navigate to="/not-found" />;
  }

  // ✅ 카테고리 키 변환
  const normalizeCategory = (category) =>
    category.trim().replace(/-/g, " ").toLowerCase();

  const categoryKey =
    Object.entries(CATEGORIES).find(
      ([key, value]) => value.toLowerCase() === normalizeCategory(category)
    )?.[0] || null;

  console.log("✅ 변환된 categoryKey:", categoryKey);

  // // ✅ 존재하지 않는 카테고리라면 NotFound로 이동
  // if (!categoryKey) {
  //   console.warn("❌ 올바르지 않은 categoryKey, NotFoundPage로 이동합니다.");
  //   return <Navigate to="/not-found" />;
  // }

  useEffect(() => {
    if (!categoryKey) return; // ✅ categoryKey가 없으면 API 요청 방지

    console.log("✅ useEffect 실행됨!");
    console.log("✅ API 요청 시도 - 카테고리 키:", categoryKey);

    setLoading(true);

    axios
      .get(
        `http://localhost:8080/api/products/category/${encodeURIComponent(
          categoryKey
        )}`
      )
      .then((res) => {
        console.log("✅ API 응답 데이터:", res.data);

        if (!res.data || res.data.length === 0) {
          console.warn("⚠ 해당 카테고리에 등록된 상품이 없음.");
        }

        setProducts(res.data);
        setIsValidCategory(true); // ✅ 카테고리가 유효함
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API 요청 실패:", err);
        setError(err);
        setIsValidCategory(false); // ❌ 유효하지 않은 카테고리로 판단
        setLoading(false);
      });
  }, [categoryKey]);

  // ❌ API 요청 실패 시 NotFound로 이동
  if (error && !isValidCategory) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div>
      <h1>{CATEGORIES[categoryKey]}</h1>
      <p>{categoryDescriptions[categoryKey]}</p>
      <h1>카테고리: {category}</h1>
      {loading ? (
        <p>상품을 불러오는 중...</p>
      ) : error ? (
        <p>상품을 불러오는 중 오류가 발생했습니다.</p>
      ) : products.length === 0 ? (
        <p>상품이 없습니다.</p>
      ) : (
        <ProductList products={products} category={CATEGORIES[categoryKey]} />
      )}
    </div>
  );
};

export default CategoryPage;
