const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use('/images', express.static(path.join(__dirname, 'images')));

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
    // Execute SQL query to select data from the Products table
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Map the results to include the full image URL
        const productsWithImageURL = results.map(product => {
            return {
                ...product,
                image: `http://localhost:3000/images/${product.image_url}`
            };
        });

        res.json(productsWithImageURL); // Send the fetched data with image URLs as a JSON response
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;

    // Execute SQL query to select data for the specific product ID from the Products table
    connection.query('SELECT * FROM Products WHERE id = ?', productId, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        // Map the result to include the full image URL
        const productWithImageURL = {
            ...results[0],
            image: `http://localhost:3000/images/${results[0].image_url}`
        };

        res.json(productWithImageURL); // Send the fetched data with image URL as a JSON response
    });
});


// route to fetch images
app.get('/images/:productId', (req, res) => {
    const productId = req.params.productId;
    // Execute SQL query to select image URL based on product ID
    connection.query('SELECT image_url FROM Products WHERE id = ?', productId, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        // Assuming results is an array with a single object containing image_url
        const imageUrl = results[0].image_url;
        // Use path.join to create a platform-independent file path
        const imagePath = path.join(__dirname, 'images', imageUrl);
        // Send the image file as a response
        res.sendFile(imagePath);
    });
});

// Endpoint for user signup
app.post('/signup', (req, res) => {
    const { username, email, password, phone } = req.body;

    // Check if any field is missing
    if (!username || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert user into the database
    connection.query('INSERT INTO Users (username, email, password, role, phone) VALUES (?, ?, ?, ?, ?)', [username, email, password, 'user', phone], (err, results) => {
        if (err) {
            console.error('Error creating user:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

//endpoint to handle payment
app.post('/mpesa', async (req, res) => {
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    try {
        const response = await axios.post(url, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer SmkcpEGH7bSEtTCEuS5BKG0V0QkT',
            }
        });

        res.send(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

//Endpoint to check if user details exist
app.post('/order-confirmation', (req, res) => {
    const { email, phone } = req.body;

    // Check if any field is missing
    if (!email || !phone) {
        return res.status(400).json({ error: 'Email and phone are required' });
    }

    // Check if the user exists in the database and the provided credentials match
    connection.query('SELECT * FROM Users WHERE email = ? OR phone = ? ', [email, phone], (err, results) => {
        if (err) {
            console.error('Error executing login query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // If no user found with the given credentials
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or phone' });
        }

        // User authenticated successfully
        res.status(200).json({ message: 'Login successful' });
    });
});

// Endpoint for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if any field is missing
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user exists in the database and the provided credentials match
    connection.query('SELECT * FROM Users WHERE email = ? AND password = ? ', [email, password], (err, results) => {
        if (err) {
            console.error('Error executing login query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // If no user found with the given credentials
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // User authenticated successfully
        const userId = results[0].id; // Assuming 'id' is the field name for the user ID
        res.status(200).json({ message: 'Login successful', userId: userId }); // Sending the user ID along with the response
    });
});

// Endpoint to fetch user ID based on email
app.get('/login_id', (req, res) => {
    const { email } = req.query;

    // Check if the email field is missing
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Check if the user exists in the database based on the email
    connection.query('SELECT id FROM Users WHERE email = ?', email, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // If no user found with the given email
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // User found, send back the user ID
        const userId = results[0].id;
        res.status(200).json({ userId: userId });
    });
});

app.get('/user_details/:id', (req, res) => {
    const userId = req.params.id;

    // Check if the user ID is missing
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch user details from the database based on the user ID
    connection.query('SELECT * FROM Users WHERE id = ?', userId, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // If no user found with the given ID
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // User details found, send back the details
        const userDetails = results[0];
        res.status(200).json(userDetails);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
