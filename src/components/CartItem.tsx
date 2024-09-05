import React from 'react';
import Cart from '../pages/Cart'
import "../styles/card.css"

interface CartItemProps {
    item: {
      id: number;
      name: string;
      price: number;
      quantity: number;
      image: string;
    
    };
    
      onRemove: (id: number) => void;
      onAdd: (id: number) => void;
    };


  

  const CartItem: React.FC<CartItemProps> = ({ item,onRemove,onAdd}) => {
    const handleRemove = () => {
        onRemove(item.id); 
    };

    const handleAdd = () => {
        onAdd(item.id); 
      };
  

    return (

        <div >

    
      <div className="product-card">
        <h3 className="product-name">{item.name}</h3>
        <img src={item.image} alt={item.name} className="product-image" />
        <p className="product-price">{item.price * item.quantity} ₽</p>

      
        <button className="buy-button" onClick={handleAdd}>+</button>
        <span>{item.quantity}</span>
        <button className= "buy-button"onClick={handleRemove}>-</button>
        
      </div>

      </div>
    );
  };

export default CartItem;