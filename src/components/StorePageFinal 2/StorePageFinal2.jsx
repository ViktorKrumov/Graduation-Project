import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard2/ProductCard2";
import { fetchData } from "../api3";

function StorePageFinal() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="products-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))
      )}
    </div>
  );
}

export default StorePageFinal;
