import React, { useState } from "react";
import SelectCategory from "./SelectCategory/SelectCategory";
import ColorFilter from "./ColorFIlter/ColorFIlter";
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter";
import "./Sidebar.css";

function Sidebar({ categories, checkBoxState, handleCheckBox, colors, colorFilters, handleColorFilterChange, handlePriceRangeFilter }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`sidebar ${sidebarVisible ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {sidebarVisible ? "Close" : "Open"} Filter
      </button>
      <div className="sidebar-content">
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
    </div>
  );
}

export default Sidebar;
