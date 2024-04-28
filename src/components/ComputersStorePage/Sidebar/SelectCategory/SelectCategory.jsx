import React, { useState } from "react";
import "./SelectCategory.css";

function SelectCategory({ categories, checkBoxState, handleCheckBox }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCategoryClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="select-category_container">
      <h4 onClick={handleCategoryClick}>Category</h4>
      <div className={isOpen ? "open" : ""}>
        {categories.map((category, index) => (
          <span className={`category-option category-${index % 5}`} key={category}> 
            <input
              type="checkbox"
              id={`category-${category}`}
              name={category}
              checked={checkBoxState[category]}
              onChange={handleCheckBox}
            />
            <label htmlFor={`category-${category}`}>{category}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
