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
  const [cartItems, setCartItems] = useState(() => {
    // check local storage for cart items and initialize the cart (with the items if there are any) or return an empty array
    try {
      const initializeCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      if  (initializeCart.length > 0) {
        return initializeCart;
      } else {
        return [];
      }  
    } catch (error) {
      console.error(error);
      return [];
    }
  });
     
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // check local storage for cart items. useEffect runs only once when the component mounts
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (savedCartItems.length > 0 && cartItems === undefined) {
      setCartItems(savedCartItems);
    }
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
