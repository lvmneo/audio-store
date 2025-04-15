import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../styles/modalwin.css"
import "../styles/App.css"
import ProductCard from '../components/ProductCard';
import"../styles/footer.css"
import Footer from '../components/Footer';
import FavoritesControl from '../components/FavoritesControl';



interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    sale:number ;
 
  }

// Массив продуктов с характеристиками
  const products = [
    { id: 1, name: 'Apple BYZ S852I', price: 2927, rate:4.7,image: require ('../assets/Image.png'),category:'Наушники',sale:3927},
    { id: 2, name: 'Apple EarPods', price: 2327, rate:4.5,image: require('../assets/Image1.png'),category:'Наушники',sale:3927},
    { id: 3, name: 'Apple BYZ S852I', price: 2927, rate:4.5,image:require('../assets/Image2.png'),category:'Наушники',sale:3927},
    { id: 4, name: 'Apple EarPods', price: 2327, rate:4.5,image:require ('../assets/Image.png'),category:'Наушники',sale:0},
    { id: 5, name: 'Apple EarPods', price: 2327, rate:4.5,image: require('../assets/Image1.png') ,category:'Наушники',sale:0},
    { id: 6, name: 'Apple EarPods', price: 2327, rate:4.5,image: require('../assets/Image2.png'),category:'Наушники',sale:0},
    { id: 7, name: 'Apple AirPods', price: 9527, rate:4.7,image: require('../assets/Image3.png'),category:'Беспроводные Наушники',sale:0},
    { id: 8, name: 'GERLAX GH-04', price: 6527, rate:4.7,image: require('../assets/Image4.png'),category:'Беспроводные Наушники',sale:0},
    { id: 9, name: 'BOROFONE BO4', price: 7527, rate:4.7,image: require('../assets/Image5.png'),category:'Беспроводные Наушники',sale:0},
 ];

const Catalog: React.FC = () => {
      // Состояния для количества товаров в корзине, избранного и для отображения модального окна избранного
    const [cartCount, setCartCount] = useState(0);
    const [favoritesTrigger, setFavoritesTrigger] = useState(false);
    const navigate = useNavigate();

 useEffect(() => {
  updateCartCount();
}, []);

  // Разделение продуктов на две категории: беспроводные наушники и обычные наушники
 const wirelessheadphones = products.filter(product => product.category === 'Беспроводные Наушники');
  const headphones = products.filter(product => product.category === 'Наушники');



  /*------------------------- избранное----------------------------- */

  // Функция добавления товара в избранное
  const addToFavorites = (product: Product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const alreadyInFavs = favorites.some((item: { id: number }) => item.id === product.id);
  
    if (!alreadyInFavs) {
      const updatedFavorites = [...favorites, product];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavoritesTrigger(prev => !prev); //запускает useEffect, в котором обновляется счётчик
    }
  };


/* ---------------------корзина -------------------------------*/

 // Функция для обновления количества товаров в корзине
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
   
    const count = cartItems.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
    setCartCount(count);
  };
  
    // Функция добавления товара в корзину
    const addToCart = (product: Product) => {
      const cartItems: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        image: string;
      }[]=JSON.parse(localStorage.getItem('cartItems') || '[]');
      const findItem = cartItems.find(item => item.id === product.id);
  
      const updatedItems = findItem 
        ? cartItems.map(item =>
            item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } : item)
            : [...cartItems, { ...product, quantity: 1 }];
  
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      updateCartCount();
    };
 
 



  return (
    <div className='page-content'>
      <div className='header-catalog'>
        <h1 className='main' onClick={() => navigate('/cart')}>QPICK</h1>
        <FavoritesControl triggerUpdate={favoritesTrigger} />

          <button className='cart-button' onClick={() => navigate('/Cart')}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.08589 6.04602L0.48584 2.50535L2.05663 0.959991L5.65556 4.50175H22.5757C22.7487 4.50174 22.9193 4.54152 23.074 4.61792C23.2286 4.69431 23.3629 4.80521 23.4662 4.94176C23.5695 5.07831 23.639 5.23673 23.669 5.40438C23.699 5.57202 23.6888 5.74425 23.6391 5.90732L20.9749 14.6443C20.9064 14.8694 20.7659 15.0667 20.5743 15.207C20.3827 15.3473 20.1503 15.423 19.9114 15.423H6.30608V17.6072H18.5172V19.7915H5.19598C4.90157 19.7915 4.61921 19.6764 4.41103 19.4716C4.20284 19.2668 4.08589 18.989 4.08589 18.6994V6.04602ZM6.30608 6.686V13.2387H19.0855L21.0837 6.686H6.30608ZM5.75103 24.16C5.30941 24.16 4.88587 23.9874 4.5736 23.6802C4.26132 23.373 4.08589 22.9563 4.08589 22.5218C4.08589 22.0873 4.26132 21.6707 4.5736 21.3634C4.88587 21.0562 5.30941 20.8836 5.75103 20.8836C6.19266 20.8836 6.61619 21.0562 6.92847 21.3634C7.24074 21.6707 7.41618 22.0873 7.41618 22.5218C7.41618 22.9563 7.24074 23.373 6.92847 23.6802C6.61619 23.9874 6.19266 24.16 5.75103 24.16ZM19.0722 24.16C18.6306 24.16 18.207 23.9874 17.8948 23.6802C17.5825 23.373 17.4071 22.9563 17.4071 22.5218C17.4071 22.0873 17.5825 21.6707 17.8948 21.3634C18.207 21.0562 18.6306 20.8836 19.0722 20.8836C19.5138 20.8836 19.9374 21.0562 20.2496 21.3634C20.5619 21.6707 20.7373 22.0873 20.7373 22.5218C20.7373 22.9563 20.5619 23.373 20.2496 23.6802C19.9374 23.9874 19.5138 24.16 19.0722 24.16Z" fill="#838383"/>
              </svg>

          <span className="cart-count">{cartCount}</span>
        </button>
      </div>

      <h2 className="product-list">Наушники</h2>
      <div className="product-list">
        {headphones.map(product=> (
          <ProductCard key={product.id} product={product} onBuy={addToCart} onFavorite={addToFavorites} />
        ))}
      </div>

      <h3 className="product-list">Беспроводные Наушники</h3>
      <div className = "product-list">
        {wirelessheadphones.map((product)=> 
        <ProductCard key={product.id} product={product} onBuy={addToCart}  onFavorite={addToFavorites} />)}
      </div>

<Footer />

    </div>
   
  );

};


export  default Catalog;