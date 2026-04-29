// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Route for Home Page
app.get('/home', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
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
                font-size: 48px;
                margin-bottom: 20px;
            }
            .links {
                margin-top: 30px;
            }
            .links a {
                margin: 0 10px;
                padding: 10px 20px;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                transition: all 0.3s;
            }
            .links a:hover {
                background: #764ba2;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🏠 Welcome Home</h1>
            <p style="font-size: 18px; color: #666;">This is the home page of our application</p>
            <div class="links">
                <a href="/home">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Route for About Page
app.get('/about', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }
            .container {
                text-align: center;
                background: white;
                padding: 50px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            h1 {
                color: #f5576c;
                font-size: 48px;
                margin-bottom: 20px;
            }
            .links {
                margin-top: 30px;
            }
            .links a {
                margin: 0 10px;
                padding: 10px 20px;
                background: #f5576c;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                transition: all 0.3s;
            }
            .links a:hover {
                background: #f093fb;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>ℹ️ About Us</h1>
            <p style="font-size: 18px; color: #666;">Learn more about our services and mission</p>
            <div class="links">
                <a href="/home">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Route for Contact Page
app.get('/contact', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            }
            .container {
                text-align: center;
                background: white;
                padding: 50px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            h1 {
                color: #4facfe;
                font-size: 48px;
                margin-bottom: 20px;
            }
            .links {
                margin-top: 30px;
            }
            .links a {
                margin: 0 10px;
                padding: 10px 20px;
                background: #4facfe;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                transition: all 0.3s;
            }
            .links a:hover {
                background: #00f2fe;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📞 Contact Us</h1>
            <p style="font-size: 18px; color: #666;">Get in touch with our team</p>
            <div class="links">
                <a href="/home">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Visit these routes in your browser:`);
    console.log(`- http://localhost:${PORT}/home`);
    console.log(`- http://localhost:${PORT}/about`);
    console.log(`- http://localhost:${PORT}/contact`);
});