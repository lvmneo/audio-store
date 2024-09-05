import React, { useState,useEffect } from 'react';
import CartItem from '../components/CartItem'

interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
interface CartProps {
  cartItems: CartItemType[]; // Пропсы для передачи данных о товарах в корзине
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Загружаем данные корзины из LocalStorage при монтировании компонента
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
   
    updateCartSummary();
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

  return (
    <div>
      <h1>Корзина</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} onRemove={handleRemove}  onAdd={handleAdd} />)
        )}
      </div>
    </div>
  );
};


export default Cart;