import React from 'react';
import "./DescriptionBox.css";

const DescriptionBox = ({ description }) => {
    return (
        <div className='description-box'>
            <div className="description-box-navigator">
                <div className="description-box-nav-box">
                    <p>Description</p>
                </div>
                <div className="description-box-nav-box fade">
                    <p>Reviews (122)</p>
                </div>
            </div>
            <div className="description-box-description">
                <p>{description}</p>

            </div>
        </div>
    );
}

export default DescriptionBox;
