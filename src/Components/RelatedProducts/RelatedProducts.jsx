import React from 'react'
import './RelatedProducts.css'
import data_product from './../Assets/data';
import Item from './../Item/Item';

const RelatedProducts = () => {
    return (
        <div className='relatedproducts'>
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {
                    data_product.map((item, index) => (
                        <Item key={crypto.randomUUID()}
                            id={item.id}
                            name={item.name}
                            old_price={item.old_price}
                            new_price={item.new_price}
                            image={item.image}

                        />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts
