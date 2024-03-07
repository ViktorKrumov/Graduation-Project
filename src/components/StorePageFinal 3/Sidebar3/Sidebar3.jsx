import React, { useState } from "react";

import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter";

import CompanyFilter from "./CompanyFIlter3/CompanyFIlter";
import "./Sidebar3.css";

function Sidebar({ categories, checkBoxState, handleCheckBox, colors, colorFilters, handleColorFilterChange, handlePriceRangeFilter, processors, selectedProcessor, handleProcessorChange, graphicCards, selectedGraphicCard, handleGraphicCardChange, companies, selectedCompany, handleCompanyChange }) {
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
        
        <PriceRangeFilter handlePriceRangeFilter={handlePriceRangeFilter} />
        <CompanyFilter 
          companies={companies}
          selectedCompany={selectedCompany}
          handleCompanyChange={handleCompanyChange}
        />
      </div>
    </div>
  );
}

export default Sidebar;
