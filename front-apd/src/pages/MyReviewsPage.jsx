import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import "../styles/MyPage.css";


const MyReviewsPage = () => {
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reviews/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 가져오기 실패:", error);
      }
    };
    fetchReviews();
  }, [user]);

  return (
    <div>
      <h2>내가 작성한 리뷰</h2>
      {reviews.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              {review.content} - {review.rating}점
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReviewsPage;
