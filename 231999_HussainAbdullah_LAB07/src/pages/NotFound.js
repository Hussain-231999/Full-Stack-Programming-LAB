import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: '6rem', fontWeight: 700, color: '#cc0000', lineHeight: 1 }}>404</div>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: '1.8rem', color: '#333', margin: '16px 0 8px' }}>Page Not Found</div>
      <p style={{ fontSize: '.9rem', color: '#666', marginBottom: 30 }}>
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-red">GO TO HOMEPAGE</Link>
        <Link to="/category" className="btn btn-gray">BROWSE PRODUCTS</Link>
      </div>
    </div>
  );
}