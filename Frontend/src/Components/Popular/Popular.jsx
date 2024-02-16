import React, { useEffect, useState } from 'react'
import "./Popular.css"
import data_product from './../Assets/data';
import Item from '../Item/Item';

const Popular = () => {

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
                setBikes(data);
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }, []);



    return (
        <div className='popular'>
            <h1>POPULAR</h1>
            <hr />
            <div className="popular-item">
                {bikes.map((item) => (
                    <Item key={crypto.randomUUID()}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.price}
                        old_price={item.old_price}
                    />
                )
                )}
            </div>
        </div>
    )
}

export default Popular
