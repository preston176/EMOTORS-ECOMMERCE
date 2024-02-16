import React, { useState, useEffect } from 'react';
import CartItems from '../Components/CartItems/CartItems';
import { useParams } from 'react-router-dom';
import "./CSS/ConfirmOrder.css";

const ConfirmOrder = () => {
    const { productId } = useParams();
    const [selectedBike, setSelectedBike] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${productId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setSelectedBike(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [productId]); // Ensure that the effect runs when productId changes

    return (
        <div className='confirm-order'>
            <h2>Thank You for Shopping with us</h2>
            <p>Here is a summary of your order details</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{selectedBike.id}</td>
                        <td>{selectedBike.name}</td>
                        <td>{/* You need to render the quantity */}</td>
                        <td>{selectedBike.price}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ConfirmOrder;
