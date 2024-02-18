
import React from "react";
import "./ColorFilter.css";

function ColorFilter({ colors, colorFilters, handleColorFilterChange }) {
  return (
    <div className="color-filter-container">
      <h4>Color</h4>
      {colors.map((color) => (
        <span key={color}>
          <input
            type="checkbox"
            id={`color-${color}`}
            name={color}
            checked={colorFilters[color]}
            onChange={handleColorFilterChange}
          />
          <label htmlFor={`color-${color}`}>{color}</label>
        </span>
      ))}
    </div>
  );
}

export default ColorFilter;
