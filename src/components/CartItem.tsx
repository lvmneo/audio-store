import React from 'react';
import Cart from '../pages/Cart'

interface CartItemProps {
    item: {
      id: number;
      name: string;
      price: number;
      quantity: number;};
    
      onRemove: (id: number) => void;
      onAdd: (id: number) => void;
    };


  

  const CartItem: React.FC<CartItemProps> = ({ item,onRemove,onAdd}) => {
    const handleRemove = () => {
        onRemove(item.id); // Вызов функции удаления товара
    };

    const handleAdd = () => {
        onAdd(item.id); // Вызов функции добавления товара
      };
  
      
    return (
      <div className="cart-item">
        <h3>{item.name}</h3>
        <p>Цена: {item.price * item.quantity} ₽</p>
        <p>Количество: {item.quantity}</p>
        <button onClick={handleAdd}>Купить</button>
        <button onClick={handleRemove}>Удалить</button>
      </div>
    );
  };

export default CartItem;