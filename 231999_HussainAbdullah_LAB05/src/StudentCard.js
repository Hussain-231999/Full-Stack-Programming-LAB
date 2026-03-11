// src/StudentCard.js

function StudentCard({ name, rollNo, department, university, color }) {
  return (
    <div style={{
      backgroundColor: color || '#ffffff',
      border: '1px solid #ccc',
      borderRadius: '12px',
      padding: '20px',
      width: '280px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ margin: '0 0 8px 0' }}>🎓 {name}</h2>
      <p><strong>Roll No:</strong> {rollNo}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>University:</strong> {university}</p>
    </div>
  );
}

export default StudentCard;