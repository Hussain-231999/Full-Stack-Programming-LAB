import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

const initItems = [
  { id: 1, img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&q=70', title: 'XS SCYBA X SERIES 119', desc: 'Portable Spa · 5-7 Person', price: '$500.00' },
  { id: 2, img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=120&q=70', title: 'Emerald Bay XL TV DVD Stereo Hot Tub', desc: 'Premium Spa · 6 Person · TV/DVD', price: '$1,979.00' },
];

export default function Wishlist({ onAddToCart }) {
  const [items, setItems] = useState(initItems);
  const [added, setAdded] = useState({});

  const remove = (id) => setItems(items.filter(i => i.id !== id));
  const handleAdd = (id) => {
    setAdded(a => ({ ...a, [id]: true }));
    if (onAddToCart) onAddToCart();
    setTimeout(() => setAdded(a => ({ ...a, [id]: false })), 1500);
  };

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Wishlist' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>My Wishlist</div>
          <div className="content-box">
            <div className="sub-heading">Saved Items</div>
            <table className="cart-table">
              <thead>
                <tr><th style={{ width: 60 }}></th><th>Product</th><th>Price</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><img src={item.img} alt="Product" /></td>
                    <td>
                      <div className="cart-item-title"><Link to="/product">{item.title}</Link></div>
                      <div className="cart-item-desc">{item.desc}</div>
                    </td>
                    <td style={{ fontSize: '.9rem', color: '#cc0000', fontFamily: "'Oswald',sans-serif", fontWeight: 700 }}>{item.price}</td>
                    <td>
                      <button className="btn-add-cart" style={{ width: 'auto', padding: '6px 14px', marginBottom: 4 }} onClick={() => handleAdd(item.id)} disabled={added[item.id]}>
                        <i className={`fa-solid ${added[item.id] ? 'fa-check' : 'fa-cart-shopping'}`}></i> {added[item.id] ? 'Added!' : 'ADD TO CART'}
                      </button>
                      <a href="#!" className="btn-remove-item" style={{ display: 'block', fontSize: '.72rem', color: '#cc0000', marginTop: 4 }} onClick={e => { e.preventDefault(); remove(item.id); }}>Remove</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/category" className="btn btn-gray">CONTINUE SHOPPING</Link>
              <Link to="/cart" className="btn btn-red">VIEW CART</Link>
            </div>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
