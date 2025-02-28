import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid, faStarHalfStroke, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductCard.css";

export default function ProductCard({ id, image, title, price, rating }) {
  const navigate = useNavigate();
  const defaultImage = "https://placehold.co/300x300";

  const renderStars = (rating) => {
    if (rating < 0.1 ) return null;
    const ratingNumber = Math.max(0, Math.min(rating, 5));
    const fullStars = Math.floor(ratingNumber);
    const halfStar = ratingNumber % 1 >= 0.5;
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

  const renderRatingText = (rating) => {
    const ratingNumber = Math.max(0, Math.min(rating, 5));
    return ratingNumber.toFixed(1);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation(); // 부모 div의 클릭 이벤트 방지
    console.log(`상품 ${id} 장바구니에 추가`);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <div className="product-image-container">
        <img
          src={image && image.trim() ? image : defaultImage}
          alt={title}
          className="product-image"
        />
        {/* 장바구니 추가 버튼 */}
        <button className="cart-button" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faCartPlus} className="cart-icon" />
        </button>
      </div>

      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">{price.toLocaleString()}원</p>

        {rating > 0 && (
          <div className="rating-container">
            <div>{renderStars(rating)}</div>
            {rating >= 0.1 && <span className="rating-text">{renderRatingText(rating)}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
