import { useContext, useEffect, useState } from 'react';
import './CSS/UserProfile.css';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../Context/UserAuthContext';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    const [userOrders, setUserOrders] = useState([]);
    const [activeButton, setActiveButton] = useState('orders')
    const [userDetails, setUserDetails] = useState(null);
    // fields
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                // Fetch user orders
                const ordersResponse = await fetch(`http://localhost:3000/orders/${userId}`);
                if (ordersResponse.ok) {
                    const ordersData = await ordersResponse.json();
                    // console.log(ordersData)
                    setUserOrders(ordersData);
                    setUserId(userId);
                } else {
                    console.error('Error fetching user orders');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        // fetch user details
        const fetchUserDetails = async () => {
            try {
                const userDetailsResponse = await fetch(`http://localhost:3000/users/${userId}`);
                if (userDetailsResponse.ok) {
                    const userDetails = await userDetailsResponse.json();
                    setUserDetails(userDetails);
                } else {
                    console.error('Error fetching user details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchUserDetails();
        fetchUserOrders();
    }, [userId, setUserId]);

    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        if (!userDetails || !currentPassword || !newPassword || !confirmNewPassword || !confirmEmail) {
            alert('Please fill in all fields');
        }

        if (currentPassword !== userDetails.password) {
            console.error('Incorrect password');
            alert('Incorrect password')
            return;
        }

        if (newPassword !== confirmNewPassword) {
            console.error('Passwords do not match');
            alert('Passwords do not match')
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...userDetails,
                    email: confirmEmail,
                    password: newPassword
                })
            });
            if (response.ok) {
                // console.log('User details updated successfully');
                toast.success('User Details updated successfully')
            } else {
                toast.error('Error updating user details')
                console.error('Error updating user details');
            }
        } catch (error) {
            toast.error('Error updating user details', error)
            console.error('Error:', error);
        }
    }

    const navigate = useNavigate();


    return (
        <>
            <div className='profile-container'>
                <div className="sidebar">
                    {/* sidebar content */}
                    <h2>Manage</h2>
                    <button onClick={() => setActiveButton('orders')}>View Personal Orders</button>
                    <button onClick={() => setActiveButton('change-personal-info')}>Change Personal Info</button>
                    <button onClick={() => { navigate('/'); window.default(); }}>Log Out</button>
                    {/* Add any other sidebar content here */}
                </div>
                <div className="main-content">
                    <div className="right-profile-section">

                        {
                            activeButton === 'orders' && userOrders.length > 0 ? (
                                <>
                                    <h2>Your Orders</h2>
                                    <table className="order-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Order Date</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userOrders.map((order) => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{order.order_date}</td>
                                                    <td>{order.status}</td>
                                                    <td>${order.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                activeButton === 'orders' && <p>No orders found</p>
                            )
                        }

                        {
                            activeButton === 'change-personal-info' && (
                                <>
                                    <h2 className='title'>Edit Personal Information</h2>
                                    <form className="personal-info">
                                        <label htmlFor="name" >Name</label>
                                        <input required type="text" id="name" value={userDetails.username} onChange={e => setUserDetails({
                                            ...userDetails,
                                            username: e.target.value
                                        })} />
                                        <label htmlFor="email">Email address</label>
                                        <input required type="email" id="email" value={userDetails.email} onChange={e => setUserDetails(
                                            {
                                                ...userDetails,
                                                email: e.target.value
                                            })} />
                                        <label htmlFor="email">Confirm Email address</label>
                                        <input required type="email" id="confirmEmail" value={confirmEmail}
                                            onChange={e => setConfirmEmail(e.target.value)} />

                                        <label htmlFor="phone">Phone Number</label>

                                        <input
                                            required
                                            type="tel" // Use type "tel" for phone numbers
                                            id="phone"
                                            value={`0${userDetails.phone}`}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                // Remove any non-numeric characters and leading zeroes
                                                const formattedValue = inputValue.replace(/\D/g, '').replace(/^0+/, '');
                                                // Ensure the length does not exceed 10 digits
                                                const newValue = formattedValue.substring(0, 9);
                                                setUserDetails({
                                                    ...userDetails,
                                                    phone: newValue
                                                });
                                            }}
                                        />


                                        <label htmlFor="password">Current Password</label>
                                        <input required type="password" id="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />

                                        <label htmlFor='newPassword'>New Password</label>
                                        <div className="input-with-checkbox">
                                            <input required type="password" id="newPassword"
                                                value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                            <input
                                                type="checkbox"
                                                id="toggleNewPassword"
                                                onClick={() => {
                                                    const newPasswordInput = document.getElementById('newPassword');
                                                    if (newPasswordInput.type === 'password') {
                                                        newPasswordInput.type = 'text';
                                                    } else {
                                                        newPasswordInput.type = 'password';
                                                    }
                                                }}
                                            />
                                        </div>

                                        <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                                        <div className="input-with-checkbox">
                                            <input required type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                                            <input
                                                type="checkbox"
                                                id="toggleConfirmNewPassword"
                                                onClick={() => {
                                                    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
                                                    if (confirmNewPasswordInput.type === 'password') {
                                                        confirmNewPasswordInput.type = 'text';
                                                    } else {
                                                        confirmNewPasswordInput.type = 'password';
                                                    }
                                                }}
                                            />
                                        </div>

                                        <button type='submit' onClick={handleUpdateDetails}>Update User Details</button>
                                    </form>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
