// src/Greeting.js

function Greeting({ name, timeOfDay, bgColor }) {

  // Conditional rendering based on timeOfDay
  let message = '';
  let emoji = '';
  let textColor = '';

  if (timeOfDay === 'morning') {
    message = 'Good Morning';
    emoji = '🌅';
    textColor = '#b35900';
  } else if (timeOfDay === 'afternoon') {
    message = 'Good Afternoon';
    emoji = '☀️';
    textColor = '#7a6000';
  } else if (timeOfDay === 'evening') {
    message = 'Good Evening';
    emoji = '🌆';
    textColor = '#5c3d99';
  } else if (timeOfDay === 'night') {
    message = 'Good Night';
    emoji = '🌙';
    textColor = '#1a3a5c';
  } else {
    message = 'Hello';
    emoji = '👋';
    textColor = '#333333';
  }

  return (
    <div style={{
      backgroundColor: bgColor || '#ffffff',
      borderRadius: '16px',
      padding: '30px 40px',
      width: '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>{emoji}</div>
      <h2 style={{ color: textColor, margin: '0 0 8px 0', fontSize: '24px' }}>
        {message},
      </h2>
      <h1 style={{ color: textColor, margin: '0 0 12px 0', fontSize: '28px' }}>
        {name}!
      </h1>
      <p style={{
        margin: '0',
        color: '#888',
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Time of Day: {timeOfDay}
      </p>
    </div>
  );
}

export default Greeting;