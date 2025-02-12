import React from "react";
import { useParams } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";

const categoryDescriptions = {
  APPLIANCES: "전자제품을 만나보세요!",
  BAGS: "다양한 가방 컬렉션을 둘러보세요!",
  BEAUTY: "뷰티 제품을 구매하세요!",
  FASHION: "최신 패션 트렌드를 확인하세요!",
  HOME_INTERIOR: "인테리어 소품을 확인하세요!",
  JEWELRY: "아름다운 주얼리를 만나보세요!",
  LIVING: "생활용품을 구매하세요!",
  SPORTS: "스포츠 용품을 확인하세요!",
  USED: "중고 상품을 둘러보세요!",
};

const CategoryPage = () => {
  const { category } = useParams(); // URL에서 카테고리 값 가져오기

  // ✅ 카테고리 값을 모두 소문자로 변환하여 비교
  const normalizedCategory = category.toUpperCase();

  // ✅ CATEGORIES 객체에서 해당하는 키를 찾아 반환
  const categoryKey = Object.entries(CATEGORIES).find(
    ([key, value]) => value.toUpperCase() === normalizedCategory
  )?.[0];

  if (!categoryKey) {
    return <h2>존재하지 않는 카테고리입니다.</h2>;
  }

  return (
    <div>
      <h1>{CATEGORIES[categoryKey]}</h1>
      <p>{categoryDescriptions[categoryKey]}</p>
      {/* 해당 카테고리의 상품 리스트를 불러오는 로직 추가 가능 */}
    </div>
  );
};

export default CategoryPage;
