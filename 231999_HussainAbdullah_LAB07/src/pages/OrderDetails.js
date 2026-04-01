import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

export default function OrderDetails() {
  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'User Account', to: '/my-account' }, { label: 'Order Details' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Order Details</div>
          <div className="content-box">
            <div className="info-banner">
              Order <a href="#!" style={{ color: '#0c5460', fontWeight: 600 }}>#304</a> was placed on <a href="#!" style={{ color: '#0c5460', fontWeight: 600 }}>December 21th, 2014</a> and is currently on <a href="#!" style={{ color: '#0c5460', fontWeight: 600 }}>hold</a>.
            </div>

            <div className="sub-heading">Your Order Details</div>
            <table className="account-table" style={{ marginBottom: 20 }}>
              <thead><tr><th>Product</th><th>Quantity</th><th style={{ textAlign: 'right' }}>Total</th></tr></thead>
              <tbody>
                {['Five person hottube spa with green light inside','Five person hottube spa with green light inside'].map((name, i) => (
                  <tr key={i}><td><Link to="/product" style={{ color: '#2563eb' }}>{name}</Link></td><td>1</td><td style={{ textAlign: 'right' }}>$699.00</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'right', fontSize: '.82rem', color: '#444', lineHeight: 2.2, borderTop: '1px solid #eee', paddingTop: 10, marginBottom: 20 }}>
              Cart Subtotal: <strong style={{ display: 'inline-block', minWidth: 100, textAlign: 'right' }}>$1400.00</strong><br />
              Shipping: <strong style={{ display: 'inline-block', minWidth: 100, textAlign: 'right' }}>Free Shipment</strong><br />
              Payment method: <strong style={{ display: 'inline-block', minWidth: 100, textAlign: 'right' }}>Direct Bank Transfer</strong><br />
              <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: '1rem' }}>Total with shipping: <strong style={{ display: 'inline-block', minWidth: 100, textAlign: 'right' }}>$1400.00</strong></span>
            </div>

            <div className="sub-heading">Your Bank Details</div>
            <div style={{ fontSize: '.82rem', color: '#444', lineHeight: 2, marginBottom: 20 }}>
              Bank : &nbsp; Your Bank Name<br />Acc# : &nbsp; December 21 2014<br />BIC : &nbsp; $2500
            </div>

            <div className="order-info-grid">
              <div className="order-info-card"><strong>Customer Details</strong>Customer Name &nbsp; Farrukh Javaid<br />Email &nbsp; email@hotubdirect.com<br />Phone &nbsp; 0888 7578 787</div>
              <div className="order-info-card"><strong>Billing Address</strong>Farrukh Javaid<br />Hottub Spas<br />Plot 10 Tech Society<br />California, CA 20112<br />United State</div>
              <div className="order-info-card"><strong>Shipping Address</strong>Farrukh Javaid<br />Hottub Spas<br />Plot 10 Tech Society<br />California, CA 20112<br />United State</div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Link to="/my-account" className="btn btn-gray">← BACK TO ACCOUNT</Link>
            </div>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
