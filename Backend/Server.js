const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Update with your MySQL password
    database: 'e-cycle_db'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define a route to fetch all products
app.get('/products', (req, res) => {
    // Execute SQL query to select all products
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results); // Send the fetched products as a JSON response
    });
});

// Endpoint for user signup
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Check if any field is missing
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert user into the database
    connection.query('INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, 'user'], (err, results) => {
        if (err) {
            console.error('Error creating user:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});