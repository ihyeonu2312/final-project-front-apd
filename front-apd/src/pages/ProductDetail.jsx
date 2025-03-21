import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/productApi"; // ✅ 상품 정보 가져오기
import { addToCart } from "../api/cartApi"; // ✅ 장바구니 추가 API
import ProductImageGallery from "../components/ProductImageGallery"; // ✅ 추가
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
      alert("✅ 장바구니에 추가되었습니다!");
      navigate("/user/cart");
    } catch (error) {
      alert("❌ 장바구니 추가 실패!");
    }
  };

  if (loading) return <p>⏳ 상품 정보를 불러오는 중...</p>;
  if (!product) return <p>❌ 상품을 찾을 수 없습니다.</p>;

  return (
    <div className="product-detail-container">
      {/* 상품 이미지 갤러리 적용 */}
      <div className="product-image-section">
        <ProductImageGallery productId={product.productId} />
      </div>

      {/* 제품 정보 영역 */}
      <div className="product-info-section">
        <h2>{product.name}</h2>
        <p className="product-detail-price">
          <b>₩{product.price.toLocaleString()}</b>
          {product.originalPrice > product.price && (
            <>
              <span className="original-price">
                <s>₩{product.originalPrice.toLocaleString()}</s>
              </span>
              <span className="discount-rate1">
                (-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
              </span>
            </>
          )}
        </p>

        <p className="stock-status">
          {product.stockQuantity === 0 ? "❌ 품절" : `📦 재고 있음 (${product.stockQuantity}개 남음)`}
        </p>

        <div className="quantity-selector">
          <label>수량: </label>
          <input
            type="number"
            min="1"
            max={product.stockQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(Math.max(1, e.target.value), product.stockQuantity))}
          />
        </div>

        {/* 버튼 영역 */}
        <div className="button-group">
          <button className="add-to-cart" onClick={handleAddToCart}>
            장바구니 추가
          </button>
          <button className="buy-now" >
            구매하기
          </button>
        </div>

        {/* 리뷰 섹션 */}
        <div className="reviews">
          <h3>상품 리뷰</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>{review.user}</strong>: {review.comment}
                </p>
                <p>⭐ {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p>아직 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
