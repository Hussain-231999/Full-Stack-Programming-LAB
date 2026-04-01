import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

const emptyBill = { first: '', last: '', email: '', phone: '', addr: '', city: '', state: '', zip: '', country: 'United States' };
const emptyCard = { type: '', num: '', expMonth: '01', expMonth2: 'December', expYear: '2025', cvv: '' };

function Field({ label, req, children, error }) {
  return (
    <div className="form-row">
      <label>{label} {req && <span className="req">*</span>}</label>
      <div className="field">{children}{error && <div className="error-msg" style={{ display: 'block' }}>{error}</div>}</div>
    </div>
  );
}

export default function Checkout() {
  const [bill, setBill] = useState(emptyBill);
  const [card, setCard] = useState(emptyCard);
  const [shipDiff, setShipDiff] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [cols, setCols] = useState('1fr 1fr');
  const navigate = useNavigate();

  React.useEffect(() => {
    const fix = () => setCols(window.innerWidth < 700 ? '1fr' : '1fr 1fr');
    fix(); window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  const validate = () => {
    const e = {};
    if (!bill.first.trim()) e.first = 'Required.';
    if (!bill.last.trim()) e.last = 'Required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bill.email)) e.email = 'Valid email required.';
    if (!/^[\d\s\-\+\(\)]{7,20}$/.test(bill.phone)) e.phone = 'Valid phone required.';
    if (!bill.addr.trim()) e.addr = 'Required.';
    if (!bill.city.trim()) e.city = 'Required.';
    if (!bill.state.trim()) e.state = 'Required.';
    if (!/^\d{5}(-\d{4})?$/.test(bill.zip)) e.zip = 'Valid zip required.';
    if (!/^\d{16}$/.test(card.num.replace(/\s/g, ''))) e.cardNum = 'Valid 16-digit card number required.';
    if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = '3-4 digit security code required.';
    if (!acceptTerms) e.terms = 'You must accept the terms and conditions.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) navigate('/order-summary');
  };

  const formatCard = (v) => v.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Payments' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Secure Checkouts</div>
          <div className="content-box">
            <div className="sub-heading">Payment Information</div>
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 30 }}>
                {/* Billing */}
                <div>
                  <div className="checkout-step">Step 1. <span>Billing Address</span></div>
                  {[['First Name','first'],['Last Name','last'],['Email','email'],['Phone','phone'],['Address','addr'],['City','city'],['State','state'],['Zip Code','zip']].map(([label, key]) => (
                    <Field key={key} label={label} req error={errors[key]}>
                      <input type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                        className={`form-control${errors[key] ? ' error' : ''}`}
                        value={bill[key]} onChange={e => setBill({ ...bill, [key]: e.target.value })} />
                    </Field>
                  ))}
                  <Field label="Country" req>
                    <select className="form-control" value={bill.country} onChange={e => setBill({ ...bill, country: e.target.value })}>
                      {['United States','United Kingdom','Canada','Australia'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <div style={{ margin: '10px 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="checkbox" id="shipDiff" checked={shipDiff} onChange={e => setShipDiff(e.target.checked)} style={{ width: 14, height: 14, accentColor: '#cc0000' }} />
                    <label htmlFor="shipDiff" style={{ fontSize: '.8rem', color: '#2563eb', cursor: 'pointer' }}>Ship to a different address</label>
                  </div>
                  {shipDiff && (
                    <div style={{ borderTop: '1px solid #eee', paddingTop: 14 }}>
                      <div className="checkout-step" style={{ fontSize: '.9rem' }}>Shipping Address</div>
                      {['First Name','Last Name','Email','Phone','Address','City','State','Zip Code'].map(l => (
                        <Field key={l} label={l} req><input type="text" className="form-control" /></Field>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card & Review */}
                <div>
                  <div className="checkout-step">Step 2. <span>Card Details</span></div>
                  <Field label="Card Type">
                    <input type="text" className="form-control" placeholder="Master Card" value={card.type} onChange={e => setCard({ ...card, type: e.target.value })} />
                  </Field>
                  <Field label="Card Number" req error={errors.cardNum}>
                    <input type="text" className={`form-control${errors.cardNum ? ' error' : ''}`} placeholder="1234 5678 9123 4567" maxLength={19}
                      value={card.num} onChange={e => setCard({ ...card, num: formatCard(e.target.value) })} />
                  </Field>
                  <Field label="Expiration" req>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <select className="form-control" style={{ flex: 1 }}>
                        {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => <option key={m}>{m}</option>)}
                      </select>
                      <select className="form-control" style={{ flex: 2 }}>
                        {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m}>{m}</option>)}
                      </select>
                      <select className="form-control" style={{ flex: 1 }}>
                        {['2025','2026','2027','2028','2029','2030'].map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </Field>
                  <Field label="Secure Code" req error={errors.cvv}>
                    <input type="text" className={`form-control${errors.cvv ? ' error' : ''}`} maxLength={4} placeholder="CVV"
                      value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                  </Field>
                  <p style={{ fontSize: '.72rem', color: '#666', margin: '8px 0 4px' }}>Note: Please ensure the billing address matches your credit card billing address.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                    <input type="checkbox" id="terms" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} style={{ width: 14, height: 14, accentColor: '#cc0000' }} />
                    <label htmlFor="terms" style={{ fontSize: '.8rem', cursor: 'pointer' }}><Link to="/terms" style={{ color: '#2563eb' }}>I Accept terms and Conditions</Link></label>
                  </div>
                  {errors.terms && <div className="error-msg" style={{ display: 'block', marginBottom: 8 }}>{errors.terms}</div>}

                  <div className="checkout-step">Step 3. <span>Review Your Order</span></div>
                  <div className="order-review">
                    <table>
                      <thead><tr><th>Item name</th><th>Price</th><th>Quantity</th><th>Total</th></tr></thead>
                      <tbody><tr><td>XS SCYVA X SERIES 119</td><td>$699</td><td>1000</td><td>$12000</td></tr></tbody>
                    </table>
                    <div style={{ textAlign: 'right', padding: '10px 0', fontSize: '.82rem', borderTop: '1px solid #eee', marginTop: 6 }}>
                      Total with shipping: <strong>$699.00</strong>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-green btn-lg" style={{ width: '100%', marginTop: 8 }}>
                    <i className="fa-solid fa-lock" style={{ marginRight: 6 }}></i>Place Your Order <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd', marginTop: 24, paddingTop: 16, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ fontSize: '.85rem', color: '#555' }}>Cart summary (2 items)<br /><strong>Total: $21.00</strong></div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link to="/cart" className="btn btn-gray">Continue shopping</Link>
                  <button type="submit" className="btn btn-red">Proceed to checkout</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
