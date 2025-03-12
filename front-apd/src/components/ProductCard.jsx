const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* 상품 이미지 */}
      <img
        src={product.thumbnailImageUrl || "https://placehold.co/150"}
        alt={product.name}
        className="product-image"
      />

      {/* 상품명 (길면 `...` 처리) */}
      <h3 className="product-title">{product.name}</h3>

      {/* 가격 표시 (할인 가격이 있으면 적용) */}
      {product.discountPrice ? (
        <p>
          <b>₩{product.discountPrice.toLocaleString()} </b>
          <span className="original-price">
          ₩{product.price.toLocaleString()}
          </span>{" "}
        </p>
      ) : (
        <p>₩{product.price.toLocaleString()}</p>
      )}

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
