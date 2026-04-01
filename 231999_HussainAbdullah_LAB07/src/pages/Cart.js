import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ViewedCarousel from '../components/ViewedCarousel';
import BrandStrip from '../components/BrandStrip';

const initialItems = [
  { id: 1, img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=120&q=70', title: 'The Cabaret 3 Person 41 Jet Hot Tub-110 Volt Plug in or 220 Volt Version', desc: '220 V/50 AMP – 4.5KW Heater 110 V/15 AMP – 1KW Heater/convertible To 220 V / 4kW Heater', shipping: 'Standard (7 - 10 business days)', qty: 10, price: 9.00 },
  { id: 2, img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&q=70', title: 'The Cabaret 3 Person 41 Jet Hot Tub-110 Volt Plug in or 220 Volt Version', desc: '220 V/50 AMP – 4.5KW Heater 110 V/15 AMP – 1KW Heater/convertible To 220 V / 4kW Heater', shipping: 'Standard (7 - 10 business days)', qty: 10, price: 9.00 },
];

export default function Cart() {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, qty) => setItems(items.map(i => i.id === id ? { ...i, qty: parseInt(qty) } : i));
  const removeItem = (id) => { if (window.confirm('Remove this item from cart?')) setItems(items.filter(i => i.id !== id)); };
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shopping Cart' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Shopping Cart</div>
          <div className="content-box">
            <div className="sub-heading">Your Shopping Cart</div>
            <div className="cart-alert"><i className="fa-solid fa-circle-check"></i> The Cabaret 3 Person 41 Jet Hot Tub-110 Volt Plug in <strong style={{ margin: '0 4px' }}>was just added to cart.</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', color: '#555', marginBottom: 8 }}>
              <span>Items added: <Link to="/my-account" style={{ color: '#2563eb' }}>user_name</Link></span>
              <span>Items total</span>
            </div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}></th>
                  <th>Product</th>
                  <th>Shipping</th>
                  <th>Quantity</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><img src={item.img} alt="Product" /></td>
                    <td>
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-desc">{item.desc}</div>
                      <div className="cart-links">
                        <a href="#!" className="btn-remove-item" onClick={e => { e.preventDefault(); removeItem(item.id); }}>Remove</a>
                        <Link to="/product">Edit Your Order</Link>
                      </div>
                    </td>
                    <td style={{ fontSize: '.78rem', color: '#555' }}>{item.shipping}</td>
                    <td>
                      <select className="qty-select" value={item.qty} onChange={e => updateQty(item.id, e.target.value)} aria-label="Quantity">
                        {[1, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </td>
                    <td style={{ textAlign: 'right', fontSize: '.85rem', fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <div className="cart-total">Cart summary ({items.length} items)<br />Total: <span>${total.toFixed(2)}</span></div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <Link to="/category" className="btn btn-gray">CONTINUE SHOPPING</Link>
                <Link to="/checkout" className="btn btn-red">PROCEED TO CHECKOUT</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewedCarousel />
      <BrandStrip />
    </>
  );
}
