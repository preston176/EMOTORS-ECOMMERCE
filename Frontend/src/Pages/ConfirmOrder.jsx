import React, { useState, useEffect } from 'react';
import CartItems from '../Components/CartItems/CartItems';
import { useParams } from 'react-router-dom';
import "./CSS/ConfirmOrder.css";

const currentDate = new Date().toDateString();
const currentTime = new Date().toLocaleTimeString();

const ConfirmOrder = () => {
    const { productId } = useParams();
    const [selectedBike, setSelectedBike] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/products/${productId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setSelectedBike(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [productId]); // Ensure that the effect runs when productId changes

    const handleProceed = () => {
        setShowModal(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Perform form validation
        if (!name || !email || !phone) {
            alert('Please fill in all fields');
            return;
        }

        // Make a request to check if the email or phone number already exists in the database
        fetch('http://localhost:3000/order-confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone
            })
        })
            .then(response => {
                if (response.ok) {
                    // Form submission successful
                    alert('Form submitted successfully');
                    setShowModal(false); // Close the modal after successful submission
                } else {
                    // Form submission failed
                    setShowRegModal(true);
                    alert('Failed to submit form');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to submit form');
            });
    };

    return (
        <div className='confirm-order'>
            <h2>Thank You for Shopping with us</h2>
            <p>Here is a summary of your order details</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{selectedBike.id}</td>
                        <td>{selectedBike.name}</td>
                        <td>{/* You need to render the quantity */}</td>
                        <td>{selectedBike.price}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Total: {selectedBike.price}</h3>
            <button className='proceed-btn' onClick={handleProceed}>Proceed</button>

            {showModal && !showRegModal && (
                <>
                    <div className="backdrop" onClick={() => setShowModal(false)}></div>
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
                            <div className="order-confirmation-form-container">
                                <h2>Order Confirmation form</h2>
                                <p>Fill in your details to preserve your order</p>
                                <form onSubmit={handleFormSubmit}>
                                    <label htmlFor="name">Your Name</label>
                                    <input id='name' required type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value)} />
                                    <label htmlFor="">Your Email</label>
                                    <input required type="text" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                                    <label htmlFor="phonenumber">Phone Number</label>
                                    <input id='phonenumber' required type="text" placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)} />
                                    <label htmlFor="date">Date</label>
                                    <input id='date' type="text" value={`${currentDate} ${currentTime}`} disabled />
                                    <button type="submit" className='proceed-btn'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {
                showRegModal && (
                    <>
                        <div className="backdrop" onClick={() => setShowRegModal(false)}></div>
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close-btn" onClick={() => setShowRegModal(false)}>&times;</span>
                                <div className="order-confirmation-form-container">
                                    <h2>User Details Registration</h2>
                                    <p>Fill in your details register</p>
                                    <form onSubmit={handleFormSubmit}>
                                        <label htmlFor="name">Your Name</label>
                                        <input id='name' required type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value)} />
                                        <label htmlFor="">Your Email</label>
                                        <input required type="text" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                                        <label htmlFor="phonenumber">Phone Number</label>
                                        <input id='phonenumber' required type="text" placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)} />
                                        <label htmlFor="date">Date</label>
                                        <input id='date' type="text" value={`${currentDate} ${currentTime}`} disabled />
                                        <button type="submit" className='proceed-btn'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default ConfirmOrder;
