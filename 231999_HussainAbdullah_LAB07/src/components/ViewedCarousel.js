import React, { useState, useEffect } from 'react';

const products = [
  { price: '$2,549.15', name: 'Bosch 22 Cu. Ft Stainless Refrigerator', sku: 'B22CS30SNS5' },
  { price: '$2,549.15', name: 'Bosch 22 Cu. Ft Stainless Refrigerator', sku: 'B22CS30SNS5' },
  { price: '$2,549.15', name: 'Bosch 22 Cu. Ft Stainless Refrigerator', sku: 'B22CS30SNS5' },
  { price: '$2,549.15', name: 'Bosch 22 Cu. Ft Stainless Refrigerator', sku: 'B22CS30SNS5' },
  { price: '$2,549.15', name: 'Bosch 22 Cu. Ft Stainless Refrigerator', sku: 'B22CS30SNS5' },
];

export default function ViewedCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setVisible(w < 480 ? 1 : w < 768 ? 2 : 4);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const max = Math.max(0, products.length - visible);
  const pct = (100 / visible) * current;

  return (
    <section className="viewed-section">
      <div className="container">
        <div className="sub-heading" style={{ marginBottom: 14 }}>Customers Who Viewed This Item Also</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="carousel-btn" onClick={() => setCurrent(c => Math.max(0, c - 1))} aria-label="Previous">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="carousel-wrap" style={{ flex: 1 }}>
            <div className="carousel-track" style={{ transform: `translateX(-${pct}%)` }}>
              {products.map((p, i) => (
                <div key={i} className="carousel-item" style={{ minWidth: `${100 / visible}%` }}>
                  <div className="carousel-item-inner">
                    <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&q=60" alt={p.name} />
                    <div className="carousel-price">{p.price}</div>
                    <div className="carousel-name">{p.name}</div>
                    <div className="carousel-sku">{p.sku}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-btn" onClick={() => setCurrent(c => Math.min(max, c + 1))} aria-label="Next">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
