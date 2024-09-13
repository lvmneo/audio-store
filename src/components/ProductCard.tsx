/* отображения карточки продукта в списке продуктов*/

import React, { useState} from 'react';
import "../styles/card.css"
import ProductDetailsModal from './ProductDetailsModal';

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


interface ProductDetails {
  description: string;
  features: string[];
  brand: string;
  type: string;
  wt:number;
}

const productDetails: Record<number, ProductDetails> = {
  1: { description: 'Apple BYZ S852I', brand: 'BYZ', type: 'Наушники',wt:4, features: ['Микрофон', 'Проводное соединение', '3.5mm разъем'] },
  2: { description: 'Apple EarPods', brand: 'Apple', type: 'Наушники',wt:4, features: ['Плоский провод', 'Встроенный микрофон', 'Легкий вес'] },
  3: { description: 'Apple BYZ S852I', brand: 'BYZ', type: 'Наушники',wt:5,  features: ['Регулируемая посадка','Встроенный микрофон', 'Поддержка профилей работы: AVRCP,HFP (Hands-free),A2DP,Headset'] },
  4: { description: 'Apple EarPods', brand: 'Apple', type: 'Наушники',wt:4,  features: ['Микрофон', 'Проводное соединение', 'Легкий вес','автоматическая подстройка громкости'] },
  5: { description: 'Apple EarPods', brand: 'Apple', type: 'Наушники',wt:4,  features: ['Классический дизайн', 'Плоский провод','автоматическая подстройка громкости'] },
  6: { description: 'Apple EarPods', brand: 'Apple', type: 'Наушники',wt:5,  features: ['Комфортное использование', 'Высокая чистота звука','автоматическая подстройка громкости'] },
  7: { description: 'Apple AirPods', brand: 'Apple', type: 'Беспроводные наушники',wt:4,  features: ['Беспроводное соединение', 'Зарядный кейс', 'Сенсорное управление','функция «Совместный доступ к аудио»'] },
  8: { description: 'GERLAX GH-04', brand: 'GERLAX', type: 'Беспроводные наушники',wt:5,  features: ['Беспроводное соединение', 'Длительное время работы', 'Компактный размер','L-образный разъем, влагозащита'] },
  9: { description: 'BOROFONE BO4', brand: 'BOROFONE', type: 'Беспроводные наушники', wt:10, features: ['Беспроводное соединение', 'Легкий вес', 'Превосходное качество звука','Поддержка профилей работы: AVRCP,HFP (Hands-free),A2DP,Headset'] }
};


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
    <>
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
      <button className="details-button" onClick={toggleDetails}>Подробнее</button>
    </div>
 
  </div>
  <ProductDetailsModal
        isOpen={showDetails}
        onClose={toggleDetails}
        productDetails={productDetails[product.id]}
      />
 </>
);
};

export default ProductCard;

