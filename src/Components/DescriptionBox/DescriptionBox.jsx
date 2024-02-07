import React from 'react';
import "./DescriptionBox.css";

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">
                    <p>Description</p>
                </div>
                <div className="descriptionbox-nav-box fade">
                    <p>Reviews (122)</p>
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>an ecommerce errherehr</p>
                <p>huuhuh</p>
            </div>
        </div>
    );
}

export default DescriptionBox;
