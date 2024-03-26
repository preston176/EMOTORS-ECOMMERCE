import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
    return (
        <div className='item'>
            <Link to={`/product/${props.id}`} className='item-link'>
                <img onClick={window.scrollTo(0, 0)} src={props.image} alt="item_image" className='item-image' />
                <div className="item-details">
                    <p className='item-name'>{props.name}</p>
                    <div className="item-prices">
                        <div className="item-category">
                            <p>Category:  <span>{props.category}</span></p>
                        </div>
                        <div className="item-price-new">
                            KSH {props.new_price}
                        </div>
                    </div>
                    <button className='item-btn'>Buy Now</button>
                </div>
            </Link>
        </div>
    );
};

export default Item;
