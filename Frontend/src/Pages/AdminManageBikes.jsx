import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminPageSidebar from "../Components/AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";
import './CSS/AdminManageBikes.css'

const AdminManageBikes = () => {
    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        setUserId(userId);
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                setBikes(data);
            });
    });



    return (
        <div>
            <div className='profile-container'>
                <AdminPageSidebar userId={userId} />
                <div className="main-content">
                    <div className="right-admin-section">
                        <h2>Bikes</h2>
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
                                            <button className='button'>Edit Bike Info</button>
                                            <button className='button'>Update Stock</button>
                                            <button className='button'>Delete Bike</button>
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
