import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // ✅ UUID 라이브러리 추가

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
                console.log("API Response:", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
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
