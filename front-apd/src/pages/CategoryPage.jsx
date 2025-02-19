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

    console.log("✅ 현재 URL의 category 값:", category);

    const normalizeCategory = (category) => category.trim().replace(/-/g, " ").toLowerCase();

    const categoryKey = Object.entries(CATEGORIES).find(
        ([key, value]) => value.toLowerCase() === normalizeCategory(category)
    )?.[0];

    console.log("✅ 변환된 categoryKey:", categoryKey);

    if (!categoryKey) {
        console.warn("❌ 올바르지 않은 categoryKey, NotFoundPage로 이동합니다.");
        return <Navigate to="/not-found" />;
    }

    useEffect(() => {
        console.log("✅ useEffect 실행됨!");
        console.log("✅ API 요청 시도 - 카테고리 키:", categoryKey);

        setLoading(true);

        axios.get(`http://localhost:8080/api/products/category/${encodeURIComponent(categoryKey)}`)
            .then((res) => {
                console.log("✅ API 응답 데이터:", res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ API 요청 실패:", err);
                setError(err);
                setLoading(false);
            });
    }, [categoryKey]);

    return (
        <div>
            <h1>{CATEGORIES[categoryKey]}</h1>
            <p>{categoryDescriptions[categoryKey]}</p>
            <h1>카테고리: {category}</h1>
            {loading ? (
                <p>상품을 불러오는 중...</p>
            ) : error ? (
                <p>상품을 불러오는 중 오류가 발생했습니다.</p>
            ) : (
                <ProductList products={products} category={CATEGORIES[categoryKey]} />
            )}
        </div>
    );
};

export default CategoryPage;
