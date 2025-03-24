import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

import {
  fetchAllReviews,
  fetchAverageRating,
  postReview,
} from "../api/reviewApi";

// 별 아이콘 출력용 유틸 함수
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < fullStars; i++) stars.push("⭐");
  return stars.join("");
};

// 날짜 포맷 (yyyy-MM-dd → yyyy.MM.dd)
const formatDate = (dateStr) => {
  return dateStr?.split(" ")[0].replace(/-/g, ".");
};

const ReviewList = ({ productId }) => {
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [averageRating, setAverageRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5); // 기본 별점

  useEffect(() => {
    
    const loadData = async () => {
      const [reviewData, avgRating] = await Promise.all([
        fetchAllReviews(productId),
        fetchAverageRating(productId),
      ]);
      setReviews(Array.isArray(reviewData) ? reviewData : []);
      setAverageRating(Number(avgRating) || 0);
    };
    loadData();
  }, [productId]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  const handleReviewSubmit = async () => {
    if (!newComment.trim()) return alert("리뷰 내용을 입력해주세요.");

    const reviewDto = {
      productId,
      memberId: user?.id || 1,
      // 🔧 테스트용 memberId, 로그인 연동되면 교체
      rating: newRating,
      comment: newComment,
      reviewImageUrl: null,
      createdAt: null,
    };

    try {
      const saved = await postReview(reviewDto);
      setReviews([saved, ...reviews]); // 추가된 리뷰를 맨 위에
      setNewComment("");
      setNewRating(5);
      alert("리뷰가 등록되었습니다!");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-2">
        ⭐ 평균 별점: {averageRating.toFixed(1)} / 5
      </h3>

      {/* 리뷰 등록 폼 */}
      <div className="border p-4 rounded mb-6">
        <h4 className="font-semibold mb-2">리뷰 작성하기</h4>
        <div className="flex items-center gap-2 mb-2">
          <label>별점:</label>
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {[5, 4, 3, 2, 1].map((val) => (
              <option key={val} value={val}>
                {val}점
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="리뷰 내용을 입력해주세요"
          rows={3}
          className="w-full border rounded p-2"
        />
        <button
          onClick={handleReviewSubmit}
          className="mt-2 px-4 py-2 bg-black text-white rounded"
        >
          리뷰 등록
        </button>
      </div>

      {/* 리뷰 목록 */}
      {visibleReviews.length === 0 ? (
        <p>아직 리뷰가 없습니다.</p>
      ) : (
        visibleReviews.map((review) => (
          <div key={review.reviewId} className="border-t py-3">
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
            <p>{renderStars(review.rating)} ({review.rating.toFixed(1)})</p>
            <p>{review.comment}</p>
            {review.reviewImageUrl && (
              <img
                src={review.reviewImageUrl}
                alt="리뷰 이미지"
                className="mt-2 w-32 rounded"
              />
            )}
          </div>
        ))
      )}

      {visibleCount < reviews.length && (
        <button
          onClick={handleLoadMore}
          className="mt-3 text-blue-600 underline hover:text-blue-800"
        >
          더보기
        </button>
      )}
    </div>
  );
};

export default ReviewList;
