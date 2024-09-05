import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface FavoritesModalProps {
  isOpen: boolean; // Состояние открытия модального окна
  onClose: () => void; // Функция закрытия модального окна
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Если окно не открыто, ничего не отображаем

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Избранное</h2>
        {favorites.length === 0 ? (
          <p>Нет избранных товаров</p>
        ) : (
          favorites.map((item: Product) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Цена: {item.price} ₽</p>
            </div>
          ))
        )}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default FavoritesModal;