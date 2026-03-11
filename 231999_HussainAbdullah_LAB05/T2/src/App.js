// src/App.js

import CourseItem from './CourseItem';

// Array of 5 courses
const courses = [
  {
    id: 1,
    courseName: 'React for Beginners',
    instructor: 'Ali Hassan',
    duration: '6 Weeks',
    courseType: 'Online'
  },
  {
    id: 2,
    courseName: 'Data Structures & Algorithms',
    instructor: 'Saifullah',
    duration: '8 Weeks',
    courseType: 'Offline'
  },
  {
    id: 3,
    courseName: 'Python Programming',
    instructor: 'Hussain Abdullah',
    duration: '5 Weeks',
    courseType: 'Online'
  },
  {
    id: 4,
    courseName: 'Database Management',
    instructor: 'Ayesha Raza',
    duration: '4 Weeks',
    courseType: 'Offline'
  },
  {
    id: 5,
    courseName: 'C Programming Masterclass',
    instructor: 'Bilal Mirza',
    duration: '10 Weeks',
    courseType: 'Online'
  }
];

function App() {
  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        📋 Course List
      </h1>

      {/* .map() loops through array and renders a CourseItem for each */}
      {courses.map((course) => (
        <CourseItem
          key={course.id}
          courseName={course.courseName}
          instructor={course.instructor}
          duration={course.duration}
          courseType={course.courseType}
        />
      ))}
    </div>
  );
}

export default App;