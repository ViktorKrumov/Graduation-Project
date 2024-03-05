import React, { useState } from "react";
import SelectCategory from "./SelectCategory/SelectCategory";
import ColorFilter from "./ColorFIlter/ColorFIlter";
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter";
import ProcessorFilter from "./ProcessorFilter/ProcessorFilter"; 
import GraphicsCardFilter from "./GraphicCard/GraphicCard"; 
import "./Sidebar.css";

function Sidebar({ categories, checkBoxState, handleCheckBox, colors, colorFilters, handleColorFilterChange, handlePriceRangeFilter, processors, selectedProcessor, handleProcessorChange, graphicCards, selectedGraphicCard, handleGraphicCardChange }) { // Include graphicsCards, selectedGraphicsCard, and handleGraphicsCardChange props
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
        <ProcessorFilter 
          processors={processors}
          selectedProcessor={selectedProcessor}
          handleProcessorChange={handleProcessorChange}
        />
        <GraphicsCardFilter 
          graphicsCards={graphicCards}
          graphicCardFilters={selectedGraphicCard}
          handleGraphicCardChange={handleGraphicCardChange}
        />
      </div>
    </div>
  );
}

export default Sidebar;
