import React, { useState, useEffect } from "react";
import axios from "axios";
import MyPageSidebar from "../components/MyPageSidebar";
import { useAuthStore } from "../store/authStore";
import "../styles/MyPage.css";
import "../styles/MyReviews.css";

const MyReviews = () => {
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: "Apple iPhone 15 Pro",
      date: "2024-02-21",
      rating: 5,
      content: "정말 멋진 제품입니다! 만족스러워요!",
      productImage: "https://placehold.co/300x300",
      reviewImage: "https://placehold.co/600x300", // ✅ 새로운 이미지 추가
    },
    {
      id: 2,
      productName: "삼성 Galaxy S23 Ultra",
      date: "2024-02-19",
      rating: 4,
      content: "카메라가 정말 좋아요. 배터리도 오래가요.",
      productImage: "https://placehold.co/300x300",
      reviewImage: "https://placehold.co/600x300", // ✅ 새로운 이미지 추가
    }
  ]);


  const API_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 로컬용 const response = await axios.get("http://localhost:8080/api/reviews", {
        const response = await axios.get(`${API_URL}/reviews`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 불러오기 실패:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="mypage-container">
      <MyPageSidebar />
      <div className="content">
        <h2>리뷰관리</h2>
        {reviews.length === 0 ? (
          <p>작성한 리뷰가 없습니다.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="review-product">
                  <img src={review.productImage} alt={review.productName} className="review-product-image" />
                  <div>
                    <h3>{review.productName}</h3>
                    <p><strong>작성일:</strong> {review.date}</p>
                  </div>
                </div>
                <p className="review-text">{review.content}</p>
                <span className="review-rating">⭐ {review.rating}/5</span>
                
                {/* ✅ 추가된 리뷰 이미지 */}
                <img src={review.reviewImage} alt="Review" className="review-image-large" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
