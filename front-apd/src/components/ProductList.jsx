import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // ✅ UUID 라이브러리 추가yarn add uuid


function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/crawl/products", {
                    params: {
                        url: "https://www.aliexpress.com/category/100003109/women-clothing.html",
                        maxProducts: 10
                    }
                });
                console.log("API Response:", response.data); // ✅ 응답 데이터 확인
    
                if (Array.isArray(response.data)) { // ✅ 응답이 배열인지 확인 후 상태 업데이트
                    setProducts(response.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setProducts([]); // ❗ 비정상 응답이면 빈 배열로 설정
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); // ❗ 에러 발생 시 빈 배열 설정
            }
        };
    
        fetchProducts();
    }, []);
    

    return (
        <div>
            <h1>Product List</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={uuidv4()}> {/* ✅ UUID를 key로 사용 */}
                            {product.name} - ${product.price || "가격 미정"} {/* ✅ 가격 기본값 설정 */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductList;
