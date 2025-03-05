import { create } from "zustand";

// 🛒 장바구니 상태 관리 (Zustand)
export const useCartStore = create((set) => ({
  cart: [
    {
      id: 1,
      name: "중고 아이폰 13",
      price: 850000,
      quantity: 1,
      imageUrl: "/images/iphone13.jpg"
    },
    {
      id: 2,
      name: "맥북 프로 16인치",
      price: 2400000,
      quantity: 1,
      imageUrl: "/images/macbook16.jpg"
    }
  ],

  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    })),
  clearCart: () => set({ cart: [] })
}));
