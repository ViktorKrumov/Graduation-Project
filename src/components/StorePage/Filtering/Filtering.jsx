import React, { useState, useEffect } from 'react';

const Filtering = ({ handleOrderChange }) => {
  const [selectedOrder, setSelectedOrder] = useState('default');

  const handleOrderSelection = (event) => {
    const order = event.target.value;
    setSelectedOrder(order);
    handleOrderChange(order);
  };

  return (
    <>
      <h1>Order by</h1>
      <label htmlFor="order">Order by:</label>
      <select id="order" value={selectedOrder} onChange={handleOrderSelection}>
        <option value="default">Default</option>
        <option value="price-low-to-high">Price: Low to High</option>
        <option value="price-high-to-low">Price: High to Low</option>
        {/* Add more ordering options as needed */}
        {/* <option value="name-ascending">Name: A to Z</option>
        <option value="name-descending">Name: Z to A</option>
        <option value="rating-high-to-low">Rating: High to Low</option>
        <option value="rating-low-to-high">Rating: Low to High</option> */}
      </select>
    </>
  );
};

export default Filtering;
