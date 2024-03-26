import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageSidebar from "../Components/AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";
import './CSS/AdminManageBikes.css'
import { ToastContainer, toast } from "react-toastify";

const AdminManageBikes = () => {
    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        setUserId(userId);
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                const activeBikes = data.filter(bike => bike.status === 'active');
                // Set the state with the filtered active bikes
                setBikes(activeBikes);
            });
    });

    const navigate = useNavigate();


    //function to handle deletion of bike
    const deleteProduct = (productId) => {
        fetch(`http://localhost:3000/products/${productId}/delete`, {
            method: 'PUT'
        })
            .then(response => {
                if (response.ok) {
                    // console.log('Product status changed to deleted');
                    toast.success('Product deleted successfully')
                    // Handle success as needed, e.g., update UI
                } else {
                    // console.error('Failed to change product status:', response.statusText);
                    toast.error('Failed to delete product')
                    // Handle error appropriately, e.g., show error message
                }
            })
            .catch(error => {
                console.error('Error changing product status:', error);
                toast.error('Failed to delete product', error)
                // Handle error appropriately, e.g., show error message
            });
    };




    return (
        <div>
            <ToastContainer />
            <div className='profile-container'>
                <AdminPageSidebar userId={userId} />
                <div className="main-content">
                    <div className="right-admin-section">
                        <div className="right-admin-section-container"> <h2>Bikes</h2>
                            <button>Add New Bikes</button>
                        </div>

                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Bike ID</th>
                                    <th>Bike Name</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Date added</th>
                                    <th>Price </th>
                                    <th>Manage Order</th>

                                </tr>
                            </thead>
                            <tbody>
                                {bikes.map(bike => (
                                    <tr key={bike.id}>
                                        <td>{bike.id}</td>
                                        <td>{bike.name}</td>
                                        <td><img className="admin-bike-image" src={bike.image} /></td>
                                        <td>{bike.quantity}</td>
                                        <td>{bike.category}</td>
                                        <td>{new Date(bike.date_added).toLocaleDateString()}</td>
                                        <td>{bike.price}</td>
                                        <td><div className="button-container">
                                            <button className='button edit-btn' onClick={() => navigate(`/adminloginpage/${userId}/AdminManageBikes/admineditbikeinfo/${bike.id}`)}>Edit Bike Info</button>
                                            <button className='button update-btn' onClick={() => navigate(`/adminloginpage/${userId}/AdminManageBikes/adminupdatestock/${bike.id}`)} >Update Stock</button>
                                            <button className='button' onClick={() => deleteProduct(bike.id)}>Delete Bike</button>
                                        </div></td>

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
