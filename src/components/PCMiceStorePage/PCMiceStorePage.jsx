import React, { useEffect, useState } from "react";
import ProductCard3 from "./ProductCard3/ProductCard3";
import { fetchData } from "../apiMice";
import "./PCMiceStorePage.css";

import Sidebar from "./Sidebar3/Sidebar3";
import PriceFilter from "./PriceFilter3/PriceFilter3";

import AddMouseForm from "./AddMouseForm/AddMouseForm";
import { getDatabase, ref, onValue } from 'firebase/database';

function PCMiceStorePage() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [priceFilter, setPriceFilter] = useState("default");
  const [selectedCompany, setSelectedCompany] = useState({});
  const [colorFilters, setColorFilters] = useState({});
  const [selectedConnections, setSelectedConnections] = useState({});

  const [DPIRange, setDPIRange] = useState({ minDPI: "", maxDPI: "" });
  const [weightRange, setWeightRange] = useState({ minWeight: "", maxWeight: "" });

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

        // Listen for real-time changes in 'monitors' node
        const database = getDatabase();
        const monitorsRef = ref(database, 'mice');
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
  const colors = Array.from(new Set(originalProducts.map((product) => product.color)));
  const connections = Array.from(new Set(originalProducts.map((product) => product.connection))); 

  useEffect(() => {
    function filterProducts() {
      let filteredProducts = [...originalProducts];
     
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

      // Filter by company
      const selectedCompanies = Object.keys(selectedCompany).filter((company) => selectedCompany[company]);
      if (selectedCompanies.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedCompanies.some(selectedCompany => product.company.includes(selectedCompany))
        );
      }

      // Filter by connection
      const selectedConnectionsKeys = Object.keys(selectedConnections).filter((connection) => selectedConnections[connection]);
      if (selectedConnectionsKeys.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedConnectionsKeys.some(selectedConnection => product.connection.includes(selectedConnection))
        );
      }

        // Filter by DPI range
        filteredProducts = filteredProducts.filter((product) => {
          const productDPI = parseInt(product.DPI);
          const minDPIValue = DPIRange.minDPI === "" ? Number.MIN_VALUE : DPIRange.minDPI;
          const maxDPIValue = DPIRange.maxDPI === "" ? Number.MAX_VALUE : DPIRange.maxDPI;
          return productDPI >= minDPIValue && productDPI <= maxDPIValue;
        });


        filteredProducts = filteredProducts.filter((product) => {
          const productWeight = parseInt(product.weight);
          const minWeight = weightRange.minWeight === "" ? 0 : parseInt(weightRange.minWeight);
          const maxWeight = weightRange.maxWeight === "" ? Infinity : parseInt(weightRange.maxWeight);
          return productWeight >= minWeight && productWeight <= maxWeight;
        });

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
  }, [originalProducts, colorFilters, priceRange, priceFilter, selectedCompany, selectedConnections, DPIRange, weightRange]);

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

  // function handleCompanyChange(company) {
  //   setSelectedCompany((prevCompanyFilters) => ({
  //     ...prevCompanyFilters,
  //     [company]: !prevCompanyFilters[company],
  //   }));
  // }
  function handleCompanyChange(e) {
    const { name, checked } = e.target;
    setSelectedCompany((prevCompanyFilters) => ({
      ...prevCompanyFilters,
      [name]: checked,
    }));
  }


  // function handleConnectionChange(connection) {
  //   setSelectedConnections((prevConnectionFilters) => ({
  //     ...prevConnectionFilters,
  //     [connection]: !prevConnectionFilters[connection],
  //   }));
  // }
  
  function handleConnectionChange(e) {
    const { name, checked } = e.target;
    setSelectedConnections((prevConnectionFilters) => ({
      ...prevConnectionFilters,
      [name]: checked,
    }));
  }


  function handleDPIFilter(minDPI, maxDPI) {
    setDPIRange({ minDPI, maxDPI });
  }

  function handleWeightFilter(minWeight, maxWeight) {
    setWeightRange({ minWeight, maxWeight });
  }

  const noProductsImageUrl = "https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/noProductsFound.jpg?alt=media&token=5f250185-2745-40aa-9b2a-71dcebbeb56d";

  return (
    <main className="product-main">
      <Sidebar
        handlePriceRangeFilter={handlePriceRangeFilter}
        companies={companies} 
        selectedCompany={selectedCompany}
        handleCompanyChange={handleCompanyChange}
        colors={colors}
        colorFilters={colorFilters}
        handleColorFilterChange={handleColorFilterChange}
        connections={connections}
        selectedConnections={selectedConnections}
        handleConnectionChange={handleConnectionChange}

        handleDPIFilter={handleDPIFilter}
        handleWeightFilter={handleWeightFilter}
      />

      <PriceFilter priceFilter={priceFilter} handlePriceFilter={handlePriceFilter} />

      {isAdmin && (
        <div className="add-product-form-toggle">
          <button className="toggle-button" onClick={() => setShowAddProductForm(!showAddProductForm)}>
            {showAddProductForm ? "Hide Form" : "Add Mouse"}
          </button>
          {showAddProductForm && <AddMouseForm />}
        </div>
      )}

      {products.length === 0 ? (
        <div className="products-container">
          <img src={noProductsImageUrl} alt="No products found" />
        </div>
      ) : (
        <div className="products-container">
          {products.map((product) => (
              <ProductCard3 product={product} key={product.id} isLoggedIn = {isLoggedIn} userEmail={userEmail}/>
          ))}
        </div>
      )}
    </main>
  );
}

export default PCMiceStorePage;
