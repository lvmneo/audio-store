//модальноо окно избранных товаров

import React, { useState,useEffect } from 'react';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}


interface FavoritesModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onUpdateFavorites: () => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ isOpen, onClose, onUpdateFavorites }) => {

  const [favorites, setFavorites] = useState<Product[]>([]);

  
  useEffect(() => {
    if (isOpen) {// Если модальное окно открыто, загружаем избранные товары из localStorage
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    }
  }, [isOpen]); // Эффект срабатывает при изменении значения isOpen

  //функция удаления товара из списка избранных
  const handleRemove = (id: number) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    onUpdateFavorites();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Избранное</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {favorites.length === 0 ? (
            <p>Нет избранных товаров</p>
          ) : (
            favorites.map((item: Product) => (
              <div className="favorite-item" key={item.id}>
                <img src={item.image}  alt={item.name}  className="favorite-item-img"/>
                <div className="favorite-item-info">
                  <h3 className="favorite-item-name">{item.name}</h3>
                  <p className="favorite-item-price">Цена: {item.price} ₽</p> 
                </div>
                <button className="remove-button"onClick={() => handleRemove(item.id)}>
                <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8848 3.4H20.8667V5.1H18.874V16.15C18.874 16.3754 18.769 16.5916 18.5821 16.751C18.3953 16.9104 18.1418 17 17.8776 17H3.92813C3.66387 17 3.41044 16.9104 3.22358 16.751C3.03672 16.5916 2.93174 16.3754 2.93174 16.15V5.1H0.938965V3.4H5.92091V0.85C5.92091 0.624566 6.02589 0.408365 6.21275 0.248959C6.3996 0.0895533 6.65304 0 6.9173 0H14.8884C15.1527 0 15.4061 0.0895533 15.593 0.248959C15.7798 0.408365 15.8848 0.624566 15.8848 0.85V3.4ZM16.8812 5.1H4.92452V15.3H16.8812V5.1ZM12.3117 10.2L14.0734 11.7028L12.6645 12.9047L10.9029 11.4019L9.14124 12.9047L7.73234 11.7028L9.49396 10.2L7.73234 8.6972L9.14124 7.4953L10.9029 8.9981L12.6645 7.4953L14.0734 8.6972L12.3117 10.2ZM7.91369 1.7V3.4H13.892V1.7H7.91369Z" fill="#DF6464"/>
                    </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
