import React from "react";
import "./GraphicCard.css";

function GraphicCardFilter({ graphicCards, selectedGraphicCard, handleGraphicCardChange }) {

  return (
    <div className="graphic-card-filter-container">
      <h4>Graphics Card</h4>
      <div className="graphic-card-options">
        {graphicCards.map((graphicCard) => (
          <span key={graphicCard} className="graphic-card-option">
            <input
              type="checkbox"
              id={`graphic-card-${graphicCard}`}
              name={graphicCard}
              checked={selectedGraphicCard[graphicCard]}
              onChange={handleGraphicCardChange}
            />
            <label htmlFor={`graphic-card-${graphicCard}`}>{graphicCard}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default GraphicCardFilter;
