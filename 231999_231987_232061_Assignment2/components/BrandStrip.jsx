import React from 'react';

export default function BrandStrip() {
  return (
    <div className="brand-strip">
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
          <div className="brand-badge">
            <div className="save">SAVE $1,000'S</div>
            <div className="sub">ON THE TOP SPA BRANDS</div>
            <div className="discount">HUGE DISCOUNTS</div>
            <div className="sub">SHOP EARLY FOR THE BEST SELECTION</div>
          </div>
          <div className="brand-oceanic">OCEANIC<span style={{ fontWeight: 300 }}>Spa</span></div>
          <div className="brand-caldera">Caldera<span>Spas</span></div>
          <div className="brand-island">Island<span style={{ fontWeight: 300, color: '#555' }}>Spas</span><span className="sub">by ARTESIAN</span></div>
        </div>
      </div>
    </div>
  );
}
