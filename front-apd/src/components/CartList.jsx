import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { fetchCartItems } from '../../api/cartApi';
import './CartList.css';

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);

    // ✅ 장바구니 데이터 불러오기
    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const items = await fetchCartItems();
                setCartItems(items);
            } catch (error) {
                console.error('장바구니 데이터를 불러오는 중 오류 발생:', error);
            }
        };
        loadCartItems();
    }, []);

    // ✅ 장바구니 합계 계산
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart-list">
            <h2>장바구니</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem 
                        key={item.cartItemId} 
                        item={item} 
                        setCartItems={setCartItems} 
                    />
                ))}
            </div>
            <div className="cart-summary">
                <h3>총 합계: {calculateTotalPrice().toLocaleString()}원</h3>
                <button className="checkout-btn">결제하기</button>
            </div>
        </div>
    );
};

export default CartList;
