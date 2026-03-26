import { useState } from 'react';
import './Pages.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <div className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Send Message</button>
        {submitted && <p className="success">✅ Message sent successfully!</p>}
      </div>
    </div>
  );
}

export default Contact;