// src/App.js

import Greeting from './Greeting';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>
        🌍 Dynamic Greeting App
      </h1>

      {/* Row 1 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <Greeting
          name="Hussain"
          timeOfDay="morning"
          bgColor="#ffe0b2"
        />

        <Greeting
          name="Safi"
          timeOfDay="afternoon"
          bgColor="#fff9c4"
        />

        <Greeting
          name="Umer"
          timeOfDay="evening"
          bgColor="#e8d5f5"
        />
      </div>

      {/* Row 2 - Bonus extra cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center'
      }}>
        <Greeting
          name="Ahmed"
          timeOfDay="night"
          bgColor="#bbdefb"
        />

        <Greeting
          name="Bilal"
          timeOfDay="unknown"
          bgColor="#dcedc8"
        />
      </div>
    </div>
  );
}

export default App;