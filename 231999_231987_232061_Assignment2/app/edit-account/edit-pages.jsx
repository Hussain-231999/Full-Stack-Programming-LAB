import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

function FormPage({ title, breadcrumb, fields, backTo, btnLabel, btnClass }) {
  const initState = {};
  fields.forEach(f => { initState[f.key] = f.default || ''; });
  const [form, setForm] = useState(initState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    fields.forEach(f => {
      if (f.required) {
        const val = (form[f.key] || '').trim();
        if (!val) errs[f.key] = 'This field is required.';
        else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) errs[f.key] = 'Valid email required.';
      }
    });
    setErrors(errs);
    if (Object.keys(errs).length === 0) { setSuccess(true); window.scrollTo(0, 0); }
  };

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={breadcrumb} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>{title}</div>
          <div className="content-box" style={{ maxWidth: 620 }}>
            {success && <div className="success-banner"><i className="fa-solid fa-circle-check" style={{ color: '#16a34a', marginRight: 6 }}></i>Details updated successfully!</div>}
            <form onSubmit={handleSubmit} noValidate>
              <p className="field-note">Please fill the form below to update your details.</p>
              <p className="field-note">*Required Fields</p>
              {fields.map(f => (
                <div key={f.key} className="form-row">
                  <label>{f.label} {f.required && <span className="req">*</span>}</label>
                  <div className="field">
                    <input type={f.type || 'text'} className={`form-control${errors[f.key] ? ' error' : ''}`}
                      value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
                    {errors[f.key] && <div className="error-msg" style={{ display: 'block' }}>{errors[f.key]}</div>}
                  </div>
                </div>
              ))}
              <div style={{ marginLeft: 160, marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button type="submit" className={`btn ${btnClass}`}>{btnLabel}</button>
                <Link to={backTo} className="btn btn-gray">BACK</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}

export function EditAccount() {
  return <FormPage
    title="Edit Profile Details"
    breadcrumb={[{ label: 'Home', to: '/' }, { label: 'User Account', to: '/my-account' }, { label: 'Edit Profile Details' }]}
    backTo="/my-account"
    btnLabel="UPDATE DETAILS"
    btnClass="btn-green"
    fields={[
      { key: 'first', label: 'First Name', required: true, default: 'Hussain' },
      { key: 'last', label: 'Last Name', required: true, default: 'Abdullah' },
      { key: 'email', label: 'Email', type: 'email', required: true, default: 'user11@gmail.com' },
      { key: 'currPass', label: 'Current Password', type: 'password', required: true },
      { key: 'newPass', label: 'New Password', type: 'password', required: true },
      { key: 'confPass', label: 'Confirm Password', type: 'password', required: true },
    ]}
  />;
}

export function EditBilling() {
  return <FormPage
    title="Edit Billing Address"
    breadcrumb={[{ label: 'Home', to: '/' }, { label: 'User Account', to: '/my-account' }, { label: 'Edit Billing' }]}
    backTo="/my-account"
    btnLabel="UPDATE ADDRESS"
    btnClass="btn-red"
    fields={[
      { key: 'first', label: 'First Name', required: true, default: 'Hussain' },
      { key: 'last', label: 'Last Name', required: true, default: 'Abdullah' },
      { key: 'email', label: 'Email', type: 'email', required: true, default: 'user11@gmail.com' },
      { key: 'phone', label: 'Phone', type: 'tel', required: true, default: '888-201-8899' },
      { key: 'city', label: 'City', required: true, default: 'California' },
      { key: 'state', label: 'State', required: true, default: 'CA' },
      { key: 'zip', label: 'Zip Code', required: true, default: '20112' },
      { key: 'country', label: 'Country', required: true, default: 'United State' },
    ]}
  />;
}

export function EditShipping() {
  return <FormPage
    title="Edit Shipping Address"
    breadcrumb={[{ label: 'Home', to: '/' }, { label: 'User Account', to: '/my-account' }, { label: 'Edit Shipping' }]}
    backTo="/my-account"
    btnLabel="UPDATE ADDRESS"
    btnClass="btn-red"
    fields={[
      { key: 'first', label: 'First Name', required: true, default: 'Hussain' },
      { key: 'last', label: 'Last Name', required: true, default: 'Abdullah' },
      { key: 'email', label: 'Email', type: 'email', required: true, default: 'user11@gmail.com' },
      { key: 'phone', label: 'Phone', type: 'tel', required: true, default: '888-201-8899' },
      { key: 'city', label: 'City', required: true, default: 'California' },
      { key: 'state', label: 'State', required: true, default: 'CA' },
      { key: 'zip', label: 'Zip Code', required: true, default: '20112' },
      { key: 'country', label: 'Country', required: true, default: 'United State' },
    ]}
  />;
}
