import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminPageSidebar from "./AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";
import './CSS/AdminManageBikes.css'
import './CSS/AdminEditBikeInfo.css'
import { toast, ToastContainer } from "react-toastify";

const AdminEditBikeInfo = () => {
    const { userId } = useParams();
    const { productId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    const [imageFile, setImageFile] = useState(null);
    const [selectedBike, setSelectedBike] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        image_url: '',
        quantity: 0
    });

    useEffect(() => {
        setUserId(userId);
        fetch(`http://localhost:3000/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                setSelectedBike(data);
            });
    }, [productId]);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedBike.quantity <= 0 || selectedBike.price <= 0) {
            // alert('Quantity and price must be greater than 0');
            toast.error('Quantity and price must be greater than 0');
            return;
        }
        // validate other fields
        if (!selectedBike.name || !selectedBike.description || !selectedBike.category) {
            // alert('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }
        const formData = new FormData();
        formData.append('name', selectedBike.name);
        formData.append('quantity', selectedBike.quantity);
        formData.append('description', selectedBike.description);
        formData.append('price', selectedBike.price);
        formData.append('category', selectedBike.category);
        formData.append('image_url', selectedBike.name);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data); // Handle success or error
                toast.success('Product data updated successfully', data);
            })
            .catch(error => {
                // console.error('Error updating product data:', error);
                toast.error('Error updating product data:', error);
            });
    };

    return (
        <div>
            <ToastContainer />
            <div className='profile-container'>
                <AdminPageSidebar userId={userId} />
                <div className="main-content">
                    <div className="right-admin-section">
                        <h2>Edit Bike Info</h2>
                        <form className="admin-bikes-form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <label >
                                <span>Name:</span>
                                <input
                                    type="text"
                                    id="name"
                                    value={selectedBike.name}
                                    onChange={(e) => setSelectedBike(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))}
                                />
                            </label>

                            <label htmlFor="quantity">
                                <span>Quantity (in Stock):</span>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={selectedBike.quantity}
                                    onChange={(e) => {
                                        if (e.target.value < 0) {
                                            return;
                                        }

                                        setSelectedBike(prevState => ({
                                            ...prevState,
                                            quantity: e.target.value
                                        }))
                                    }
                                    }
                                />
                            </label>

                            <label htmlFor="description">
                                <span>Description:</span>
                                <textarea name="description" value={selectedBike.description} onChange={(e) => setSelectedBike(prevState => ({
                                    ...prevState,
                                    description: e.target.value
                                }))}></textarea>
                            </label>

                            <label htmlFor="price">
                                <span>Price:</span>
                                <input type="number" name="price" value={selectedBike.price} onChange={e => setSelectedBike(prevState => ({
                                    ...prevState,
                                    price: e.target.value
                                }))} placeholder="Enter the price" />
                            </label>

                            <label htmlFor="category">
                                <span>Category:</span>
                                <select id="category" name="category" value={selectedBike.category} onChange={(e) => setSelectedBike(prevState => ({
                                    ...prevState,
                                    category: e.target.value
                                }))}>
                                    <option value="casual">Casual</option>
                                    <option value="sports">Sports</option>
                                    <option value="kids">Kids</option>
                                </select>
                            </label>

                            <label htmlFor="image">
                                <span>Select Image:</span>
                                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} />
                            </label>

                            <img src={`http://localhost:3000/images/${selectedBike.image_url}`} alt="Bike1" />

                            <button onClick={handleSubmit}>Update Info</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminEditBikeInfo
