import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";
import ProductList from "../components/ProductList"; 

const categoryDescriptions = {
  APPLIANCES: "전자제품을 만나보세요!",
  BAGS: "다양한 가방 컬렉션을 둘러보세요!",
  BEAUTY: "뷰티 제품을 구매하세요!",
  FASHION: "최신 패션 트렌드를 확인하세요!",
  HOME_INTERIOR: "인테리어 소품을 확인하세요!",
  JEWELRY: "아름다운 주얼리를 만나보세요!",
  SPORTS: "스포츠 용품을 확인하세요!",
};

// const normalizeCategory = (category) => {
//   return category.replace(/-/g, " ").toLowerCase(); // ✅ `-`을 공백으로 변환하고 소문자로 변환
// };

const CategoryPage = () => {
  // const { category } = useParams();
  // const [products, setProducts] = useState([]);

//   // ✅ URL에서 받은 category를 변환
//   const normalizedCategory = normalizeCategory(category);

//   // ✅ CATEGORIES 객체에서 해당하는 키 찾기
//   const categoryKey = Object.entries(CATEGORIES).find(
//     ([key, value]) => value.toLowerCase() === normalizedCategory
//   )?.[0];

//   // ✅ 존재하지 않는 카테고리라면 404 페이지로 이동
//   if (!categoryKey) {
//     return <Navigate to="/not-found" />;
//   }

//   // ✅ 카테고리에 맞는 상품 데이터 불러오기
//   useEffect(() => {
//     fetch(`/api/products/category/${category}`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, [category]);

  // return (
    <div>
      {/* <h1>{CATEGORIES[categoryKey]}</h1> */}
      {/* <p>{categoryDescriptions[categoryKey]}</p> */}

      {/* ✅ 카테고리에 해당하는 상품 리스트만 전달 */}
      {/* <ProductList products={products} category={category} /> */}
    </div>
  // );
};

export default CategoryPage;
