import { createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "./queries";

const ProductsContext = createContext();
const ShoppingCartContext = createContext();

const ProductsProvider = ({ children }) => {
  // Products state
  const { data, loading, error } = useQuery(GET_All_PRODUCTS);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setAllProducts(data.products);
    }
  }, [data]);

  // Shopping cart state
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    console.log(cartItems); 
  };

  

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <ProductsContext.Provider value={{ allProducts }}>
      <ShoppingCartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
        {children}
      </ShoppingCartContext.Provider>
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ShoppingCartContext, ProductsProvider };