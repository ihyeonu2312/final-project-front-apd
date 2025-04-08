import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/reviews`;

// const BASE_URL = "http://localhost:8080/api/reviews"; 로컬

export const fetchAllReviews = async (productId) => {
  const res = await axios.get(`${BASE_URL}/product/${productId}`);
  return res.data;
};

export const fetchAverageRating = async (productId) => {
  const res = await axios.get(`${BASE_URL}/product/${productId}/rating`);
  return res.data;
};

export const postReview = async (reviewDto) => {
  const res = await axios.post(BASE_URL, reviewDto);
  return res.data;
};
