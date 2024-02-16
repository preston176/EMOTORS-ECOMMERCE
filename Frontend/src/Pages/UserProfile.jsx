import React from 'react'
import './CSS/UserProfile.css'
import { useParams } from 'react-router-dom';


const UserProfile = () => {
    const { userId } = useParams();
    // do function to fetch user data from backend using userId
    // const fetchUserData = async () => {
    //     const response = await fetch(`http://localhost:3000/user/${userId}`);
    //     if (response.ok) {
    //         const userData = await response.json();
    //         // do something with the user data
    //     } else {
    //         console.error('Error fetching user data');
    //     }
    // }
    // fetchUserData();

    
    return (
        <div className='profile-container'>
            <div className="left-profile-section">
                <h2>Hello, </h2>
            </div>
            <div className="right-profile-section">
                <h2>Your Orders</h2>
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
                        <tr className="order">
                            <td>12345</td>
                            <td>Mountain Bike</td>
                            <td><img src="" alt="item_image" /></td>
                            <td>12/12/2021</td>
                            <td>Delivered</td>
                        </tr>
                        <tr className="order">
                            <td>12346</td>
                            <td>Bmx Bike</td>
                            <td><img src="" alt="item_image" /></td>
                            <td>13/12/2021</td>
                            <td>Processing</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default UserProfile
