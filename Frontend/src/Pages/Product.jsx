import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import BreadCrumb from '../Components/BreadCrumbs/BreadCrumb';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    // const { all_product } = useContext(ShopContext);
    const { productId } = useParams(); // This is how you get the parameter from the URL
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
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }, []);


    return (
        <div>
            <BreadCrumb product={selectedBike} />
            <ProductDisplay product={selectedBike} />
            {/* <DescriptionBox description={selectedBike.description} /> */}
            <RelatedProducts />
        </div>
    );
}

export default Product;
