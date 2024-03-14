import React, { useEffect, useState } from 'react';
import './CSS/UserProfile.css';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                // Fetch user orders
                const ordersResponse = await fetch(`http://localhost:3000/orders/${userId}`);
                if (ordersResponse.ok) {
                    const ordersData = await ordersResponse.json();
                    console.log(ordersData)
                    setUserOrders(ordersData);
                } else {
                    console.error('Error fetching user orders');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserOrders();
    }, [userId]);


    return (
        <>
            <div className='profile-container'>
                <div className="sidebar">
                    {/* Your sidebar content */}
                    <h2>Manage</h2>
                    <button>Change Personal Info</button>
                    <button>Change Personal Info</button>
                    <button>Change Personal Info</button>
                    <button>Change Personal Info</button>
                    <button>Log Out</button>
                    {/* Add any other sidebar content here */}
                </div>
                <div className="main-content">
                    <div className="right-profile-section">
                        <h2>Your Orders</h2>
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Name</th>
                                    <th>Quantity</th>
                                    <th>Price Per Unit</th>
                                    <th>Total Price</th>
                                    <th>Purchased on</th>
                                    <th>Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(order => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.name}</td> {/* Assuming you have a product name in your schema */}
                                        <td>{order.quantity}</td>
                                        <td>{order.price_per_unit}</td>
                                        <td>{(order.quantity * order.price_per_unit).toFixed(2)}</td>
                                        <td>{new Date(order.order_date).toLocaleString()}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
