import React from "react";

function PaperFormatFilter({ paperFormats, selectedPaperFormats, handlePaperFormatChange }) {
  if (paperFormats.length === 0 || !selectedPaperFormats) {
    return null; // Render nothing if paperFormats are empty or selectedPaperFormats is not defined
  }

  return (
    <div className="output-filter-container">
      <h4>Paper Format</h4>
      <div className="output-type-options">
        {paperFormats.map((paperFormat) => (
          <span key={paperFormat} className="output-type-option">
            <input
              type="checkbox"
              id={`output-type-${paperFormat}`}
              name={paperFormat}
              checked={selectedPaperFormats[paperFormat] || false}
              onChange={handlePaperFormatChange}
            />
            <label htmlFor={`output-type-${paperFormat}`}>{paperFormat}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default PaperFormatFilter;
