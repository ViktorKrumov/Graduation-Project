import React from "react";
import SelectCategory from "./SelectCategory/SelectCategory";
import ColorFilter from "./ColorFIlter/ColorFIlter";
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter"; 
import "./Sidebar.css";

function Sidebar({ categories, checkBoxState, handleCheckBox, colors, colorFilters, handleColorFilterChange, handlePriceRangeFilter }) {
  return (
    <div className="sidebar">
      <SelectCategory
        categories={categories}
        checkBoxState={checkBoxState}
        handleCheckBox={handleCheckBox}
      />
      <ColorFilter 
        colors={colors}
        colorFilters={colorFilters}
        handleColorFilterChange={handleColorFilterChange}
      />
      <PriceRangeFilter handlePriceRangeFilter={handlePriceRangeFilter} /> 
    </div>
  );
}

export default Sidebar;
