import axios from "axios";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  // ✅ 장바구니 조회 (GET)
  useEffect(() => {
    axios.get("http://localhost:8080/cart", { withCredentials: true })
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ 장바구니에 상품 추가 (POST)
  const handleAddToCart = (productId) => {
    axios.post("http://localhost:8080/cart/add", { productId, quantity: 1 }, { withCredentials: true })
      .then(res => {
        alert("상품이 장바구니에 추가되었습니다.");
        setCart(res.data); // 장바구니 상태 업데이트
      })
      .catch(err => console.error(err));
  };

  // ✅ 장바구니에서 상품 삭제 (DELETE)
  const handleRemoveFromCart = (productId) => {
    axios.delete(`http://localhost:8080/cart/${productId}`, { withCredentials: true })
      .then(() => {
        alert("상품이 장바구니에서 삭제되었습니다.");
        setCart(prevCart => ({
          ...prevCart,
          items: prevCart.items.filter(item => item.productId !== productId)
        }));
      })
      .catch(err => console.error(err));
  };

  // ✅ 장바구니 비우기 (DELETE)
  const handleClearCart = () => {
    axios.delete("http://localhost:8080/cart/clear", { withCredentials: true })
      .then(() => {
        alert("장바구니가 비워졌습니다.");
        setCart(null);
      })
      .catch(err => console.error(err));
  };

  // ✅ 장바구니에서 상품 수량 변경 (PATCH)
  const handleUpdateQuantity = (productId, quantity) => {
    axios.patch("http://localhost:8080/cart/update", { productId, quantity }, { withCredentials: true })
      .then(() => {
        alert("상품 수량이 변경되었습니다.");
        setCart(prevCart => ({
          ...prevCart,
          items: prevCart.items.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        }));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>🛒 장바구니</h1>
      {cart ? (
        <ul>
          {cart.items.map(item => (
            <li key={item.productId}>
              {item.productName} - {item.quantity}개
              <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>➕</button>
              <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>➖</button>
              <button onClick={() => handleRemoveFromCart(item.productId)}>❌ 삭제</button>
            </li>
          ))}
        </ul>
      ) : <p>장바구니가 비어있습니다.</p>}

      <button onClick={handleClearCart}>🗑 장바구니 비우기</button>
    </div>
  );
};

export default CartPage;
