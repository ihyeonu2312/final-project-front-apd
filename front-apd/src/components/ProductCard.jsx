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
      />

      {/* 상품명 */}
      <h3 className="product-title">{product.name}</h3>

      {/* 가격 표시 */}
      <p>
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
