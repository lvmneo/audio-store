import React, { useState} from 'react';
import "../styles/card.css"

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


const ProductCard: React.FC<ProductCardProps> = ({ product, onFavorite,onBuy}) => {
   
  const handleBuy = () => {
        // Получаем текущие товары из LocalStorage или инициализируем пустым массивом
        onBuy(product);
  
  };

  const handleFavorite = () => {
    onFavorite(product);
  };
 

 

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name}  className="product-image"/>
     
      <p className='product.rate' >{product.rate}★</p>

      <div className='name-card'>
      <h3 className='product-name'>{product.name}</h3>
      </div>
      <p className='product-price'>{product.price} ₽</p>
      
  
      <div className="product-actions">
        <button className="favorite-button" onClick={handleFavorite}>♡</button> 
        <button className="buy-button" onClick={handleBuy}>Купить</button>
      </div>
    </div>
  );
};

export default ProductCard;

