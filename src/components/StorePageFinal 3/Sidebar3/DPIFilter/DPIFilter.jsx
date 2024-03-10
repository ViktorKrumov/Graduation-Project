import React from "react";
import "./DPIFilter.css";

function DPIFilter({ handleDPIFilter }) {
  const DPI_OPTIONS = [
    { label: "All Mice", minDPI: 0, maxDPI: Infinity }, 
    { label: "2000 - 8500 DPI", minDPI: 2000, maxDPI: 8500 },
    { label: "9000 - 10 000 DPI", minDPI: 9000, maxDPI: 10000 },
    { label: "11 0000 - 25 000 DPI", minDPI: 11000, maxDPI: 25000 },
    { label: "26 0000 - 35 000 DPI", minDPI: 26000, maxDPI: 35000 },
  ];

  const handleFilterChange = (minDPI, maxDPI) => {
    handleDPIFilter(minDPI, maxDPI);
  };

  return (
    <div className="dpi-filter-container">
      <h4>DPI Filter</h4>
      <select onChange={(e) => {
          const selectedIndex = parseInt(e.target.value);
          if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < DPI_OPTIONS.length) {
              const selectedOption = DPI_OPTIONS[selectedIndex];
              handleFilterChange(selectedOption.minDPI, selectedOption.maxDPI);
          }
      }}>
        {DPI_OPTIONS.map((option, index) => (
          <option key={index} value={index}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default DPIFilter;
