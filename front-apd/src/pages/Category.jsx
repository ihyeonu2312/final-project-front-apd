import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../api/categoryApi";
import { fetchProductsByCategory } from "../api/productApi";
import { convertToSlug } from "../utils";
import ProductList from "../components/ProductList";

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]); // 전체 상품 리스트
  const [displayedProducts, setDisplayedProducts] = useState([]); // 화면에 보이는 상품 리스트
  const [hasMore, setHasMore] = useState(true); // 더 불러올 상품이 있는지 여부

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const categories = await fetchCategories();
        console.log("📌 [DEBUG] 모든 카테고리:", categories);

        const matchedCategory = categories.find(
          (cat) => convertToSlug(cat.categoryName) === convertToSlug(slug)
        );

        if (matchedCategory) {
          setCategory(matchedCategory);
          console.log("📌 [DEBUG] 선택된 카테고리:", matchedCategory);

          const productsData = await fetchProductsByCategory(matchedCategory.categoryId);
          setProducts(productsData);
          
          // ✅ 카테고리 바뀌면 상태 초기화
          setDisplayedProducts(productsData.slice(0, 40));
          setHasMore(productsData.length > 40);
        } else {
          console.warn("❌ 매칭되는 카테고리가 없습니다.");
        }
      } catch (error) {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    // ✅ 카테고리 바뀔 때 상태 리셋
    setProducts([]);
    setDisplayedProducts([]);
    setHasMore(true);

    getCategoryData();
  }, [slug]);

  // ✅ 무한 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedProducts, hasMore]);

  // ✅ 추가 상품 로드 함수
  const loadMoreProducts = () => {
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextLength = currentLength + 40;

      if (nextLength >= products.length) {
        setDisplayedProducts(products); // 남은 모든 상품 추가
        setHasMore(false); // 더 이상 불러올 상품 없음
      } else {
        setDisplayedProducts(products.slice(0, nextLength));
      }
    }, 500);
  };

  if (!category) return <p>카테고리를 찾을 수 없습니다.</p>;

  return (
    <div>
      <h2>{category.categoryName} 카테고리</h2>
      <p>이곳에 {category.categoryName} 관련 상품을 표시할 예정</p>
      
      <ProductList products={displayedProducts} />

      {!hasMore && <p style={{ textAlign: "center", marginTop: "20px" }}>더 이상 상품이 없습니다.</p>}
    </div>
  );
};

export default Category;
