import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ViewedCarousel from '../components/ViewedCarousel';
import BrandStrip from '../components/BrandStrip';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [cols, setCols] = useState('1fr 1px 1fr');
  const navigate = useNavigate();

  useEffect(() => {
    const fix = () => setCols(window.innerWidth < 700 ? '1fr' : '1fr 1px 1fr');
    fix(); window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Please enter a valid email.';
    if (!pass.trim()) errs.pass = 'Password is required.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) navigate('/my-account');
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Account' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Login Or Create Account</div>
          <div className="content-box">
            <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 0 }}>
              <div style={{ paddingRight: cols !== '1fr' ? 28 : 0 }}>
                <div className="sub-heading">User Login Details</div>
                <p className="field-note">Please sign in below with your login information.</p>
                <p className="field-note">*Required Fields</p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <label>Email <span className="req">*</span></label>
                    <div className="field">
                      <input type="email" className={`form-control${errors.email ? ' error' : ''}`} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                      {errors.email && <div className="error-msg" style={{ display: 'block' }}>{errors.email}</div>}
                    </div>
                  </div>
                  <div className="form-row">
                    <label>Password <span className="req">*</span></label>
                    <div className="field">
                      <input type="password" className={`form-control${errors.pass ? ' error' : ''}`} value={pass} onChange={e => setPass(e.target.value)} autoComplete="current-password" />
                      {errors.pass && <div className="error-msg" style={{ display: 'block' }}>{errors.pass}</div>}
                    </div>
                  </div>
                  <div style={{ margin: '10px 0 16px 160px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: 14, height: 14, accentColor: '#cc0000' }} />
                    <label htmlFor="remember" style={{ fontSize: '.8rem', color: '#555', cursor: 'pointer' }}>Remember me next time I visit</label>
                  </div>
                  <div style={{ marginLeft: 160, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <button type="submit" className="btn btn-red">SIGN IN</button>
                    <Link to="/forgot-password" style={{ fontSize: '.82rem', color: '#2563eb' }}>Forgot your password?</Link>
                  </div>
                </form>
              </div>
              {cols !== '1fr' && <div className="divider-v"></div>}
              <div style={{ paddingLeft: cols !== '1fr' ? 28 : 0, paddingTop: cols === '1fr' ? 20 : 0 }}>
                <div className="sub-heading">New Customer</div>
                <p className="field-note">As a registered customer you can:</p>
                <ul style={{ fontSize: '.82rem', color: '#555', paddingLeft: 18, marginBottom: 20, lineHeight: 2 }}>
                  <li>Store billing &amp; shipping information</li>
                  <li>Check your order status</li>
                  <li>Track your delivery Status</li>
                  <li>View your order history</li>
                </ul>
                <Link to="/register" className="btn btn-red">CREATE NEW ACCOUNT</Link>
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
