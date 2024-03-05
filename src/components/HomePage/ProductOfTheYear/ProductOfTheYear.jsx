

import React from "react";
import { Link } from "react-router-dom";
import "./ProductOfTheYear.css";

const ProductOfTheYear = () => {
    return (
        <div className="offer">
            <div className="small-container">
                <div className="row">
                    <div className="col-2">
                        <img src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc8.png?raw=true" alt="Product Image" className="offer-img" />
                    </div>
                    <div className="col-2">
                        <h1>Product of the year</h1>
                        <small>The Mi Smart Band 4 features a 39.9% larger (than Mi Band 3) AMOLED color full-touch display with adjustable brightness, so everything is clear as can Yas ae</small>
                        <div className="buy-now-container">
                            <Link to="/product/8" className="buy-now-button">See more</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOfTheYear;
