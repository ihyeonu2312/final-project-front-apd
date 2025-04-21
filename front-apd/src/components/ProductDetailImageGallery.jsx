import React, { useEffect, useState } from "react";
import { getProductDetailImages } from "../api/productImageApi";

const ProductDetailImageGallery = ({ productId }) => {
  const [detailImages, setDetailImages] = useState([]);

  useEffect(() => {
    const fetchDetailImages = async () => {
      const data = await getProductDetailImages(productId);
      setDetailImages(data);
    };
    fetchDetailImages();
  }, [productId]);

  return (
    <div className="mt-10 border rounded p-4 bg-white">
      <h3 className="text-lg font-semibold mb-4">📸 상세 이미지</h3>
      <div className="space-y-4">
        {detailImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`상세 이미지 ${index + 1}`}
            className="w-full border rounded shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailImageGallery;`