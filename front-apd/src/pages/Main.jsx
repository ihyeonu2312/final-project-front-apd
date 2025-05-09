import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AutoSlider from "../components/AutoSlider"; // 상단에 추가
import ProductList from "../components/ProductList";
import 자동차 from "../assets/category/자동차.png";
import 화장품 from "../assets/category/화장품.png";
import 유아 from "../assets/category/유아.png";
import 공구 from "../assets/category/공구.png";
import 가방 from "../assets/category/가방.png";
import 가전 from "../assets/category/가전.png";

const MainPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      if (res.data) {
        const topRated = res.data.filter(p => p.rating >= 4.9);
        const randomOne = topRated.length > 0
          ? topRated[Math.floor(Math.random() * topRated.length)]
          : null;
  
        setFeaturedProduct(randomOne); // ✅ 랜덤 1개 저장
  
        const shuffled = [...res.data].sort(() => Math.random() - 0.5).slice(0, 20);
        setProducts(shuffled);
      }
    } catch (err) {
      console.error("❌ 상품 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="main-container px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">카테고리별 쇼핑</h2>
      </div>

{/* 상단 배너 + 카테고리 영역 */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-12">
  {/* 🔥 슬라이더: 좌측 2칸 */}
  <div className="col-span-1 md:col-span-2">
    <AutoSlider />
  </div>

  {/* 👉 카테고리: 우측 2칸 + 내부 그리드로 2행 3열 */}
  <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-4">
    {[
      { name: "자동차용품", img: 자동차 },
      { name: "뷰티/건강", img: 화장품 },
      { name: "출산/유아동", img: 유아 },
      { name: "홈인테리어", img: 공구 },
      { name: "패션의류/잡화", img: 가방 },
      { name: "가전디지털", img: 가전 },
    ].map(({ name, img }, i) => {
      const slug = name.replace(/[^\w가-힣]/g, "-").replace(/\s+/g, "-");
      return (
        <div
          key={i}
          className="bg-white p-3 border rounded shadow text-center cursor-pointer hover:shadow-md transition"
          onClick={() => navigate(`/category/${slug}`)}
        >
          <p className="font-semibold">{name}</p>
          <img src={img} alt={name} className="mx-auto h-20 object-contain" />
        </div>
      );
    })}
  </div>
</div>

      {/* 상품 목록 */}
      {/* <h2 className="text-xl font-bold mb-4">후기가 좋은 상품들</h2>
      {loading ? (
        <p className="text-center mt-6 text-gray-500">상품 로딩 중...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-3 rounded shadow text-center">
              <img
                src={product.thumbnailUrl}
                alt={product.name}
                className="h-32 w-full object-cover rounded"
              />
              <p className="mt-2 font-semibold">{product.name}</p>
              <p className="text-red-500 font-bold">{product.price.toLocaleString()}원</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default MainPage;
