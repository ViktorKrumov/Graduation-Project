import React from "react";
import "./RefreshRate.css";

function RefreshRateFilter({ refresh_rates, selectedRefreshRate, handleRefreshRateChange }) {
  return (
    <div className="refresh_rate-filter-container">
      <h4>Refresh Rate</h4>
      <div className="refresh_rate-options">
        {refresh_rates.map((refresh_rate) => (
          <span key={refresh_rate} className="refresh_rate-option">
            <input
              type="checkbox"
              id={`refresh_rate-${refresh_rate}`}
              name={refresh_rate}
              checked={selectedRefreshRate[refresh_rate]}
              onChange={() => handleRefreshRateChange(refresh_rate)}
            />
            <label htmlFor={`refresh_rate-${refresh_rate}`}>{refresh_rate}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default RefreshRateFilter;
