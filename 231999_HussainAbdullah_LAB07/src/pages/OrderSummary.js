import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

const orderItems = [
  { name: 'Five person hottube spa with green light inside', qty: 1, total: '$699.00' },
  { name: 'Five person hottube spa with green light inside', qty: 1, total: '$699.00' },
];

export default function OrderSummary() {
  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'User Account', to: '/my-account' }, { label: 'Order Summary' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Order Summary</div>
          <div className="content-box">
            <div className="success-banner"><i className="fa-solid fa-circle-check" style={{ color: '#16a34a', marginRight: 6 }}></i>Thank you, your order has been received.</div>

            <div className="sub-heading">Your Order Summary</div>
            <div style={{ fontSize: '.82rem', color: '#444', lineHeight: 2, marginBottom: 16 }}>
              Order # : &nbsp; 0303<br />Date : &nbsp; December 21 2014<br />Total : &nbsp; 1 × $2500 = $2500
            </div>
            <p style={{ fontSize: '.8rem', color: '#555', marginBottom: 20 }}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won't be shipped until the funds have cleared in our account.</p>

            <div className="sub-heading">Your Order Details</div>
            <table className="account-table" style={{ marginBottom: 20 }}>
              <thead><tr><th>Product</th><th>Quantity</th><th style={{ textAlign: 'right' }}>Total</th></tr></thead>
              <tbody>
                {orderItems.map((item, i) => (
                  <tr key={i}><td><Link to="/product" style={{ color: '#2563eb' }}>{item.name}</Link></td><td>{item.qty}</td><td style={{ textAlign: 'right' }}>{item.total}</td></tr>
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
              Bank : &nbsp; Your Bank Name<br />Acc# : &nbsp; 2014 2545 4524 5654<br />BIC : &nbsp; 012476 541245641212
            </div>

            <div className="order-info-grid">
              <div className="order-info-card"><strong>Customer Details</strong>Customer Name &nbsp; Farrukh Javaid<br />Email &nbsp; email@hotubdirect.com<br />Phone &nbsp; 0888 7578 787</div>
              <div className="order-info-card"><strong>Billing Address</strong>Farrukh Javaid<br />Hottub Spas<br />Plot 10 Tech Society<br />California, CA 20112<br />United State</div>
              <div className="order-info-card"><strong>Shipping Address</strong>Farrukh Javaid<br />Hottub Spas<br />Plot 10 Tech Society<br />California, CA 20112<br />United State</div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn-gray">CONTINUE SHOPPING</Link>
              <Link to="/my-account" className="btn btn-red">MY ACCOUNT</Link>
            </div>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
