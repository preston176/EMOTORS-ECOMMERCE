
import { useContext, useEffect, useState } from "react"

import './CSS/AdminPage.css'
import { Link, useParams } from "react-router-dom"
import AdminPageSidebar from "./AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";

const AdminPage = () => {

    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    const [allOrders, setAllOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [allUsers, setAllUsers] = useState([]);


    useEffect(() => {
        setUserId(userId);
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/orders')
            .then(response => response.json())
            .then(data => {

                setAllOrders(data);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/orders')
            .then(response => response.json())
            .then(data => {

                setCompletedOrders(data.filter(order => order.status === 'completed'));
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);
    useEffect(() => {
        fetch('http://localhost:3000/orders')
            .then(response => response.json())
            .then(data => {

                setPendingOrders(data.filter(order => order.status === 'pending'));
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(data => {

                setCurrentUser(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
            .then(response => response.json())
            .then(data => {

                setAllUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);


    return (
        <>
            <div>
                <div className='profile-container'>
                    <AdminPageSidebar userId={userId} />
                    <div className="main-content">
                        <div className="right-admin-section">
                            <h2>Summary</h2>
                            {/* display cards for summary */}
                            <div className="middle">
                                <div className="cards-section">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Orders</h5>
                                            <p className="card-text">{allOrders.length}</p>
                                        </div>

                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Users</h5>
                                            <p className="card-text">{allUsers.length}</p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Pending Orders</h5>
                                            <p className="card-text">{pendingOrders.length}</p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Completed Orders</h5>
                                            <p className="card-text">{completedOrders.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-dashboard">
                                    <div className="admin-right-sidebar">
                                        <h3>Admin Summary</h3>
                                        <p><span>Currently logged in: </span>{currentUser.username}</p>
                                        <p><span>Admin email: </span>{currentUser.email}</p>
                                        {/* Add more summary information here if needed */}
                                    </div>
                                </div>

                            </div>
                            <div className="admin-status">
                                {
                                    <p>
                                        {pendingOrders.length > 0 ? (<Link to={`/adminloginpage/${userId}/adminuserorders`}>You have {pendingOrders.length} pending orders</Link>) : `No pending orders`}
                                    </p>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminPage
