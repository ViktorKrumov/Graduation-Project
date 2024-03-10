import React, { useEffect, useState } from "react";
import ProductCard from "../StorePageFinal/ProductCard/ProductCard";
import { fetchData } from "../api2";
import "./StorePageFinal.css";

import Sidebar from "./Sidebar/Sidebar";
import PriceFilter from "./PriceFilter/PriceFilter";

function StorePageFinal({isLoggedIn}) {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState({});
  const [colorFilters, setColorFilters] = useState({});
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [priceFilter, setPriceFilter] = useState("default");
  const [processors, setProcessors] = useState(["Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 3", "AMD Ryzen 5", "AMD Ryzen 7"]);
  const [selectedProcessor, setSelectedProcessor] = useState({});
  const [graphicCards, setGraphicCards] = useState(["GeForce RTX 2080", "GeForce RTX 3050", "GeForce RTX 3060", "GeForce RTX 3060 Ti", "GeForce RTX 3070", "Radeon RX"]);
  const [selectedGraphicCard, setSelectedGraphicCard] = useState({});

  const [selectedCompany, setSelectedCompany] = useState({});

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
  const companies = Array.from(new Set(originalProducts.map((product) => product.company)));

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
          selectedProcessors.some(selectedProcessor => product.processor.includes(selectedProcessor))
        );
      }

      // Filter by graphic card
      const selectedGraphicCards = Object.keys(selectedGraphicCard).filter((card) => selectedGraphicCard[card]);
      if (selectedGraphicCards.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedGraphicCards.some(selectedCard => product.graphics_card.includes(selectedCard))
        );
      }

      // Filter by company
      const selectedCompanies = Object.keys(selectedCompany).filter((company) => selectedCompany[company]);
      if (selectedCompanies.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedCompanies.some(selectedCompany => product.company.includes(selectedCompany))
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
  }, [categoryFilters, colorFilters, originalProducts, priceRange, priceFilter, selectedProcessor, selectedGraphicCard, selectedCompany]);

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

  function handleCompanyChange(company) {
    setSelectedCompany((prevCompanyFilters) => ({
      ...prevCompanyFilters,
      [company]: !prevCompanyFilters[company],
    }));
  }

  const noProductsImageUrl = "https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/noProductsFound.jpg?alt=media&token=5f250185-2745-40aa-9b2a-71dcebbeb56d";

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
        selectedProcessor={selectedProcessor}
        handleProcessorChange={handleProcessorChange}
        graphicCards={graphicCards}
        selectedGraphicCard={selectedGraphicCard}
        handleGraphicCardChange={handleGraphicCardChange}
        companies={companies} 
        selectedCompany={selectedCompany}
        handleCompanyChange={handleCompanyChange}
      />

      <PriceFilter priceFilter={priceFilter} handlePriceFilter={handlePriceFilter} />
      {products.length === 0 ? (
        <div className="products-container">
          <img src={noProductsImageUrl} alt="No products found" />
        </div>
      ) : (
        <div className="products-container">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} isLoggedIn = {isLoggedIn} />
          ))}
        </div>
      )}
    </main>
  );
}

export default StorePageFinal;
