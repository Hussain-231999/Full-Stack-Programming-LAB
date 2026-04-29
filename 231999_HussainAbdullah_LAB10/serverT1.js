// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Student data stored in array
const students = [
    { id: 1, name: 'Hussain Abdullah', rollNo: 'SE-001', semester: 6 },
    { id: 2, name: 'Fatima', rollNo: 'SE-002', semester: 6 },
    { id: 3, name: 'Hassan', rollNo: 'SE-003', semester: 6 },
    { id: 4, name: 'Saif Malik', rollNo: 'SE-004', semester: 6 },
    { id: 5, name: 'Furqan Shah', rollNo: 'SE-005', semester: 6 }
];

// GET route to display students in browser
app.get('/', (req, res) => {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student List</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            h1 {
                color: #333;
                text-align: center;
                border-bottom: 3px solid #4CAF50;
                padding-bottom: 10px;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                background-color: white;
                margin: 10px 0;
                padding: 15px;
                border-left: 4px solid #4CAF50;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            li:hover {
                background-color: #f0f0f0;
                transform: translateX(5px);
                transition: all 0.3s;
            }
            .student-name {
                font-weight: bold;
                color: #2c3e50;
                font-size: 18px;
            }
            .student-details {
                color: #666;
                margin-top: 5px;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <h1>📚 Student List - Semester 6</h1>
        <ul>
    `;

    // Loop through students array and create list items
    students.forEach(student => {
        html += `
            <li>
                <div class="student-name">${student.name}</div>
                <div class="student-details">
                    Roll No: ${student.rollNo} | Semester: ${student.semester}
                </div>
            </li>
        `;
    });

    html += `
        </ul>
        <div class="footer">
            Total Students: ${students.length}
        </div>
    </body>
    </html>
    `;

    res.send(html);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open your browser and visit: http://localhost:${PORT}`);
});