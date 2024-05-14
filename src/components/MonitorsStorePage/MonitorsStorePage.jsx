import React, { useEffect, useState } from "react";
import ProductCard2 from "./ProductCard2/ProductCard2";
import { fetchData } from "../apiMonitors";


import AddMonitorForm from "./AddMonitorForm/AddMonitorForm";
import { getDatabase, ref, onValue } from 'firebase/database';

import Sidebar from "./Sidebar2/Sidebar2";
import PriceFilter from "./PriceFilter2/PriceFilter2";

function MonitorsStorePage({userEmail}) {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [priceFilter, setPriceFilter] = useState("default");

  const [selectedCompany, setSelectedCompany] = useState({});
  const [selectedRefreshRate, setSelectedRefreshRate] = useState({});
  const [selectedResolution, setSelectedResolution] = useState({});
  const [selectedPanelType, setSelectedPanelType] = useState({});
  const [selectedScreenSize, setSelectedScreenSize] = useState({});

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    async function fetchDataAndListen() {
      try {
        // Fetch initial data
        const res = await fetchData();
        setOriginalProducts(res);
        setProducts(res);
        setLoading(false);

        // Listen for real-time changes in 'monitors' node
        const database = getDatabase();
        const monitorsRef = ref(database, 'monitors');
        onValue(monitorsRef, (snapshot) => {
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

  const companies = Array.from(new Set(originalProducts.map((product) => product.company)));
  const refresh_rates = Array.from(new Set(originalProducts.map((product) => product.refresh_rate)));
  const resolutions = Array.from(new Set(originalProducts.map((product) => product.resolution)));
  const panel_types = Array.from(new Set(originalProducts.map((product) => product.panel_type)));
  const screen_sizes = Array.from(new Set(originalProducts.map((product) => product.screen_size)));

  useEffect(() => {
    function filterProducts() {
      let filteredProducts = [...originalProducts];

      // Apply price range filter
      filteredProducts = filteredProducts.filter((product) => {
        const productPrice = parseFloat(product.original_price);
        const minPrice = priceRange.minPrice === "" ? Number.MIN_VALUE : parseFloat(priceRange.minPrice);
        const maxPrice = priceRange.maxPrice === "" ? Number.MAX_VALUE : parseFloat(priceRange.maxPrice);
        return productPrice >= minPrice && productPrice <= maxPrice;
      });

      // Filter by company
      const selectedCompanies = Object.keys(selectedCompany).filter((company) => selectedCompany[company]);
      if (selectedCompanies.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedCompanies.some(selectedCompany => product.company.includes(selectedCompany))
        );
      }

      // Filter by refresh rate
      const selectedRefreshRates = Object.keys(selectedRefreshRate).filter((refresh_rate) => selectedRefreshRate[refresh_rate]);
      if (selectedRefreshRates.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedRefreshRates.some(selectedRefreshRate => product.refresh_rate.includes(selectedRefreshRate))
        );
      }

      // Filter by resolution
      const selectedResolutions = Object.keys(selectedResolution).filter((resolution) => selectedResolution[resolution]);
      if (selectedResolutions.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedResolutions.some(selectedResolution => product.resolution.includes(selectedResolution))
        );
      }

      // Filter by panel type
      const selectedPanelTypes = Object.keys(selectedPanelType).filter((panel_type) => selectedPanelType[panel_type]);
      if (selectedPanelTypes.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedPanelTypes.some(selectedPanelType => product.panel_type.includes(selectedPanelType))
        );
      }

      // Filter by screen size
      const selectedScreenSizes = Object.keys(selectedScreenSize).filter((screen_size) => selectedScreenSize[screen_size]);
      if (selectedScreenSizes.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedScreenSizes.some(selectedScreenSize => product.screen_size.includes(selectedScreenSize))
        );
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
  }, [originalProducts, priceRange, priceFilter, selectedCompany, selectedRefreshRate, selectedResolution, selectedPanelType, selectedScreenSize]);

  function handlePriceRangeFilter(minPrice, maxPrice) {
    setPriceRange({ minPrice, maxPrice });
  }

  function handlePriceFilter(e) {
    setPriceFilter(e.target.value);
  }

  function handleCompanyChange(company) {
    setSelectedCompany((prevCompanyFilters) => ({
      ...prevCompanyFilters,
      [company]: !prevCompanyFilters[company],
    }));
  }

  function handleRefreshRateChange(refresh_rate) {
    setSelectedRefreshRate((prevRefreshRateFilters) => ({
      ...prevRefreshRateFilters,
      [refresh_rate]: !prevRefreshRateFilters[refresh_rate],
    }));
  }

  function handleResolutionChange(resolution) {
    setSelectedResolution((prevResolutionFilters) => ({
      ...prevResolutionFilters,
      [resolution]: !prevResolutionFilters[resolution],
    }));
  }

  function handlePanelTypeChange(panel_type) {
    setSelectedPanelType((prevPanelTypeFilters) => ({
      ...prevPanelTypeFilters,
      [panel_type]: !prevPanelTypeFilters[panel_type],
    }));
  }

  function handleScreenSizeChange(screen_size) {
    setSelectedScreenSize((prevScreenSizeFilters) => ({
      ...prevScreenSizeFilters,
      [screen_size]: !prevScreenSizeFilters[screen_size],
    }));
  }

  const noProductsImageUrl = "https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/noProductsFound.jpg?alt=media&token=5f250185-2745-40aa-9b2a-71dcebbeb56d";

  return (
    <main className="product-main">
      <Sidebar
        handlePriceRangeFilter={handlePriceRangeFilter}
        companies={companies}
        selectedCompany={selectedCompany}
        handleCompanyChange={handleCompanyChange}
        refresh_rates={refresh_rates}
        selectedRefreshRate={selectedRefreshRate}
        handleRefreshRateChange={handleRefreshRateChange}
        resolutions={resolutions}
        selectedResolution={selectedResolution}
        handleResolutionChange={handleResolutionChange}
        panel_types={panel_types}
        selectedPanelType={selectedPanelType}
        handlePanelTypeChange={handlePanelTypeChange}
        screen_sizes={screen_sizes}
        selectedScreenSize={selectedScreenSize}
        handleScreenSizeChange={handleScreenSizeChange}
      />

      <PriceFilter priceFilter={priceFilter} handlePriceFilter={handlePriceFilter} />
      {isAdmin && (
        <div className="add-product-form-toggle">
          <button className="toggle-button" onClick={() => setShowAddProductForm(!showAddProductForm)}>
            {showAddProductForm ? "Hide Form" : "Add Monitor"}
          </button>
          {showAddProductForm && <AddMonitorForm />}
        </div>
      )}

      {products.length === 0 ? (
        <div className="products-container">
          <img src={noProductsImageUrl} alt="No products found" />
        </div>
      ) : (
        <div className="products-container">
          {products.map((product) => (
             <ProductCard2 product={product} key={product.id} isLoggedIn = {isLoggedIn} userEmail={userEmail}/>
          ))}
        </div>
      )}
    </main>
  );
}

export default MonitorsStorePage;