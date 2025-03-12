const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* 상품 이미지 */}
      <img
        src={product.thumbnailImageUrl || "https://placehold.co/150"}
        alt={product.name}
      />

      {/* 상품명 */}
      <h3>{product.name}</h3>

      {/* 가격 표시 (할인 가격이 있으면 적용) */}
      {product.discountPrice ? (
        <p>
          <span style={{ textDecoration: "line-through", color: "gray" }}>
            {product.price.toLocaleString()}원
          </span>{" "}
          → <b>{product.discountPrice.toLocaleString()}원</b> (할인 적용)
        </p>
      ) : (
        <p>{product.price.toLocaleString()}원</p>
      )}

      {/* ⭐ 평점 */}
      <p>⭐ {product.rating?.toFixed(1) || "0.0"}</p>

      {/* 재고 여부 */}
      <p style={{ color: product.stockQuantity > 0 ? "green" : "red" }}>
        {product.stockQuantity > 0 ? `재고 있음 (${product.stockQuantity}개 남음)` : "품절"}
      </p>

      {/* 옵션 목록 (최대 2개만 미리보기) -----  상세에서 적용할것
      {product.options?.length > 0 && (
        <p>
          옵션: {product.options.slice(0, 2).map(opt => opt.name).join(", ")}
          {product.options.length > 2 && " ..."}
        </p>
      )} */}

      {/* 상세 페이지 이동 버튼 */}
      <a href={product.detailUrl} target="_blank" rel="noopener noreferrer">
        상세 보기
      </a>
    </div>
  );
};

export default ProductCard;


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar as faStarSolid, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
// import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
// import { useNavigate } from "react-router-dom";

// export default function ProductCard({ id, thumbnailImageUrl, title, price, rating }) {
//   const navigate = useNavigate();
//   const defaultImage = "https://placehold.co/300x300"; // 기본 이미지

//   const renderStars = (rating) => {
//     if (!rating || rating < 0.1) return null;
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5;
//     const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//     return (
//       <>
//         {[...Array(fullStars)].map((_, index) => (
//           <FontAwesomeIcon key={`full-${index}`} icon={faStarSolid} className="star-icon" />
//         ))}
//         {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} className="star-icon" />}
//         {[...Array(emptyStars)].map((_, index) => (
//           <FontAwesomeIcon key={`empty-${index}`} icon={faStarEmpty} className="empty-star-icon" />
//         ))}
//       </>
//     );
//   };

//   return (
//     <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
//       <div className="product-image-container">
//         <img
//           src={thumbnailImageUrl && thumbnailImageUrl.trim() ? thumbnailImageUrl : defaultImage} // ✅ thumbnailImageUrl 사용
//           alt={title}
//           className="product-image"
//           onError={(e) => (e.target.src = defaultImage)} // ✅ 이미지 로드 실패 시 기본 이미지로 변경
//         />
//       </div>

//       <div className="product-info">
//         <h2 className="product-title">{title}</h2>
//         <p className="product-price">{price.toLocaleString()}원</p>

//         {rating > 0 && (
//           <div className="rating-container">
//             <span className="rating-text">{rating.toFixed(1)}</span>
//             {renderStars(rating)} {/* ✅ 별점 렌더링 추가 */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
