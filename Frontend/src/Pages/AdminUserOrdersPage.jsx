import { useEffect, useState } from 'react'
import './CSS/AdminUserOrdersPage.css'
import AdminPageSidebar from './AdminPageSidebar';
import { useParams } from 'react-router-dom';


const AdminUserOrdersPage = () => {

    const { userId } = useParams();

    const [userOrders, setUserOrders] = useState([])
    const fetchUserOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/orders'); // Assuming your API endpoint for fetching orders is '/orders'
            if (!response.ok) {
                throw new Error('Failed to fetch user orders');
            }
            const data = await response.json();

            setUserOrders(data);
        } catch (error) {
            console.error('Error fetching user orders:', error);
            // Handle error, show a message, etc.
        }
    };


    useEffect(() => {

        fetchUserOrders();
    }, []);

    const handleProcessOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}/complete`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to process order');
            }
            // Refresh user orders after processing
            fetchUserOrders();
        } catch (error) {
            console.error('Error processing order:', error);
            // Handle error, show a message, etc.
        }
    };


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
                                {userOrders.map(order => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.user_id}</td>
                                        <td>{order.username}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price_per_unit}</td>
                                        <td>{order.quantity * order.price_per_unit}</td>
                                        <td>{`${new Date(order.order_date).toLocaleDateString().split('/').join('/')}`}</td>
                                        <td>{order.status}</td>
                                        {order.status === 'Pending' &&
                                            <td>
                                                <div className="button-container">
                                                    <button onClick={() => handleProcessOrder(order.order_id)} className='button'>Process Order</button>
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

export default AdminUserOrdersPage
