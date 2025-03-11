import React from 'react';
import { deleteCartItem, updateCartItemQuantity } from '../../api/cartApi';

const CartItem = ({ item, setCartItems }) => {

    // ✅ 아이템 삭제
    const handleDelete = async () => {
        try {
            await deleteCartItem(item.cartItemId);
            setCartItems((prev) => prev.filter((cartItem) => cartItem.cartItemId !== item.cartItemId));
        } catch (error) {
            console.error('장바구니 항목 삭제 중 오류 발생:', error);
        }
    };

    // ✅ 수량 변경
    const handleQuantityChange = async (quantity) => {
        if (quantity < 1) return;
        try {
            await updateCartItemQuantity(item.cartItemId, quantity);
            setCartItems((prev) => 
                prev.map((cartItem) =>
                    cartItem.cartItemId === item.cartItemId
                        ? { ...cartItem, quantity }
                        : cartItem
                )
            );
        } catch (error) {
            console.error('수량 변경 중 오류 발생:', error);
        }
    };

    return (
        <div className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="item-info">
                <h4>{item.name}</h4>
                <p>가격: {item.price.toLocaleString()}원</p>
                <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
                </div>
                <button className="delete-btn" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
};

export default CartItem;
