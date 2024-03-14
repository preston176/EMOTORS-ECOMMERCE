import React, { useEffect, useState } from 'react'
import "./NewCollections.css"
import new_collections from './../Assets/new_collections';
import Item from '../Item/Item';

const NewCollections = () => {

    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                const sortedBikes = data.sort((a, b) => {
                    return new Date(b.date_added) - new Date(a.date_added);
                });
                setBikes(sortedBikes);
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }, []);


    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {bikes.map((item) => (
                    <Item
                        key={crypto.randomUUID()}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.price}

                    />
                ))}
            </div>
        </div>
    )
}

export default NewCollections
