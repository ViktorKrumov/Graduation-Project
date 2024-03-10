import React from "react";
import "./WeightFilter.css";

const WEIGHT_RANGES = [
  { label: "All Mice", minWeight: 0, maxWeight: 200 }, 
  { label: "0 - 50 grams", minWeight: 0, maxWeight: 50 },
  { label: "51 - 100 grams", minWeight: 51, maxWeight: 100 },
  { label: "101 - 150 grams", minWeight: 101, maxWeight: 150 },
  { label: "151 - 200 grams", minWeight: 151, maxWeight: 200 },
  { label: "201+ grams", minWeight: 201, maxWeight: Infinity },
];

function WeightFilter({ handleWeightFilter }) {
  const handleFilterChange = (minWeight, maxWeight) => {
    handleWeightFilter(minWeight, maxWeight);
  };

  return (
    <div className="weight-filter-container">
      <h4>Weight Filter</h4>
      <select onChange={(e) => {
          const selectedIndex = parseInt(e.target.value);
          if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < WEIGHT_RANGES.length) {
              const selectedOption = WEIGHT_RANGES[selectedIndex];
              handleFilterChange(selectedOption.minWeight, selectedOption.maxWeight);
          }
      }}>
        {WEIGHT_RANGES.map((option, index) => (
          <option key={index} value={index}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default WeightFilter;
