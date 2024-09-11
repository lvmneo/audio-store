import React, { useState,useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface FavoritesModalProps {
  isOpen: boolean; // Состояние открытия модального окна
  onClose: () => void; // Функция закрытия модального окна
  updateFavoritesCountModal: () => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ isOpen, onClose, updateFavoritesCountModal }) => {
  // Состояние избранных товаров
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Загружаем избранные товары из локального хранилища при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    }
  }, [isOpen]);

  // Функция для удаления товара из избранного
  const handleRemove = (id: number) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    updateFavoritesCountModal();
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
                <div className="favorite-item-info">
                  <h3 className="favorite-item-name">{item.name}</h3>
                  <p className="favorite-item-price">Цена: {item.price} ₽</p>
                </div>
                <button className="remove-button"onClick={() => handleRemove(item.id)}>Удалить</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
