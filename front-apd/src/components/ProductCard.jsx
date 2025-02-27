import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductCard.css";
export default function ProductCard({ id, image, title, price, location }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-64 cursor-pointer border rounded-xl shadow-md" onClick={() => navigate(`/product/${id}`)}>
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-xl" />
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <p className="text-gray-500 text-sm">{location}</p>
        <p className="text-xl font-bold mt-1">{price.toLocaleString()}원</p>
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          <Heart fill={liked ? "red" : "none"} className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
