const ProductCard = ({ product }) => {
  // 원가(정가) 및 상품 가격 설정
  const originalPrice = product.originalPrice; // 원가 (할인 전 가격)
  const finalPrice = product.price; // 상품가 (할인 적용된 가격)
  const hasDiscount = originalPrice > finalPrice; // 할인 여부

  const calculateDiscountRate = (originalPrice, finalPrice) => {
    if (!originalPrice || originalPrice === finalPrice) return 0; // 할인 없음
    return Math.round(((originalPrice - finalPrice) / originalPrice) * 100); // 백분율 변환
  };
  
  // 할인율 변수 선언
  const discountRate = calculateDiscountRate(originalPrice, finalPrice);

  return (
    <div className="product-card">
      {/* 상품 이미지 */}
      <img
        src={product.thumbnailImageUrl || "https://placehold.co/150"}
        alt={product.name}
        className="product-image"
        onClick={() => window.open(product.detailUrl, "_blank", "noopener,noreferrer")}
      />

      {/* 상품명 */}
      <h3
  className="product-title"
  onClick={() => window.open(product.detailUrl, "_blank", "noopener,noreferrer")}
  style={{ cursor: "pointer" }}>
  {product.name}
</h3>



      {/* 가격 표시 */}
      <p className="price">
    <b className={hasDiscount ? "discounted-price" : "normal-price"}>
      ₩{finalPrice.toLocaleString()}
    </b>
    {hasDiscount && (
      <>
        <span className="original-price">
          <s>₩{originalPrice.toLocaleString()}</s>
        </span>
        <span className="discount-rate"> (-{discountRate}%)</span> {/* 할인율 표시 */}
      </>
    )}
  </p>


      {/* ⭐ 평점 */}
      <p className="rating">⭐ {product.rating?.toFixed(1) || "0.0"}</p>

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
{product.stockQuantity <= 9 && (
  <p className={`stock-status ${product.stockQuantity === 0 ? "out-of-stock" : "low-stock"}`}>
    {product.stockQuantity === 0
      ? "❌ 품절"
      : `⚠️ 품절 임박 (${product.stockQuantity}개 남음)`}
  </p>
)}

</p>

    </div>
  );
};

export default ProductCard;
