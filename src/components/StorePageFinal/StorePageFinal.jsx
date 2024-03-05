import React, { useEffect, useState } from "react";
import ProductCard from "../StorePageFinal/ProductCard/ProductCard";
import { fetchData } from "../api2";
import "./StorePageFinal.css";

import Sidebar from "./Sidebar/Sidebar";
import PriceFilter from "./PriceFilter/PriceFilter";

function StorePageFinal() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState({});
  const [colorFilters, setColorFilters] = useState({});

  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [priceFilter, setPriceFilter] = useState("default");

  const [processors, setProcessors] = useState(["Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7"]);
  const [selectedProcessor, setSelectedProcessor] = useState({});

  const [graphicCards, setGraphicCards] = useState(["GeForce RTX 3050", "GeForce RTX 3060", "GeForce RTX 3060 Ti", "GeForce RTX 3070"]);
  const [selectedGraphicCard, setSelectedGraphicCard] = useState({});

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

      // Filter by processor brand
      const selectedProcessors = Object.keys(selectedProcessor).filter((processor) => selectedProcessor[processor]);
      if (selectedProcessors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedProcessors.includes(product.processor.split(" ")[0]) 
        );
      }

      // Filter by graphic card
      const selectedGraphicCards = Object.keys(selectedGraphicCard).filter((card) => selectedGraphicCard[card]);
      if (selectedGraphicCards.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedGraphicCards.includes(product.graphics_card.split(" ")[0])
        );
      }

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
  }, [categoryFilters, colorFilters, originalProducts, priceRange, priceFilter, selectedProcessor, selectedGraphicCard]);

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

  function handleProcessorChange(processor) {
    setSelectedProcessor((prevProcessorFilters) => ({
      ...prevProcessorFilters,
      [processor]: !prevProcessorFilters[processor],
    }));
  }

  function handleGraphicCardChange(card) {
    setSelectedGraphicCard((prevCardFilters) => ({
      ...prevCardFilters,
      [card]: !prevCardFilters[card],
    }));
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
        processors={processors}
        processorFilters={selectedProcessor}
        handleProcessorChange={handleProcessorChange}
        graphicCards={graphicCards}
        selectedGraphicCard={selectedGraphicCard}
        handleGraphicCardChange={handleGraphicCardChange}
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
