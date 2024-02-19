import React, { useState, useEffect } from 'react';
import CartItems from '../Components/CartItems/CartItems';
import { useParams } from 'react-router-dom';
import "./CSS/ConfirmOrder.css";
import GooglePayButton from '@google-pay/button-react';

const currentDate = new Date().toDateString();
const currentTime = new Date().toLocaleTimeString();

const ConfirmOrder = () => {
    const { productId } = useParams();
    const [selectedBike, setSelectedBike] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedBikeAmount, setSelectedBikeAmount] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/mpesa", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer SmkcpEGH7bSEtTCEuS5BKG0V0QkT',
            },
            body: JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMjE5MTM0NjU4",
                "Timestamp": "20240219134658",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": `${selectedBikeAmount}`,
                "PartyA": 254708374149,
                "PartyB": 174379,
                "PhoneNumber": `254${phone}`,
                "CallBackURL": "https://mydomain.com/path",
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": "Payment of X"
            }),
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }

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
                setSelectedBikeAmount(data.price);
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
                        <th>Bike Photo</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{selectedBike.id}</td>
                        <td>{selectedBike.name}</td>
                        <td><img className='bike-image' src={selectedBike.image} alt="" /></td>
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
                                    <button type="submit" className='proceed-btn' onClick={() => { setShowPaymentForm(true) }}>Proceed to Payment</button>
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
            {
                showPaymentForm && (
                    <>
                        <div className="backdrop" onClick={() => setShowRegModal(false)}></div>
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close-btn" onClick={() => setShowRegModal(false)}>&times;</span>
                                <div className="order-confirmation-form-container">
                                    <h2>Payment Form</h2>
                                    <p>Confirm your payment details down below:</p>
                                    <form onSubmit={handlePayment}>
                                        <label htmlFor="name">Your Name</label>
                                        <input id='name' required type="text" placeholder='Your name' value={name} onChange={e => setName(e.target.value)} />
                                        <label htmlFor="">Your Email</label>
                                        <input required type="text" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                                        <label htmlFor="phonenumber">Phone Number</label>
                                        <input id='phonenumber' required type="text" placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)} />
                                        <label htmlFor="date">Amount To Pay</label>
                                        <input id='number' type="number" value={selectedBikeAmount} disabled />
                                        <GooglePayButton
                                            environment="TEST"
                                            paymentRequest={{
                                                apiVersion: 2,
                                                apiVersionMinor: 0,
                                                allowedPaymentMethods: [
                                                    {
                                                        type: 'CARD',
                                                        parameters: {
                                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                        },
                                                        tokenizationSpecification: {
                                                            type: 'PAYMENT_GATEWAY',
                                                            parameters: {
                                                                gateway: 'example',
                                                                gatewayMerchantId: 'exampleGatewayMerchantId',
                                                            },
                                                        },
                                                    },
                                                ],
                                                merchantInfo: {
                                                    merchantId: '12345678901234567890',
                                                    merchantName: 'Demo Merchant',
                                                },
                                                transactionInfo: {
                                                    totalPriceStatus: 'FINAL',
                                                    totalPriceLabel: 'Total',
                                                    totalPrice: '100.00',
                                                    currencyCode: 'USD',
                                                    countryCode: 'US',
                                                },
                                            }}
                                            onLoadPaymentData={paymentRequest => {
                                                console.log('load payment data', paymentRequest);
                                            }}
                                        />


                                        <button type="submit" className='proceed-btn' onClick={handlePayment}>Pay Now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>

                )
            }
        </div >
    );
};

export default ConfirmOrder;
