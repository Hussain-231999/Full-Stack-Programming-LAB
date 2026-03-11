// src/App.js

import StudentCard from './StudentCard';

function App() {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      padding: '40px',
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ width: '100%', textAlign: 'center' }}>
        Student Information Cards
      </h1>

      <StudentCard
        name="Ali Hassan"
        rollNo="CS-101"
        department="Computer Science"
        university="FAST NUCES"
        color="#d0f0fd"
      />

      <StudentCard
        name="Hussain Abdullah"
        rollNo="SE-202"
        department="Software Engineering"
        university="Air University"
        color="#d5f5e3"
      />

      <StudentCard
        name="Ibrahim Shahid"
        rollNo="EE-305"
        department="Electrical Engineering"
        university="Comsats Islamabad"
        color="#fde8d8"
      />
    </div>
  );
}

export default App;