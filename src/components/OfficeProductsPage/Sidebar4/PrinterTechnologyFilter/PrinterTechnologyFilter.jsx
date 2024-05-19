import React from "react";
import "./PrinterTechnologyFilter.css";

function PrinterTechnologyFilter({ printerTechnologies, selectedPrinterTechnology, handlePrinterTechnologyChange }) {
  return (
    <div className="printer-technology-filter-container">
      <h4>Printer Technology</h4>
      <div className="printer-technology-options">
        {printerTechnologies.map((printerTechnology) => (
          <span key={printerTechnology} className="printer-technology-option">
            <input
              type="checkbox"
              id={`printer-technology-${printerTechnology}`}
              name={printerTechnology}
              checked={selectedPrinterTechnology[printerTechnology]}
              onChange={handlePrinterTechnologyChange}
            />
            <label htmlFor={`printer-technology-${printerTechnology}`}>{printerTechnology}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default PrinterTechnologyFilter;
