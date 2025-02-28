import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../api/categoryApi";
import { convertToSlug } from "../utils"; // ✅ URL 변환 함수

import "../components/ProductCard";
import "../components/ProductList";

const Category = () => {
  const { slug } = useParams(); // URL에서 slug 가져오기
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const categories = await fetchCategories(); // 모든 카테고리 가져오기
        const matchedCategory = categories.find(
          (cat) => convertToSlug(cat.categoryName) === slug
        );

        if (matchedCategory) {
          setCategory(matchedCategory);
        }
      } catch (error) {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    getCategoryData();
  }, [slug]);

  if (!category) return <p>카테고리를 찾을 수 없습니다.</p>;

  return (
    <div>
      <h2>{category.categoryName} 카테고리</h2>
      <p>이곳에 {category.categoryName} 관련 상품을 표시할 예정</p>
    </div>
  );
};

export default Category;