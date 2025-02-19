import React from "react";

const ProductList = ({ products, category }) => {
    console.log("✅ ProductList 렌더링됨!"); 
    console.log("✅ 전달된 products:", products); 
    console.log("✅ 전달된 category:", category);

    if (!products || products.length === 0) {
        return <p>상품이 없습니다.</p>;
    }

    return (
        <div>
            <h2>{category} 상품 목록</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.productId}>
                        <h3>{product.name}</h3>
                        <p>가격: {product.price.toLocaleString()}원</p>
                        <p>설명: {product.description}</p>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} width="100" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
