import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ img, title, desc, price, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    if (onAddToCart) onAddToCart();
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <img src={img} alt={title} />
      <div className="product-card-body">
        <div className="product-title">{title}</div>
        <div className="product-desc">{desc}</div>
        <div className="product-price">{price}</div>
      </div>
      <div className="product-card-footer">
        <button className="btn-add-cart" onClick={handleAdd} disabled={added}>
          <i className={`fa-solid ${added ? 'fa-check' : 'fa-cart-shopping'}`}></i>
          {added ? ' Added!' : ' ADD TO CART'}
        </button>
        <div className="product-links">
          <Link to="/wishlist">ADD TO WISH LIST</Link>
          <Link to="/product">MORE DETAILS</Link>
        </div>
      </div>
    </div>
  );
}
