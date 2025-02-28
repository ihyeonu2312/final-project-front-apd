import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const dummyProducts = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  image: "https://placehold.co/250x250",
  title: [
    "삼성 갤럭시 S23 울트라",
    "애플 맥북 프로 16인치",
    "LG OLED 55인치 TV",
    "나이키 에어포스 1 화이트",
    "구찌 GG 마몬트 숄더백",
  ][index % 5],
  price: (index + 1) * 5000,
  rating: (Math.random() * 5).toFixed(1), // 0부터 5까지의 랜덤 별점
}));

export default function ProductList({ products = dummyProducts }) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  const productsPerPage = 20;

  useEffect(() => {
    const fetchMoreProducts = () => {
      setLoading(true);
      setTimeout(() => {
        const newProducts = products.slice(
          (page - 1) * productsPerPage,
          page * productsPerPage
        );
        setCurrentProducts((prev) => [...prev, ...newProducts]);
        setLoading(false);

        if (currentProducts.length + newProducts.length >= products.length) {
          setHasMore(false);
        }
      }, 2000);
    };

    fetchMoreProducts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="product-list">
      {currentProducts.length > 0 ? (
        currentProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
      ) : (
        <p className="no-products">상품이 없습니다.</p>
      )}

      {loading && <p className="loading">Loading...</p>}

      <div ref={loadMoreRef} style={{ height: "20px" }}></div>

      {!hasMore && <p className="no-more">더 이상 상품이 없습니다.</p>}
    </div>
  );
}
