import { useState } from 'react';
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = () => {
    if (name && email) {
      setSubmitted({ name, email });
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="form-container">
      <h1>User Form</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {submitted && (
        <div className="result">
          <h2>Submitted Data</h2>
          <p><strong>Name:</strong> {submitted.name}</p>
          <p><strong>Email:</strong> {submitted.email}</p>
        </div>
      )}
    </div>
  );
}

export default UserForm;