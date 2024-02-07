import React from 'react'
import "./NewCollections.css"
import new_collections from './../Assets/new_collections';
import Item from '../Item/Item';

const NewCollections = () => {
    return (
        <div className='new-collections'>
            <h1>NEW COLLECITONS</h1>
            <hr />
            <div className="collections">
                {new_collections.map((item) => (
                    <Item 
        key={crypto.randomUUID()}
        id={item.id}
        name={item.name}
        image={item.image}
        new_price={item.new_price}
        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewCollections
