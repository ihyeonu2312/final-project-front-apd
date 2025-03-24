import axios from "axios";

const BASE_URL = "/api/reviews";

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
