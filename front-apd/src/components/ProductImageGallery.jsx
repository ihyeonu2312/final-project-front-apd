import React, { useEffect, useState } from "react";
import { getProductImages } from "../api/productImageApi";

const ProductImageGallery = ({ productId }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const imageList = await getProductImages(productId);
      setImages(imageList);
      if (imageList.length > 0) {
        setSelectedImage(imageList[0].largeImageUrl); // 첫 번째 이미지를 기본으로 설정
      }
    };
    fetchImages();
  }, [productId]);

  return (
    <div className="flex">
      {/* 작은 썸네일 리스트 (세로 정렬) */}
      <div className="flex flex-col space-y-2">
        {images.map((image) => (
          <img
            key={image.imageId}
            src={image.smallImageUrl}
            alt="상품 이미지"
   className="w-20 h-12 object-contain border rounded cursor-pointer bg-white"
            onClick={() => setSelectedImage(image.largeImageUrl)}
          />
        ))}
      </div>

      {/* 클릭한 이미지 크게 표시 */}
      <div className="ml-4">
        {selectedImage && (
          <img src={selectedImage} alt="선택된 상품 이미지" className="main-image" />
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
