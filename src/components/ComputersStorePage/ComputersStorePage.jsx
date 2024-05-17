import React, { useEffect, useState } from "react";
import ProductCard from "../ComputersStorePage/ProductCard/ProductCard";
import { fetchData } from "../apiComputers";
import "./ComputersStorePage.css";
import AddProductForm from "./AddProductForm/AddProductForm";
import { getDatabase, ref, onValue } from 'firebase/database';

import Sidebar from "./Sidebar/Sidebar";
import PriceFilter from "./PriceFilter/PriceFilter";

function ComputersStorePage() {
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
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    async function fetchDataAndListen() {
      try {
        // Fetch initial data
        const res = await fetchData();
        setOriginalProducts(res);
        setProducts(res);
        setLoading(false);

        // Listen for real-time changes in 'computers' node
        const database = getDatabase();
        const computersRef = ref(database, 'computers');
        onValue(computersRef, (snapshot) => {
          const data = snapshot.val();
          setProducts(data ? Object.values(data) : []);
        });
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setLoading(false);
      }
    }
    fetchDataAndListen();
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

  function handleProcessorChange(e) {
    const { name, checked } = e.target;
    setSelectedProcessor((prevSelectedProcessor) => ({
      ...prevSelectedProcessor,
      [name]: checked,
    }));
  }
  
  function handleGraphicCardChange(e) {
    const { name, checked } = e.target;
    setSelectedGraphicCard((prevCardFilters) => ({
      ...prevCardFilters,
      [name]: checked,
    }));
  }

  function handleCompanyChange(e) {
    const { name, checked } = e.target;
    setSelectedCompany((prevCompanyFilters) => ({
      ...prevCompanyFilters,
      [name]: checked,
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
      {isAdmin && (
        <div className="add-product-form-toggle">
          <button className="toggle-button" onClick={() => setShowAddProductForm(!showAddProductForm)}>
            {showAddProductForm ? "Hide Form" : "Add PC"}
          </button>
          {showAddProductForm && <AddProductForm />}
        </div>
      )}

      {products.length === 0 ? (
        <div className="products-container">
          <img src={noProductsImageUrl} alt="No products found" />
        </div>
      ) : (
        <div className="products-container">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} isLoggedIn={isLoggedIn} userEmail={userEmail} />
          ))}
        </div>
      )}
    </main>
  );
}

export default ComputersStorePage;
