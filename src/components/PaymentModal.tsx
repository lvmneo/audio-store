import React from 'react';
import "../styles/PaymentModal.css"

interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  totalPrice: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, cartItems, totalPrice }) => {
  if (!isOpen) return null; 

  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Оплата</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">Цена: {item.price} ₽</p>
                <p className="cart-item-quantity">Количество: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="payment-summary">
            <p>К оплате: {totalPrice} ₽</p>
            <form className="payment-form">
              <input type="text" placeholder="Номер карты" required />
              <input type="text" placeholder="Имя на карте" required />
              <input type="text" placeholder="Срок действия (MM/YY)" required />
              <input type="text" placeholder="CVV" required />
              <button type="submit" className="pay-button">Оплатить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
