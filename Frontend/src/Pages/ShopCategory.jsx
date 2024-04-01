import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const [bikes, setBikes] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6); // Initial number of items displayed
  const [sortBy, setSortBy] = useState('default'); // Default sorting

  useEffect(() => {
    fetch('http://localhost:3000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setBikes(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // Function to handle "Explore More" button click event
  const handleExploreMore = () => {
    setDisplayedItems(prevCount => prevCount + 6); // Increase by 6 items each time
  };

  // Function to handle sorting
  const handleSortBy = (value) => {
    setSortBy(value);
    let sortedBikes = [...bikes];

    switch (value) {
      case 'price':
        sortedBikes.sort((a, b) => a.price - b.price);
        break;
      case 'name':
        sortedBikes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // Add more cases for other sorting options as needed
      default:
        // Default sorting logic (if any)
        break;
    }

    setBikes(sortedBikes);
  };


  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {props.category} bikes </span>
        </p>
        <div className="shopcategory-sort">
          Sort by
          <select className='sort-select' onChange={(e) => handleSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          
          </select>
          {/* <img src={dropdown_icon} alt='' /> */}
        </div>
      </div>
      <div className="shopcategory-products">
        {bikes
          .filter(item => props.category === item.category)
          .slice(0, displayedItems)
          .map((item, index) => (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              category={item.category}
              new_price={item.price}
            />
          ))}
      </div>
      {displayedItems < bikes.length && (
        <div className="shopcategory-loadmore" onClick={handleExploreMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
