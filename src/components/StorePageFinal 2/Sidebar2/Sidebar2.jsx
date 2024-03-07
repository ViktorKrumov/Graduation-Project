import React, { useState } from "react";

import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter";
import RefreshRateFilter from "./RefreshRateFilter/RefreshRateFilter";
import CompanyFilter from "./CompanyFIlter2/CompanyFIlter";
import "./Sidebar2.css";

function Sidebar({ handlePriceRangeFilter, companies, selectedCompany, handleCompanyChange, refresh_rates, selectedRefreshRate, handleRefreshRateChange }) {
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

        <RefreshRateFilter 
          refresh_rates={refresh_rates}
          selectedRefreshRate={selectedRefreshRate}
          handleRefreshRateChange={handleRefreshRateChange}
        />
      </div>
    </div>
  );
}

export default Sidebar;
