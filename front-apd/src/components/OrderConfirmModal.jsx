import React from "react";
import "../styles/OrderConfirmModal.css";

const OrderConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    //나중에 사용자 정보 넣어야함 주소 이름 가격 등등
    <div className="modal-backdrop">
      <div className="modal">
        <h3>주문을 완료하시겠습니까?</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">예</button>
          <button onClick={onCancel} className="cancel-button">아니오</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmModal;
