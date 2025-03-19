// import axios from "axios";
// import { useEffect, useState } from "react";

// const CartPage = () => {
//   const [cart, setCart] = useState(null);

//   // ✅ 장바구니 조회 (GET)
//   useEffect(() => {
//     axios.get("http://localhost:8080/cart", { withCredentials: true })
//       .then(res => setCart(res.data))
//       .catch(err => console.error("장바구니 조회 실패:", err));
//   }, []);

//   // ✅ 장바구니에 상품 추가 (POST)
//   const handleAddToCart = (productId) => {
//     axios.post("http://localhost:8080/cart/add", { productId, quantity: 1 }, { withCredentials: true })
//       .then(res => {
//         alert("상품이 장바구니에 추가되었습니다.");
//         setCart(prevCart => ({
//           ...prevCart,
//           items: prevCart ? [...prevCart.items, res.data] : [res.data] // 기존 아이템 유지하며 추가
//         }));
//       })
//       .catch(err => console.error("상품 추가 실패:", err));
//   };

//   // ✅ 장바구니에서 상품 삭제 (DELETE)
//   const handleRemoveFromCart = (productId) => {
//     axios.delete(`http://localhost:8080/cart/${productId}`, { withCredentials: true })
//       .then(() => {
//         alert("상품이 장바구니에서 삭제되었습니다.");
//         setCart(prevCart => prevCart
//           ? { ...prevCart, items: prevCart.items.filter(item => item.productId !== productId) }
//           : null
//         );
//       })
//       .catch(err => console.error("상품 삭제 실패:", err));
//   };

//   // ✅ 장바구니 비우기 (DELETE)
//   const handleClearCart = () => {
//     axios.delete("http://localhost:8080/cart/clear", { withCredentials: true })
//       .then(() => {
//         alert("장바구니가 비워졌습니다.");
//         setCart(null);
//       })
//       .catch(err => console.error("장바구니 비우기 실패:", err));
//   };

//   // ✅ 장바구니에서 상품 수량 변경 (PATCH)
//   const handleUpdateQuantity = (productId, quantity) => {
//     if (quantity < 1) {
//       handleRemoveFromCart(productId);
//       return;
//     }
//     axios.patch("http://localhost:8080/cart/update", { productId, quantity }, { withCredentials: true })
//       .then(() => {
//         alert("상품 수량이 변경되었습니다.");
//         setCart(prevCart => prevCart
//           ? {
//               ...prevCart,
//               items: prevCart.items.map(item =>
//                 item.productId === productId ? { ...item, quantity } : item
//               )
//             }
//           : null
//         );
//       })
//       .catch(err => console.error("수량 변경 실패:", err));
//   };

//   return (
//     <div>
//       <h1>🛒 장바구니</h1>
//       {cart && cart.items?.length > 0 ? (
//         <ul>
//           {cart.items.map(item => (
//             <li key={item.productId}>
//               {item.productName} - {item.quantity}개
//               <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>➕</button>
//               <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>➖</button>
//               <button onClick={() => handleRemoveFromCart(item.productId)}>❌ 삭제</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>장바구니가 비어있습니다.</p>
//       )}

//       <button onClick={handleClearCart} disabled={!cart || cart.items?.length === 0}>🗑 장바구니 비우기</button>
//     </div>
//   );
// };

// export default CartPage;
