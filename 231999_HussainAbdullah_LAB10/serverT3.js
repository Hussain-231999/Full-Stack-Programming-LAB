// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Dynamic route for user page
app.get('/user/:name', (req, res) => {
    // Extract the name from URL parameter
    const userName = req.params.name;
    
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Page - ${userName}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
                text-align: center;
                background: white;
                padding: 60px;
                border-radius: 20px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                min-width: 400px;
            }
            h1 {
                color: #667eea;
                font-size: 52px;
                margin-bottom: 20px;
                text-transform: capitalize;
            }
            .greeting {
                font-size: 24px;
                color: #555;
                margin-bottom: 30px;
            }
            .emoji {
                font-size: 80px;
                margin-bottom: 20px;
            }
            .info {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                color: #666;
            }
            .try-more {
                margin-top: 30px;
                padding: 15px;
                background: #e8f4f8;
                border-radius: 10px;
            }
            .try-more p {
                margin: 5px 0;
                color: #555;
            }
            .try-more a {
                color: #667eea;
                text-decoration: none;
                font-weight: bold;
            }
            .try-more a:hover {
                color: #764ba2;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="emoji">👋</div>
            <h1>Hello ${userName}!</h1>
            <div class="greeting">Welcome to your personalized page</div>
            
            <div class="info">
                <p><strong>Your URL:</strong> /user/${userName}</p>
                <p><strong>Parameter received:</strong> ${userName}</p>
            </div>
            
            <div class="try-more">
                <p><strong>Try different names:</strong></p>
                <p><a href="/user/Hussain">/user/Hussain</a></p>
                <p><a href="/user/Hassan">/user/Hassan</a></p>
                <p><a href="/user/Saif">/user/Saif</a></p>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Root route with instructions
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dynamic User Page App</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
                text-align: center;
                background: white;
                padding: 50px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            h1 {
                color: #667eea;
                margin-bottom: 30px;
            }
            .instruction {
                font-size: 18px;
                color: #555;
                margin: 20px 0;
            }
            .example {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin-top: 20px;
            }
            .example a {
                display: block;
                margin: 10px 0;
                padding: 12px;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: all 0.3s;
            }
            .example a:hover {
                background: #764ba2;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Dynamic User Page App</h1>
            <div class="instruction">
                <p>To see a personalized page, visit:</p>
                <p><strong>/user/YourName</strong></p>
            </div>
            <div class="example">
                <p><strong>Click to try:</strong></p>
                <a href="/user/Hussain">Visit Hussain's Page</a>
                <a href="/user/Hassan">Visit Hassan's Page</a>
                <a href="/user/Saif">Visit Saif's Page</a>
                <a href="/user/YourName">Visit Your Page</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`\nTry these URLs in your browser:`);
    console.log(`- http://localhost:${PORT}/user/Hussain`);
    console.log(`- http://localhost:${PORT}/user/Hassan`);
    console.log(`- http://localhost:${PORT}/user/Saif`);
    console.log(`- http://localhost:${PORT}/user/YourName`);
});