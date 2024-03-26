const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
const upload = multer({ dest: path.resolve(__dirname, 'images/') });

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


// functions



// Function to save and rename image file
function saveAndRenameImage(imageFile, bikeName) {
    return new Promise((resolve, reject) => {
        // Generate new filename based on bike name
        const fileName = `${bikeName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
        const filePath = path.join(__dirname, 'images', fileName);

        // Read the uploaded image file
        fs.readFile(imageFile.path, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            // Save the file with the new name
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(fileName);
            });
        });
    });
}


// end of functions


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

// route to update product details based on product id

// route to update product details based on product id
app.put('/products/:id', upload.single('image'), (req, res) => {
    const imageFile = req.file;
    const productId = req.params.id;
    const updatedProduct = req.body;

    // Check if no image file is uploaded
    if (!imageFile) {

        // Remove the image_url field from the updatedProduct object to ensure it's not modified
        delete updatedProduct.image_url
        // Execute SQL query to update the product data without modifying the image_url field
        connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (err, results) => {
            if (err) {
                console.error('Error updating product data:', err.stack);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }

            res.json({ message: 'Product details updated successfully' }); // Send a success message as a JSON response
        });
    } else {
        // Save and rename image file
        saveAndRenameImage(imageFile, updatedProduct.name)
            .then((fileName) => {
                // Update the product data with the new image URL
                updatedProduct.image_url = fileName;
                const fileExtension = path.extname(imageFile.originalname);

                // Append the file extension to the image URL
                updatedProduct.image_url = fileName + fileExtension;
                // Execute SQL query to update the product data in the database
                connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (err, results) => {
                    if (err) {
                        console.error('Error updating product data:', err.stack);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    if (results.affectedRows === 0) {
                        res.status(404).json({ error: 'Product not found' });
                        return;
                    }

                    res.json({ message: 'Product updated successfully' }); // Send a success message as a JSON response
                });
            })
            .catch((err) => {
                console.error('Error saving and renaming image:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }
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
    const { email, password, role } = req.body;

    // Check if any field is missing
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user exists in the database and the provided credentials match
    connection.query('SELECT * FROM Users WHERE email = ? AND password = ? AND role = ?', [email, password, role], (err, results) => {
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

//endpoint to handle order processing
// Endpoint to process orders
app.post('/process_order', (req, res) => {
    const { user_id, items } = req.body;

    // Check if any required field is missing
    if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ error: 'User ID and items are required' });
    }

    // Calculate total amount and construct order data
    let totalAmount = 0;
    items.forEach(item => {
        totalAmount += item.quantity * item.price_per_unit;
    });

    // Begin a database transaction
    connection.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Insert order into the orders table
        connection.query('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)', [user_id, totalAmount], (err, results) => {
            if (err) {
                console.error('Error inserting order:', err.stack);
                connection.rollback(() => {
                    res.status(500).json({ error: 'Internal server error' });
                });
                return;
            }

            const orderId = results.insertId;

            // Insert order items into the order_items table
            // By default: Make the order status to be pending
            const values = items.map(item => [orderId, item.product_id, item.quantity, item.price_per_unit, "pending"]);
            connection.query('INSERT INTO order_items (order_id, product_id, quantity, price_per_unit,status) VALUES ?', [values], (err) => {
                if (err) {
                    console.error('Error inserting order items:', err.stack);
                    connection.rollback(() => {
                        res.status(500).json({ error: 'Internal server error' });
                    });
                    return;
                }

                // Update product stock
                items.forEach(item => {
                    connection.query('UPDATE products SET quantity = quantity - ? WHERE id = ?', [item.quantity, item.product_id], (err) => {
                        if (err) {
                            console.error('Error updating product stock:', err.stack);
                            connection.rollback(() => {
                                res.status(500).json({ error: 'Internal server error' });
                            });
                            return;
                        }
                    });
                });

                // Commit the transaction if all queries succeeded
                connection.commit(err => {
                    if (err) {
                        console.error('Error committing transaction:', err.stack);
                        connection.rollback(() => {
                            res.status(500).json({ error: 'Internal server error' });
                        });
                        return;
                    }

                    res.status(201).json({ message: 'Order processed successfully', orderId: orderId });
                });
            });
        });
    });
});

// endpoint to fetch orders of respective users

// Endpoint to fetch user orders based on user ID
// Endpoint to fetch user orders with order items based on user ID
// Define a route to fetch orders by user ID
app.get('/orders/:userId', (req, res) => {
    const userId = req.params.userId;

    // Execute SQL query to select orders for the specific user ID
    connection.query('SELECT orders.id AS order_id, order_items.product_id, order_items.quantity, order_items.price_per_unit, order_items.status, orders.order_date, products.name FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id WHERE orders.user_id = ?', userId, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // If no orders found for the user
        if (results.length === 0) {
            res.status(404).json({ error: 'No orders found for the user' });
            return;
        }

        // Orders found, send back the order data
        res.status(200).json(results);
    });
});

app.get('/orders', (req, res) => {
    // Execute SQL query to select all orders along with user details
    connection.query('SELECT orders.id AS order_id, orders.user_id, users.username, users.email, order_items.product_id, order_items.quantity, order_items.price_per_unit, order_items.status, orders.order_date, products.name FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id JOIN users ON orders.user_id = users.id', (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // If no orders found
        if (results.length === 0) {
            res.status(404).json({ error: 'No orders found' });
            return;
        }

        // Orders found, send back the order data
        res.status(200).json(results);
    });
});

// route to update user order from pending to complete
app.put('/orders/:orderId/complete', (req, res) => {
    const orderId = req.params.orderId;

    // Execute SQL query to update the status of the order to "completed"
    connection.query('UPDATE order_items SET status = "completed" WHERE order_id = ?', orderId, (err, results) => {
        if (err) {
            console.error('Error updating order status:', err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // If no rows were affected, it means the order with the specified ID was not found
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        // Order status updated successfully
        res.status(200).json({ message: 'Order status updated to completed' });
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
