import React from 'react';


interface Product {
  id: number;
  name: string;
  price: number;
  rate: number;
  image: string;
  
}

interface ProductCardProps {
  product: Product;
   onBuy: (product: Product) => void;
   onFavorite: (product: Product) => void;

}

interface CartItemType extends Product {
    quantity: number; 
  }

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavorite}) => {
  const handleBuy = () => {
        // Получаем текущие товары из LocalStorage или инициализируем пустым массивом
    const cartItems: CartItemType[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Проверяем, есть ли товар уже в корзине
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Если товар уже есть в корзине, увеличиваем его количество
      const updatedItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } else {
      // Если товара нет в корзине, добавляем его с количеством 1
      const updatedItems = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }

    
    updateCartCount();
  };

  const handleFavorite = () => {
    onFavorite(product);
  };
 

  const updateCartCount = () => {
    const cartItems: CartItemType[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const count = cartItems.reduce((total: number, item: CartItemType) => total + item.quantity, 0);
    document.getElementById('cart-count')!.textContent = count.toString();
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name}  className="product-image"/>
      <h3>{product.name}</h3>
      <p>{product.price} ₽</p>
      <p>{product.rate}★</p>

      <div className="product-actions">
        <button className="buy-button" onClick={handleBuy}>Купить</button>
        <button className="favorite-button" onClick={handleFavorite}>♡</button> {/* Кнопка для добавления в избранное */}
      </div>
    </div>
  );
};

export default ProductCard;

