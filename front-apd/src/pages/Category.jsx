import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../api/categoryApi";
import { fetchProductsByCategory } from "../api/productApi"; // ✅ 상품 API 추가
import { convertToSlug } from "../utils"; // ✅ URL 변환 함수

import ProductCard from "../components/ProductCard"; // ✅ 상품 카드 컴포넌트 추가
import "../components/ProductList";

const Category = () => {
  const { slug } = useParams(); // URL에서 slug 가져오기
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]); // ✅ 상품 목록 상태 추가
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const categories = await fetchCategories(); // 모든 카테고리 가져오기
        console.log("📌 [DEBUG] 모든 카테고리:", categories);
  
        // ✅ 카테고리 이름을 슬러그로 변환하여 비교
        const matchedCategory = categories.find(
          (cat) => convertToSlug(cat.categoryName) === convertToSlug(slug)
        );
  
        if (matchedCategory) {
          setCategory(matchedCategory);
          console.log("📌 [DEBUG] 선택된 카테고리:", matchedCategory);
  
          // ✅ 선택된 카테고리의 상품 가져오기
          const productsData = await fetchProductsByCategory(matchedCategory.categoryId);
          setProducts(productsData);
          console.log("📌 [DEBUG] 해당 카테고리의 상품 목록:", productsData);
        } else {
          console.warn("❌ 매칭되는 카테고리가 없습니다.");
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

      {loading ? (
        <p>상품을 불러오는 중...</p>
      ) : products.length > 0 ? (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.productId} {...product} />
          ))}
        </div>
      ) : (
        <p>이곳에 {category.categoryName} 관련 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default Category;
