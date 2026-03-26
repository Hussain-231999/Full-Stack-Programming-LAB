import { useState } from 'react';
import './Actions.css';

function Actions() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const colors = ['#FFDDC1', '#C1FFD7', '#C1D4FF', '#FFC1F3', '#FFFAC1'];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <h1>Interactive Buttons App</h1>

      <div className="buttons">
        <button
          onClick={() => setMessage('Hello! This is a message.')}
          onMouseOver={() => setHoveredBtn('msg')}
          onMouseOut={() => setHoveredBtn(null)}
          style={{ color: hoveredBtn === 'msg' ? '#e63946' : '#000000' }}
        >
          Show Message
        </button>

        <button
          onClick={() => setBgColor(getRandomColor())}
          onMouseOver={() => setHoveredBtn('bg')}
          onMouseOut={() => setHoveredBtn(null)}
          style={{ color: hoveredBtn === 'bg' ? '#e63946' : '#000000' }}
        >
          Change Background Color
        </button>

        <button
          onClick={() => alert('This is an alert!')}
          onMouseOver={() => setHoveredBtn('alert')}
          onMouseOut={() => setHoveredBtn(null)}
          style={{ color: hoveredBtn === 'alert' ? '#e63946' : '#000000' }}
        >
          Show Alert
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Actions;