import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [cols, setCols] = useState('repeat(4,1fr)');

  useEffect(() => {
    const fix = () => {
      const w = window.innerWidth;
      setCols(w < 600 ? '1fr' : w < 900 ? 'repeat(2,1fr)' : 'repeat(4,1fr)');
    };
    fix();
    window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  const handleNewsletter = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert('Please enter a valid email.');
      return;
    }
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: cols, gap: 28 }}>
          <div>
            <h4>Contact Us</h4>
            <p>hotspring.com<br />CALL 24/7: 888 · 201 · 8899<br />Our Address:<br />E9<br />Islamabad 00000<br />Pakistan<br />Email: <a href="mailto:servicemail@hotspring.com">servicemail@hotspring.com</a></p>
            <div className="footer-social">
              <a href="#!" className="social-btn" style={{ background: '#38bdf8' }} aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#!" className="social-btn" style={{ background: '#1d4ed8' }} aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#!" className="social-btn" style={{ background: '#0284c7' }} aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#!" className="social-btn" style={{ background: '#dc2626' }} aria-label="Google+"><i className="fab fa-google-plus-g"></i></a>
              <a href="#!" className="social-btn" style={{ background: '#b91c1c' }} aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#!" className="social-btn" style={{ background: '#be185d' }} aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
            </div>
          </div>
          <div>
            <h4>Information</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Customer Service</Link></li>
              <li><Link to="/terms">Privacy Policy</Link></li>
              <li><a href="#!">Site Map</a></li>
              <li><a href="#!">Search Terms</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>My Account</h4>
            <ul>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/cart">View Cart</Link></li>
              <li><Link to="/wishlist">My Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4>Signup for a Newsletter</h4>
            <p style={{ fontSize: '.75rem', marginBottom: 8 }}>Sign up for our news letter:</p>
            <div className="footer-newsletter">
              <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} aria-label="Newsletter email" />
              <button onClick={handleNewsletter}>GO</button>
            </div>
            <p style={{ fontSize: '.72rem', marginTop: 14, marginBottom: 6, color: '#9ca3af' }}>Payment Solutions</p>
            <div className="payment-badges">
              <span>VISA</span><span>MC</span><span>AMEX</span><span>DISC</span><span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2014 Hotubspaservice.com. All Rights Reserved.</div>
    </footer>
  );
}
