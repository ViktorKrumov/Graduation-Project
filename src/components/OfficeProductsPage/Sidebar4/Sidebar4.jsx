import React, { useState } from "react";

import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFIlter";
import ConnectionFilter from "./ConnectionFilter/ConnectionFilter";
import CompanyFilter from "./CompanyFIlter4/CompanyFIlter";
import OutputFilter from "./OutputFilter/OutputFilter"; 
import PrinterTechnologyFilter from "./PrinterTechnologyFilter/PrinterTechnologyFilter";
import PaperFormatFilter from "./PaperFormatFilter/PaperFormatFilter";

import "./Sidebar4.css";

function Sidebar({ 
  handlePriceRangeFilter,  

  connections, 
  selectedConnections, 
  handleConnectionChange,

  companies,
  selectedCompany,
  handleCompanyChange,

  outputTypes, 
  selectedOutputType, 
  handleOutputTypeChange, 

  printerTechnologies,
  selectedPrinterTechnology,
  handlePrinterTechnologyChange,


  paperFormats,
  selectedPaperFormats,
  handlePaperFormatChange,


}) { 

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
        
        <ConnectionFilter 
          connections={connections}
          selectedConnections={selectedConnections}
          handleConnectionChange={handleConnectionChange}
        />
        
        <CompanyFilter 
          companies={companies}
          selectedCompany={selectedCompany}
          handleCompanyChange={handleCompanyChange}
        />

        <PrinterTechnologyFilter
        printerTechnologies={printerTechnologies}
        selectedPrinterTechnology={selectedPrinterTechnology}
        handlePrinterTechnologyChange={handlePrinterTechnologyChange}
        />

        <PaperFormatFilter
             paperFormats={paperFormats}
             selectedPaperFormats={selectedPaperFormats}
             handlePaperFormatChange={handlePaperFormatChange}
        />
        
       
        <OutputFilter 
          outputTypes={outputTypes}
          selectedOutputType={selectedOutputType}
          handleOutputTypeChange={handleOutputTypeChange}
        />
       
      </div>
    </div>
  );
}

export default Sidebar;
