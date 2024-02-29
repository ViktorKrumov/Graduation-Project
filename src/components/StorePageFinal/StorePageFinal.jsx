import React, { useEffect, useState } from "react";
import ProductCard from "../StorePageFinal/ProductCard/ProductCard";
import { fetchData } from "../api2";
import "./StorePageFinal.css";

import Sidebar from "./Sidebar/Sidebar";
import PriceRangeFilter from "./Sidebar/PriceRangeFilter/PriceRangeFIlter";
import PriceFilter from "./PriceFilter/PriceFilter";

function StorePageFinal() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState({});
  const [colorFilters, setColorFilters] = useState({});
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [priceFilter, setPriceFilter] = useState("default");

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetchData();
        setOriginalProducts(res);
        setProducts(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  const categories = Array.from(new Set(originalProducts.map((product) => product.category)));
  const colors = Array.from(new Set(originalProducts.map((product) => product.color)));

  useEffect(() => {
    function filterProducts() {
      let filteredProducts = [...originalProducts];

      // Filter by category
      const selectedCategories = Object.keys(categoryFilters).filter(
        (category) => categoryFilters[category]
      );
      if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedCategories.includes(product.category)
        );
      }

      // Filter by color
      const selectedColors = Object.keys(colorFilters).filter((color) => colorFilters[color]);
      if (selectedColors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedColors.includes(product.color)
        );
      }

      // Apply price range filter
      filteredProducts = filteredProducts.filter((product) => {
        const productPrice = parseFloat(product.original_price);
        const minPrice = priceRange.minPrice === "" ? Number.MIN_VALUE : parseFloat(priceRange.minPrice);
        const maxPrice = priceRange.maxPrice === "" ? Number.MAX_VALUE : parseFloat(priceRange.maxPrice);
        return productPrice >= minPrice && productPrice <= maxPrice;
      });

      // Sort products by price if a price sort option is selected
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
  }, [categoryFilters, colorFilters, originalProducts, priceRange, priceFilter]);

  function handleCategoryFilterChange(e) {
    const { name, checked } = e.target;
    setCategoryFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  }

  function handleColorFilterChange(e) {
    const { name, checked } = e.target;
    setColorFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  }

  function handlePriceRangeFilter(minPrice, maxPrice) {
    setPriceRange({ minPrice, maxPrice });
  }

  function handlePriceFilter(e) {
    setPriceFilter(e.target.value);
  }

  return (
    <main className="product-main">
      <Sidebar
        categories={categories}
        checkBoxState={categoryFilters}
        handleCheckBox={handleCategoryFilterChange}
        colors={colors}
        colorFilters={colorFilters}
        handleColorFilterChange={handleColorFilterChange}
        handlePriceRangeFilter={handlePriceRangeFilter}
      />
      <PriceFilter priceFilter={priceFilter} handlePriceFilter={handlePriceFilter} />
      <div className="products-container">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}

export default StorePageFinal;
