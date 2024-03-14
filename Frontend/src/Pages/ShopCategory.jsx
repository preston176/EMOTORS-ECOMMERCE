import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'

import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';


const ShopCategory = (props) => {

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

  // const { all_product } = useContext(ShopContext)
  const [bikes, setBikes] = useState([]);





  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="banner image" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className="shopcategory-products">
        {bikes.map((item, index) => {
          if (props.category === item.category) {
            return (
              <Item
                key={crypto.randomUUID()}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
