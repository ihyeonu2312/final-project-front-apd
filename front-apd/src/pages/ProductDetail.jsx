import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductDetailImageGallery from "../components/ProductDetailImageGallery";
import ReviewList from "../components/ReviewList";

import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductById(productId);
        if (productData) {
          setProduct(productData);
          setReviews(productData.reviews || []);
        }
      } catch (error) {
        console.error("❌ 상품 정보를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.productId, quantity);
      const confirmMove = window.confirm("장바구니에 추가되었습니다!\n장바구니로 이동하시겠습니까?");
      if (confirmMove) {
        navigate("/user/cart");
      }
    } catch (error) {
      alert("❌ 장바구니 추가 실패!");
      console.error(error);
    }
  };

  if (loading) return <p>⏳ 상품 정보를 불러오는 중...</p>;
  if (!product) return <p>❌ 상품을 찾을 수 없습니다.</p>;

  return (
    <div className="outer-wrapper px-6 py-10 space-y-10">
      
      {/* ✅ 상단: 대표 이미지 + 상품 정보 */}
      <div className="product-detail-container">
        {/* 대표 이미지 */}
        <div className="product-image-section">
          <ProductImageGallery productId={product.productId} />
        </div>

        {/* 상품 정보 */}
        <div className="product-info-section space-y-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>

          <p className="product-detail-price text-xl">
            <b>₩{product.price.toLocaleString()}</b>
            {product.originalPrice > product.price && (
              <>
                <span className="original-price text-gray-500 ml-2">
                  <s>₩{product.originalPrice.toLocaleString()}</s>
                </span>
                <span className="discount-rate1 text-red-500 ml-1">
                  (-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                </span>
              </>
            )}
          </p>

          <p className="stock-status">
            {product.stockQuantity === 0
              ? "❌ 품절"
              : `📦 재고 있음 (${product.stockQuantity}개 남음)`}
          </p>

          <div className="quantity-selector flex items-center gap-2">
            <label>수량:</label>
            <input
              type="number"
              min="1"
              max={product.stockQuantity}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.min(Math.max(1, Number(e.target.value)), product.stockQuantity))
              }
              className="border rounded w-20 text-center"
            />
          </div>

          <div className="button-group flex gap-4 mt-4">
            <button className="add-to-cart px-4 py-2 bg-black text-white rounded" onClick={handleAddToCart}>
              장바구니 추가
            </button>
            <button className="buy-now px-4 py-2 border rounded">
              구매하기
            </button>
          </div>

          
        </div>
      </div>

      {/* ✅ 하단: 상세 이미지 갤러리*/}
      <div className="product-detail-images">
        <ProductDetailImageGallery productId={product.productId} />
      </div>
      <div className="reviews mt-6">
          <ReviewList productId={product.productId} />
      </div>
    </div>
    
  );
};

export default ProductDetail;
