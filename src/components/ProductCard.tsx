import React, { useState} from 'react';
import "../styles/card.css"

interface Product {
  id: number;
  name: string;
  price: number;
  rate: number;
  image: string;
  sale:number;
}

interface ProductCardProps {
  product: Product;
   onBuy: (product: Product) => void;
   onFavorite: (product: Product) => void;

}


const ProductCard: React.FC<ProductCardProps> = ({ product, onFavorite,onBuy}) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleBuy = () => {
        
        onBuy(product);
  
  };

  const handleFavorite = () => {
    onFavorite(product);
  };
 
  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };
 

  return (
    <div className="product-card">
      <div className='btn-fav'>
      <button className="favorite-button" onClick={handleFavorite}>♡</button> 
      </div>
      <img src={product.image} alt={product.name}  className="product-image"/>
      
     <div className='product-info'>
     
      <p className='product-name'>{product.name}</p>
      </div>
      
  <div className='product-details'>
    
  {product.sale > 0 ? (
        <>
      <p className='product-price'>{product.price} ₽
        <h4 className='sale'>{product.sale}</h4>
      </p>
      </>
      ) : (
        <p className="product-price">{product.price} ₽</p>
      )}
      
      <div className="product-actions">
      <div className='star-rate'>
      <svg width="20" height="20" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6268 17.6614L5.41618 22.0127L7.37647 13.892L0.960754 8.462L9.38215 7.79538L12.6268 0.0867615L15.8715 7.79538L24.2941 8.462L17.8771 13.892L19.8374 22.0127L12.6268 17.6614Z" fill="#FFCE7F"/>
      </svg>
      <span className='product-rate'>{product.rate}</span>
    </div>
        <button className="buy-button" onClick={handleBuy}>Купить</button>
      </div>
      
    </div>
  </div>
  );
};

export default ProductCard;

