import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

const orders = [
  { id: '#303', date: 'December 18, 2014', status: 'On hold', total: '$699.00' },
  { id: '#307', date: 'December 18, 2014', status: 'On hold', total: '$799.00' },
];

export default function MyAccount() {
  const [addrCols, setAddrCols] = useState('1fr 1fr');

  useEffect(() => {
    const fix = () => setAddrCols(window.innerWidth < 600 ? '1fr' : '1fr 1fr');
    fix(); window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'User Account', to: '/my-account' }, { label: 'My Account' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>User Profile Details</div>
          <div className="content-box">
            <div className="sub-heading">User profile</div>
            <p style={{ fontSize: '.82rem', color: '#555', marginBottom: 4 }}>Hello User name! From your account you can view your recent orders, manage your shipping and billing addresses.</p>
            <p style={{ marginBottom: 20 }}><Link to="/edit-account" style={{ fontSize: '.82rem', color: '#2563eb' }}>edit your password and account details.</Link></p>

            <div className="sub-heading" style={{ marginTop: 20 }}>Recent Orders</div>
            <table className="account-table" style={{ marginBottom: 24 }}>
              <thead><tr><th>Order</th><th>Date</th><th>Status</th><th>Total</th><th>Options</th></tr></thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i}>
                    <td><Link to="/order-details">{o.id}</Link></td>
                    <td>{o.date}</td>
                    <td>{o.status}</td>
                    <td>{o.total}</td>
                    <td><Link to="/order-details" className="btn btn-red btn-sm">VIEW ORDERS</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="sub-heading" style={{ marginTop: 20 }}>My Addresses</div>
            <p style={{ fontSize: '.8rem', color: '#555', marginBottom: 16 }}>The following addresses will be used on the checkout page by default.</p>
            <div style={{ display: 'grid', gridTemplateColumns: addrCols, gap: 20 }}>
              {[{ label: 'Billing address', link: '/edit-billing' }, { label: 'Shipping address', link: '/edit-shipping' }].map((a, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: '.82rem', marginBottom: 10, color: '#333' }}>{a.label}</div>
                  <div className="address-card">
                    Hussain Abdullah<br />Hottub Spas<br />Plot 10 Tech Society<br />California, CA 20112<br />United State
                  </div>
                  <div style={{ marginTop: 10 }}><Link to={a.link} className="btn btn-red btn-sm">EDIT ADDRESSES</Link></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
