import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminPageSidebar from "../Components/AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";


const AdminManageBikes = () => {
    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);

    useEffect(() => {
        setUserId(userId);
    }, []);

    const [bikes, setBikes] = useState([]);


    return (
        <div>
            <div className='profile-container'>
                <AdminPageSidebar userId={userId} />
                <div className="main-content">
                    <div className="right-admin-section">
                        <h2>User Orders</h2>
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Name</th>
                                    <th>User ID</th>
                                    <th>Ordered by</th>
                                    <th>Quantity</th>
                                    <th>Price Per Unit</th>
                                    <th>Total Price</th>
                                    <th>Purchased on</th>
                                    <th>Order Status</th>

                                    <th>Manage Order</th>

                                </tr>
                            </thead>
                            <tbody>
                                {bikes.map(order => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.user_id}</td>
                                        <td>{order.username}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price_per_unit}</td>
                                        <td>{order.quantity * order.price_per_unit}</td>
                                        <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                        <td>{order.status}</td>
                                        {order.status === 'Pending' &&
                                            <td>
                                                <div className="button-container">
                                                    <button className='button'>Process Order</button>
                                                    <button className='button'>Cancel Order</button>
                                                </div>
                                            </td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminManageBikes
