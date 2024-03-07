import React, { useState } from "react";

import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter";
import RefreshRateFilter from "./RefreshRateFilter/RefreshRateFilter";
import CompanyFilter from "./CompanyFIlter2/CompanyFIlter";
import ResolutionFilter from "./ResolutionFilter/ResolutionFilter";
import PanelTypeFilter from "./PanelTypeFilter/PanelTypeFilter"; 
import ScreenSizeFilter from "./ScreenSizeFilter/ScreenSizeFilter";
import "./Sidebar2.css";

function Sidebar({ handlePriceRangeFilter, companies, selectedCompany, handleCompanyChange, refresh_rates, selectedRefreshRate, handleRefreshRateChange, resolutions, selectedResolution, handleResolutionChange, panel_types, selectedPanelType, handlePanelTypeChange, screen_sizes, selectedScreenSize, handleScreenSizeChange   }) {
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

        <ResolutionFilter 
          resolutions={resolutions}
          selectedResolution={selectedResolution}
          handleResolutionChange={handleResolutionChange}
        />

        <PanelTypeFilter 
          panel_types={panel_types}
          selectedPanelType={selectedPanelType}
          handlePanelTypeChange={handlePanelTypeChange}
        />


         <ScreenSizeFilter 
          screen_sizes={screen_sizes}
          selectedScreenSize={selectedScreenSize}
          handleScreenSizeChange={handleScreenSizeChange}
        /> 
      </div>
    </div>
  );
}

export default Sidebar;
