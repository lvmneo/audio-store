import React from 'react';
import "../styles/ProductDetailsModal.css";

interface ProductDetails {
    description: string;
    features: string[];
    brand: string;
    type: string;
    wt:number;
  }

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productDetails: ProductDetails;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ isOpen, onClose, productDetails }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal">
      <div className="modal-content">
      <div className="modal-header-details">
      <h2 className='title-details' >Общие характеристики</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body-details">
        <p><strong>{productDetails.description}</strong></p>
        <p><strong>Бренд:</strong> {productDetails.brand}</p>
        <p><strong>Тип:</strong> {productDetails.type}</p>
        <p><strong>Вес: </strong>{productDetails.wt} г</p>
        <ul>
          {productDetails.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
