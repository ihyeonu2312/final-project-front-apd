import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../api/categoryApi";
import { fetchProductsByCategory } from "../api/productApi";
import { convertToSlug } from "../utils";
import ProductList from "../components/ProductList";
import "../styles/Product.css";

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]); // 전체 상품 리스트
  const [displayedProducts, setDisplayedProducts] = useState([]); // 화면에 보이는 상품 리스트
  const [hasMore, setHasMore] = useState(true); // 더 불러올 상품이 있는지 여부
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가
  const [sortOption, setSortOption] = useState("default"); // ✅ 정렬 상태 추가

  // ✅ 정렬 함수 
  const sortProducts = (option, productsToSort) => {
    let sortedProducts = [...productsToSort];
  
    if (option === "priceLow") {
      sortedProducts.sort((a, b) => a.price - b.price); // 가격 낮은 순
    } else if (option === "priceHigh") {
      sortedProducts.sort((a, b) => b.price - a.price); // 가격 높은 순
    } else if (option === "rating") {
      sortedProducts.sort((a, b) => b.rating - a.rating); // 평점 높은 순
    } else if (option === "discountHigh") {
      sortedProducts.sort((a, b) => {
        const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100 || 0;
        const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100 || 0;
        return discountB - discountA; // 할인율 높은 순
      });
    }
  
    setDisplayedProducts(sortedProducts.slice(0, 40)); // 정렬된 상품 리스트 업데이트
  };
  

  useEffect(() => {
    const getCategoryData = async () => {
      setLoading(true); // ✅ 로딩 시작
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

          // ✅ 상태 업데이트를 한 번에 수행하여 깜빡이는 문제 방지
          setProducts(productsData);
          sortProducts(sortOption, productsData); // ✅ 처음 로딩 시 정렬 적용
          setHasMore(productsData.length > 40);
        } else {
          console.warn("❌ 매칭되는 카테고리가 없습니다.");
        }
      } catch (error) {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // ✅ 로딩 완료
      }
    };

    getCategoryData();
  }, [slug]);
  
  // ✅ 정렬 옵션이 변경될 때 `displayedProducts` 업데이트
  useEffect(() => {
    sortProducts(sortOption, products);
  }, [sortOption, products]);

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
      <br /><br />
      <h2 className="categoryName">{category.categoryName} 카테고리</h2>
      <br />

      {/* ✅ 정렬 UI 추가 */}
      <div className="sort-container">
  {[
    { value: "default", label: "최신순" },
    { value: "priceLow", label: "낮은가격순" },
    { value: "priceHigh", label: "높은가격순" },
    { value: "rating", label: "평점높은순" },
    { value: "discountHigh", label: "높은할인율" }
  ].map((sort, index) => (
    <span
      key={sort.value}
      className={`sort-text ${sortOption === sort.value ? "active" : ""}`}
      onClick={() => setSortOption(sort.value)}
    >
      {sort.label}
    </span>
  ))}
</div>




      {/* ✅ 로딩 상태 표시 */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>상품 로딩 중...</p>
      ) : (
        <>
          <ProductList products={displayedProducts} />
          {!hasMore && <p style={{ textAlign: "center", marginTop: "20px" }}>더 이상 상품이 없습니다.</p>}
        </>
      )}
    </div>
  );
};

export default Category;
