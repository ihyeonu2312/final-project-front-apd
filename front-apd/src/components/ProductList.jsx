import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                    {products.map((product) => (
                        <div key={uuidv4()} style={{ border: "1px solid #ddd", padding: "10px" }}>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                            <h3>{product.name}</h3>
                            <p>{product.description || "설명 없음"}</p>
                            <p><strong>가격:</strong> {product.price ? `${product.price.toLocaleString()}원` : "가격 미정"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
