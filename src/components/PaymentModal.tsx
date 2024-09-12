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
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onDelete: (id: number) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, cartItems, totalPrice,onAdd, onRemove, onDelete }) => {
  if (!isOpen) return null; // Не отображаем модальное окно, если оно не открыто

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
                <div className='actions-pay'>
                <button className="btn-pl-min" onClick={() => onRemove(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn-pl-min" onClick={() => onAdd(item.id)}>+</button>
                </div>     
              </div>
              <button className="del-btn-pay" onClick={() => onDelete(item.id)}><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8848 3.4H20.8667V5.1H18.874V16.15C18.874 16.3754 18.769 16.5916 18.5821 16.751C18.3953 16.9104 18.1418 17 17.8776 17H3.92813C3.66387 17 3.41044 16.9104 3.22358 16.751C3.03672 16.5916 2.93174 16.3754 2.93174 16.15V5.1H0.938965V3.4H5.92091V0.85C5.92091 0.624566 6.02589 0.408365 6.21275 0.248959C6.3996 0.0895533 6.65304 0 6.9173 0H14.8884C15.1527 0 15.4061 0.0895533 15.593 0.248959C15.7798 0.408365 15.8848 0.624566 15.8848 0.85V3.4ZM16.8812 5.1H4.92452V15.3H16.8812V5.1ZM12.3117 10.2L14.0734 11.7028L12.6645 12.9047L10.9029 11.4019L9.14124 12.9047L7.73234 11.7028L9.49396 10.2L7.73234 8.6972L9.14124 7.4953L10.9029 8.9981L12.6645 7.4953L14.0734 8.6972L12.3117 10.2ZM7.91369 1.7V3.4H13.892V1.7H7.91369Z" fill="#DF6464"/>
                    </svg></button>
            </div>
          ))}
          <div className="payment-summary">
            <p>К оплате : {totalPrice} ₽</p>
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
