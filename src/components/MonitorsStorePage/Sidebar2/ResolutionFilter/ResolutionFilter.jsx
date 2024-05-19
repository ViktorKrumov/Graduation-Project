import React from "react";
import "./ResolutionFilter.css";

function ResolutionFilter({ resolutions, selectedResolution, handleResolutionChange }) {
  return (
    <div className="resolution-filter-container">
      <h4>Resolution</h4>
      <div className="resolution-options">
        {resolutions.map((resolution) => (
          <span key={resolution} className="resolution-option">
            <input
              type="checkbox"
              id={`resolution-${resolution}`}
              name={resolution}
              checked={selectedResolution[resolution]}
              onChange={handleResolutionChange}
            />
            <label htmlFor={`resolution-${resolution}`}>{resolution}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ResolutionFilter;
