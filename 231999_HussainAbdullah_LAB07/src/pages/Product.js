import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ViewedCarousel from '../components/ViewedCarousel';
import BrandStrip from '../components/BrandStrip';

const thumbs = [
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&q=70',
  'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=120&q=70',
  'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=120&q=70',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=120&q=70',
];

const tabs = ['details', 'specs', 'accessories', 'reviews', 'qa'];

const calcOptions = [
  { label: 'Interior Color:', opts: [{ l: 'Standard', v: 0 }, { l: 'Premium (+$50)', v: 50 }] },
  { label: 'Outside Shell Color:', opts: [{ l: 'Standard', v: 0 }, { l: 'Custom (+$75)', v: 75 }] },
  { label: 'Circulation Pump:', opts: [{ l: 'None', v: 0 }, { l: 'Add (+$120)', v: 120 }] },
  { label: 'Polar Foam:', opts: [{ l: 'Standard', v: 0 }, { l: 'Premium (+$80)', v: 80 }] },
  { label: 'Cover / Steps:', opts: [{ l: 'None', v: 0 }, { l: 'Add Cover (+$200)', v: 200 }] },
  { label: 'TV/DVD/Entertainment:', opts: [{ l: 'None', v: 0 }, { l: 'Add (+$350)', v: 350 }] },
  { label: 'Jets:', opts: [{ l: 'Standard', v: 0 }, { l: 'Premium (+$150)', v: 150 }] },
];

export default function Product({ onAddToCart }) {
  const [mainImg, setMainImg] = useState(thumbs[0].replace('w=120', 'w=400'));
  const [activeTab, setActiveTab] = useState('details');
  const [extras, setExtras] = useState(Array(calcOptions.length).fill(0));
  const [qty, setQty] = useState(1);
  const basePrice = 1979;
  const total = (basePrice + extras.reduce((a, b) => a + b, 0)) * qty;

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Category', to: '/category' }, { label: 'Product Detail' }]} />
          <div style={{ background: 'rgba(245,245,245,.97)', border: '1px solid #ddd', borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,.12)', padding: 20 }}>
            <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#111', marginBottom: 4 }}>Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</h1>
            <p style={{ fontSize: '.72rem', color: '#888', marginBottom: 16 }}>Abt Model:B22CS3OSNS5 | UPC Code : B22225867725</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {/* Image */}
              <div>
                <div className="product-detail-img">
                  <img src={mainImg} alt="Main product" style={{ width: '100%', height: 260, objectFit: 'contain' }} />
                </div>
                <div className="thumb-gallery">
                  {thumbs.map((t, i) => (
                    <img key={i} src={t} alt={`Thumb ${i + 1}`}
                      className={mainImg.includes(t.split('?')[0].split('photo/')[1]?.slice(0,8) || `thumb${i}`) ? 'active' : ''}
                      onClick={() => setMainImg(t.replace('w=120', 'w=400'))} />
                  ))}
                </div>
                <a href="#!" style={{ fontSize: '.78rem', color: '#2563eb', marginTop: 6, display: 'inline-block' }}>+ Larger View</a>
              </div>

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i></div>
                  <a href="#tab-reviews" style={{ fontSize: '.75rem', color: '#2563eb' }}>(4 reviews)</a>
                </div>
                <div style={{ fontSize: '.8rem', color: '#555', textDecoration: 'line-through', marginBottom: 2 }}>Retail Price: $2199.00</div>
                <div style={{ fontSize: '.75rem', color: '#cc0000', fontWeight: 600, marginBottom: 4 }}>Sale price</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: '2rem', color: '#cc0000', fontWeight: 700, marginBottom: 4 }}>$1979.00</div>
                <div style={{ fontSize: '.72rem', color: '#2563eb', marginBottom: 14 }}>Low Price Guarantee</div>
                <div style={{ fontSize: '.8rem', color: '#333', lineHeight: 1.8, marginBottom: 14 }}>
                  <strong>Size/Seating Capacity</strong><br />77", 77", 32" / 6 Persons<br />
                  <strong>Seating Design</strong><br />Bucket, Lounge, Chair, Bench<br />
                  <strong>Water Capacity / Dry Weight</strong><br />305 Gallons / 573 lbs<br />
                  <strong>Number of Pumps</strong><br />2 X 5HP<br />
                  <strong>Electrical</strong><br />5.5 KW Heavy Heater, 220V, 50 amp /ETL Certificate
                </div>
                <div style={{ fontSize: '.8rem', color: '#16a34a', fontWeight: 600, marginBottom: 14 }}><i className="fa-solid fa-circle-check"></i> In Stock (available)</div>
                <Link to="/cart" className="btn btn-red btn-lg" onClick={onAddToCart}>
                  <i className="fa-solid fa-cart-shopping"></i> ADD TO CART
                </Link>
              </div>

              {/* Price Calculator */}
              <div>
                <div className="price-calculator">
                  <h4>Price Calculator</h4>
                  {calcOptions.map((opt, i) => (
                    <div key={i} className="calc-row">
                      {opt.label}<br />
                      <select className="calc-select" onChange={e => {
                        const newExtras = [...extras];
                        newExtras[i] = parseFloat(e.target.value);
                        setExtras(newExtras);
                      }}>
                        {opt.opts.map((o, j) => <option key={j} value={o.v}>{o.l}</option>)}
                      </select>
                    </div>
                  ))}
                  <div className="calc-row">Quantity:<br />
                    <input type="number" value={qty} min="1" max="99" onChange={e => setQty(parseInt(e.target.value) || 1)}
                      style={{ width: 60, border: '1px solid #ccc', borderRadius: 2, padding: '4px 6px', fontSize: '.8rem' }} />
                  </div>
                  <div className="total-price">Total Price: ${total.toFixed(2)}</div>
                  <Link to="/cart" className="btn btn-red" style={{ width: '100%', display: 'block', textAlign: 'center' }} onClick={onAddToCart}>
                    <i className="fa-solid fa-cart-shopping"></i> ADD TO CART
                  </Link>
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: '.85rem', color: '#333', marginBottom: 8, borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Download Resources</div>
                  <div className="download-list">
                    <a href="#!"><i className="fa-solid fa-file-pdf" style={{ color: '#cc0000', marginRight: 4 }}></i> Full Line Brochure</a>
                    <a href="#!"><i className="fa-solid fa-file-pdf" style={{ color: '#cc0000', marginRight: 4 }}></i> Owner's Manual</a>
                    <a href="#!"><i className="fa-solid fa-file-pdf" style={{ color: '#cc0000', marginRight: 4 }}></i> Specifications Sheet</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ marginTop: 24 }}>
              <div className="product-tabs">
                {tabs.map(t => (
                  <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                    {t === 'qa' ? 'Q & A' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              {activeTab === 'details' && (
                <div className="tab-content active" style={{ fontSize: '.82rem', color: '#444', lineHeight: 1.8, padding: '10px 0' }}>
                  <strong style={{ display: 'block', marginBottom: 8 }}>Product Details</strong>
                  <p>Energy Star Rated - No</p>
                  <p><strong>Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</strong></p>
                  <p>The Hottub B22CS30SNS, stain</p>
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="tab-content active" style={{ padding: '10px 0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.8rem' }}>
                    {[['Model','B22CS30SNS5'],['Dimensions','77" × 77" × 32"'],['Capacity','6 Persons'],['Water Capacity','305 Gallons'],['Heater','5.5 KW Heavy Heater'],['Electrical','220V, 50 amp /ETL Certificate']].map(([k,v]) => (
                      <tr key={k} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '6px 10px', color: '#888', width: 200 }}>{k}</td>
                        <td style={{ padding: '6px 10px' }}>{v}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              )}
              {activeTab === 'accessories' && (
                <div className="tab-content active" style={{ fontSize: '.82rem', color: '#444', padding: '10px 0' }}>
                  <p>Accessories for this model include spa covers, steps, chemical kits, and entertainment systems. Contact us for details.</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="tab-content active" style={{ fontSize: '.82rem', color: '#444', padding: '10px 0' }}>
                  <p><strong>4 Reviews</strong></p>
                  <div style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                    <div className="stars" style={{ fontSize: '.8rem' }}><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                    <p style={{ marginTop: 4 }}>Excellent product, very happy with our purchase!</p>
                    <p style={{ color: '#aaa', fontSize: '.72rem' }}>– John D., December 2014</p>
                  </div>
                  <div style={{ padding: '10px 0' }}>
                    <div className="stars" style={{ fontSize: '.8rem' }}><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i></div>
                    <p style={{ marginTop: 4 }}>Great quality, delivery was on time.</p>
                    <p style={{ color: '#aaa', fontSize: '.72rem' }}>– Sarah M., January 2015</p>
                  </div>
                </div>
              )}
              {activeTab === 'qa' && (
                <div className="tab-content active" style={{ fontSize: '.82rem', color: '#444', padding: '10px 0' }}>
                  <p><strong>Q:</strong> Is this ETL certified?<br /><strong>A:</strong> Yes, this model comes with full ETL certification.</p>
                  <p style={{ marginTop: 10 }}><strong>Q:</strong> What is the warranty?<br /><strong>A:</strong> 5 years on shell, 2 years on equipment, 1 year on labor.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ViewedCarousel />
      <BrandStrip />
    </>
  );
}
