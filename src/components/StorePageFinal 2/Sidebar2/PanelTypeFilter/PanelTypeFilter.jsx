import React from "react";
import "./PanelTypeFilter.css";

function PanelTypeFilter({ panel_types, selectedPanelType, handlePanelTypeChange }) {
  return (
    <div className="panel-type-filter-container">
      <h4>Panel Type</h4>
      <div className="panel-type-options">
        {panel_types.map((panel_type) => (
          <span key={panel_type} className="panel-type-option">
            <input
              type="checkbox"
              id={`panel-type-${panel_type}`}
              name={panel_type}
              checked={selectedPanelType[panel_type]}
              onChange={() => handlePanelTypeChange(panel_type)}
            />
            <label htmlFor={`panel-type-${panel_type}`}>{panel_type}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default PanelTypeFilter;
