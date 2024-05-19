import React from "react";
import './ScreenSizeFilter.css';

function ScreenSizeFilter({ screen_sizes, selectedScreenSize, handleScreenSizeChange }) {
    const sortedScreenSizes = screen_sizes.sort((a, b) => parseFloat(a) - parseFloat(b));
  return (
    <div className="screen-size-filter-container">
      <h4>Screen Size</h4>
      <div className="screen-size-options">
        {sortedScreenSizes.map((size) => (
          <span key={size} className="screen-size-option">
            <input
              type="checkbox"
              id={`screen-size-${size}`}
              name={size}
              checked={selectedScreenSize[size]}
              onChange={handleScreenSizeChange}
            />
            <label htmlFor={`screen-size-${size}`}>{size}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ScreenSizeFilter;
