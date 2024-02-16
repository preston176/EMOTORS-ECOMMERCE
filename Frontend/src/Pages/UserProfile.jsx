import React, { useEffect, useState } from 'react';
import './CSS/UserProfile.css';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');

    // Function to fetch user data from backend using userId
    // const fetchUserData = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/user/${userId}`);
    //         if (response.ok) {
    //             const userData = await response.json();
    //             setUserData(userData);
    //             setFilteredOrders(userData.orders); // Set initial orders to display
    //         } else {
    //             console.error('Error fetching user data');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    useEffect(() => {
        // fetchUserData();
    }, [userId]);

    // Function to filter orders based on status
    const filterOrders = (status) => {
        if (status === 'all') {
            setFilteredOrders(userData.orders);
        } else {
            const filtered = userData.orders.filter(order => order.status.toLowerCase() === status);
            setFilteredOrders(filtered);
        }
        setStatusFilter(status);
    };

    return (
        <div className='profile-container'>
            <div className="sidebar filter-buttons">
                {/* Sidebar content */}
                <h2>Manage</h2>
                <button>Change Personal Info</button>
                <button>Change Personal Info</button>
                <button>Change Personal Info</button>
                <button>Change Personal Info</button>
                <button>Log Out</button>
                {/* Add any other sidebar content here */}
            </div>
            <div className="main-content">
                <div className="left-profile-section">
                    <h2>Hello, </h2>
                </div>
                <div className="right-profile-section">
                    <h2>Your Orders</h2>
                    <div className="filter-buttons">
                        <button onClick={() => filterOrders('all')}>View All</button>
                        <button onClick={() => filterOrders('processing')}>View Processing</button>
                        <button onClick={() => filterOrders('delivered')}>View Delivered</button>
                    </div>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Item</th>
                                <th>Order Image</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders && filteredOrders.map(order => (
                                <tr className="order" key={order.id}>
                                    <td>{order.orderId}</td>
                                    <td>{order.item}</td>
                                    <td><img src={order.imageUrl} alt="item_image" /></td>
                                    <td>{order.date}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default UserProfile;
