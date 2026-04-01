import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandStrip from '../components/BrandStrip';

const sections = [
  { title: '1. Interpretation', content: "In these conditions of sale: 'the Company' means The Edge (Systems) Limited. 'the Buyer' means the person or firm ordering, buying, hiring or being loaned goods from the Company. 'the Goods' means the goods or services, the subject matter of the relevant order. 'the Contract' any contract between the Company and the Buyer for the sale and purchase of goods incorporating these conditions." },
  { title: '2. Risk and title', list: ['The risk in the products will pass to the customer as soon as they are delivered.','The Edge will remain the sole and absolute owner of the goods until full payment has been received.','When payment for the products is overdue or the buyer suffers distress, the Edge shall be entitled to recover the goods.'] },
  { title: '3. Charges', list: ['All prices advertised are subject to VAT which is payable in addition by the buyer.','The Edge reserves the right to amend prices as and when necessary.'] },
  { title: '4. Payment', list: ['Payment is to be by credit/debit card or cheque; cheques must clear before despatch.','Credit accounts are available to buyers who have completed an Account Application form accepted by The Edge.'] },
  { title: '5. Delivery', list: ['All published delivery timescales are subject to availability.','Delivery costs are in addition to the published prices and will be added at checkout.','In the event of damage upon delivery, the buyer must notify The Edge within three working days.'] },
  { title: '6. Force Majeure', content: 'Neither party shall have any liability for any failure or delay in performing its obligations due to circumstances wholly or partly beyond its control, including fire, flood, power failure, or industrial action.' },
  { title: '7. Refunds', content: 'The Edge will refund any goods which are supplied providing the goods are returned in their original condition within 14 days of delivery. Delivery charges will not be refunded.' },
  { title: '8. General', list: ['No modification of these terms shall be valid unless agreed in writing by both parties.','All contracts are subject to English law.'] },
];

export default function Terms() {
  return (
    <>
      <div className="page-hero" style={{ minHeight: 'auto', padding: '24px 0 40px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Payments', to: '/checkout' }, { label: 'Terms and Conditions' }]} />
          <div className="section-heading" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>Terms and Conditions for Sale</div>
          <div className="content-box">
            <div className="sub-heading">General Terms and Conditions</div>
            <p style={{ fontSize: '.8rem', color: '#555', marginBottom: 16 }}>General Terms and conditions for Business, Payment and Delivery for Hot tubs and Spas</p>
            {sections.map((s, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: '.9rem', color: '#333', marginBottom: 6 }}>{s.title}</h3>
                {s.content && <p style={{ fontSize: '.8rem', color: '#555', lineHeight: 1.8 }}>{s.content}</p>}
                {s.list && <ul style={{ paddingLeft: 18 }}>{s.list.map((l, j) => <li key={j} style={{ fontSize: '.8rem', color: '#555', lineHeight: 1.8, marginBottom: 4 }}>{l}</li>)}</ul>}
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <Link to="/checkout" className="btn btn-gray">← BACK TO CHECKOUT</Link>
            </div>
          </div>
        </div>
      </div>
      <BrandStrip />
    </>
  );
}
