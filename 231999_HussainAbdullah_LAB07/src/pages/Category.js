import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import ViewedCarousel from '../components/ViewedCarousel';
import BrandStrip from '../components/BrandStrip';

const filters = [
  { title: 'Seating Capacity', options: ['2 - 4 PEOPLE', '5 - 7 PEOPLE', '8 PEOPLE AND MORE'] },
  { title: 'Choose Sizes', options: ['5 - 6 FEET LONG', '6 - 7 FEET LONG', '7 - 8 FEET LONG', '8 FEET TO LARGE SIZE'] },
  { title: 'Spas By Type', options: ['PLUG AND PLAY 110 VOLT', 'TV - STEREO SPAS', 'CORNER SPAS', 'PORTABLE SPAS', 'DEEPER SPAS'] },
  { title: 'Price Ranges From', options: ['UNDER $3,000', '$3,000 TO 4,000', '$4,000 TO 5,000', '$5,000 TO 6,000', '$6,000 +'] },
];

const imgs = [
  'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=300&q=80',
  'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=300&q=80',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=300&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&q=80',
  'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=300&q=80',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=300&q=80',
];

export default function Category({ onAddToCart }) {
  const [active, setActive] = useState(null);
  const [catCols, setCatCols] = useState('200px 1fr');
  const [prodCols, setProdCols] = useState('repeat(3,1fr)');

  useEffect(() => {
    const fix = () => {
      const w = window.innerWidth;
      if (w < 700) { setCatCols('1fr'); setProdCols('repeat(2,1fr)'); }
      else if (w < 900) { setCatCols('160px 1fr'); setProdCols('repeat(2,1fr)'); }
      else { setCatCols('200px 1fr'); setProdCols('repeat(3,1fr)'); }
    };
    fix();
    window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Category' }]} />
          <div style={{ display: 'grid', gridTemplateColumns: catCols, gap: 20, marginTop: 10 }}>
            <aside className="sidebar">
              {filters.map((f, i) => (
                <div key={i} className="filter-group">
                  <div className="filter-title">{f.title}</div>
                  {f.options.map((o, j) => (
                    <a
                      key={j}
                      href="#!"
                      className={`filter-option${active === `${i}-${j}` ? ' active' : ''}`}
                      onClick={e => { e.preventDefault(); setActive(`${i}-${j}`); }}
                    >{o}</a>
                  ))}
                </div>
              ))}
            </aside>
            <main>
              <div style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <div className="sub-heading" style={{ margin: 0, border: 'none', padding: 0 }}>Top Product Listing</div>
                  <div style={{ fontSize: '.8rem', color: '#555', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>6 Item(s)</span>
                    <span>Show</span>
                    <select style={{ border: '1px solid #ccc', padding: '3px 6px', fontSize: '.8rem', borderRadius: 2 }}>
                      <option>9</option><option>18</option><option>36</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: prodCols, gap: 14 }}>
                  {imgs.map((img, i) => (
                    <ProductCard key={i} img={img} title="XS SCYBA X SERIES 119" desc="The goods of our stores are very reliable and we care about the customer" price="$500.00" onAddToCart={onAddToCart} />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ViewedCarousel />
      <BrandStrip />
    </>
  );
}
