import React from "react";
import "./PriceFilter3.css";

function PriceFilter2({ priceFilter, handlePriceFilter }) {
  return (
    <div className="price-filter_wrapper">
      <label htmlFor="price-filter">Sort by:</label>
      <select id="price-filter" value={priceFilter} onChange={handlePriceFilter}>
        <option value="default" disabled hidden>
          Select an option
        </option>
        <option value="high-to-low">Highest to lowest</option>
        <option value="low-to-high">Lowest to highest</option>
      </select>
    </div>
  );
}

export default PriceFilter2;
