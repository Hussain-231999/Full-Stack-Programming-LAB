import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setShowBurger(window.innerWidth < 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate('/category?q=' + encodeURIComponent(search.trim()));
    }
  };

  return (
    <>
      {/* UTIL BAR */}
      <div className="util-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Call for Customer support: <a href="tel:051602289565" style={{ color: '#cc0000', fontWeight: 600 }}>051 602289565</a></span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/my-account">My Account</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/checkout">To Checkout</Link>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo-brand">HOTSPRING<sup style={{ fontSize: '.55rem', verticalAlign: 'super' }}>®</sup></div>
            <div className="logo-sub">Portable Spas</div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="cart-widget">
              <i className="fa-solid fa-cart-shopping cart-icon"></i>
              <span>My Cart: <strong>{cartCount} Items</strong></span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '.7rem', color: '#aaa' }}></i>
            </div>
            {showBurger && (
              <button
                onClick={() => setMobileOpen(o => !o)}
                style={{ display: 'block', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#333' }}
                aria-label="Menu"
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* PRIMARY NAV */}
      <nav className="nav-primary">
        <div className="container" style={{ display: 'flex', alignItems: 'stretch' }}>
          {!showBurger && (
            <div style={{ display: 'flex' }}>
              <Link to="/category">CATEGORY</Link>
              <Link to="/category">BRAND</Link>
              <Link to="/contact">INFO</Link>
            </div>
          )}
          <div className="nav-search" style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              aria-label="Search products"
            />
            <button type="button" onClick={() => search.trim() && navigate('/category?q=' + encodeURIComponent(search.trim()))}>SEARCH</button>
          </div>
        </div>
        {showBurger && (
          <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
            <Link to="/category" onClick={() => setMobileOpen(false)}>CATEGORY</Link>
            <Link to="/category" onClick={() => setMobileOpen(false)}>BRAND</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>INFO</Link>
          </div>
        )}
      </nav>
    </>
  );
}
