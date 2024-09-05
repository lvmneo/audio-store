import React, { useState,useEffect } from 'react';
import CartItem from '../components/CartItem'
import "../styles/card.css"
import "../styles/cart-summary.css"

import FavoritesModal from '../components/FavoritesModal';

interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }


const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false); 

  useEffect(() => {
  
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
   
    updateCartSummary();
    updateFavoritesCount();
  }, []);

  const handleRemove = (id: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity > 0) {
          return { ...item, quantity: updatedQuantity };
        }
        return null;
      }
      return item;
    }).filter((item) => item !== null) as CartItemType[];

    setCartItems(updatedItems);

    // Сохраняем изменения в LocalStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateCartSummary(); // Обновляем счетчик и общую стоимость после удаления
  };

  const handleAdd = (id: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        // Увеличиваем количество товара на единицу
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedItems);

    // Сохраняем изменения в LocalStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateCartSummary(); // Обновляем счетчик и общую стоимость после добавления
  };

  const updateCartSummary = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Обновляем количество товаров
    const count = cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
    setCartCount(count);

    // Обновляем общую стоимость товаров
    const price = cartItems.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);
    setTotalPrice(price);
  };

  const updateFavoritesCount = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoritesCount(favorites.length);
  };

  const handleFavoritesClick = () => {
    setShowFavoritesModal(true); 
  };

  const closeFavoritesModal = () => {
    setShowFavoritesModal(false); 
  };

  return (
    <div>
        <h1 className='tittle'>QPICK</h1>
      <h2>Корзина</h2>
      <div className ='header-cart'>
      <button onClick={handleFavoritesClick}>
          💖 {favoritesCount}
        </button>
        <a href="/">🛒 {cartCount}</a>
     
     </div>
      <div>
        {cartItems.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} onRemove={handleRemove}  onAdd={handleAdd} />)
        )}
      </div>

       {/* Блок с итоговой суммой и кнопкой перехода к оформлению */}
       <div className="cart-summary">
          <div className="summary-total">
            <p>ИТОГО</p>
            <p>₽ {totalPrice}</p>
          </div>
          <button className="checkout-button">Перейти к оформлению</button>
        </div>
    

      <FavoritesModal isOpen={showFavoritesModal} onClose={closeFavoritesModal} />
    </div>
  );
};


export default Cart;