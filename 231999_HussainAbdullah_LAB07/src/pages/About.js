import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

const team = [
  { img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80', name: 'Fatima Ali', role: 'Business Consultant' },
  { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', name: 'Saif Abbasi', role: 'Business Consultant' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', name: 'Ayesha Ali', role: 'Business Consultant' },
  { img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80', name: 'Ayza Ahmed', role: 'Business Consultant' },
];

export default function About() {
  const [teamCols, setTeamCols] = useState('repeat(4,1fr)');
  const [introCols, setIntroCols] = useState('1fr 200px');

  useEffect(() => {
    const fix = () => {
      const w = window.innerWidth;
      setTeamCols(w < 480 ? '1fr 1fr' : w < 768 ? 'repeat(2,1fr)' : 'repeat(4,1fr)');
      setIntroCols(w < 600 ? '1fr' : '1fr 200px');
    };
    fix();
    window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, []);

  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>About Us</div>
          <div className="content-box">
            <div className="sub-heading">Welcome to the Company</div>
            <div style={{ display: 'grid', gridTemplateColumns: introCols, gap: 20, marginBottom: 24 }}>
              <div style={{ fontSize: '.82rem', color: '#444', lineHeight: 1.8 }}>
                Welcome to HotSpring Portable Spas — your trusted destination for premium portable hot tubs and spas. We are dedicated to providing quality products and exceptional customer service.
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&q=80" alt="Spa showroom" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2, border: '1px solid #ddd' }} />
              </div>
            </div>
            <div className="sub-heading">Our Company Members</div>
            <div style={{ display: 'grid', gridTemplateColumns: teamCols, gap: 16 }}>
              {team.map((m, i) => (
                <div key={i} className="team-card">
                  <img src={m.img} alt={m.name} />
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
