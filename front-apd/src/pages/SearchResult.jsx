import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/productApi"; // ✅ 전체 상품 가져오는 API
import ProductList from "../components/ProductList";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || ""; // URL에서 검색어 가져오기
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await fetchProducts(); // ✅ 전체 상품 가져오기
        setProducts(allProducts);

        // ✅ 검색어를 포함하는 상품만 필터링
        const filtered = allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("❌ 상품 데이터를 불러오는 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [query]);

  return (
    <div>
      <h2>🔍 "{query}" 검색 결과</h2>
      {loading ? <p>상품을 불러오는 중...</p> : <ProductList products={filteredProducts} />}
    </div>
  );
};

export default SearchResult;
