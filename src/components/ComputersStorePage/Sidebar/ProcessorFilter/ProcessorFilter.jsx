import React from "react";
import "./ProcessorFilter.css";

function ProcessorFilter({ processors, selectedProcessor, handleProcessorChange }) {
  return (
    <div className="processor-filter-container">
      <h4>Processor</h4>
      <div className="processor-options">
        {processors.map((processor) => (
          <span key={processor} className="processor-option">
            <input
              type="checkbox"
              id={`processor-${processor}`}
              name={processor}
              checked={selectedProcessor[processor]}
              onChange={handleProcessorChange}
            />
            <label htmlFor={`processor-${processor}`}>{processor}</label>
          </span>
        ))}
      </div>
    </div>
  );
}


export default ProcessorFilter;
