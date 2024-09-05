import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import "../styles/modalwin.css"
import FavoritesModal from '../components/FavoritesModal'; 
import ProductCard from '../components/ProductCard';


interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
 
  }


const Catalog: React.FC = () => {
    
    const [cartCount, setCartCount] = useState(0);
    const [favoritesCount, setFavoritesCount] = useState(0);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  

  const products = [
    { id: 1, name: 'Apple BYZ S852I', price: 2927, rate:4.7, image: 'url_to_image',category:'Наушники' },
    { id: 2, name: 'Apple EarPods', price: 2327, rate:4.5,image: 'url_to_image',category:'Наушники' },
    { id: 3, name: 'Apple BYZ S852I', price: 2927, rate:4.5,image: 'url_to_image',category:'Наушники' },
    { id: 4, name: 'Apple EarPods', price: 2327, rate:4.5,image: 'url_to_image',category:'Наушники' },
    { id: 5, name: 'Apple EarPods', price: 2327, rate:4.5,image: 'url_to_image' ,category:'Наушники'},
    { id: 6, name: 'Apple EarPods', price: 2327, rate:4.5,image: 'url_to_image',category:'Наушники' },
    { id: 7, name: 'Apple AirPods', price: 9527, rate:4.7,image: 'url_to_image',category:'Беспроводные Наушники'},
    { id: 8, name: 'GERLAX GH-04', price: 6527, rate:4.7,image: 'url_to_image',category:'Беспроводные Наушники'},
    { id: 9, name: 'BOROFONE BO4', price: 7527, rate:4.7,image: 'url_to_image',category:'Беспроводные Наушники'},
 ];


 const wirelessheadphones = products.filter(product => product.category === 'Беспроводные Наушники');
  const headphones = products.filter(product => product.category === 'Наушники');

  const addToCart = (product: Product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((item: { id: number }) => item.id === product.id);

    if (existingItem) {
      const updatedItems = cartItems.map((item: { id: number; quantity: number }) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }

    updateCartCount();
  };

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const count = cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
    setCartCount(count);
  };

  const addToFavorites = (product: Product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const existingItem = favorites.find((item: { id: number }) => item.id === product.id);

    if (!existingItem) {
      const updatedFavorites = [...favorites, product];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      updateFavoritesCount();
    }
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

  useEffect(() => {
    
    updateCartCount();
    updateFavoritesCount();

  }, []);

  return (
    <div>
      <div>
        <h1>QPICK</h1>
        <button onClick={handleFavoritesClick}>💖{favoritesCount}</button> 
        <Link to="/Cart">
            <span>🛒 <span id="cart-count">{cartCount}</span></span>
          </Link>
      </div>

      <h2>Наушники</h2>
      <div className="product-list">
        {headphones.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={addToCart} onFavorite={addToFavorites} />
        ))}
      </div>

      <h2>Беспроводные Наушники</h2>
      <div className = "product-list">
        {wirelessheadphones.map((product)=> 
        <ProductCard key={product.id} product={product} onBuy={addToCart}  onFavorite={addToFavorites} />)}
      </div>

    
     
      <footer>

      <div className='Footer-content'>
      <div className="footer-links">
          <a href="/fav">Избранное</a>
          <a href="/cart">Корзина</a>
          
          <a href="/contact">Контакты</a>
          <a href="/privacy">Условия Использования</a>
        </div>
        <div className = "language">
        <a href="/kas">kas</a>
          <a href="/eng">engl</a>
          <a href="/rus">russ</a>
        </div>
        <div className="social-media">
          <a href="https://vk.com/">VK</a>
          <a href="https://t.me/telegram">Telegram</a>
          <a href="https://www.whatsapp.com/">Watsapp</a>
        </div>
      </div>
      </footer>

    
    
      <FavoritesModal isOpen={showFavoritesModal} onClose={closeFavoritesModal} />

    </div>
   
  );

};


export  default Catalog;