import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import BrandStrip from '../components/BrandStrip';

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80',
    title: 'Barrier Reef 158 Jet\nTV-Stereo · Home Theater\nSupper Spa',
    sub: 'Extra Large and Deep · 8 Person\n158 Jet Supper Spa, TV-Home Theater Spa System',
    price: '$4899.00',
  },
  {
    bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    title: 'Luxury 6-Person\nTV Theater Spa\nPremium Edition',
    sub: 'State of the art entertainment · Lounge seating\n5.5 kW Heater · ETL Certified',
    price: '$3599.00',
  },
];

const productImages = [
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&q=80',
  'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=300&q=80',
  'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=300&q=80',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=300&q=80',
];

export default function Home({ onAddToCart }) {
  const [slide, setSlide] = useState(0);
  const [cols, setCols] = useState('repeat(4,1fr)');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fix = () => {
      const w = window.innerWidth;
      setCols(w < 480 ? '1fr' : w < 768 ? 'repeat(2,1fr)' : 'repeat(4,1fr)');
    };
    fix();
    window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  const products = Array(8).fill(null).map((_, i) => ({
    img: productImages[i % 4],
    title: i === 3 ? 'XS SCYBA X SET+ES 119' : 'XS SCYBA X SERIES 119',
    desc: 'The goods of our stores are very reliable and we care about the customer',
    price: '$500.00',
  }));

  return (
    <>
      {/* Secondary Nav */}
      <nav className="nav-secondary">
        <div className="container">
          <Link to="/" className="active">HOME</Link>
          <Link to="/category">PRODUCTS</Link>
          <a href="#offers">SPECIAL OFFERS</a>
          <Link to="/contact">CUSTC.</Link>
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="hero-slider" aria-label="Featured Products" style={{ background: '#1a2535' }}>
        {slides.map((s, i) => (
          <div
            key={i}
            className={`hero-slide${i === slide ? ' active' : ''}`}
            style={{ minHeight: 320, alignItems: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div className="hero-slide-bg" style={{ backgroundImage: `url('${s.bg}')`, position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.55)' }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
              <div className="hero-slide-content" style={{ padding: '40px 24px', maxWidth: 420 }}>
                <div className="hero-title" style={{ fontFamily: "'Oswald',sans-serif", fontSize: '1.8rem', fontWeight: 700, color: '#cc0000', lineHeight: 1.2, marginBottom: 8 }}>
                  {s.title.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}
                </div>
                <div className="hero-sub" style={{ fontSize: '.82rem', color: '#ddd', marginBottom: 14, lineHeight: 1.6 }}>
                  {s.sub.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}
                </div>
                <div className="hero-price" style={{ fontFamily: "'Oswald',sans-serif", fontSize: '2rem', color: '#fff', fontWeight: 700, marginBottom: 14 }}>{s.price}</div>
                <Link to="/product" className="btn btn-red">More Details</Link>
              </div>
            </div>
          </div>
        ))}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <div key={i} className={`hero-dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)}></div>
          ))}
        </div>
      </section>

      {/* Promo Banners */}
      <section className="promo-grid">
        <div className="promo-card">
          <img src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=500&q=80" alt="5-7 Person Spa" />
          <div className="promo-card-overlay"><div className="promo-title">5-7 PERSON SPA</div></div>
        </div>
        <div className="promo-card">
          <img src="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=500&q=80" alt="TV Theater Spa" />
          <div className="promo-card-overlay"><div className="promo-title">TV THEATER SPA</div></div>
        </div>
        <div className="promo-save">
          <div className="pct">SAVE<br />50%</div>
        </div>
      </section>

      {/* New Products */}
      <section style={{ background: '#f5f5f5', padding: '30px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ borderBottom: '2px solid #ddd', paddingBottom: 8, marginBottom: 20 }}>NEW PRODUCTS</div>
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14 }}>
            {products.map((p, i) => (
              <ProductCard key={i} {...p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      <BrandStrip />
    </>
  );
}
