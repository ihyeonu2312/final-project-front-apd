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
  const [selectedOptions, setSelectedOptions] = useState({});
  const [reviews, setReviews] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

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

  // ✅ 장바구니 추가
const handleAddToCart = async () => {
  const requiredOptions = product.options ? Object.keys(product.options) : [];
  const allSelected = requiredOptions.every(
    (key) => selectedOptions[key] && selectedOptions[key] !== ""
  );

  if (!allSelected) {
    alert("옵션을 모두 선택해주세요!");
    return;
  }

  try {
    await addToCart(product.productId, quantity, selectedOptions);
  } catch (error) {
    alert("❌ 장바구니 추가 실패!");
    console.error(error);
    return;
  }

  const confirmMove = window.confirm("장바구니에 추가되었습니다!\n장바구니로 이동하시겠습니까?");
  if (confirmMove) {
    navigate("/user/cart");
  }
};



// ✅ 즉시 구매하기
const handleBuyNow = async () => {
  const requiredOptions = product.options ? Object.keys(product.options) : [];
  const allSelected = requiredOptions.every(
    (key) => selectedOptions[key] && selectedOptions[key] !== ""
  );

  if (!allSelected) {
    alert("옵션을 모두 선택해주세요!");
    return;
  }
  const confirmMove = window.confirm("결제를 진행하시겠습니까?");
  if (!confirmMove) return;

  try {
    const token = localStorage.getItem("token");

    // 1. 주문 생성
    const orderRes = await axios.post(`${API_URL}/orders/prepare`, {
      memberId: localStorage.getItem("memberId"),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });

    const orderId = orderRes.data.orderId;

    // 2. 결제 요청 (결제 URL 요청)
    const paymentRes = await axios.post(`${API_URL}/payment/inicis/${orderId}/pay`, 
      {
      paymentMethod: "CARD", 
      amount: Math.round(product.price * quantity),
      buyerName: "테스트구매자"
    }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true

    });

      navigate("/payment-form", {
      state: { inicis: paymentRes.data }
    });
    console.log("✅ API_URL:", API_URL);

    console.log("💳 응답 전체 확인:", paymentRes.data);
    const redirectUrl = paymentRes.data.redirectUrl;

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert("결제 URL을 받아오지 못했습니다. 다시 시도해 주세요.");
      navigate("/user/cart");
    }
  } catch (err) {
    console.error("❌ 결제 시작 실패:", err);
    alert("결제를 시작할 수 없습니다.");
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

          {/* ✅ 옵션 선택 UI */}
          {product.options && Object.keys(product.options).map((optionKey) => (
            <div key={optionKey}>
              <label className="block font-semibold mb-1">{optionKey}:</label>
              <select
                className="border rounded px-2 py-1 mb-3"
                value={selectedOptions[optionKey] || ""}
                onChange={(e) =>
                  setSelectedOptions((prev) => ({
                    ...prev,
                    [optionKey]: e.target.value
                  }))
                }
              >
                <option value="">선택하세요</option>
                {product.options[optionKey].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          ))}

          {/* 수량 선택 */}
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

          {/* 버튼 */}
          <div className="button-group flex gap-4 mt-4">
            <button className="add-to-cart px-4 py-2 bg-black text-white rounded" onClick={handleAddToCart}>
              장바구니 추가
            </button>
            <button className="buy-now px-4 py-2 border rounded"
             onClick={handleBuyNow}
             >
              구매하기
            </button>
          </div>
        </div>
      </div>

      {/* ✅ 하단: 상세 이미지 갤러리 */}
      <div className="product-detail-images">
        <ProductDetailImageGallery productId={product.productId} />
      </div>

      {/* ✅ 리뷰 섹션 */}
      <div className="reviews mt-6">
        <ReviewList productId={product.productId} />
      </div>
    </div>
  );
};

export default ProductDetail;
