import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/productApi"; // ✅ 상품 정보 가져오기
import { addToCart } from "../api/cartApi"; // ✅ 장바구니 추가 API
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams(); // URL에서 productId 가져오기
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductById(productId);
        if (productData) {
          setProduct(productData);
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
      await addToCart(product.productId, 1); // ✅ 상품 1개 추가
      alert("✅ 장바구니에 추가되었습니다!");
      navigate("/cart"); // ✅ 장바구니 페이지로 이동
    } catch (error) {
      alert("❌ 장바구니 추가 실패!");
    }
  };

  if (loading) return <p>⏳ 상품 정보를 불러오는 중...</p>;
  if (!product) return <p>❌ 상품을 찾을 수 없습니다.</p>;

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      <h2>{product.name}</h2>

      {/* 가격 표시 */}
      <p className="price">
        <b>₩{product.price.toLocaleString()}</b>
        {product.originalPrice > product.price && (
          <>
            <span className="original-price">
              <s>₩{product.originalPrice.toLocaleString()}</s>
            </span>
            <span className="discount-rate"> (-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)</span>
          </>
        )}
      </p>

      <p className="stock-status">
        {product.stockQuantity === 0 ? "❌ 품절" : `📦 재고 있음 (${product.stockQuantity}개 남음)`}
      </p>

      {/* ✅ 장바구니 추가 버튼 */}
      <button className="add-to-cart" onClick={handleAddToCart}>
        장바구니 추가
      </button>
    </div>
  );
};

export default ProductDetail;
