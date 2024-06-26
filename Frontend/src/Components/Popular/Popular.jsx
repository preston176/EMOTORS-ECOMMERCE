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
                const activeBikes = data.filter(bike => bike.status === 'active');
                setBikes(activeBikes);
                // console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }, []);



    return (
        <div className='popular' id='popular'>
            <h1>EXPLORE</h1>
            <hr />
            <div className="popular-item">
                {bikes.map((item) => (
                    <Item key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.price}
                        category={item.category}
                    />
                )
                )}
            </div>
        </div>
    )
}

export default Popular
