import React, { useState } from "react";

import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter";
import ColorFilter from "../../StorePageFinal/Sidebar/ColorFIlter/ColorFIlter";
import CompanyFilter from "./CompanyFIlter3/CompanyFIlter";
import ConnectionFilter from "./ConnectionFilter/ConnectionFilter";
import "./Sidebar3.css";

function Sidebar({ colors, colorFilters, handleColorFilterChange, handlePriceRangeFilter,  companies, selectedCompany, handleCompanyChange, connections, selectedConnections, handleConnectionChange }) { 

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
        <ConnectionFilter 
          connections={connections}
          selectedConnections={selectedConnections}
          handleConnectionChange={handleConnectionChange}
        />
        <ColorFilter 
          colors={colors}
          colorFilters={colorFilters}
          handleColorFilterChange={handleColorFilterChange}
        />
      </div>
    </div>
  );
}

export default Sidebar;
