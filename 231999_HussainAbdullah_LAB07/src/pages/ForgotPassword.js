import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSuccess(true);
    setEmail('');
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Account', to: '/my-account' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Forget Your Password</div>
          <div className="content-box" style={{ maxWidth: 560 }}>
            <div className="sub-heading">User Account Details</div>
            <p className="field-note">Please enter your email address below to retrieve your password.</p>
            <p className="field-note">*Required Fields</p>
            {success && (
              <div className="success-banner"><i className="fa-solid fa-circle-check" style={{ color: '#16a34a', marginRight: 6 }}></i>A password reset link has been sent to your email.</div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label>Email <span className="req">*</span></label>
                <div className="field">
                  <input type="email" className={`form-control${error ? ' error' : ''}`} value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }} autoComplete="email" />
                  {error && <div className="error-msg" style={{ display: 'block' }}>{error}</div>}
                </div>
              </div>
              <div style={{ margin: '10px 0 18px 160px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="rememberForgot" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: 14, height: 14, accentColor: '#cc0000' }} />
                <label htmlFor="rememberForgot" style={{ fontSize: '.8rem', color: '#555', cursor: 'pointer' }}>Remember me next time I visit</label>
              </div>
              <div style={{ marginLeft: 160 }}>
                <button type="submit" className="btn btn-red">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
