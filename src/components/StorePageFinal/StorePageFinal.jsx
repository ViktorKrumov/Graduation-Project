import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../StorePageFinal/ProductCard/ProductCard";
import { fetchData } from "../api";
import "./StorePageFinal.css";

import SelectCategory from "../StorePageFinal/SelectCategory/SelectCategory";
import PriceFilter from "./PriceFilter/PriceFilter"; 


function StorePageFinal() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState({});
  const [priceFilter, setPriceFilter] = useState("default"); 
//   const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetchData();
        setOriginalProducts(res);
        setProducts(res);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  const categories = Array.from(new Set(originalProducts.map(product => product.category)));

  useEffect(() => {
    function filterProducts() {
      let filteredProducts = [...originalProducts];

      
      const selectedCategories = Object.keys(categoryFilters).filter(category => categoryFilters[category]);
      if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
      }

      
      switch (priceFilter) {
        case "low-to-high":
          filteredProducts.sort((a, b) => a.original_price - b.original_price);
          break;
        case "high-to-low":
          filteredProducts.sort((a, b) => b.original_price - a.original_price);
          break;
        default:
          break;
      }

      setProducts(filteredProducts);
    }
    filterProducts();
  }, [categoryFilters, originalProducts, priceFilter]);

  function handleCategoryFilterChange(e) {
    const { name, checked } = e.target;
    setCategoryFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
  }

  function handlePriceFilter(e) {
    setPriceFilter(e.target.value);
  }

  return (
    <main className="product-main">
      
        <>
          <SelectCategory
            categories={categories}
            checkBoxState={categoryFilters}
            handleCheckBox={handleCategoryFilterChange}
          />
          <PriceFilter priceFilter={priceFilter} handlePriceFilter={handlePriceFilter} /> 
          <div className="products-container">
            {products.map((product) => (
              <ProductCard product={product} key={product.id}  /> //addToCart={addToCart}
            ))}
          </div>
        </>
      
    </main>
  );
}



export default StorePageFinal;
