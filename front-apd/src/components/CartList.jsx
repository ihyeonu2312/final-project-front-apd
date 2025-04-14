import axios from "axios";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/cart", { withCredentials: true })
  //     .then(res => setCart(res.data))
  //     .catch(err => console.error(err));
  // }, []); // 로컬용

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/api', ''); // 👉 필요 시 /api 제거
    axios.get(`${BASE_URL}/cart`, { withCredentials: true })
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>🛒 장바구니</h1>
      {cart ? (
        <ul>
          {cart.items.map(item => (
            <li key={item.productId}>
              {item.productName} - {item.quantity}개
            </li>
          ))}
        </ul>
      ) : <p>장바구니가 비어있습니다.</p>}
    </div>
  );
};

export default CartPage;
