import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

export default function Contact() {
  const [form, setForm] = useState({ first: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [locCols, setLocCols] = useState('1fr 1px 1fr');

  useEffect(() => {
    const fix = () => setLocCols(window.innerWidth < 600 ? '1fr' : '1fr 1px 1fr');
    fix(); window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.first.trim()) errs.first = 'First name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Valid email is required.';
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSuccess(true);
      setForm({ first: '', email: '', subject: '', message: '' });
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Customer Support', to: '/contact' }, { label: 'Contact Us' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Contact Us</div>
          <div className="content-box">
            <div className="sub-heading">Contact Our Customer Support</div>
            <p className="field-note">To create a new account, please fill in the required information below.</p>
            <div style={{ margin: '16px 0', fontSize: '.85rem', color: '#333' }}>
              <strong>Online Sales &amp; Customer Support</strong><br />
              <span style={{ color: '#555' }}>Call Us: 020 78989845</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: locCols, gap: 0, border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden', marginBottom: 24 }}>
              {[{ title: 'Retail Store Location', info: 'Hottub Store Loc.\n5000N, Ford avenue\nNewyourk, NY 20145\n888.123.1234' },
                { title: 'Services', info: 'Hottub Store Loc.\n5000N, Ford avenue\nNewyourk, NY 20145\n888.123.1234' }].map((loc, i) => (
                <React.Fragment key={i}>
                  {i > 0 && locCols !== '1fr' && <div style={{ background: '#e0e0e0' }}></div>}
                  <div style={{ padding: 16 }}>
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: '.9rem', color: '#333', marginBottom: 8 }}>{loc.title}</div>
                    <div style={{ fontSize: '.8rem', color: '#555', lineHeight: 1.8 }}>
                      {loc.info.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="sub-heading">Contact Us</div>
            {success && <div className="success-banner"><i className="fa-solid fa-circle-check" style={{ color: '#16a34a', marginRight: 6 }}></i>Your message has been sent! We'll get back to you within 24 hours.</div>}
            <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 500 }}>
              {[['First name','first','text'],['Email','email','email'],['Subject','subject','text']].map(([label, key, type]) => (
                <div key={key} className="form-row">
                  <label>{label} <span className="req">*</span></label>
                  <div className="field">
                    <input type={type} className={`form-control${errors[key] ? ' error' : ''}`}
                      value={form[key]} onChange={e => { set(key, e.target.value); setErrors(er => ({ ...er, [key]: '' })); }} />
                    {errors[key] && <div className="error-msg" style={{ display: 'block' }}>{errors[key]}</div>}
                  </div>
                </div>
              ))}
              <div className="form-row" style={{ alignItems: 'flex-start' }}>
                <label style={{ paddingTop: 6 }}>Your Message</label>
                <div className="field">
                  <textarea className="form-control" rows={6} placeholder="Type your message here..." value={form.message} onChange={e => set('message', e.target.value)}></textarea>
                </div>
              </div>
              <div style={{ marginLeft: 160, marginTop: 14 }}>
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
