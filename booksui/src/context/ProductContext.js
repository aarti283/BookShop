// ProductContext.js
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  
  // Calling Book list api
  useEffect(() => {
    fetch("/Books/", {
      method: "GET",  
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const searchProducts = (query) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <ProductContext.Provider value={{ products, searchProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;