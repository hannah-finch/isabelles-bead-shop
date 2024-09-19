import { createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "./queries";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_All_PRODUCTS);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setAllProducts(data.products);
    }
  }, [data]);

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <ProductsContext.Provider value={{ allProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
