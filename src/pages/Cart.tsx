import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CartItem from '../components/CartItem'
import Footer from '../components/Footer';
import PaymentModal from '../components/PaymentModal';
import "../styles/cart-summary.css"
import "../styles/cart.css"
import FavoritesControl from '../components/FavoritesControl';




interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
   
  }


const Cart: React.FC = () => {


  const [cartItems, setCartItems] = useState<CartItemType[]>([]);// Список товаров в корзине
  const [cartCount, setCartCount] = useState(0);// Количество товаров в корзине
  const [totalPrice, setTotalPrice] = useState(0); // Общая стоимость товаров в корзине
  const [showPaymentModal, setShowPaymentModal] = useState(false);// Отображение модального окна для оплаты
  const navigate = useNavigate();//  для навигации между страницами

  
  useEffect(() => {
  // получение данные о товарах в корзине из localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);// товары в корзине
    updateCartSummary(); // Обновление общего количества и стоимость товаров в корзине
   
  }, []);


/* ---------------------корзина -------------------------------*/

  // Функция для уменьшения  количества, удаляет полностью если 0
  const handleRemove = (id: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const updatedQuantity = item.quantity - 1;// Уменьшаем количество на единицу
        if (updatedQuantity > 0) {// Возвращаем товар с обновленным количеством, если количество больше 0
          return { ...item, quantity: updatedQuantity };
        }
        return null;// Возвращаем null, если количество 0 или меньше
      }
      return item;
    }).filter((item) => item !== null) as CartItemType[];

    setCartItems(updatedItems);

    
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateCartSummary(); 
  };

// Функция для удаления товара из корзины сразу
    const handleDelete = (id: number) => {
      const updatedItems = cartItems.filter((item) => item.id !== id); 
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      updateCartSummary(); 
    };

// Функция для добавления одного экземпляра товара в корзину
const handleAdd = (id: number) => {
  const updatedItems = cartItems.map((item) => {
    if (item.id === id) {
     
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });

  setCartItems(updatedItems);

  
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  updateCartSummary(); 
};

  /*------------------------------------------------------*/


   // Функция для открытия модального окна для оформления заказа
  const handleCheckout = () => {
    setShowPaymentModal(true); 
  };
  // Функция для закрытия модального окна оплаты
  const closePaymentModal = () => {
    setShowPaymentModal(false); 
  };

// Функция для обновления сводки корзины (общее количество и сумма)
  const updateCartSummary = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    
    const count = cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
    setCartCount(count);

  
    const price = cartItems.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);
    setTotalPrice(price);
  };


  return (
    <div className='cart-main'>
    <div className='header-catalog-cart'>
        <h1 className='main-title' onClick={() => navigate('/')}>QPICK</h1>
       <h2 className='cart-tittle'>Корзина</h2>
       <div className='actions-header'>
       <FavoritesControl />
      <button className='cart-button' onClick={() => navigate('/')}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.08589 6.04602L0.48584 2.50535L2.05663 0.959991L5.65556 4.50175H22.5757C22.7487 4.50174 22.9193 4.54152 23.074 4.61792C23.2286 4.69431 23.3629 4.80521 23.4662 4.94176C23.5695 5.07831 23.639 5.23673 23.669 5.40438C23.699 5.57202 23.6888 5.74425 23.6391 5.90732L20.9749 14.6443C20.9064 14.8694 20.7659 15.0667 20.5743 15.207C20.3827 15.3473 20.1503 15.423 19.9114 15.423H6.30608V17.6072H18.5172V19.7915H5.19598C4.90157 19.7915 4.61921 19.6764 4.41103 19.4716C4.20284 19.2668 4.08589 18.989 4.08589 18.6994V6.04602ZM6.30608 6.686V13.2387H19.0855L21.0837 6.686H6.30608ZM5.75103 24.16C5.30941 24.16 4.88587 23.9874 4.5736 23.6802C4.26132 23.373 4.08589 22.9563 4.08589 22.5218C4.08589 22.0873 4.26132 21.6707 4.5736 21.3634C4.88587 21.0562 5.30941 20.8836 5.75103 20.8836C6.19266 20.8836 6.61619 21.0562 6.92847 21.3634C7.24074 21.6707 7.41618 22.0873 7.41618 22.5218C7.41618 22.9563 7.24074 23.373 6.92847 23.6802C6.61619 23.9874 6.19266 24.16 5.75103 24.16ZM19.0722 24.16C18.6306 24.16 18.207 23.9874 17.8948 23.6802C17.5825 23.373 17.4071 22.9563 17.4071 22.5218C17.4071 22.0873 17.5825 21.6707 17.8948 21.3634C18.207 21.0562 18.6306 20.8836 19.0722 20.8836C19.5138 20.8836 19.9374 21.0562 20.2496 21.3634C20.5619 21.6707 20.7373 22.0873 20.7373 22.5218C20.7373 22.9563 20.5619 23.373 20.2496 23.6802C19.9374 23.9874 19.5138 24.16 19.0722 24.16Z" fill="#838383"/>
        </svg>
          <span className="cart-count">{cartCount}</span>
        </button>
        </div>
        </div>
       
      <div className='cart-content-wr'>
      
        {cartItems.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} onRemove={handleRemove}  onAdd={handleAdd}  onDelete={handleDelete}/>)
        )}
      
     <div className='summary-content'>
       {/* Блок с итоговой суммой и кнопкой перехода к оформлению */}
       <div className="cart-summary">
          <div className="summary-total">
            <p>ИТОГО</p>
            <p>₽ {totalPrice}</p>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Перейти к оформлению</button>
        </div>
        </div>
    </div>

    <PaymentModal 
    isOpen={showPaymentModal} 
    onClose={closePaymentModal} 
    cartItems={cartItems} 
    totalPrice={totalPrice}  
    onAdd={handleAdd}  
    onRemove={handleRemove}  
    onDelete={handleDelete}  />
      

      <Footer />
    
   
    </div>
  );
};


export default Cart;