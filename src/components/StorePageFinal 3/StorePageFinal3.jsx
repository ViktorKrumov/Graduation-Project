import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard3/ProductCard3";
import { fetchData } from "../api4";
import PriceFilter2 from "./PriceFilter3/PriceFilter3"; 

function StorePageFinal() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState("default");

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetchData();
        setProducts(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handlePriceFilter = (event) => {
    setPriceFilter(event.target.value);
  };

  const sortedProducts = () => {
    if (priceFilter === "high-to-low") {
      return [...products].sort((a, b) => b.original_price - a.original_price);
    } else if (priceFilter === "low-to-high") {
      return [...products].sort((a, b) => a.original_price - b.original_price);
    } else {
      return products;
    }
  };

  return (
    <main className="product-main">
      <PriceFilter2 priceFilter={priceFilter} handlePriceFilter={handlePriceFilter} /> 
      <div className="products-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          sortedProducts().map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        )}
      </div>
    </main>
  );
}

export default StorePageFinal;
