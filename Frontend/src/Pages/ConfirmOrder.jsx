import React, { useState, useEffect, useContext } from 'react';
import CartItems from '../Components/CartItems/CartItems';
import { useParams } from 'react-router-dom';
import "./CSS/ConfirmOrder.css";
import GooglePayButton from '@google-pay/button-react';
import { UserAuthContext } from '../Context/UserAuthContext';
import OrderSignupPage from './OrderSignupPage';

const currentDate = new Date().toDateString();
const currentTime = new Date().toLocaleTimeString();

const ConfirmOrder = () => {
    const { productId } = useParams();
    // get bike quantity from global context
    const { quantity } = useContext(UserAuthContext);
    const [selectedBike, setSelectedBike] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedBikeAmount, setSelectedBikeAmount] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const { isAuth, handleUserAuth, userDetails, setUserDetails } = useContext(UserAuthContext);

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
                "PhoneNumber": `254${userDetails.phone}`,
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
                setSelectedBikeAmount(data.price * quantity);
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [productId]); // Ensure that the effect runs when productId changes

    const handleProceed = () => {
        setShowPaymentForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Perform form validation
        if (!userDetails.name || !userDetails.email || !userDetails.phone) {
            alert('Please fill in all fields');
            return;
        }

        // Make a request to check if the email or phone number already exists in the database
        fetch('http://localhost:3000/order-confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails.email, userDetails.phone)
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

    const processOrder = () => {
        // funciton to communicate with backend to handle proceessing of order
        // it will get order details, submit to the order table and do quantity - 1;
        // then it will navigate the person to thank you page where there is also a button to navigate to orders section
    }

    return (
        !isAuth ? <OrderSignupPage /> : (
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

                {
                    showPaymentForm && (
                        <>
                            <div className="backdrop" onClick={() => setShowRegModal(false)}></div>
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close-btn" onClick={() => setShowPaymentForm(false)}>&times;</span>
                                    <div className="order-confirmation-form-container">
                                        <h2>Payment Form</h2>
                                        <p>Confirm your payment details down below:</p>
                                        <form onSubmit={handlePayment}>
                                            <label htmlFor="name">Your Name</label>
                                            <input id='name' required type="text" placeholder='Your name' value={userDetails.username} onChange={e => setName(e.target.value)} />
                                            <label htmlFor="">Your Email</label>
                                            <input required type="text" placeholder='Email address' value={userDetails.email} onChange={e => setEmail(e.target.value)} />
                                            <label htmlFor="phonenumber">Phone Number</label>
                                            <input id='phonenumber' required type="text" placeholder='Phone Number' value={userDetails.phone} onChange={e => setPhone(e.target.value)} />
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
                                                        totalPrice: '100',
                                                        currencyCode: 'USD',
                                                        countryCode: 'US',
                                                    },
                                                }}
                                                onLoadPaymentData={paymentRequest => {
                                                    console.log('load payment data', paymentRequest);
                                                    // function to facilitate the success purchase
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
            </div>
        )
    );
};

export default ConfirmOrder;
