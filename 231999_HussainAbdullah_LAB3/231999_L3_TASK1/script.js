// ES6 Class Definition
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }
}

// Create student objects using const and let appropriately
const student1 = new Student(1, "Hussain Abdullah", 3, ["Web Development", "Database Systems", "Data Structures"]);
const student2 = new Student(2, "Saifullah", 2, ["Java Programming", "Computer Networks", "Software Engineering"]);
const student3 = new Student(3, "Khuzaifa Baseer", 4, ["Machine Learning", "Artificial Intelligence", "Big Data Analytics"]);

// Store students in an array
const students = [student1, student2, student3];

// Function to display students using template literals
function displayStudents() {
    const container = document.getElementById('students-container');
    
    if (students.length === 0) {
        container.innerHTML = '<div class="no-students">No students found</div>';
        return;
    }

    // Use template literals to create HTML for each student
    container.innerHTML = students.map(student => `
        <div class="student-card">
            <div class="student-header">
                <h2>${student.name}</h2>
            </div>
            <div class="student-info">
                <p><strong>ID:</strong> ${student.id}</p>
                <p><strong>Semester:</strong> ${student.semester}</p>
            </div>
            <div class="courses-section">
                <h3>Enrolled Courses:</h3>
                <ul class="courses-list">
                    ${student.courses.map(course => `<li>${course}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Display students when the page loads
document.addEventListener('DOMContentLoaded', displayStudents);