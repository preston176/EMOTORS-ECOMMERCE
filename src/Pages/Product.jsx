import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import BreadCrumb from '../Components/BreadCrumbs/BreadCrumb';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams(); // This is how you get the parameter from the URL
    const product = all_product.find((e) => e.id === Number(productId)); // This is how you find the product with the given id

    return (
        <div>
            <BreadCrumb product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    );
}

export default Product;
