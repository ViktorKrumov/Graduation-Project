import React, { useEffect, useState } from "react";
import ProductCard4 from "./ProductCard4/ProductCard4";
import { fetchData } from "../apiOffice";
import "./StorePageFinal4.css";

import AddPrinterForm from "./AddPrinterForm/AddPrinterForm";
import { getDatabase, ref, onValue } from 'firebase/database';

import Sidebar from "./Sidebar4/Sidebar4";
import PriceFilter from "./PriceFilter4/PriceFilter4";



function StorePageFinal4() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceFilter, setPriceFilter] = useState("default");
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [selectedConnections, setSelectedConnections] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [selectedOutputType, setSelectedOutputType] = useState({});
  const [selectedPrinterTechnology, setSelectedPrinterTechnology] = useState({});
  const [selectedPaperFormats, setSelectedPaperFormats] = useState({});


  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    async function fetchDataAndListen() {
      try {
        
        const res = await fetchData();
        setOriginalProducts(res);
        setProducts(res);
        setLoading(false);

       
        const database = getDatabase();
        const monitorsRef = ref(database, 'office');
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

  const connections = Array.from(new Set(originalProducts.map((product) => product.connection))); 
  const companies = Array.from(new Set(originalProducts.map((product) => product.company)));
  const outputTypes = Array.from(new Set(originalProducts.map((product) => product.output)));
  const printerTechnologies = Array.from(new Set(originalProducts.map((product) => product.printer_technology)));
  const paperFormats = Array.from(new Set(originalProducts.map((product) => product.paper_format)));
  

  useEffect(() => {
    function filterProducts() {
      let filteredProducts = [...originalProducts];

      filteredProducts = filteredProducts.filter((product) => {
        const productPrice = parseFloat(product.original_price);
        const minPrice = priceRange.minPrice === "" ? Number.MIN_VALUE : parseFloat(priceRange.minPrice);
        const maxPrice = priceRange.maxPrice === "" ? Number.MAX_VALUE : parseFloat(priceRange.maxPrice);
        return productPrice >= minPrice && productPrice <= maxPrice;
      });


      const selectedConnectionsKeys = Object.keys(selectedConnections).filter((connection) => selectedConnections[connection]);
      if (selectedConnectionsKeys.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedConnectionsKeys.some(selectedConnection => product.connection.includes(selectedConnection))
        );
      }

      const selectedOutputTypeKeys = Object.keys(selectedOutputType).filter((output) => selectedOutputType[output]);
      if (selectedOutputTypeKeys.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedOutputTypeKeys.some(selectedOutputType => product.output.includes(selectedOutputType))
        );
      }

      const selectedPaperFormatKeys = Object.keys(selectedPaperFormats).filter((format) => selectedPaperFormats[format]);
      if (selectedPaperFormatKeys.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedPaperFormatKeys.some((selectedFormat) => product.paper_format.includes(selectedFormat))
        );
      }

      const selectedPrinterTechnologyKeys = Object.keys(selectedPrinterTechnology).filter((technology) => selectedPrinterTechnology[technology]);
      if (selectedPrinterTechnologyKeys.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedPrinterTechnologyKeys.some((selectedTechnology) => product.printer_technology.includes(selectedTechnology))
        );
      }


      const selectedCompanies = Object.keys(selectedCompany).filter((company) => selectedCompany[company]);
      if (selectedCompanies.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedCompanies.some(selectedCompany => product.company.includes(selectedCompany))
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
  }, [originalProducts, priceRange, selectedConnections, selectedCompany, priceFilter, selectedOutputType, selectedPrinterTechnology, selectedPaperFormats]);

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

  // function handleOutputTypeChange(outputType) {
  //   setSelectedOutputType((prevOutputTypeFilters) => ({
  //     ...prevOutputTypeFilters,
  //     [outputType]: !prevOutputTypeFilters[outputType],
  //   }));
  // }

  function handleOutputTypeChange(e) {
    const { name, checked } = e.target;
    setSelectedOutputType((prevOutputTypeFilters) => ({
      ...prevOutputTypeFilters,
      [name]: checked,
    }));
  }

  // function handlePrinterTechnologyChange(printerTechnology) {
  //   setSelectedPrinterTechnology((prevSelected) => ({
  //     ...prevSelected,
  //     [printerTechnology]: !prevSelected[printerTechnology],
  //   }));
  // }

  function handlePrinterTechnologyChange(e) {
    const { name, checked } = e.target;
    setSelectedPrinterTechnology((prevSelected) => ({
      ...prevSelected,
      [name]: checked,
    }));
  }


  // function handlePaperFormatChange(format) {
  //   setSelectedPaperFormats((prevSelectedFormats) => ({
  //     ...prevSelectedFormats,
  //     [format]: !prevSelectedFormats[format],
  //   }));
  // }
  
  
  function handlePaperFormatChange(e) {
    const { name, checked } = e.target;
    setSelectedPaperFormats((prevSelectedFormats) => ({
      ...prevSelectedFormats,
      [name]: checked,
    }));
  }


  function handlePriceFilter(e) {
    setPriceFilter(e.target.value);
  }

  function handlePriceRangeFilter(minPrice, maxPrice) {
    setPriceRange({ minPrice, maxPrice });
  }

  const noProductsImageUrl = "https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/noProductsFound.jpg?alt=media&token=5f250185-2745-40aa-9b2a-71dcebbeb56d";

  return (
    <main className="product-main">
      <Sidebar
              handlePriceRangeFilter={handlePriceRangeFilter}

              connections={connections}
              selectedConnections={selectedConnections}
              handleConnectionChange={handleConnectionChange}

              companies={companies}
              selectedCompany={selectedCompany}
              handleCompanyChange={handleCompanyChange}

              outputTypes={outputTypes}
              selectedOutputType={selectedOutputType}
              handleOutputTypeChange={handleOutputTypeChange}

              printerTechnologies={printerTechnologies}
              selectedPrinterTechnology={selectedPrinterTechnology}
              handlePrinterTechnologyChange={handlePrinterTechnologyChange}

              paperFormats={paperFormats}
              selectedPaperFormats={selectedPaperFormats}
              handlePaperFormatChange={handlePaperFormatChange}
      />

      <PriceFilter priceFilter={priceFilter} handlePriceFilter={handlePriceFilter} />

     
      {isAdmin && (
        <div className="add-product-form-toggle">
          <button className="toggle-button" onClick={() => setShowAddProductForm(!showAddProductForm)}>
            {showAddProductForm ? "Hide Form" : "Add Printer"}
          </button>
          {showAddProductForm && <AddPrinterForm />}
        </div>
      )} 

      {products.length === 0 ? (
        <div className="products-container">
          <img src={noProductsImageUrl} alt="No products found" />
        </div>
      ) : (
        <div className="products-container">
          {products.map((product) => (
             <ProductCard4 product={product} key={product.id} isLoggedIn = {isLoggedIn} userEmail={userEmail}/>
          ))}
        </div>
      )}
    </main>
  );
}

export default StorePageFinal4;