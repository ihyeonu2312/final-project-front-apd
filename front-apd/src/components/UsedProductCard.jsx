import { useNavigate } from "react-router-dom";

const UsedProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/used-products/${product.usedProductId}`)} // ✅ 클릭 시 상세 이동
    >
      <img
        src={product.images?.[0]?.imageUrl || "https://placehold.co/300x200"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-base font-bold text-blue-700 mb-1">
        ₩{product.price?.toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">거래 상태: {product.status}</p>
    </div>
  );
};

export default UsedProductCard;
