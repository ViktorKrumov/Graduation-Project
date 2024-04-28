import React from "react";
import "./CompanyFilter.css";

function CompanyFilter({ companies, selectedCompany, handleCompanyChange }) {
  return (
    <div className="company-filter-container">
      <h4>Company</h4>
      <div className="company-options">
        {companies.map((company) => (
          <span key={company} className="company-option">
            <input
              type="checkbox"
              id={`company-${company}`}
              name={company}
              checked={selectedCompany[company]}
              onChange={() => handleCompanyChange(company)}
            />
            <label htmlFor={`company-${company}`}>{company}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default CompanyFilter;
