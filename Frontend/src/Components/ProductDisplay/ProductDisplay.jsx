import React, { useContext, useEffect, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../../Context/UserAuthContext'


const ProductDisplay = ({ product }) => {
    // const { product } = props;
    const { quantity, setQuantity } = useContext(UserAuthContext);
    // const { addToCart } = useContext(ShopContext)

    // set quantity to 1 on page loading or 0 when stock isn't available
    useEffect(() => {
        if (product.quantity > 0) {
            setQuantity(1);
            return;
        } setQuantity(0)

    }, [product.id]);

    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate(`/product/${id}/confirm-order`)
    }

    // functions to add or reduce quantity
    const handleReduceQty = () => {

        if (quantity <= 0) {
            return;
        }
        setQuantity(prevQuantity => prevQuantity - 1);
        return;
    }
    const handleIncreaseQty = () => {

        if (quantity === product.quantity) {
            alert("Out of stock");
            return;
        }
        setQuantity(prevQuantity => prevQuantity + 1);
        return;

    }


    return (
        <div className='product-display'>
            <div className="product-display-left">
                {/* <div className="product-display-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div> */}
            </div>
            <div className="product-display-img">
                <img className='product-display-main-img' src={product.image} alt="" />
            </div>
            <div className="product-display-right">
                <h1>{product.name}</h1>
                <div className="product-display-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                </div>
                <div className="product-in-stock">
                    <span>In stock: </span> {product.quantity}
                </div>
                <div className="product-display-quantity">
                    <h4>Quantity:</h4>
                    <div className="product-quantity">
                        <button className='qty-dec' onClick={handleReduceQty}>-</button>
                        <div className="qty">{quantity}</div>
                        <button className='qty-inc' onClick={handleIncreaseQty}>+</button>
                    </div>
                </div>
                <div className="product-display-right-prices">
                    <div className="product-display-right-price-new">
                        <span>Price</span> Kes{product.price}
                        <div className="price-desc">Per quantity</div>
                    </div>
                </div>

                <hr />
                <div className="product-display-right-prices">
                    <div className="product-display-right-price-total">
                        <span>Total</span> Kes{product.price * quantity}
                        <div className="price-desc">To be paid</div>
                    </div>
                </div>
                <div className="product-display-right-description">
                    <h4>Description: </h4>
                    <p>{product.description}</p>

                </div>

                {/* <div className="product-display-right-size">
                    <h1>Select Size</h1>
                    <div className="product-display-size-sizes">
                        <div className="">S</div>
                        <div className="">M</div>
                        <div className="">L</div>
                        <div className="">XL</div>
                        <div className="">XXL</div>
                    </div>
                </div> */}
                {/* <button onClick={() => handleNavigate(product.id)}>Purchase</button> */}
                {product.quantity ? (<button onClick={() => handleNavigate(product.id)}>Purchase</button>) : (<button className='btn-disabled' disabled>Out of Stock </button>)}
                <p className='product-display-right-category'><span>Category :</span>{product.category}</p>

            </div>

        </div>

    )
}

export default ProductDisplay
