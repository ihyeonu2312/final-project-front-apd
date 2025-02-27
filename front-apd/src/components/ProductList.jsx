import ProductCard from "./ProductCard";

import "./ProductList.css";

const dummyProducts = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  image: "https://via.placeholder.com/150",
  title: `상품 ${index + 1}`,
  price: (index + 1) * 5000,
  location: ["서울", "부산", "대구", "광주", "인천"][index % 5],
}));

export default function ProductList({ products = dummyProducts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} {...product} />)
      ) : (
        <p className="text-center col-span-full text-gray-500">상품이 없습니다.</p>
      )}
    </div>
  );
}