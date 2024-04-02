import { useContext, useEffect, useState } from "react";
import './CSS/AdminPage.css';
import { useParams } from "react-router-dom";
import AdminPageSidebar from "./AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";
import './CSS/AdminReports.css';

const AdminReports = () => {
    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userFilter, setUserFilter] = useState('all');
    const [activeButton, setActiveButton] = useState('users');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderFilter, setOrderFilter] = useState('completed')
    const [bikes, setBikes] = useState([]);
    const [bikeFilter, setBikeFilter] = useState('all');
    const [filteredBikes, setFilteredBikes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                filterBikes(bikeFilter, data);
            }
            )
            .catch(error => console.error('Error fetching bikes:', error));
    }, [bikeFilter]);

    useEffect(() => {
        fetch('http://localhost:3000/orders')
            .then(response => response.json())
            .then(data => {

                filteredOrderList(orderFilter, data);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, [orderFilter]);


    useEffect(() => {
        setUserId(userId);
    }, [userId, setUserId]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                filterUsers(userFilter, data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [userFilter]);


    // filter functions for the orders report
    const filteredOrderList = (criteria, orders) => {
        if (criteria === 'all') {
            setFilteredOrders(orders);
        } else if (criteria === 'pending') {
            const pendingOrders = orders.filter(order => order.status === "pending");
            setFilteredOrders(pendingOrders);
        } else {
            const completedOrders = orders.filter(order => order.status === "completed");
            setFilteredOrders(completedOrders);
        }
    };

    // filter functions for the users' reports

    const filterUsers = (criteria, usersData) => {
        if (criteria === 'all') {
            const activeUsers = usersData.filter(user => user.role === "user");
            setFilteredUsers(activeUsers);
        } else if (criteria === 'active') {
            const activeUsers = usersData.filter(user => user.status === "active" && user.role === "user");
            setFilteredUsers(activeUsers);
        } else if (criteria === 'deleted') {
            const deletedUsers = usersData.filter(user => user.status === "deleted");
            setFilteredUsers(deletedUsers);
        } else {
            setFilteredUsers(usersData).filter(user => user.role === "admin");
        }
    };
    // filter functions for the bikes report

    const filterBikes = (criteria, bikesData) => {
        if (criteria === 'all') {
            setFilteredBikes(bikesData);
            // console.log(bikesData)
        } else if (criteria === 'in-stock') {
            const inStockBikes = bikesData.filter(bike => bike.quantity > 0);
            setFilteredBikes(inStockBikes);
        } else if (criteria === 'out-of-stock') {
            const outOfStockBikes = bikesData.filter(bike => bike.quantity === 0);
            setFilteredBikes(outOfStockBikes);
        } else {
            const deletedBikes = bikesData.filter(bike => bike.status === "deleted");
            setFilteredBikes(deletedBikes);
        }
    }

    const ordersByBike = {};
    filteredOrders.forEach(order => {
        if (!ordersByBike[order.name]) {
            ordersByBike[order.name] = [];
        }
        ordersByBike[order.name].push(order);
    });

    // Then, calculate subtotals for each bike
    const bikeSubtotals = Object.entries(ordersByBike).map(([bikeName, orders]) => {
        const totalQuantity = orders.reduce((acc, curr) => acc + curr.quantity, 0);
        const totalPrice = orders.reduce((acc, curr) => acc + curr.quantity * curr.price_per_unit, 0);
        return { bikeName, totalQuantity, totalPrice };
    });


    // function to print the report

    const handlePrint = () => {

        // Print the specific element
        window.print();

    };




    return (
        <div>
            <div className='profile-container'>
                <AdminPageSidebar userId={userId} />
                <div className="main-content">
                    <div className="right-admin-reports-section">
                        <h2>Reports</h2>
                        <div className="report-sidebar">
                            <div className="report-buttons">
                                <button onClick={() => setActiveButton('users')}>Users</button>
                                <button onClick={() => setActiveButton('admins')}>Admins</button>
                                <button onClick={() => setActiveButton('orders')}>Orders</button>
                                <button onClick={() => setActiveButton('bikes')}>Bikes</button>
                            </div>
                            {/* conditionally render the users' reports when users button is active */}
                            {
                                activeButton === "users" && (
                                    <>
                                        <h2 className="title">Users</h2>
                                        <div className="table-btns">
                                            <div className="user-btns">
                                                <button onClick={() => setUserFilter('all')}>All Users</button>
                                                <button onClick={() => setUserFilter('active')}>Active Users</button>
                                                <button onClick={() => setUserFilter('deleted')}>Deleted Users</button>
                                            </div>
                                            <button onClick={handlePrint}>Print Report</button>
                                        </div>
                                        <h2 className="title">{userFilter} Users</h2>
                                        <table id="table">
                                            <thead>
                                                <tr>
                                                    <th>User Id</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Registration Date</th>
                                                    <th>Phone Number</th>
                                                    <th>Account Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.map(user => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td>{`${new Date(user.registration_date).toLocaleDateString().split('/')[1]}/${new Date(user.registration_date).toLocaleDateString().split('/')[0]}/${new Date(user.registration_date).toLocaleDateString().split('/')[2]}`}</td>

                                                        <td>{user.phone === 0 ? "Not Included" : `0${user.phone}`}</td>
                                                        <td>{user.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div>Total number of Users: {filteredUsers.length}</div>
                                    </>
                                )
                            }

                            {
                                activeButton === "admins" && (
                                    <>
                                        <h2 className="title">Admins</h2>
                                        <div className="table-btns">
                                            <button onClick={handlePrint}>Print Report</button>
                                        </div>

                                        <table id="table">
                                            <thead>
                                                <tr>
                                                    <th>Admin Id</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Registration Date</th>
                                                    <th>Phone Number</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.filter(user => user.role === "admin").map(user => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td>{`${new Date(user.registration_date).toLocaleDateString().split('/')[1]}/${new Date(user.registration_date).toLocaleDateString().split('/')[0]}/${new Date(user.registration_date).toLocaleDateString().split('/')[2]}`}</td>

                                                        <td>{user.phone === 0 ? "Not Included" : `0${user.phone}`}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div>Total number of Admins: {users.filter(user => user.role === "admin").length}</div>
                                    </>
                                )
                            }
                            {/* conditionally render orders reports */}
                            {
                                activeButton === "orders" && (
                                    <>
                                        <h2 className="title">Orders</h2>
                                        <div className="table-btns">
                                            <div className="" >
                                                <button onClick={() => setOrderFilter('all')}>All orders</button>
                                                <button onClick={() => setOrderFilter('pending')}>Pending orders</button>
                                                <button onClick={() => setOrderFilter('completed')}>Completed orders</button>
                                            </div>
                                            <button onClick={handlePrint}>Print Report</button>
                                        </div>
                                        <h2 className="title">{orderFilter} Orders </h2>
                                        {filteredOrders.length === 0 ? <p>No orders available</p> :
                                            <table id="table">
                                                <thead>
                                                    <tr>
                                                        <th>Order Id</th>
                                                        <th>Order Name</th>
                                                        <th>User Id</th>
                                                        <th>Ordered by</th>
                                                        <th>Quantity</th>
                                                        <th>Price Per Unit</th>
                                                        <th>Total Price</th>
                                                        <th>Purchased on</th>
                                                        <th>Order Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredOrders.map(order => (
                                                            <tr key={order.order_id}>
                                                                <td>{order.order_id}</td>
                                                                <td>{order.name}</td>
                                                                <td>{order.user_id}</td>
                                                                <td>{order.username}</td>
                                                                <td>{order.quantity}</td>
                                                                <td>{order.price_per_unit} KES</td>
                                                                <td>{order.quantity * order.price_per_unit} KES</td>
                                                                <td>{`${new Date(order.order_date).toLocaleDateString().split('/')[1]}/${new Date(order.order_date).toLocaleDateString().split('/')[0]}/${new Date(order.order_date).toLocaleDateString().split('/')[2]}`}</td>

                                                                <td>{order.status}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        }
                                        <div>
                                            <h3>Subtotals By Bike:</h3>
                                            {bikeSubtotals.map(({ bikeName, totalQuantity, totalPrice }) => (
                                                <div key={bikeName} className="subtotals">
                                                    <h3>{bikeName}</h3>
                                                    <p>Total Quantity: {totalQuantity}</p>
                                                    <p>Total Price: {totalPrice} KES</p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )
                            }
                            {/* Conditionally render the bikes */}
                            {
                                activeButton === "bikes" && (
                                    <>
                                        <h2 className="title">Bikes</h2>
                                        <div className="table-btns">
                                            <div className="">
                                                <button onClick={() => setBikeFilter('all')}>All bikes</button>
                                                <button onClick={() => setBikeFilter('in-stock')}>In-Stock</button>
                                                <button onClick={() => setBikeFilter('out-of-stock')}>Out of Stock</button>
                                                <button onClick={() => setBikeFilter('deleted')}>Deleted Bikes</button>
                                            </div>
                                            <button onClick={handlePrint}>Print Report</button>
                                        </div>
                                        <h2 className="title">{bikeFilter} Bikes</h2>
                                        {
                                            filteredBikes.length === 0 ? <p>No bikes available</p> :
                                                (<>

                                                    <table id="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Bike Id</th>
                                                                <th>Name</th>
                                                                <th>Image</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                                <th>Description</th>
                                                                <th>Category</th>
                                                                <th>Added on</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredBikes.map(bike => (
                                                                <tr key={bike.id}>
                                                                    <td>{bike.id}</td>
                                                                    <td>{bike.name}</td>
                                                                    <td><img className="bike-report-image" src={bike.image} /></td>
                                                                    <td>{bike.price} KES</td>
                                                                    <td>{bike.quantity}</td>
                                                                    <td>{bike.description}</td>
                                                                    <td>{bike.category}</td>
                                                                    <td>{`${new Date(bike.date_added).toLocaleDateString().split('/')[1]}/${new Date(bike.date_added).toLocaleDateString().split('/')[0]}/${new Date(bike.date_added).toLocaleDateString().split('/')[2]}`}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div>Total number of Bikes: {filteredBikes.length}</div>
                                                </>)
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AdminReports;
