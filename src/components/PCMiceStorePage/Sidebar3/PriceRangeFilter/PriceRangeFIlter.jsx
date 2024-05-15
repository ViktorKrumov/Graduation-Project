import React, { useState } from "react";
import { toast} from 'react-toastify';
import "./PriceRangeFilter.css";

function PriceRangeFilter({ handlePriceRangeFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterClick = () => {
    if (minPrice !== "" && maxPrice !== "" && parseInt(minPrice) > parseInt(maxPrice)) {
        toast.error("Minimum price cannot be greater than maximum price!");
        return;
    }
    handlePriceRangeFilter(minPrice, maxPrice);
};

  const handleClearClick = () => {
   
    setMinPrice("");
    setMaxPrice("");
   
    handlePriceRangeFilter("", "");
  };

  return (
    <div className="price-range-filter-container">
      <h4>Price Range</h4>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
     <button className="apply-button" onClick={handleFilterClick}>Apply</button>
      <button className="clear-button" onClick={handleClearClick}>Clear</button>
    </div>
  );
}

export default PriceRangeFilter;
