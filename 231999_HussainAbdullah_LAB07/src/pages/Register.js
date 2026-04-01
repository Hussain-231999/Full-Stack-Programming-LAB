import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

export default function Register() {
  const [form, setForm] = useState({ email: '', pass: '', pass2: '', first: '', last: '', newsletter: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.';
    if (form.pass.length < 6 || form.pass.length > 20) errs.pass = 'Password must be 6–20 characters.';
    if (form.pass !== form.pass2 || !form.pass2) errs.pass2 = 'Passwords do not match.';
    if (!form.first.trim()) errs.first = 'First name is required.';
    if (!form.last.trim()) errs.last = 'Last name is required.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSuccess(true);
  };

  const fields = [
    ['Email Address', 'email', 'email'], ['Password', 'pass', 'password'], ['Re-enter Password', 'pass2', 'password'],
    ['First Name', 'first', 'text'], ['Last Name', 'last', 'text'],
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Register' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Create New Account</div>
          <div className="content-box" style={{ maxWidth: 600 }}>
            <div className="sub-heading">User Account Details</div>
            <p className="field-note">To create a new account, please fill in the required information below. Passwords are case sensitive and must be 6 to 20 characters long.</p>
            <p className="field-note">*Required Fields</p>
            <form onSubmit={handleSubmit} noValidate>
              {fields.map(([label, key, type]) => (
                <div key={key} className="form-row">
                  <label>{label} <span className="req">*</span></label>
                  <div className="field">
                    <input type={type} className={`form-control${errors[key] ? ' error' : ''}`}
                      value={form[key]} onChange={e => set(key, e.target.value)} autoComplete={key === 'pass2' ? 'new-password' : undefined} />
                    {errors[key] && <div className="error-msg" style={{ display: 'block' }}>{errors[key]}</div>}
                  </div>
                </div>
              ))}
              <div style={{ margin: '12px 0 18px 160px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <input type="checkbox" id="newsletter" checked={form.newsletter} onChange={e => set('newsletter', e.target.checked)} style={{ width: 15, height: 15, accentColor: '#cc0000' }} />
                <label htmlFor="newsletter" style={{ fontSize: '.8rem', color: '#555', cursor: 'pointer' }}>Yes, I want to receive email about new products and specials!</label>
              </div>
              <div style={{ marginLeft: 160, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-red">CREATE ACCOUNT</button>
                <Link to="/forgot-password" style={{ fontSize: '.82rem', color: '#2563eb' }}>Forgot your password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BrandStrip />

      {/* Success Modal */}
      {success && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setSuccess(false); }}>
          <div style={{ background: '#fff', borderRadius: 4, padding: 36, maxWidth: 340, width: '90%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,.2)' }}>
            <div style={{ color: '#16a34a', fontSize: '3rem', marginBottom: 12 }}><i className="fa-solid fa-circle-check"></i></div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: '1.5rem', marginBottom: 8 }}>Account Created!</h2>
            <p style={{ fontSize: '.85rem', color: '#555', marginBottom: 20 }}>Welcome! Your account has been created. You can now sign in.</p>
            <Link to="/login" className="btn btn-red">SIGN IN NOW</Link>
          </div>
        </div>
      )}
    </>
  );
}
