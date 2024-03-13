import React from "react";
import { Link } from "react-router-dom";
import "./ProductOfTheYearMonitor.css";

const ProductOfTheYear = () => {
    return (
        <div className="product-of-the-year-container">
            <div className="product-of-the-year-inner-container">
                <div className="product-of-the-year-row">
                    <div className="product-of-the-year-column">
                        <img src="https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/monitor2.png?alt=media&token=6642ee3f-c162-4697-99bd-2b22d5a11f29" alt="Product Image" className="product-of-the-year-img" />
                    </div>
                    <div className="product-of-the-year-column">
                        <h1>Acer Nitro VG270Ebmiix</h1>
                        <p>Discover why the Acer Nitro VG270Ebmiix has been awarded as the Monitor of the Year. With its stunning 27-inch Full HD display and lightning-fast response time, it offers an immersive gaming experience like no other. Explore more to see why it's the top choice for gamers.</p>
                        <div className="product-of-the-year-buy-container">
                            <Link to="/product/Acer Nitro VG270Ebmiix" className="product-of-the-year-buy-button">See More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOfTheYear;
