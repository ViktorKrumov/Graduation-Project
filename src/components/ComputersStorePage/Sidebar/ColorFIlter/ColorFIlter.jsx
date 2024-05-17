import React, { useState } from "react";
import "./ColorFilter.css";

function ColorFilter({ colors, colorFilters, handleColorFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="color-filter-container">
      <h4 onClick={toggleDropdown}>Color</h4>
      <div className={`color-options${isOpen ? " open" : ""}`}>
        {colors.map((color) => (
          <span key={color} className="color-option">
            <input
              type="checkbox"
              id={`color-${color}`}
              name={color}
              checked={colorFilters[color]}
              onChange={handleColorFilterChange}
            />
            <label htmlFor={`color-${color}`} style={{ color: color, textShadow: color === 'White' ? '2px 2px 2px rgba(0,0,0,2)' : 'none' }}>{color}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ColorFilter;
