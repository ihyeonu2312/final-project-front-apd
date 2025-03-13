const ProductCard = ({ product }) => {
  // 원가(정가) 및 상품 가격 설정
  const originalPrice = product.originalPrice; // 원가 (할인 전 가격)
  const finalPrice = product.price; // 상품가 (할인 적용된 가격)
  const hasDiscount = originalPrice > finalPrice; // 할인 여부

  return (
    <div className="product-card">
      {/* 상품 이미지 */}
      <img
        src={product.thumbnailImageUrl || "https://placehold.co/150"}
        alt={product.name}
        className="product-image"
      />

      {/* 상품명 */}
      <h3 className="product-title">{product.name}</h3>

      {/* 가격 표시 */}
      <p>
        {hasDiscount && (
          <span className="original-price">
            <s>{originalPrice.toLocaleString()}원</s>
          </span>
        )}
        <b className="discounted-price">{finalPrice.toLocaleString()}원</b>
      </p>

      {/* ⭐ 평점 */}
      <p>⭐ {product.rating?.toFixed(1) || "0.0"}</p>

      {/* 재고 여부 */}
      <p
  className={`stock-status ${
    product.stockQuantity === 0
      ? "out-of-stock"
      : product.stockQuantity <= 10
      ? "low-stock"
      : "in-stock"
  }`}
>
{product.stockQuantity <= 10 && (
  <p className={`stock-status ${product.stockQuantity === 0 ? "out-of-stock" : "low-stock"}`}>
    {product.stockQuantity === 0
      ? "❌ 품절"
      : `⚠️ 품절 임박 (${product.stockQuantity}개 남음)`}
  </p>
)}

</p>

      {/* 상세 페이지 이동 버튼 */}
      <a href={product.detailUrl} target="_blank" rel="noopener noreferrer" className="detail-link">
        상세 보기
      </a>
    </div>
  );
};

export default ProductCard;
