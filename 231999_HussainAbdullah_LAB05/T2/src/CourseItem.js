// src/CourseItem.js

function CourseItem({ courseName, instructor, duration, courseType }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '16px 20px',
      marginBottom: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Left side - course info */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', color: '#2c3e50' }}>📚 {courseName}</h3>
        <p style={{ margin: '2px 0', color: '#555' }}>👨‍🏫 <strong>Instructor:</strong> {instructor}</p>
        <p style={{ margin: '2px 0', color: '#555' }}>⏱️ <strong>Duration:</strong> {duration}</p>
      </div>

      {/* Right side - course type badge (Bonus) */}
      <span style={{
        backgroundColor: courseType === 'Online' ? '#d0f0fd' : '#d5f5e3',
        color: courseType === 'Online' ? '#1a6f8a' : '#1a7a4a',
        padding: '6px 14px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        {courseType === 'Online' ? '🌐' : '🏫'} {courseType}
      </span>
    </div>
  );
}

export default CourseItem;