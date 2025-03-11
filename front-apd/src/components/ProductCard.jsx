import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, thumbnailImageUrl, title, price, rating }) {
  const navigate = useNavigate();
  const defaultImage = "https://placehold.co/300x300"; // 기본 이미지

  const renderStars = (rating) => {
    if (!rating || rating < 0.1) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon key={`full-${index}`} icon={faStarSolid} className="star-icon" />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} className="star-icon" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon key={`empty-${index}`} icon={faStarEmpty} className="empty-star-icon" />
        ))}
      </>
    );
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <div className="product-image-container">
        <img
          src={thumbnailImageUrl && thumbnailImageUrl.trim() ? thumbnailImageUrl : defaultImage} // ✅ thumbnailImageUrl 사용
          alt={title}
          className="product-image"
          onError={(e) => (e.target.src = defaultImage)} // ✅ 이미지 로드 실패 시 기본 이미지로 변경
        />
      </div>

      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">{price.toLocaleString()}원</p>

        {rating > 0 && (
          <div className="rating-container">
            <span className="rating-text">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
