import { createContext, useContext, useState, useEffect } from "react";
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

  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCounter(totalItems);
  }, [cartItems]);

  // Add to cart function
  const addToCart = (addItem, quantityToAdd) => {
    const itemExists = cartItems.some((item) => item._id === addItem._id);

    const updatedCartItems = itemExists
      ? // If the item is already in the cart, increment the stock
        cartItems.map((item) =>
          addItem._id === item._id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        )
      : // Otherwise, add the item to the cart
        [...cartItems, { ...addItem, quantity: quantityToAdd }];

    // set to local storage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setCartItems(updatedCartItems);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <ProductsContext.Provider value={{ allProducts }}>
      <ShoppingCartContext.Provider
        value={{
          cartItems,
          setCartItems,
          addToCart,
          cartCounter,
          setCartCounter,
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ShoppingCartContext, ProductsProvider };
