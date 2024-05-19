import React from "react";
import "./OutputFilter.css";

function OutputFilter({ outputTypes, selectedOutputType, handleOutputTypeChange }) {
  return (
    <div className="output-filter-container">
      <h4>Output Type</h4>
      <div className="output-type-options">
        {outputTypes.map((outputType) => (
          <span key={outputType} className="output-type-option">
            <input
              type="checkbox"
              id={`output-type-${outputType}`}
              name={outputType}
              checked={selectedOutputType[outputType]}
              onChange={handleOutputTypeChange}
            />
            <label htmlFor={`output-type-${outputType}`}>{outputType}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default OutputFilter;
