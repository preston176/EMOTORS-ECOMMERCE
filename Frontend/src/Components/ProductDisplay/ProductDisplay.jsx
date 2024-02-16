import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useNavigate } from 'react-router-dom'


const ProductDisplay = (props) => {
    const { product } = props;
    // const { addToCart } = useContext(ShopContext)
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate(`/product/${id}/confirm-order`)
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                </div>
                <div className="productdisplay-right-prices">
                    {/* <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div> */}
                    <div className="productdisplay-right-price-new">
                        ${product.price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                {/* <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-size-sizes">
                        <div className="">S</div>
                        <div className="">M</div>
                        <div className="">L</div>
                        <div className="">XL</div>
                        <div className="">XXL</div>
                    </div>
                </div> */}
                <button onClick={() => handleNavigate(product.id)}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span>{product.category}</p>

            </div>
        </div>

    )
}

export default ProductDisplay
