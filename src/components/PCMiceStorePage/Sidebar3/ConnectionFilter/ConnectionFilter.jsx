import React from "react";
import "./ConnectionFilter.css";

function ConnectionFilter({ connections, selectedConnections, handleConnectionChange }) {
  return (
    <div className="connection-filter-container">
      <h4>Connection</h4>
      <div className="connection-options">
        {connections.map((connection) => (
          <span key={connection} className="connection-option">
            <input
              type="checkbox"
              id={`connection-${connection}`}
              name={connection}
              checked={selectedConnections[connection]}
              onChange={handleConnectionChange}
            />
            <label htmlFor={`connection-${connection}`}>{connection}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ConnectionFilter;
